#!/usr/bin/env node
/**
 * Full plugin sync: rules + documentation blueprints + knowledge index.
 *
 * Run from repository root: node ACorex-plugin/scripts/sync-all.mjs
 */
import { spawnSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const scriptsDir = __dirname;

const steps = ['sync-rules.mjs', 'sync-docs.mjs', 'build-knowledge-index.mjs', 'sync-theme.mjs', 'build-theme-knowledge.mjs'];

for (const script of steps) {
  console.log(`\n▶ ${script}`);
  const result = spawnSync(process.execPath, [join(scriptsDir, script)], {
    stdio: 'inherit',
    cwd: resolve(__dirname, '../..'),
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log('\n✓ Plugin sync complete. Reload Cursor to pick up changes.');
