#!/usr/bin/env node
/**
 * Build a searchable index from synced documentation blueprints.
 *
 * Run from repository root: node ACorex-plugin/scripts/build-knowledge-index.mjs
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../..');
const knowledgeDocs = join(repoRoot, 'ACorex-plugin', 'plugins', 'acorex', 'knowledge', 'docs');
const indexPath = join(repoRoot, 'ACorex-plugin', 'plugins', 'acorex', 'knowledge', 'index.json');
const catalogPath = join(repoRoot, 'ACorex-plugin', 'plugins', 'acorex', 'knowledge', 'CATALOG.md');

function walkJson(dir, files = []) {
  if (!existsSync(dir)) {
    return files;
  }
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walkJson(full, files);
    } else if (entry.name.endsWith('.en-US.json')) {
      files.push(full);
    }
  }
  return files;
}

function extractApiSections(sections = []) {
  return sections
    .filter((s) => s.content?.type === 'api' && s.content?.data)
    .map((s) => ({
      title: s.title,
      description: stripHtml(s.description ?? ''),
      showcasePath: s.content.data,
    }));
}

function stripHtml(text) {
  return text.replace(/<[^>]+>/g, '').trim();
}

function summarizeProps(types = []) {
  const props = [];
  for (const api of types) {
    for (const prop of api.props ?? []) {
      props.push(prop.name);
    }
  }
  return props.slice(0, 20);
}

function summarizeEvents(types = []) {
  const events = [];
  for (const api of types) {
    for (const event of api.events ?? []) {
      events.push(event.name);
    }
  }
  return events;
}

if (!existsSync(knowledgeDocs)) {
  console.error(`Knowledge docs not found. Run sync-docs.mjs first.`);
  process.exit(1);
}

const entries = [];
const files = walkJson(knowledgeDocs);

for (const file of files) {
  const rel = relative(knowledgeDocs, file).replace(/\\/g, '/');
  const parts = rel.split('/');
  const category = parts.length >= 2 ? parts[0] : 'root';
  const name = parts.length >= 2 ? basename(file, '.en-US.json') : basename(file, '.en-US.json');

  let doc;
  try {
    doc = JSON.parse(readFileSync(file, 'utf8'));
  } catch {
    console.warn(`Skipping invalid JSON: ${rel}`);
    continue;
  }

  entries.push({
    category,
    name,
    title: doc.title ?? name,
    description: doc.description ?? '',
    imports: doc.imports ?? [],
    status: doc.status ?? null,
    path: `knowledge/docs/${rel}`,
    sections: extractApiSections(doc.sections),
    props: summarizeProps(doc.types),
    events: summarizeEvents(doc.types),
    storybook: doc.extraLinks?.find((l) => l.icon === 'icon-storybook')?.href ?? null,
  });
}

entries.sort((a, b) => {
  const cat = a.category.localeCompare(b.category);
  return cat !== 0 ? cat : a.title.localeCompare(b.title);
});

const index = {
  generatedAt: new Date().toISOString(),
  total: entries.length,
  byCategory: Object.fromEntries(
    [...new Set(entries.map((e) => e.category))].map((cat) => [
      cat,
      entries.filter((e) => e.category === cat).length,
    ]),
  ),
  entries,
};

writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf8');

// Human/agent-readable catalog (components + cdk + core + charts only — most used for implementation)
const implementationCategories = new Set(['components', 'cdk', 'core', 'charts']);
const catalogLines = [
  '# ACoreX Component & Package Catalog',
  '',
  `Generated from ${entries.length} documentation blueprints. Use \`knowledge/index.json\` for full search.`,
  '',
  'When implementing UI, read the blueprint JSON for the component before writing code.',
  '',
];

for (const cat of ['components', 'cdk', 'core', 'charts', 'types', 'events', 'styles', 'tokens', 'get-started']) {
  const items = entries.filter((e) => e.category === cat);
  if (items.length === 0) continue;

  catalogLines.push(`## ${cat} (${items.length})`, '');

  for (const item of items) {
    if (!implementationCategories.has(cat) && cat !== 'types' && cat !== 'events') {
      continue;
    }
    const imp = item.imports[0] ?? '(see blueprint)';
    catalogLines.push(`- **${item.title}** (\`${item.name}\`) — ${imp}`);
    if (item.description) {
      catalogLines.push(`  ${item.description.slice(0, 120)}${item.description.length > 120 ? '…' : ''}`);
    }
  }
  catalogLines.push('');
}

writeFileSync(catalogPath, catalogLines.join('\n'), 'utf8');

console.log(`Built index with ${entries.length} entries → knowledge/index.json`);
console.log(`Built catalog → knowledge/CATALOG.md`);
