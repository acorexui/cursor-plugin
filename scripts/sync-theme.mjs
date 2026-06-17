#!/usr/bin/env node
/**
 * Sync ACoreX Tailwind theme assets into the plugin knowledge base.
 *
 * Run from repository root: node ACorex-plugin/scripts/sync-theme.mjs
 */
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../..');
const stylesPkg = join(repoRoot, 'packages', 'styles');
const dstTheme = join(repoRoot, 'ACorex-plugin', 'plugins', 'acorex', 'knowledge', 'theme');

const SOURCES = [
  { src: join(stylesPkg, 'themes', 'default.css'), dst: 'default.css' },
  { src: join(stylesPkg, 'tailwind-base.js'), dst: 'tailwind-base.js' },
];

if (!existsSync(join(stylesPkg, 'themes', 'default.css'))) {
  console.error('Theme source not found: packages/styles/themes/default.css');
  process.exit(1);
}

mkdirSync(dstTheme, { recursive: true });

let copied = 0;
for (const { src, dst } of SOURCES) {
  if (!existsSync(src)) {
    console.warn(`Skipping missing file: ${src}`);
    continue;
  }
  cpSync(src, join(dstTheme, dst), { force: true });
  copied++;
}

writeFileSync(
  join(dstTheme, 'meta.json'),
  JSON.stringify(
    {
      syncedAt: new Date().toISOString(),
      source: 'packages/styles/themes/default.css',
      tailwindVersion: 4,
      preset: '@acorex/styles/tailwind-base.js',
      importPath: "@import '@acorex/styles/themes/default.css';",
    },
    null,
    2,
  ),
  'utf8',
);

console.log(`Synced ${copied} theme file(s) → knowledge/theme/`);
