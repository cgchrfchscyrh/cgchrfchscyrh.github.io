# Pre-publication review

## Footer revision requested by the owner

On 6 October 2026, the owner explicitly requested removal of both footer paragraphs: the personal-site/UF disclaimer and the update-date/layout-credit line. The shared layout now retains only copyright, Accessibility, and Back to top on all four routes. The affiliation text in page content is unchanged. This request supersedes the earlier footer-disclaimer requirement in the initial release review below; the personal site's AGENTS.md and obsolete disclaimer assertion were updated accordingly.

The revised production build and lint passed. The pre-publication axe run passed all 13 scans and 62 remaining auxiliary checks with zero violations or failures. All four built HTML footers were inspected to confirm the requested text is absent.

The revision was deployed successfully by [Actions run 37496885117](https://github.com/cgchrfchscyrh/cgchrfchscyrh.github.io/actions/runs/37496885117), commit `088316c27c29f5f9e720ce0fb47a8798c0844917`. CI repeated the 13 scans and 62 checks successfully. Post-deployment verification confirmed the requested footer text is absent on all four live routes; 13 assets matched the local build, 79 links were inspected, and HTTPS, existing project links, and the custom 404 response passed. See `footer-update-deployment.json`, `ci/footer-update-axe.json`, and `live-deployment.json`.

## Initial release review

Reviewed on 6 October 2026 against the final local production build.

## Completed checks

- Astro/TypeScript check and production build: no errors, warnings, or hints.
- ESLint: passed.
- Dependency audit: zero vulnerabilities, including development dependencies. Removed the unused Markdown lint plugin that introduced the KaTeX advisory chain; no security exceptions are used.
- axe: 13 scans across the homepage, HTML CV, accessibility page, and 404 page; zero violations and zero incomplete items. Viewports include desktop and 320 CSS pixels, increased text spacing, and expanded figure descriptions.
- Auxiliary checks: 66 checks passed, including publication titles and full author lists on both the homepage and CV.
- Keyboard interaction: skip link is the first focusable control and moves focus to main content. Figure descriptions open with Enter and have visible focus. Navigation and resource actions use native links, with no custom or pointer-only controls.
- Visual review: desktop introduction, every research row, remaining publications, education, recognition, contact, CV publications, accessibility content, and footer inspected in rendered screenshots. Mobile introduction and research rows inspected. No observed horizontal overflow, clipped text, overlapping controls, or missing images.
- Reflow and text spacing: all four routes checked at 320 CSS pixels, including 1.5 line height, 0.12 em letter spacing, 0.16 em word spacing, and 2 em paragraph spacing. No horizontal overflow was detected.
- Contrast: neutral text palette checked by axe; text and controls use dark gray on off-white. Link text is underlined where surrounding prose could otherwise obscure its role. Results are explained in text and are not distinguished only by color.
- Media: only static research images; meaningful alt text and expandable descriptions provided. No audio, video, autoplay, carousel, or hover-only interaction.
- Attachments: a concise HTML CV is provided. The original CV remains unchanged and is not published. External paper links identify the relevant publication; external PDFs are not claimed to be accessible.
- Personal information: only professional affiliation, education, publications, awards, public profile links, and academic email are included. No private address or telephone number is published.
- Branding: neutral interface and personal initials favicon; no UF logo or UF blue/orange theme. University affiliation remains in text. All four pages retain the non-official-site and non-endorsement disclaimer.
- Security: static output, local fonts/assets, no analytics or third-party embeds, no forms or runtime API requests. A restrictive meta Content Security Policy and referrer policy are included.

## Limits and release status

This is not a complete ADA/WCAG certification or institutional branding approval. Screen-reader usability still requires a dedicated assistive-technology review. External publisher pages, project pages, PDF tagging, reading order, and equations were not comprehensively audited as part of this personal-site release.

Published with the user’s approval on 6 October 2026 at [cgchrfchscyrh.github.io](https://cgchrfchscyrh.github.io/). [GitHub Actions run 37495350713](https://github.com/cgchrfchscyrh/cgchrfchscyrh.github.io/actions/runs/37495350713) successfully deployed commit `49bc03d179661d64694ef3ca4e29ac8657b21e32` after the security audit, lint, type check, build, and accessibility checks passed.

Post-deployment validation covered four personal-site routes, four existing project links, 13 assets with checksums matching the local build, 83 links, canonical URLs, the custom 404 response, and HTTP-to-HTTPS redirection. The live browser run repeated all 13 axe scans and 66 auxiliary checks with zero violations or failures. Reports are saved in `ci/axe-wcag21aa.json`, `live-axe-wcag21aa.json`, `live-deployment.json`, and `deployment.json`.

An initial request for an image returned a transient 503 while the site was being checked. A subsequent complete resource verification passed. The browser checks also loaded every image successfully.

HTTPS enforcement and HSTS were verified. GitHub Pages controls HTTP response headers: no HTTP Content-Security-Policy, X-Frame-Options, or X-Content-Type-Options header was observed. The site's restrictive CSP and referrer policy are delivered in HTML meta elements. These limitations are recorded rather than represented as server header settings.
