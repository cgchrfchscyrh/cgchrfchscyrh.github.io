import { defineConfig } from "astro/config";

// The Pages workflow provides the site origin and repository base path.
export default defineConfig({
  output: "static",
  site: process.env.SITE_URL || undefined,
  base: process.env.BASE_PATH || "/",
  // Project pages that moved to the AIRIS Lab account in November 2026 redirect there,
  // including the older addresses of renamed pages.
  redirects: {
    "/agentic-robotics_surgeons": "https://shuaili90.github.io/agentic-robotics_surgeons/",
    "/architected-structures": "https://shuaili90.github.io/architected-structures/",
    "/digitaltwin_healthybuilding": "https://shuaili90.github.io/digitaltwin_healthybuilding/",
    "/disease-resistant-school-communities": "https://shuaili90.github.io/disease-resistant-school-communities/",
    "/surgery-ai": "https://shuaili90.github.io/agentic-robotics_surgeons/",
    "/healthy-built-environments": "https://shuaili90.github.io/digitaltwin_healthybuilding/",
    // Project addresses used in the PDF CV and earlier links.
    "/humanoid-hoisting": "https://shuaili90.github.io/humanoid-hoisting/",
    "/humanoid_roofing": "https://shuaili90.github.io/humanoid_roofing/",
    "/humanoid_roofing_webpage": "https://shuaili90.github.io/humanoid_roofing/",
    "/mixed_traffic": "https://shuaili90.github.io/mixed_traffic/",
    "/wind-aware-air-mobility": "https://shuaili90.github.io/wind-aware-air-mobility/",
    "/eVTOL_webpage": "https://shuaili90.github.io/wind-aware-air-mobility/",
    // The CV is published as a PDF; the former HTML edition's address leads to it.
    "/cv": "/Songyang_Liu_CV.pdf",
  },
});
