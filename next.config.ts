import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

const uiRoot = path.join(process.cwd(), "src", "ui");

const availableThemes = readdirSync(uiRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name !== "shared")
  .map((entry) => entry.name)
  .filter((name) => existsSync(path.join(uiRoot, name, "index.ts")))
  .sort();

const requestedTheme = process.env.UI_THEME;
if (requestedTheme && !availableThemes.includes(requestedTheme)) {
  throw new Error(
    `Unknown UI theme "${requestedTheme}". Available themes: ${availableThemes.join(", ") || "none"}.`,
  );
}

const activeTheme = requestedTheme ?? availableThemes[0];
if (!activeTheme) {
  throw new Error("No UI themes found. Add one at src/ui/<theme-id>/index.ts.");
}

const themeEntry = path.join(uiRoot, activeTheme, "index.ts");
const turbopackThemeEntry = `./src/ui/${activeTheme}/index.ts`;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    resolveAlias: {
      ui: turbopackThemeEntry,
    },
  },
  webpack(config) {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      ui: themeEntry,
    };
    return config;
  },
};

export default nextConfig;
