# ACoreX Cursor Plugin

Cursor plugin for [ACoreX UI](https://acorex.io) with **368 embedded documentation blueprints**.

## What the agent knows

When you ask to use an ACoreX component, the agent reads official JSON blueprints from `knowledge/docs/`:

```text
knowledge/docs/components/button/button.en-US.json
```

Each blueprint includes:

- **imports** — `import { AXButtonComponent } from '@acorex/components/button'`
- **sections** — usage patterns with showcase demo paths
- **types** — props, events, methods with types and defaults
- **tokens** — CSS custom properties for theming
- **extraLinks** — Storybook documentation URLs

## Quick lookup

| Need | Read |
| --- | --- |
| Find a component | `knowledge/index.json` or `knowledge/CATALOG.md` |
| Full API for button | `knowledge/docs/components/button/button.en-US.json` |
| Overlay CDK | `knowledge/docs/cdk/overlay/overlay.en-US.json` |
| Translation service | `knowledge/docs/core/translation/translation.en-US.json` |
| Event types | `knowledge/docs/events/` |
| Shared types | `knowledge/docs/types/` |

## Usage in chat

```
/use-acorex-component
```

Or invoke `/acorex-component-usage` and ask:

> "Implement a data table with sorting and pagination using ACoreX"

## Sync blueprints (maintainers)

From monorepo root:

```bash
node cursor-plugin/scripts/sync-all.mjs
```

## Install locally

```bash
ln -s "$(pwd)" ~/.cursor/plugins/local/acorex
```

Reload Cursor.

## Publish

See [PUBLISH.md](../../PUBLISH.md) in the plugin root.
