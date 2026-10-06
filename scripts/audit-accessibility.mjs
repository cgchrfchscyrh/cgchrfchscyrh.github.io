import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { research, otherPapers } from "../src/data/profile.ts";

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
  for (const route of ["/", "/cv/", "/accessibility/", "/404.html"]) {
    const page = await context.newPage();
    page.on("pageerror", (error) => errors.push(String(error)));
    page.on("console", (message) => {
      if (message.type() === "error" && !message.text().includes("404"))
        errors.push(message.text());
    });
    const response = await page.goto(base + route, {
      waitUntil: "networkidle",
    });
    check(
      `${route}: page response`,
      response.status() === 200 ||
        (route === "/404.html" && response.status() === 404),
      response.status(),
    );
    for (const img of await page.locator("img").all())
      await img.scrollIntoViewIfNeeded();
    await page.evaluate(async () => {
      await Promise.all([...document.images].map((img) => img.decode()));
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
            img.alt.trim() &&
            img.complete &&
            img.naturalWidth > 0,
        ),
        footer: document
          .querySelector("footer")
          ?.textContent.includes(
            "do not represent the official position of the University of Florida",
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
    check(`${route}: UF disclaimer`, structure.footer);
    check(`${route}: restrictive CSP`, structure.csp);
    check(`${route}: no embedded or automatic media`, structure.noMedia);
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
        `${route}: all seven publication titles rendered`,
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
    if (route === "/") {
      for (const summary of await page.locator("summary").all()) {
        await summary.focus();
        const outline = await summary.evaluate(
          (el) => getComputedStyle(el).outlineStyle,
        );
        check("Figure description: visible keyboard focus", outline !== "none");
        await page.keyboard.press("Enter");
        check(
          "Figure description: keyboard opens disclosure",
          await summary.evaluate((el) => el.parentElement.open),
        );
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
        "Expanded figure descriptions: 320px reflow",
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      );
    }
    await page.close();
  }
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
