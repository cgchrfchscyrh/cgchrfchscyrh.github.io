# Pre-publication review

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

The local website is ready for review. Public deployment has not yet been performed. After publishing, verify HTTPS, root/subpath routing, internal links, all assets, and actual security response headers. GitHub Pages controls HTTP response headers; the source does not claim headers that have not been observed on the deployed site.
