# Accessibility review

## Detailed excavator and beach video — 27 October 2026

The opening coastal clip now uses the supplied Excavator02 appearance model from the local Unity project, retargeted in Isaac Sim with a concept clamp, and sand textures plus complete beach-rock meshes exported from the local Unreal project. Six new placements form a seven-module segment beside the shoreline. Retraction timing and the wider machine's distance from the assembly row were revised. Cast shadows and ambient occlusion remain disabled. The joint and geometry-comparison clips are unchanged.

The 1080p silent movie passed full decoding, frame-count and duration checks. All 1,608 visual linkage frames were checked for continuity; original source files and earlier renders remain unchanged. This new appearance rig does not inherit the prior model's manufacturer joint-limit claims. Grasp forces, contact, complete collision avoidance, insertion fit, load capacity and coastal performance remain unvalidated. Only derived media are published; editable scenes and raw assets stay local.

The poster, media cache version, full text alternative, source notes, and 50 timed visual-description cues were updated together. Native controls, keyboard focus, viewport playback, reduced-motion/data-saving preferences and manual pause persistence are retained, without adding caption blocks beneath the player. Build, lint and security audit passed. The browser suite passed **32 axe scans and 315 functional checks**, with zero violations or failures. Desktop and 320 CSS-pixel views were manually inspected. See `reports/coastal-realistic-review.json` and `reports/axe-wcag21aa.json`.

These checks do not constitute complete ADA/WCAG certification. Existing PDF and multi-screen-reader review limitations remain.

## Coastal Isaac Sim video revision — 27 October 2026

The three coastal videos now use Isaac Sim 5.1.0 RTX rendering at 1920 × 1080 and 24 frames per second. The opening sequence shows six continuous placements beside a starter module. Cast shadows and ambient occlusion are disabled, with native-resolution antialiasing and no motion blur. All three clips retain an embedded kinematic-concept label, native controls, full linked text alternatives, and reviewed timed WebVTT descriptions. Media version URLs prevent earlier cached MuJoCo assets from being reused with the new descriptions. No visible caption blocks have been added below the players.

The three MP4s passed full decode, frame-count, duration, and audio-track checks. Scene assets resolve locally; the portable USD archive passed integrity checks. The original eleven source meshes remain unchanged. The prescribed arm motion stays within the original URDF joint limits, but contact, force-based grasping, collision-free planning, insertion fit, structural strength, and coastal performance are not validated. Editable scenes and raw CAD remain local; only derived media are deployed.

Build, lint, and dependency audit passed with zero reported vulnerabilities. The browser suite passed **32 axe scans and 315 functional checks**, with no violations or failures. Desktop and 320 CSS-pixel views were manually inspected. The audit now waits for DOM readiness, decoded images, and a playable video frame instead of network idleness, since video range requests may remain active. Keyboard playback, manual pause persistence, reduced-motion and data-saving preferences, text spacing, and reflow checks passed. See `reports/coastal-isaac-review.json` and `reports/axe-wcag21aa.json`.

These checks do not constitute complete ADA/WCAG certification. Existing PDF reading-order and multi-screen-reader review limitations remain.

## Light vision presentation — 27 October 2026

Vision sections now share the surrounding light page background, dark type, and dark SVG linework. Evidence imagery uses a white surface; focus outlines, concept badges, and diagram relationships remain visible without relying on color. On Building Immunology, all 18 figure captions and adjacent scope notes are consolidated in the end-of-page source disclosure. Each image retains its alternative text and links to its complete description through aria-describedby. Full-size image links, source credits, complete framework composition, and face redaction are preserved.

Build, lint, dependency security audit, and the existing browser suite passed: **32 axe scans and 302 functional checks**, with no violations or failures. Desktop and 320 CSS-pixel layouts were reviewed. Original media and attachments are unchanged. Existing PDF and screen-reader limitations still apply; this is not full ADA/WCAG certification.


## Visual vision review — 27 October 2026

The project opening now uses a compact display headline while the formal paper title, author information, and citations remain intact. Each Vision section presents existing research imagery, three specific gaps paired with collaborating disciplines, and an original SVG drawing of a future system. Solid current-evidence badges and dashed “Future concept” badges distinguish demonstrated scope from proposed integration. The diagrams have concise image alternatives and a complete text equivalent; mobile layouts follow a top-to-bottom path. Original source figures remain available in keyboard-operable disclosures where applicable.

Build, lint, and security audit passed (zero reported dependency vulnerabilities). The updated browser suite passed **32 axe scans and 321 functional checks**, with zero violations or failures. Desktop views and 320 CSS-pixel layouts were inspected in the browser; all eight project headlines and vision maps fit without horizontal overflow. Native media controls, reduced-motion and data-saving preferences, manual-pause persistence, source credits, and media alternatives remain in place. See `reports/vision-review.json` and `reports/axe-wcag21aa.json`. No original attachment or research media was edited.

These checks do not constitute complete ADA/WCAG certification. PDF reading order, scientific-image legibility at every magnification, and multi-screen-reader usability still need separate review. The implementation does not claim clinical, field, or complete-system validation for future concepts.


## Current review — 27 October 2026

This revision replaces introductory topic subtitles with a title-led opening, removes visible text beneath each video, and connects a concrete research task to a larger collaborative vision. Full silent-video alternatives remain linked through `aria-describedby`, with timed WebVTT descriptions and complete descriptions/credits consolidated in the end-of-page media notes. Native controls, viewport playback, remembered manual pauses, reduced-motion and data-saving preferences remain available.

The current build and lint pass. The browser suite passed **32 axe scans and 319 functional checks**, with zero violations and errors. Desktop and 320 CSS-pixel layouts were visually reviewed after loading all figures. Dependency audit reports zero vulnerabilities. Original media and paper assets are unchanged. See `reports/story-review.json` and `reports/axe-wcag21aa.json`. This current review supersedes earlier descriptions of per-player captions or the previous section structure.

Automated checks are not complete ADA/WCAG certification. External PDF reading order, detailed scientific-artwork contrast, and multi-screen-reader usability still require separate review.



## Coastal CAD motion videos — 27 October 2026

Three silent MuJoCo clips now show excavator placement, primitive TPMS alignment, and three module families. Each includes an embedded kinematic-concept label, a complete linked text alternative, timed WebVTT descriptions, a poster, and native keyboard-operable playback controls. Viewport autoplay respects reduced motion, SaveData, and manual pause. No caption block is added beneath the videos. Existing concept imagery and original research materials are retained.

All three MP4 files were fully decoded and checked for dimensions, frame count, duration, and absence of audio. The original URDF arm limits and prescribed end-effector positions were checked along the path. Contact/grasp forces, insertion fit, collision-free planning, load capacity, and coastal performance are not validated by these visualizations. The clamp is newly added concept geometry. Raw CAD is not published.

Build, lint, and the dependency audit passed with zero reported vulnerabilities. The project browser suite passed 32 axe scans and 315 functional checks with no violations or failures. Desktop and 320 CSS-pixel layouts were inspected, including native video controls. See `reports/coastal-simulation-review.json` and `reports/axe-wcag21aa.json`. These checks do not constitute complete ADA/WCAG certification; the existing PDF and screen-reader limitations remain.
