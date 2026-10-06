# Songyang Liu personal homepage

Live website: [cgchrfchscyrh.github.io](https://cgchrfchscyrh.github.io/). Source: [GitHub repository](https://github.com/cgchrfchscyrh/cgchrfchscyrh.github.io).

A personal academic website inspired by the structure of [Mengjun Wang’s homepage](https://wangmmstar.github.io/). Built independently with Astro, semantic HTML, local fonts, and a neutral charcoal and off-white palette.

## Content

- Homepage: biography, research news, four project pages, additional publications, education, awards, and contact.
- `/cv/`: concise HTML CV, based on the supplied 2026 CV and verified publication records. It is a summary, not a full transcription of the original document.
- `/accessibility/`: accessibility information and known limits.
- `/404.html`: accessible error page.

Update biography and news in `src/pages/index.astro`. Edit publication links, authors, education, and profile URLs in `src/data/profile.ts`. There is no placeholder portrait or Google Scholar profile. The introductory image is labeled as a research image and can be replaced with a supplied portrait later.

## Local development

Requires Node.js 24 or newer.

```sh
npm ci
npm run dev
```

Before a release:

```sh
npm run lint
npm run check
npm run audit:security
SITE_URL=https://cgchrfchscyrh.github.io npm run build
npm run preview -- --host 127.0.0.1 --port 4480
```

In a second terminal, run:

```sh
TEST_URL=http://127.0.0.1:4480 npm run test:a11y
```

Run `npx playwright install chromium` if the test browser is unavailable. Alternatively set `CHROME_PATH` to an installed Chromium executable.

## Hosting

The GitHub Actions workflow builds, checks dependencies, runs axe checks, and deploys the static site to GitHub Pages. The personal-site repository is `cgchrfchscyrh/cgchrfchscyrh.github.io`; it uses the domain root. The Pages source must be set to GitHub Actions. A repository subpath is also supported through `BASE_PATH` and the Pages workflow outputs.

## Accessibility and privacy

No UF logo, UF blue/orange theme, tracking scripts, remote fonts, autoplay, or external media embeds are used. At the owner's request, the footer contains only copyright and navigation links. The website does not publish the private address or telephone number from the original CV. It provides an HTML CV rather than redistributing an unreviewed document.

The axe script checks all four routes, desktop and 320 CSS-pixel layouts, text spacing, keyboard skip links, expandable descriptions, headings, and media. Automated checks do not establish complete WCAG or ADA compliance. See `reports/manual-review.md` and `reports/content-sources.md` for the scope and remaining limitations.
