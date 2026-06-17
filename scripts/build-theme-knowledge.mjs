#!/usr/bin/env node
/**
 * Parse default.css and generate structured Tailwind theme knowledge for the agent.
 *
 * Run from repository root: node ACorex-plugin/scripts/build-theme-knowledge.mjs
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../..');
const themeDir = join(repoRoot, 'ACorex-plugin', 'plugins', 'acorex', 'knowledge', 'theme');
const cssPath = join(themeDir, 'default.css');

if (!existsSync(cssPath)) {
  console.error('Run sync-theme.mjs first.');
  process.exit(1);
}

const css = readFileSync(cssPath, 'utf8');

function extractBlock(content, startPattern, endChar = '}') {
  const start = content.search(startPattern);
  if (start === -1) return '';
  const open = content.indexOf('{', start);
  if (open === -1) return '';

  let depth = 0;
  for (let i = open; i < content.length; i++) {
    if (content[i] === '{') depth++;
    if (content[i] === '}') {
      depth--;
      if (depth === 0) return content.slice(open + 1, i);
    }
  }
  return '';
}

function parseVariables(block) {
  const vars = {};
  const re = /(--[\w-]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = re.exec(block)) !== null) {
    vars[m[1]] = m[2].trim();
  }
  return vars;
}

function parseUtilities(content) {
  const utilities = [];
  const re = /@utility\s+([\w-]+)\s*\{/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    utilities.push(m[1]);
  }
  return utilities;
}

function groupVariables(vars) {
  const groups = {
    system: {},
    surfaces: {},
    palettes: {},
    coloredSurfaces: {},
    accents: {},
    other: {},
  };

  for (const [key, value] of Object.entries(vars)) {
    if (
      key.includes('-lightest-surface') ||
      key.includes('-lighter-surface') ||
      key.includes('-light-surface') ||
      (key.includes('-surface') && !key.match(/-\d+$/))
    ) {
      if (key.match(/primary|secondary|success|warning|danger|accent/)) {
        groups.coloredSurfaces[key] = value;
      } else if (!key.match(/primary|secondary|success|warning|danger|accent/)) {
        groups.surfaces[key] = value;
      }
    } else if (key.match(/-(50|100|200|300|400|500|600|700|800|900|950)$/)) {
      const palette = key.match(/--ax-sys-color-(\w+)-\d+/)?.[1] ?? 'unknown';
      groups.palettes[palette] ??= {};
      groups.palettes[palette][key] = value;
    } else if (key.startsWith('--ax-sys-')) {
      groups.system[key] = value;
    } else {
      groups.other[key] = value;
    }
  }

  return groups;
}

function parseThemeTokens(block) {
  const tokens = [];
  const re = /(--color-[\w-]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = re.exec(block)) !== null) {
    const name = m[1].replace('--color-', '');
    const tailwind = inferTailwindClasses(name);
    tokens.push({ token: m[1], name, value: m[2].trim(), tailwind });
  }
  return tokens;
}

function inferTailwindClasses(colorName) {
  const classes = [];
  if (colorName.startsWith('on-')) {
    classes.push(`text-${colorName}`, `text-${colorName}/<opacity>`);
  } else if (colorName.startsWith('border-')) {
    classes.push(`border-${colorName.replace(/^border-/, '')}`, `border-${colorName}`);
  } else {
    classes.push(`bg-${colorName}`, `text-${colorName}`, `border-${colorName}`);
    classes.push(`bg-${colorName}/<opacity>`, `text-${colorName}/<opacity>`, `border-${colorName}/<opacity>`);
  }
  return [...new Set(classes)];
}

const rootBlock = extractBlock(css, /:root\s*\{/);
const darkBlock = extractBlock(css, /html\.ax-dark\s*\{/);
const themeBlock = extractBlock(css, /@theme\s+inline\s*\{/);

const rootVars = parseVariables(rootBlock);
const darkVars = parseVariables(darkBlock);
const themeTokens = parseThemeTokens(themeBlock);
const utilities = parseUtilities(css);

const COLOR_CONTEXTS = [
  'ax-default',
  'ax-primary',
  'ax-secondary',
  'ax-success',
  'ax-warning',
  'ax-danger',
  'ax-surface',
  'ax-accent',
  'ax-accent1',
  'ax-accent2',
  'ax-accent3',
  'ax-accent4',
  'ax-accent5',
  'ax-accent6',
];

const LOOKS = [
  'ax-solid',
  'ax-solid-interactive',
  'ax-outline',
  'ax-outline-interactive',
  'ax-twotone',
  'ax-twotone-interactive',
  'ax-flat',
  'ax-fill',
  'ax-blank',
  'ax-blank-interactive',
];

const SIZES = ['ax-xs', 'ax-sm', 'ax-md', 'ax-lg', 'ax-xl'];

const SURFACE_UTILITIES = utilities.filter((u) => u.endsWith('-surface') && !u.startsWith('ax-'));

const themeKnowledge = {
  generatedAt: new Date().toISOString(),
  source: 'packages/styles/themes/default.css',
  tailwindVersion: 4,
  setup: {
    cssImport: "@import '@acorex/styles/themes/default.css';",
    tailwindV3Preset: "presets: [require('@acorex/styles/tailwind-base.js')]",
    darkMode: "Add class `ax-dark` on <html> (custom variant: @custom-variant dark (&:where(.ax-dark, .ax-dark *)))",
    docs: 'knowledge/docs/get-started/tailwind-compatibility/tailwind-compatibility.en-US.json',
  },
  sizes: SIZES,
  colorContexts: COLOR_CONTEXTS,
  looks: LOOKS,
  states: ['ax-state-disabled', 'ax-state-readonly', 'ax-state-selected', 'ax-state-loading'],
  typography: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'heading', 'heading-start', 'heading-center', 'heading-end', 'subtitle', 'links'],
  layout: ['tabs-fit', 'max-w-8xl', 'card', 'surface', 'lightest-surface', 'lighter-surface', 'light-surface', 'dark-surface', 'darker-surface', 'darkest-surface'],
  systemVariables: groupVariables(rootVars),
  darkModeOverrides: darkVars,
  themeColorTokens: themeTokens,
  surfaceUtilities: SURFACE_UTILITIES,
  allUtilities: utilities,
  patterns: [
    {
      name: 'Component with color, look, and size',
      example: '<div class="ax-md ax-primary ax-solid">...</div>',
      description: 'Apply size on container; color context + look on component host.',
    },
    {
      name: 'Neutral surface layout',
      example: '<div class="bg-lightest text-on-lightest border border-border-lightest p-4">...</div>',
      description: 'Use @theme surface tokens via Tailwind bg/text/border utilities.',
    },
    {
      name: 'Semantic colored block',
      example: '<div class="bg-primary text-on-primary border border-primary p-4 rounded-default">...</div>',
      description: 'Primary palette surface with matching on-color and border.',
    },
    {
      name: 'Palette shade',
      example: '<span class="bg-primary-100 text-primary-800">Badge</span>',
      description: 'Use 50–950 palette steps: primary, secondary, success, warning, danger, surface, accent, accent1–6.',
    },
    {
      name: 'Dark mode',
      example: '<html class="ax-dark"> ... <div class="bg-darkest text-on-darkest">...</div>',
      description: 'Toggle ax-dark on html; surface tokens invert automatically.',
    },
    {
      name: 'Editor / input focus ring',
      example: '<div class="ax-default ax-solid ax-editor-container">...</div>',
      description: 'Editor containers get primary focus ring via ax-editor-container modifier.',
    },
  ],
  colorTokenGroups: {
    neutralSurfaces: ['lightest', 'lighter', 'light', 'surface', 'dark', 'darker', 'darkest'],
    semanticPalettes: ['primary', 'secondary', 'success', 'warning', 'danger'],
    accentPalettes: ['accent', 'accent1', 'accent2', 'accent3', 'accent4', 'accent5', 'accent6'],
    surfaceSuffixes: ['lightest', 'lighter', 'light', 'surface', 'dark', 'darker', 'darkest'],
    onPrefix: 'on-{name} for foreground on a surface',
    borderPrefix: 'border-{name} for borders on a surface',
  },
};

writeFileSync(join(themeDir, 'tailwind-theme.json'), JSON.stringify(themeKnowledge, null, 2), 'utf8');

const guide = `# ACoreX Tailwind Theme Guide

> Auto-generated from \`packages/styles/themes/default.css\`. Full source: \`knowledge/theme/default.css\`

## Setup

\`\`\`css
/* styles.css — Tailwind v4 */
@import '@acorex/styles/themes/default.css';
\`\`\`

\`\`\`js
// tailwind.config.js — Tailwind v3 legacy preset
export default {
  presets: [require('@acorex/styles/tailwind-base.js')],
  content: ['./src/**/*.{html,ts}'],
};
\`\`\`

Import \`@acorex/styles\` in your project. See \`knowledge/docs/get-started/tailwind-compatibility/tailwind-compatibility.en-US.json\`.

## Dark mode

- Add \`ax-dark\` class on \`<html>\` to enable dark theme
- Custom variant: \`dark:\` maps to \`.ax-dark\` descendants

## Size scale (apply on container or component)

| Class | Use |
| --- | --- |
| \`ax-xs\` | Extra small density |
| \`ax-sm\` | Small |
| \`ax-md\` | Medium (default) |
| \`ax-lg\` | Large |
| \`ax-xl\` | Extra large |

## Color context (pair with looks on components)

\`ax-default\` · \`ax-primary\` · \`ax-secondary\` · \`ax-success\` · \`ax-warning\` · \`ax-danger\` · \`ax-surface\` · \`ax-accent\` · \`ax-accent1\`–\`ax-accent6\`

## Looks (visual style)

| Look | Description |
| --- | --- |
| \`ax-solid\` / \`ax-solid-interactive\` | Filled background with border |
| \`ax-outline\` / \`ax-outline-interactive\` | Transparent with border |
| \`ax-twotone\` / \`ax-twotone-interactive\` | Two-tone fill |
| \`ax-flat\` | Flat bottom border style |
| \`ax-fill\` | Filled input style |
| \`ax-blank\` / \`ax-blank-interactive\` | Minimal / link style |

Combine: \`class="ax-md ax-primary ax-solid"\`

## States

\`ax-state-disabled\` · \`ax-state-readonly\` · \`ax-state-selected\` · \`ax-state-loading\`

## Tailwind color utilities (@theme tokens)

Use standard Tailwind utilities — tokens resolve to ACoreX CSS variables.

### Neutral surfaces

\`\`\`html
<div class="bg-lightest text-on-lightest border-border-lightest">...</div>
<div class="bg-surface text-on-surface border-border-surface">...</div>
<div class="bg-darkest text-on-darkest border-border-darkest">...</div>
\`\`\`

### Semantic palettes (50–950 + surfaces)

\`\`\`html
<div class="bg-primary text-on-primary">Primary</div>
<div class="bg-success-100 text-success-800">Success badge</div>
<div class="bg-danger text-on-danger">Danger</div>
<div class="bg-warning-lightest text-on-warning-lightest">Warning alert</div>
\`\`\`

Palettes: **primary**, **secondary**, **success**, **warning**, **danger**, **surface**, **accent**, **accent1**–**accent6**

Each palette has:
- Shades: \`{name}-50\` … \`{name}-950\`
- Surfaces: \`{name}-lightest\`, \`{name}-lighter\`, \`{name}-light\`, \`{name}\`, \`{name}-dark\`, \`{name}-darker\`, \`{name}-darkest\`
- On-colors: \`on-{name}-lightest\`, \`on-{name}\`, etc.
- Borders: \`border-{name}-lightest\`, \`border-{name}\`, etc.

### Defaults

| Utility | Token |
| --- | --- |
| \`bg-default\` | Page background |
| \`text-default\` / \`text\` | Default text |
| \`border-default\` | Default border |
| \`rounded-default\` | \`var(--ax-sys-border-radius)\` |

## Typography utilities

\`h1\`–\`h6\` · \`heading\` · \`heading-start\` · \`heading-center\` · \`heading-end\` · \`subtitle\` · \`links\`

## Surface shortcut utilities

${SURFACE_UTILITIES.slice(0, 12).map((u) => `\`${u}\``).join(' · ')} …

