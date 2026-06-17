#!/usr/bin/env node
/**
 * Sync documentation blueprints from apps/documentation/docs into the plugin knowledge base.
 * Copies all *.en-US.json files and document.schema.json.
 *
 * Run from repository root: node ACorex-plugin/scripts/sync-docs.mjs
 */
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../..');
const srcDocs = join(repoRoot, 'apps', 'documentation', 'docs');
const dstKnowledge = join(repoRoot, 'ACorex-plugin', 'plugins', 'acorex', 'knowledge', 'docs');
const dstSchema = join(repoRoot, 'ACorex-plugin', 'plugins', 'acorex', 'knowledge', 'document.schema.json');

const CATEGORIES = ['components', 'cdk', 'core', 'charts', 'styles', 'types', 'events', 'tokens', 'get-started'];

function walkEnUsJson(dir, files = []) {
  if (!existsSync(dir)) {
    return files;
  }
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walkEnUsJson(full, files);
    } else if (entry.name.endsWith('.en-US.json')) {
      files.push(full);
    }
  }
  return files;
}

function copyFile(src, dst) {
  mkdirSync(dirname(dst), { recursive: true });
  cpSync(src, dst, { force: true });
}

if (!existsSync(srcDocs)) {
  console.error(`Source docs not found: ${srcDocs}`);
  process.exit(1);
}

mkdirSync(dstKnowledge, { recursive: true });

const schemaSrc = join(srcDocs, 'document.schema.json');
if (existsSync(schemaSrc)) {
  copyFile(schemaSrc, dstSchema);
}

const files = walkEnUsJson(srcDocs);
let copied = 0;
let totalBytes = 0;

for (const src of files) {
  const rel = relative(srcDocs, src);
  const dst = join(dstKnowledge, rel);
  copyFile(src, dst);
  copied++;
  totalBytes += statSync(src).size;
}

const meta = {
  syncedAt: new Date().toISOString(),
  source: 'apps/documentation/docs',
  locale: 'en-US',
  fileCount: copied,
  categories: CATEGORIES,
};

writeFileSync(
  join(repoRoot, 'ACorex-plugin', 'plugins', 'acorex', 'knowledge', 'meta.json'),
  JSON.stringify(meta, null, 2),
  'utf8',
);

console.log(`Synced ${copied} en-US doc(s) (${(totalBytes / 1024 / 1024).toFixed(2)} MB) → knowledge/docs/`);
