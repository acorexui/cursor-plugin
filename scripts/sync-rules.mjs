#!/usr/bin/env node
/**
 * Sync .cursor/rules/*.mdc into ACorex-plugin/plugins/acorex/rules/
 * Applies plugin-compatible YAML frontmatter (description + alwaysApply).
 *
 * Run from repository root: node ACorex-plugin/scripts/sync-rules.mjs
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../..');
const srcDir = join(repoRoot, '.cursor', 'rules');
const dstDir = join(repoRoot, 'ACorex-plugin', 'plugins', 'acorex', 'rules');

/** Plugin frontmatter overrides keyed by filename */
const FRONTMATTER = {
  'angular-rule.mdc': {
    description:
      'Modern Angular and TypeScript best practices for ACoreX UI — signals, standalone components, control flow, and OnPush change detection.',
    alwaysApply: true,
  },
  'nx-rules.mdc': {
    description:
      'Nx monorepo guidelines for the ACoreX UI workspace — use nx tools for tasks, generators, and project graph analysis.',
    alwaysApply: true,
  },
  'secondary-entry-points-rules.mdc': {
    description:
      'Comprehensive reference of all @acorex/* secondary entry points — always prefer existing packages over new implementations.',
    alwaysApply: true,
  },
  'component-docs-rules.mdc': {
    description:
      'Generate bilingual JSON documentation for ACoreX Angular components — schema adherence, inheritance analysis, and design token verification.',
    alwaysApply: false,
  },
  'create-story-book.mdc': {
    description:
      'Create Storybook stories for ACoreX Angular components — argTypes, imports, showcase templates, and validation checklist.',
    alwaysApply: false,
  },
  'create-styorybook-json.mdc': {
    description: 'Add Storybook extraLinks to component documentation JSON files (en-US and fa-IR).',
    alwaysApply: false,
  },
  'event-docs-rules.mdc': {
    description: 'Generate bilingual JSON documentation for ACoreX shared event interfaces and types.',
    alwaysApply: false,
  },
  'shared-types-rules.mdc': {
    description:
      'Generate bilingual JSON documentation for ACoreX shared interfaces and type aliases under the types category.',
    alwaysApply: false,
  },
  'unified-docs-and-cases-rule.mdc': {
    description:
      'Verify and review unified documentation and demo cases for ACoreX Angular artifacts (components, directives, services, pipes).',
    alwaysApply: false,
  },
  'FULL-CONTROL-OVER-AI.mdc': {
    description: 'Require user confirmation before modifying code, configs, dependencies, or project structure.',
    alwaysApply: false,
  },
};

function stripFrontmatter(content) {
  // Cursor "Rule Name:" format
  const ruleNameMatch = content.match(/^Rule Name:[\s\S]*?^---\s*\n/m);
  if (ruleNameMatch) {
    return content.slice(ruleNameMatch.index + ruleNameMatch[0].length);
  }

  // YAML frontmatter
  if (content.startsWith('---\n')) {
    const end = content.indexOf('\n---\n', 4);
    if (end !== -1) {
      return content.slice(end + 5);
    }
  }

  return content;
}

function dedupeAngularRule(body) {
  if (!body.includes('You are an expert in TypeScript, Angular')) {
    return body;
  }
  const marker = '\n  You are an expert in TypeScript, Angular';
  const idx = body.indexOf(marker);
  if (idx !== -1) {
    return body.slice(0, idx).trimEnd() + '\n';
  }
  return body;
}

function applyFrontmatter(file, body) {
  const meta = FRONTMATTER[file];
  if (!meta) {
    return body;
  }

  let content = body;
  if (file === 'angular-rule.mdc') {
    content = dedupeAngularRule(content);
  }

  if (file === 'secondary-entry-points-rules.mdc') {
    const critical =
      '**CRITICAL USAGE INSTRUCTION**: When building features, components, or functionality in this workspace, ALWAYS use components, services, directives, pipes, and utilities from the @acorex library packages documented below. DO NOT create new implementations or use external libraries if equivalent functionality exists in @acorex packages.';
    if (!content.includes('CRITICAL USAGE INSTRUCTION')) {
      content = `${critical}\n\n${content}`;
    }
    content = content.replace('# Secondary Entry Points Reference\n\n## Overview', '## Overview');
  }

  const yaml = ['---', `description: ${meta.description}`, `alwaysApply: ${meta.alwaysApply}`, '---', ''].join(
    '\n',
  );

  return yaml + content.trimStart();
}

if (!existsSync(srcDir)) {
  console.error(`Source not found: ${srcDir}`);
  process.exit(1);
}

mkdirSync(dstDir, { recursive: true });

const files = readdirSync(srcDir).filter((f) => f.endsWith('.mdc'));
let synced = 0;

for (const file of files) {
  const raw = readFileSync(join(srcDir, file), 'utf8');
  const body = stripFrontmatter(raw);
  const output = applyFrontmatter(file, body);
  writeFileSync(join(dstDir, file), output, 'utf8');
  synced++;
}

// Plugin-only overview rule (not synced from .cursor/rules)
const overviewPath = join(dstDir, 'acorex-overview.mdc');
if (!existsSync(overviewPath)) {
  writeFileSync(
    overviewPath,
    `---
description: ACoreX UI workspace overview — monorepo layout, package structure, and where to find components, docs, showcase, and Storybook.
alwaysApply: true
---

# ACoreX UI Workspace

[ACoreX](https://acorex.io) is an Angular component library distributed as \`@acorex/*\` packages.

## Monorepo layout

| Path | Purpose |
| --- | --- |
| \`packages/components/\` | UI components (\`@acorex/components/<name>\`) |
| \`packages/core/\` | Core services and utilities (\`@acorex/core\`) |
| \`packages/cdk/\` | Component dev kit (\`@acorex/cdk\`) |
| \`packages/charts/\` | Chart components (\`@acorex/charts\`) |
| \`apps/showcase/\` | Interactive component demos |
| \`apps/documentation/\` | Bilingual docs site (en-US / fa-IR) |

## Development servers

\`\`\`bash
npm run start:showcase   # port 4400
npm run start:doc        # port 5000
npm run storybook        # components Storybook
\`\`\`

## Build commands

\`\`\`bash
npm run build:packages   # core + cdk + charts + components
nx build components
nx affected -t build
\`\`\`

## Before building new functionality

1. Check **secondary-entry-points-rules** for existing \`@acorex/*\` exports.
2. Follow **angular-rule** for component implementation.
3. Use **nx-rules** — run tasks through \`nx\`, not raw CLI.
4. Add docs via **component-docs-rules** and Storybook via **create-story-book**.

## Links

- Docs: https://acorex.io
- Storybook: https://storybook.acorex.io
- npm registry: https://npm.acorex.io
`,
    'utf8',
  );
}

console.log(`Synced ${synced} rule(s) → ACorex-plugin/plugins/acorex/rules`);
