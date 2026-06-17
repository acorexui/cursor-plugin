# ACoreX Cursor Plugins

Official [Cursor plugin](https://cursor.com/docs/plugins) marketplace for [ACoreX UI](https://acorex.io) development.

This plugin educates Cursor with **368 documentation blueprints** and the **Tailwind v4 theme** from `packages/styles/themes/default.css` — so the agent writes styles using ACoreX design tokens.

## Plugins

| Plugin | Description |
| --- | --- |
| [acorex](./plugins/acorex/) | Component blueprints + Tailwind theme + Angular/Nx standards |

## Quick start — local testing

Per the [Cursor plugins docs](https://cursor.com/docs/plugins#creating-plugins):

```powershell
# Windows
New-Item -ItemType SymbolicLink `
  -Path "$env:USERPROFILE\.cursor\plugins\local\acorex" `
  -Target "c:\path\to\acorex-ui-workspace\ACorex-plugin\plugins\acorex"
```

```bash
# macOS / Linux
ln -s /path/to/acorex-ui-workspace/ACorex-plugin/plugins/acorex ~/.cursor/plugins/local/acorex
```

Reload Cursor (**Developer: Reload Window**), then try:

- `/use-acorex-component` — look up and implement a component
- `/acorex-component-usage` — skill for blueprint-guided development
- `/style-with-acorex-theme` — style UI with theme tokens
- Ask: *"Build a dashboard card with primary accent using ACoreX theme"*

## Sync from monorepo

When documentation or rules change:

```bash
# From repository root
node ACorex-plugin/scripts/sync-all.mjs
```

This runs:

1. `sync-rules.mjs` — `.cursor/rules` → plugin rules
2. `sync-docs.mjs` — `apps/documentation/docs/*.en-US.json` → `knowledge/docs/`
3. `build-knowledge-index.mjs` — builds `knowledge/index.json` + `CATALOG.md`
4. `sync-theme.mjs` — `packages/styles/themes/default.css` → `knowledge/theme/`
5. `build-theme-knowledge.mjs` — builds `tailwind-theme.json` + `TAILWIND-GUIDE.md`

## Knowledge base

```text
plugins/acorex/knowledge/
├── index.json              # Searchable catalog (368 entries)
├── CATALOG.md              # Quick reference
├── document.schema.json    # Doc JSON schema
├── meta.json               # Sync metadata
├── theme/
│   ├── default.css         # Full Tailwind v4 theme (source of truth)
│   ├── tailwind-base.js    # Tailwind v3 preset
│   ├── tailwind-theme.json # 432 color tokens, 147 utilities (parsed)
│   └── TAILWIND-GUIDE.md   # Agent styling quick reference
└── docs/
    ├── components/         # 92 component blueprints
    ├── cdk/                # 14 CDK blueprints
    ├── core/               # 18 core package blueprints
    ├── charts/             # 6 chart blueprints
    ├── types/              # 166 type blueprints
    ├── events/             # 61 event blueprints
    ├── styles/             # 5 style guides
    └── tokens/             # Design tokens
```

Each blueprint JSON contains the official API reference the agent uses when implementing UI.

## Repository layout

```text
ACorex-plugin/
├── .cursor-plugin/marketplace.json
├── PUBLISH.md
├── plugins/acorex/
│   ├── knowledge/          # Docs blueprints + Tailwind theme
│   ├── rules/
│   ├── skills/
│   ├── commands/
│   └── agents/
└── scripts/
    ├── sync-all.mjs
    ├── sync-rules.mjs
    ├── sync-docs.mjs
    ├── sync-theme.mjs
    ├── build-knowledge-index.mjs
    └── build-theme-knowledge.mjs
```

## Publishing

See **[PUBLISH.md](./PUBLISH.md)** for the full checklist.

1. Run `node ACorex-plugin/scripts/sync-all.mjs`
2. Push `ACorex-plugin/` to a public Git repository
3. Submit at [cursor.com/marketplace/publish](https://cursor.com/marketplace/publish)

## What's included (v0.3.0)

### Knowledge

- **368 en-US documentation blueprints** from `apps/documentation/docs`
- **Tailwind v4 theme** from `packages/styles/themes/default.css`
- **432 color tokens** and **147 utilities** in `tailwind-theme.json`

### Rules

| Rule | Mode | Purpose |
| --- | --- | --- |
| `component-blueprints` | Always | How to use doc blueprints |
| `tailwind-theme` | Always | Theme tokens and styling rules |
| `angular-rule` | Always | Angular 21+ patterns |
| `nx-rules` | Always | Nx workspace tasks |
| `secondary-entry-points-rules` | Always | `@acorex/*` import catalog |
| `acorex-overview` | Always | Monorepo layout |
| `component-docs-rules` | On demand | Generate docs JSON |
| `create-story-book` | On demand | Storybook stories |

### Skills

| Skill | Purpose |
| --- | --- |
| `/acorex-tailwind-styling` | Style with theme tokens |
| `/acorex-component-usage` | Apply blueprints when building UI |
| `/acorex-component-developer` | Scaffold new components |
| `/acorex-component-docs` | Generate bilingual docs |
| `/acorex-storybook` | Create Storybook stories |

### Commands

| Command | Purpose |
| --- | --- |
| `/style-with-acorex-theme` | Style UI with theme tokens |
| `/use-acorex-component` | Look up and implement from blueprints |
| `/new-component` | Scaffold a package component |
| `/generate-component-docs` | Generate documentation |
| `/build-packages` | Nx package builds |

## License

MIT — same as the ACoreX UI workspace.
