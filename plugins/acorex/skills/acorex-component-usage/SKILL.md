---
name: acorex-component-usage
description: Look up and apply ACoreX component documentation blueprints. Use when implementing UI with @acorex/components, @acorex/cdk, @acorex/core, or @acorex/charts — finding imports, props, events, usage sections, and design tokens.
---

# ACoreX Component Usage

## When to use

- User asks to build UI with ACoreX components
- Choosing which `@acorex/*` package or component to use
- Finding correct imports, props, events, or CSS tokens
- Implementing patterns like forms, dialogs, data tables, pickers, etc.

## Workflow

### 1. Discover

Search `knowledge/index.json` by keyword:

```json
// Example: find "tag box"
// entries[].title, entries[].name, entries[].description
```

Or scan `knowledge/CATALOG.md` for a quick list.

### 2. Load blueprint

Read the full JSON for the artifact:

```text
knowledge/docs/components/tag-box/tag-box.en-US.json
knowledge/docs/cdk/overlay/overlay.en-US.json
knowledge/docs/core/translation/translation.en-US.json
```

### 3. Extract implementation details

From the blueprint JSON:

| Field | Use for |
| --- | --- |
| `imports` | Exact TypeScript import lines |
| `description` | Component purpose and capabilities |
| `sections` | Available usage patterns; `showcasePath` for demo reference |
| `types[].props` | `@Input()` / signal inputs with types and defaults |
| `types[].events` | `@Output()` events and when they fire |
| `types[].methods` | Public methods (focus, validate, open, etc.) |
| `tokens` | CSS variables for theming |
| `hints` | Important warnings or tips |
| `extraLinks` | Storybook documentation URL |

### 4. Implement

- Use imports exactly as documented
- Apply props and events from the blueprint API
- Match section patterns (Usage first, then advanced sections)
- Use `ChangeDetectionStrategy.OnPush`, signals, and standalone components per `angular-rule`
- For related types/events, read linked blueprints under `knowledge/docs/types/` and `knowledge/docs/events/`

### 5. Verify

Inside the monorepo:

```bash
nx build components
nx run showcase:serve
```

## Example: using Tag Box

1. Read `knowledge/docs/components/tag-box/tag-box.en-US.json`
2. Import: `import { AXTagBoxComponent } from '@acorex/components/tag-box';`
3. Check sections: Usage, Auto Complete, Custom Templates, Header/Footer Templates
4. Apply props like `value`, `allowDuplicate`, `placeholder` from `types[].props`
5. Wire `onValueChanged` from `types[].events`

## Combining multiple components

For complex UI (e.g. form with select-box + validation + dialog):

1. Load blueprint for each component involved
2. Load related types (`knowledge/docs/types/`)
3. Load related events (`knowledge/docs/events/`)
4. Check `secondary-entry-points-rules` for shared services

## Monorepo showcase reference

When `showcasePath` is `tag-box/usage`, inspect:

```text
apps/showcase/src/app/cases/tag-box/
```

This contains the live HTML/TS implementation behind the documentation demo.
