import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { research, otherPapers } from "../src/data/profile.ts";
import { labProjects, projectClips } from "../src/data/lab-projects.ts";

const base = (process.env.TEST_URL || "http://127.0.0.1:4480").replace(
  /\/$/,
  "",
);
const browser = await chromium.launch({
  ...(process.env.CHROME_PATH
    ? { executablePath: process.env.CHROME_PATH }
    : {}),
  args: ["--no-sandbox"],
});
const context = await browser.newContext({
  viewport: { width: 1360, height: 1000 },
});
const checks = [];
const scans = [];
const errors = [];
function check(name, pass, detail = "") {
  checks.push({ name, pass: Boolean(pass), detail });
}
const spacing =
  "* { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; } p { margin-bottom: 2em !important; }";
await mkdir("reports/screenshots", { recursive: true });
try {
  for (const route of ["/", "/cv/", "/accessibility/", "/404.html", "/building-digital-twin/", ...labProjects.map(p => `/${p.slug}/`)]) {
    const project = labProjects.find(p => route === `/${p.slug}/`);
    const legacyContext = route === "/building-digital-twin/" ? await browser.newContext({ viewport: { width: 1360, height: 1000 } }) : null;
    const page = await (legacyContext || context).newPage();
    console.log(`Checking ${route}`);
    // Audit the legacy fallback with only its redirect script removed. Astro may
    // inline this script; blocking script requests alone would still redirect.
    // A separate JavaScript-disabled context below verifies the actual fallback.
    if (legacyContext) await page.route(base + route, async request => {
      const response = await request.fetch();
      const fallback = (await response.text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
      await request.fulfill({ response, body: fallback });
    });
    page.on("pageerror", (error) => errors.push(String(error)));
    page.on("console", (message) => {
      if (message.type() === "error" && !message.text().includes("404"))
        errors.push(message.text());
    });
    const response = await page.goto(base + route, {
      // Video range requests can remain active after the page is usable.
      // Wait for the DOM, then check decoded images and playable media explicitly.
      waitUntil: "domcontentloaded",
    });
    await page.evaluate(() => document.fonts.ready);
    check(
      `${route}: page response`,
      response.status() === 200 ||
        (route === "/404.html" && response.status() === 404),
      response.status(),
    );
    for (const img of await page.locator("img:visible").all())
      await img.scrollIntoViewIfNeeded();
    await page.evaluate(async () => {
      await Promise.all([...document.images].filter(img => img.getClientRects().length && !img.closest("details:not([open])")).map((img) => img.decode()));
    });
    const structure = await page.evaluate(() => {
      const levels = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map(
        (node) => Number(node.tagName[1]),
      );
      return {
        h1: document.querySelectorAll("h1").length,
        headings: levels.every((level, i) =>
          i === 0 ? level === 1 : level <= levels[i - 1] + 1,
        ),
        images: [...document.images].every(
          (img) =>
            img.hasAttribute("alt") &&
            (img.alt.trim() || img.getAttribute("aria-hidden") === "true") &&
            (!img.getClientRects().length || img.closest("details:not([open])") || (img.complete && img.naturalWidth > 0)),
        ),
        csp: Boolean(
          document.querySelector('meta[http-equiv="Content-Security-Policy"]'),
        ),
        noMedia: !document.querySelector("video,audio,iframe,object,embed"),
        lang: document.documentElement.lang,
        brokenAnchors: [...document.querySelectorAll('a[href^="#"]')]
          .filter(
            (a) => !document.getElementById(a.getAttribute("href").slice(1)),
          )
          .map((a) => a.getAttribute("href")),
      };
    });
    check(
      `${route}: one h1 and sequential headings`,
      structure.h1 === 1 && structure.headings,
    );
    check(`${route}: loaded images with alt text`, structure.images);
    check(`${route}: restrictive CSP`, structure.csp);
    check(`${route}: only reviewed local media`, project ? await page.locator('iframe,audio,object,embed,video[autoplay]').count() === 0 : structure.noMedia);
    check(`${route}: declared English language`, structure.lang === "en");
    check(
      `${route}: fragment targets`,
      structure.brokenAnchors.length === 0,
      structure.brokenAnchors,
    );
    if (route === "/" || route === "/cv/") {
      const titles = await page.locator("h3").allTextContents();
      const authors = await page.locator(".authors").allTextContents();
      const normalize = (value) => value.replace(/\s+/g, " ").trim();
      const expected = [...research, ...otherPapers];
      check(
        `${route}: original publication titles rendered`,
        expected.every((paper) => titles.map(normalize).includes(paper.title)),
      );
      check(
        `${route}: complete author lists rendered`,
        expected.every((paper) =>
          authors.map(normalize).includes(paper.authors.join(", ")),
        ),
      );
    }
    await page.evaluate(() => {
      document.activeElement?.blur();
      window.scrollTo(0, 0);
    });
    await page.keyboard.press("Tab");
    check(
      `${route}: skip link first in keyboard order`,
      await page
        .locator(".skip-link")
        .evaluate((el) => el === document.activeElement),
    );
    await page.keyboard.press("Enter");
    check(
      `${route}: skip link focuses main`,
      await page
        .locator("main")
        .evaluate((el) => el === document.activeElement),
    );
    if (route === "/") {
      for (const item of labProjects) check(`${item.title}: homepage project link`, await page.locator(`#lab-projects a[href$="/${item.slug}/"]`).count() > 0);
      check("Team project bibliography is not added to personal publications", !(await page.locator('#publications').innerText()).includes('Simulation-based trade-off modeling'));
    }
    if (route === "/building-immunology/") {
      check("Combined building page retains microbiomes, digital twins and room risk", await page.locator('#communities,#simulation,#room-risk,#building-cases').count() === 4);
      check("Combined building page retains complete framework and face redaction", await page.locator('img[src$="immunity-framework-complete.webp"],img[src$="occupant-interaction-redacted.webp"]').count() === 2);
      check("Disinfection demonstrations moved out of the building page", await page.locator('#robotic-perception-video,#adaptive-disinfection-video,#surface-materials-video,#disinfection-simulation-video,#indoor-mapping-video').count() === 0);
      check("Combined building page links to separate robotic disinfection", await page.locator('a[href$="/disinfection-robot/"]').count() > 0);
    }
    if (route === "/disinfection-robot/") {
      check("Robot page retains the material-adaptive paper", await page.locator('#publications a[href="https://doi.org/10.1111/mice.12811"]').count() === 1);
      check("Robot page links back to combined building research", await page.locator('a[href$="/building-immunology/"]').count() > 0);
    }
    if (legacyContext) check("Legacy fallback has usable destination links", await page.locator('#combined-project,#robot-project').count() === 2);
    if (route === "/accessibility/") check("Surgery image and video credits are on the accessibility page", await page.locator('#surgery-media h3').count() === 8 + projectClips.filter(c => c.project === "agentic-robotics_surgeons").length);
    if (route === "/agentic-robotics_surgeons/") check("Surgery multipanel a-h prototype figure removed",await page.locator('img[src*="adaptive-prototype"]').count() === 0);
    if (project) {
      check(`${route}: no introductory subtitles`, await page.locator('.hero-copy > .eyebrow,.hero-subtitle,.coastal-hero .coastal-tagline,.coastal-hero .coastal-intro-copy').count() === 0);
      check(`${route}: no text captions below videos`, await page.locator('figure:has(video) > figcaption,figure:has(video) > details').count() === 0);
      if (route === "/agentic-robotics_surgeons/") {
        check(`${route}: team section removed; research vision is text only`, await page.locator('#vision,#team').count() === 0 && await page.locator('#research-vision img,#research-vision video').count() === 0);
        check(`${route}: opening film retains its complete frame`, await page.locator('.surgery-opening video').evaluateAll(vs => vs.length === 1 && vs.every(v => getComputedStyle(v).objectFit === 'contain')));
        check(`${route}: opening concept animation; laboratory prototype and coupling animation sit with External Magnetic Actuation`, await page.locator('.surgery-opening video').evaluateAll(vs => vs[0]?.id === 'camera-assembly-video') && await page.locator('#method .surgery-actuation video').evaluateAll(vs => vs.length === 2 && vs[0].id === 'bench-prototype-video' && vs[1].id === 'camera-guidance-video'));
        check(`${route}: title and subtitle follow the supplied copy`, (await page.locator('h1').innerText()) === 'Agentic and Bioinspired Robotics for Minimally Invasive Surgery' && (await page.locator('.surgery-subtitle').innerText()) === 'Exploring robotic actuation, bioinspired mechanisms, and agentic intelligence for surgeon-centered robotic assistance.');
        check(`${route}: section order follows the supplied copy`, JSON.stringify(await page.locator('main h2').allTextContents()) === JSON.stringify(['Three Research Challenges', '01 — Magnetically Actuated Surgical Cameras', '02 — Bioinspired Optical Maintenance', '03 — Agentic AI for Surgical Robotics', 'Research Vision', 'Related Publications']));
        check(`${route}: twelve related publications link to DOI records`, await page.locator('#publications .surgery-pub-list > li').count() === 12 && await page.locator('#publications .surgery-pub-title a[href^="https://doi.org/10."]').count() === 12);
        check(`${route}: repeated film and requested text removed`, await page.locator('.surgery-section-links,.surgery-publication > p:not(.surgery-subtitle),.surgery-scope,.surgery-evidence,#surgery-opening-video').count() === 0 && !/research stage/i.test(await page.locator('main').innerText()));
        check(`${route}: each video source appears once`, await page.locator('video source').evaluateAll(sources => new Set(sources.map(source => source.src)).size === sources.length));
        check(`${route}: no header or footer bars`, await page.locator('.project-header,.project-footer').count() === 0);
        check(`${route}: research directions have separate named sections`, await page.locator('#method > h2,#cleaning > h2,#visual-ai > h2').count() === 3);
        check(`${route}: video IDs are unique`, await page.locator('video').evaluateAll(vs => new Set(vs.map(v => v.id)).size === vs.length));
        check(`${route}: no collapsed details or visible source blocks`, await page.locator('main details,.source-section,.surgery-bubble').count() === 0);
        check(`${route}: credits link reaches the accessibility page`, await page.locator('a[href$="accessibility/#surgery-media"]').count() === 1);
      } else if (route === "/disease-resistant-school-communities/") {
        check(`${route}: no header, footer or disclosures`, await page.locator('.project-header,.project-footer,main details,main summary,.source-section').count() === 0);
        check(`${route}: title, subtitle, and sections follow the supplied copy`, (await page.locator('h1').innerText()).replace(/\s+/g, ' ').trim() === 'Disease-Resistant School Communities' && (await page.locator('.school-intro > p').innerText()) === 'Building healthier, more resilient school communities through science, technology, and community engagement.' && JSON.stringify(await page.locator('main h2').allTextContents()) === JSON.stringify(['Research Overview', 'Community Engagement', 'Selected Publications']) && JSON.stringify(await page.locator('main h3').allTextContents()) === JSON.stringify(['K–12 Education & Citizen Science', 'Community & Policy Engagement']));
        check(`${route}: one complete research film with captions, and a narration link`, await page.locator('#overview video').count() === 1 && await page.locator('#school-research-film-video track[kind="captions"]').count() === 1 && await page.locator('.school-film-note a[href$="accessibility/#school-transcript"]').count() === 1);
        check(`${route}: K-12 sampling photo sits with K-12 Education & Citizen Science`, await page.locator('#engagement .school-engagement-item:first-child img[src$="k12-sampling.webp"]').count() === 1);
        check(`${route}: six selected publications link to DOI records, including the film's study`, await page.locator('#publications .school-pub-list > li').count() === 6 && await page.locator('#publications .school-pub-title a[href^="https://doi.org/10."]').count() === 6 && await page.locator('#publications a[href="https://doi.org/10.1016/j.jobe.2021.103533"]').count() === 1);
      } else if (route === "/architected-structures/" || route === "/healthy-built-environments/") {
        check(`${route}: no navigation bars, footer, disclosures, or illustrated vision section`, await page.locator('.project-header,.project-footer,main nav,main details,main summary,#vision,.research-vision,.source-section').count() === 0);
        check(`${route}: no outgoing links`, await page.locator('a[href]').evaluateAll(links => links.every(a => a.getAttribute('href').startsWith('#'))));
        const expectedFigures = route === "/healthy-built-environments/" ? 2 : 4;
        check(`${route}: expected research figures remain visible`, await page.locator('main .project-figure:visible').count() === expectedFigures);
        if (route === "/architected-structures/") {
          check(`${route}: title, subtitle, and section order follow the supplied copy`, (await page.locator('h1').innerText()).replace(/\s+/g, ' ').trim() === 'Robot-Aware Design and Assembly of Architected Structures' && (await page.locator('.architected-subtitle').innerText()) === 'Integrating Computational Design, Structural Functionality, and Robotic Construction for Diverse Engineering Environments.' && JSON.stringify(await page.locator('main h2').allTextContents()) === JSON.stringify(['The Problem', 'Our Rationale', 'Architected Structural Design', 'Assembly-Aware Structural Interfaces', 'Robotic Assembly Planning and Execution', 'Research Vision']));
          check(`${route}: media labels follow the supplied figure mapping`, JSON.stringify(await page.locator('main h3').allTextContents()) === JSON.stringify(['Architected Structural Geometries', 'Robotic Fabrication', 'Modular Connection Strategies', 'Structural Interface Design', 'Application-Oriented Modular Assembly', 'Illustrative Robot-Assisted Assembly']) && await page.locator('#research-vision img,#research-vision video').count() === 0);
        }
        if (route === "/architected-structures/") check(`${route}: connection concepts are expanded`, await page.locator('.architected-connections [data-figure="connections"]').isVisible());
        if (route === "/healthy-built-environments/") check(`${route}: publication titles and authors retained as text`, await page.locator('.healthy-publications .publication h3').count() === 3 && await page.locator('.healthy-authors').count() === 3 && await page.locator('.healthy-publications a').count() === 0);
      } else {
      check(`${route}: larger vision section exists`, await page.locator('#vision').count() === 1);
      check(`${route}: visual collaboration map`, await page.locator(".vision-connections li").count() === 3 && await page.locator(".vision-scene").getByRole("img").count() === 1);
      }

      const clips = projectClips.filter(c => c.project === project.slug);
      const videos = page.locator('video');
      check(`${route}: expected project videos`, await videos.count() === clips.length);
      check(`${route}: native controls, muted playback and descriptions`, await videos.evaluateAll((vs, expected) => vs.every(v => v.controls && v.muted && v.loop === expected.find(c => `${c.id}-video` === v.id).loop && v.playsInline && v.querySelector('track[kind="descriptions"]') && v.getAttribute('aria-describedby').split(' ').every(id => document.getElementById(id))), clips.map(c => ({ id: c.id, loop: c.loop !== false }))));
      check(`${route}: standalone playback buttons absent`, await page.locator('#hero-playback-toggle,button[data-media-control]').count() === 0);
      if (clips.length) {
      const first = page.locator('video').first();
      const firstId = await first.getAttribute('id');
      await page.evaluate(() => { window.scrollTo(0, 0); document.querySelector('main').focus(); });
      await first.scrollIntoViewIfNeeded();
      await page.waitForFunction(id => {
        const video = document.getElementById(id);
        return !video.paused && video.readyState >= 2 && !video.error;
      }, firstId);
      check(`${route}: visible video starts automatically`, true);
      await page.keyboard.press('Tab');
      check(`${route}: native player is reachable by Tab`, await page.evaluate(id => document.activeElement.id === id, firstId));
      await page.keyboard.press('Space');
      await page.waitForFunction(id => document.getElementById(id).paused, firstId);
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      await first.scrollIntoViewIfNeeded();
      await page.waitForTimeout(350);
      check(`${route}: manual pause persists after scrolling`, await first.evaluate(v => v.paused));
      await page.keyboard.press('Space');
      await page.waitForFunction(id => !document.getElementById(id).paused, firstId);
      check(`${route}: native keyboard resumes playback`, true);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForFunction(() => [...document.querySelectorAll('video')].every(v => v.paused));
      check(`${route}: reduced motion suppresses automatic playback`, true);
      await first.focus(); await page.keyboard.press('Space');
      await page.waitForFunction(id => !document.getElementById(id).paused, firstId);
      check(`${route}: reduced-motion users can explicitly play`, true);
      await page.keyboard.press('Space');
      for (const clip of clips) {
        const path = `${base}/projects/${clip.assetProject || clip.project}/${clip.assetId || clip.id}`;
        const track = await context.request.get(`${path}.vtt`);
        const body = await track.text();
        check(`${clip.id}: description track available`, track.ok() && body.startsWith('WEBVTT') && body.includes('-->'));
        if (clip.captions) {
          const captions = await context.request.get(`${path}.en.vtt`);
          const captionText = await captions.text();
          const expectedCues = (captionText.match(/ --> /g) || []).length;
          check(`${clip.id}: English captions available`, captions.ok() && captionText.startsWith('WEBVTT'));
          check(`${clip.id}: captions enabled by default`, await page.locator(`#${clip.id}-video track[kind="captions"][default][srclang="en"]`).count() === 1);
          const player = page.locator(`#${clip.id}-video`);
          await player.evaluate(v => { if (v.readyState === 0) { v.preload = 'metadata'; v.load(); } });
          await page.waitForFunction(id => document.getElementById(id).readyState >= 1, `${clip.id}-video`);
          await player.evaluate(v => { v.textTracks[0].mode = 'showing'; });
          await page.waitForFunction(id => document.getElementById(id).textTracks[0].cues?.length > 0, `${clip.id}-video`);
          check(`${clip.id}: valid synchronized caption cues`, await player.evaluate((v, expected) => {
            const cues = [...v.textTracks[0].cues];
            return cues.length > 0 && cues.length === expected && cues.every((c, i) => c.startTime < c.endTime && c.endTime <= v.duration + .1 && (i === 0 || c.startTime >= cues[i-1].endTime));
          }, expectedCues));
          // Let visibility tracking settle before testing keyboard playback on
          // a later chapter, which may initially be outside the viewport.
          await player.scrollIntoViewIfNeeded();
          await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
          await player.evaluate(v => { v.currentTime = Math.max(0, v.duration - .2); });
          await player.focus(); await page.keyboard.press('Space');
          await page.waitForFunction(id => document.getElementById(id).ended, `${clip.id}-video`);
          await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
          await player.scrollIntoViewIfNeeded(); await page.emulateMedia({ reducedMotion: 'no-preference' });
          await page.waitForTimeout(350);
          check(`${clip.id}: completed film does not restart automatically`, await player.evaluate(v => v instanceof HTMLVideoElement && v.ended && v.paused));
          await player.focus(); await page.keyboard.press('Space');
          await page.waitForFunction(id => !document.getElementById(id).paused, `${clip.id}-video`);
          check(`${clip.id}: completed film can be replayed with keyboard`, true);
          await page.keyboard.press('Space'); await page.emulateMedia({ reducedMotion: 'reduce' });
        }
        for (const ext of ['jpg','mp4']) check(`${clip.id}: ${ext} available`, (await context.request.head(`${path}.${ext}`)).ok());
      }
      }
      const saved = await browser.newContext();
      await saved.addInitScript(() => Object.defineProperty(navigator, 'connection', { value: { saveData: true, addEventListener() {} }, configurable: true }));
      const savedPage = await saved.newPage();
      await savedPage.goto(base+route, { waitUntil: 'domcontentloaded' });
      check(`${route}: data saving suppresses automatic playback`, await savedPage.locator('video').evaluateAll(vs => vs.every(v => v.paused)));
      await saved.close();
      const nojs = await browser.newContext({ javaScriptEnabled: false });
      const nojsPage = await nojs.newPage(); await nojsPage.goto(base+route, { waitUntil: 'domcontentloaded' });
      check(`${route}: no-JavaScript content and controls`, await nojsPage.locator('video[controls]').count() === clips.length && await nojsPage.locator('h1').count() === 1);
      for (const explorer of await nojsPage.locator('[data-explorer]').all()) {
        check(`${route}: all cases available without JavaScript`, await explorer.locator('[data-panel]:visible').count() === await explorer.locator('[data-panel]').count());
      }
      await nojs.close();
      for (const explorer of await page.locator('[data-explorer]').all()) {
        const buttons = explorer.locator('button[data-choice]');
        for (const button of await buttons.all()) {
          await button.focus(); await page.keyboard.press('Enter');
          const target = await button.getAttribute('aria-controls');
          check(`${route}: case selector keyboard action`, await button.getAttribute('aria-pressed') === 'true' && await page.locator('#'+target).isVisible() && await explorer.locator('[data-panel]:visible').count() === 1);
          for (const img of await page.locator('#'+target+' img').all()) { await img.scrollIntoViewIfNeeded(); await img.evaluate(im => im.decode()); }
        }
        await buttons.first().focus(); await page.keyboard.press("Enter");
      }
      check(`${route}: figure descriptions and source attribution`, await page.locator('.project-figure').evaluateAll(fs => fs.every(f => {
        const noteId = f.querySelector('img').getAttribute('aria-describedby');
        const description = noteId ? document.getElementById(noteId) : f.querySelector('details p');
        const source = noteId ? description?.parentElement.querySelector('.source-credit') : f.querySelector('.source-credit');
        return description?.textContent.length > 40 && source?.textContent.length > 10;
      })));
      if (route === "/building-immunology/") check("Building images have no visible caption block", await page.locator('.project-figure figcaption, .project-figure details, .scope-note').count() === 0);
      for (const link of await page.locator('.figure-link').all()) check(`${route}: full-size source image available`, (await context.request.head(new URL(await link.getAttribute('href'), base).href)).ok());
    }
    for (const mode of ["desktop", "mobile", "text-spacing"]) {
      await page.setViewportSize(
        mode === "desktop"
          ? { width: 1360, height: 1000 }
          : { width: 320, height: 800 },
      );
      if (mode === "text-spacing") await page.addStyleTag({ content: spacing });
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      scans.push({
        route,
        mode,
        violations: result.violations,
        incomplete: result.incomplete.map((item) => ({
          id: item.id,
          impact: item.impact,
          nodes: item.nodes.length,
        })),
        passes: result.passes.length,
      });
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      );
      check(`${route}: ${mode} reflow`, !overflow);
      if (mode !== "text-spacing") {
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({
          path: `reports/screenshots/${route.replace(/[^a-z0-9]/gi, "") || "home"}-${mode}.png`,
          fullPage: true,
        });
      }
    }
    if (route === "/" || project) {
      for (const summary of await page.locator("summary:visible").all()) {
        await summary.focus();
        const outline = await summary.evaluate(
          (el) => getComputedStyle(el).outlineStyle,
        );
        check(`${route}: figure description has visible keyboard focus`, outline !== "none");
        await page.keyboard.press("Enter");
        check(
          "Figure description: keyboard opens disclosure",
          await summary.evaluate((el) => el.parentElement.open),
        );
      }
      for (const img of await page.locator(".vision-source-figures[open] img:visible").all()) {
        await img.scrollIntoViewIfNeeded();
        await img.evaluate(image => image.decode());
      }
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      scans.push({
        route,
        mode: "mobile-spacing-expanded-figures",
        violations: result.violations,
        incomplete: result.incomplete.map((item) => ({
          id: item.id,
          nodes: item.nodes.length,
        })),
        passes: result.passes.length,
      });
      check(
        `${route}: expanded descriptions at 320px reflow`,
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      );
    }
    await page.close();
    await legacyContext?.close();
  }
  const migration = await context.newPage();
  for (const [from, to] of [
    ["/building-digital-twin/", "/building-immunology/#simulation"],
    ["/building-digital-twin/#room-risk", "/building-immunology/#room-risk"],
    ["/building-digital-twin/#building-cases", "/building-immunology/#building-cases"],
    ["/building-digital-twin/#demonstrations", "/disinfection-robot/#navigation"],
  ]) {
    await migration.goto(base + from);
    await migration.waitForURL(base + to);
    check(`Legacy destination: ${from}`, migration.url() === base + to && await migration.locator(to.slice(to.indexOf("#"))).count() === 1);
  }
  await migration.close();
  const legacyNoJs = await browser.newContext({ javaScriptEnabled: false });
  const legacyFallback = await legacyNoJs.newPage();
  await legacyFallback.goto(base + "/building-digital-twin/", { waitUntil: "domcontentloaded" });
  check("Legacy entry remains usable without JavaScript", legacyFallback.url() === base + "/building-digital-twin/" && await legacyFallback.locator('#combined-project,#robot-project').count() === 2);
  await legacyFallback.locator('#combined-project').click();
  await legacyFallback.waitForURL(base + "/building-immunology/#simulation");
  check("Legacy no-JavaScript link reaches combined content", await legacyFallback.locator('#simulation h2').count() === 1);
  await legacyNoJs.close();
  check("No browser or CSP errors", errors.length === 0, errors);
} finally {
  await browser.close();
}
const report = {
  date: new Date().toISOString(),
  base,
  standard:
    "WCAG 2.1 A and AA automated checks; not a compliance certification",
  scans,
  checks,
  violationCount: scans.reduce((n, scan) => n + scan.violations.length, 0),
  failedChecks: checks.filter((item) => !item.pass),
  manualLimitations: [
    "Screen-reader usability has not been fully evaluated.",
    "External PDFs and publisher websites are outside this scan.",
    "Automated checks cannot establish full ADA/WCAG compliance.",
  ],
};
await writeFile(
  "reports/axe-wcag21aa.json",
  JSON.stringify(report, null, 2) + "\n",
);
console.log(
  JSON.stringify(
    {
      scans: scans.length,
      checks: checks.length,
      violations: report.violationCount,
      failures: report.failedChecks,
    },
    null,
    2,
  ),
);
if (report.violationCount || report.failedChecks.length) process.exit(1);
