import { defineConfig } from "astro/config";

// The Pages workflow provides the site origin and repository base path.
export default defineConfig({
  output: "static",
  site: process.env.SITE_URL || undefined,
  base: process.env.BASE_PATH || "/",
  // Project pages renamed in November 2026 keep their old addresses as redirects.
  redirects: { "/surgery-ai": "/agentic-robotics_surgeons/", "/healthy-built-environments": "/digitaltwin_healthybuilding/" },
});