Full list in \`knowledge/theme/tailwind-theme.json\` → \`surfaceUtilities\`.

## System CSS variables

Key tokens (use in custom CSS or \`bg-[...]\` arbitrary values):

| Variable | Purpose |
| --- | --- |
| \`--ax-sys-border-radius\` | Default border radius (0.5rem) |
| \`--ax-sys-size-base\` | Base component size (2.5rem) |
| \`--ax-sys-body-font-size\` | Body font size (1rem) |
| \`--ax-sys-transition-duration\` | Transition duration (150ms) |
| \`--ax-sys-color-{name}\` | RGB triplet for rgba() usage |

## Rules for the agent

1. **Never hardcode hex colors** — use theme tokens (\`bg-primary\`, \`text-on-surface\`, etc.)
2. **Match component API** — use \`color\` and \`look\` inputs on \`ax-*\` components; use Tailwind utilities for layout/custom markup
3. **Read component tokens** — check \`tokens\` in component blueprint JSON for \`--ax-comp-*\` variables
4. **Dark mode** — always consider \`dark:\` / \`ax-dark\` variants
5. **Full reference** — read \`knowledge/theme/tailwind-theme.json\` and \`knowledge/theme/default.css\`

## Structured data

- \`knowledge/theme/tailwind-theme.json\` — parsed tokens, utilities, patterns (${themeTokens.length} color tokens, ${utilities.length} utilities)
- \`knowledge/theme/default.css\` — complete theme source
- \`knowledge/theme/tailwind-base.js\` — Tailwind v3 preset
`;

writeFileSync(join(themeDir, 'TAILWIND-GUIDE.md'), guide, 'utf8');

console.log(
  `Built theme knowledge: ${themeTokens.length} color tokens, ${utilities.length} utilities → knowledge/theme/tailwind-theme.json`,
);
