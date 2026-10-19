#!/usr/bin/env node

import { spawn } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const uiRoot = path.join(projectRoot, "src", "ui");
const nextBin = path.join(projectRoot, "node_modules", "next", "dist", "bin", "next");

function listThemes() {
  return readdirSync(uiRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name !== "shared")
    .map((entry) => entry.name)
    .filter((name) => existsSync(path.join(uiRoot, name, "index.ts")))
    .sort()
    .map((id) => {
      const metaPath = path.join(uiRoot, id, "theme.json");
      let meta = {};
      if (existsSync(metaPath)) {
        try {
          meta = JSON.parse(readFileSync(metaPath, "utf8"));
        } catch {
          meta = {};
        }
      }
      return {
        id,
        label: typeof meta.label === "string" ? meta.label : id,
        description: typeof meta.description === "string" ? meta.description : "",
      };
    });
}

const [command = "dev", ...args] = process.argv.slice(2);
const themes = listThemes();

if (command === "list" || command === "--list") {
  if (themes.length === 0) {
    console.error("No UI themes found under src/ui.");
    process.exit(1);
  }
  console.log("Available UI themes:");
  for (const theme of themes) {
    console.log(`  ${theme.id.padEnd(8)} ${theme.label}${theme.description ? ` - ${theme.description}` : ""}`);
  }
  process.exit(0);
}

if (!["dev", "build", "start"].includes(command)) {
  console.error(`Unknown command "${command}".`);
  console.error("Usage: node scripts/ui.mjs <dev|build|start|list> [theme] [next args]");
  process.exit(1);
}

if (themes.length === 0) {
  console.error("No UI themes found. Add one at src/ui/<theme-id>/index.ts.");
  process.exit(1);
}

const explicitTheme = args[0] && !args[0].startsWith("-") ? args[0] : undefined;
const themeId = explicitTheme ?? process.env.UI_THEME ?? themes[0].id;
const theme = themes.find((item) => item.id === themeId);

if (!theme) {
  console.error(`Unknown UI theme "${themeId}".`);
  console.error(`Available themes: ${themes.map((item) => item.id).join(", ")}.`);
  process.exit(1);
}

if (!existsSync(nextBin)) {
  console.error("Next.js is not installed. Run npm install first.");
  process.exit(1);
}

const nextArgs = explicitTheme ? [command, ...args.slice(1)] : [command, ...args];

console.log(`Using UI theme "${theme.id}" (${theme.label}).`);

const child = spawn(process.execPath, [nextBin, ...nextArgs], {
  stdio: "inherit",
  env: { ...process.env, UI_THEME: theme.id },
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
