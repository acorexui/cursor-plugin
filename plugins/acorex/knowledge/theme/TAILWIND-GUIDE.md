# ACoreX Tailwind Theme Guide

> Auto-generated from `packages/styles/themes/default.css`. Full source: `knowledge/theme/default.css`

## Setup

```css
/* styles.css — Tailwind v4 */
@import '@acorex/styles/themes/default.css';
```

```js
// tailwind.config.js — Tailwind v3 legacy preset
export default {
  presets: [require('@acorex/styles/tailwind-base.js')],
  content: ['./src/**/*.{html,ts}'],
};
```

Import `@acorex/styles` in your project. See `knowledge/docs/get-started/tailwind-compatibility/tailwind-compatibility.en-US.json`.

## Dark mode

- Add `ax-dark` class on `<html>` to enable dark theme
- Custom variant: `dark:` maps to `.ax-dark` descendants

### Surface level reversal (required)

When using surface-level tokens (`lightest`, `lighter`, `light`, and their `on-*` / `border-*` counterparts) in custom markup, **always pair each light token with its inverted dark counterpart** via `dark:`:

| Light (default) | Dark (`dark:`) |
| --- | --- |
| `lightest` | `darkest` |
| `lighter` | `darker` |
| `light` | `dark` |
| `on-lightest` | `on-darkest` |
| `on-lighter` | `on-darker` |
| `border-lightest` | `border-darkest` |
| `border-lighter` | `border-darker` |

Applies to neutral and semantic palettes: `bg-primary-lighter` → `dark:bg-primary-darker`, `danger-lighter-surface` → `dark:danger-darker-surface`, etc.

```html
<!-- Page shell -->
<div class="bg-lighter dark:bg-darker text-on-lightest dark:text-on-darkest">

<!-- Card on page -->
<div class="bg-lightest dark:bg-darkest border border-border-lightest dark:border-border-darkest">

<!-- Semantic tint -->
<div class="bg-primary-lighter/30 dark:bg-primary-darker/30 text-primary">

<!-- Shortcut utility -->
<div class="lightest-surface dark:darkest-surface">
```

Shade steps (`primary-500`, `secondary-500`) and base semantic tokens (`bg-primary`, `text-primary`) adapt automatically via CSS variables under `ax-dark` — no reversal needed.

## Size scale (apply on container or component)

| Class | Use |
| --- | --- |
| `ax-xs` | Extra small density |
| `ax-sm` | Small |
| `ax-md` | Medium (default) |
| `ax-lg` | Large |
| `ax-xl` | Extra large |

## Color context (pair with looks on components)

`ax-default` · `ax-primary` · `ax-secondary` · `ax-success` · `ax-warning` · `ax-danger` · `ax-surface` · `ax-accent` · `ax-accent1`–`ax-accent6`

## Looks (visual style)

| Look | Description |
| --- | --- |
| `ax-solid` / `ax-solid-interactive` | Filled background with border |
| `ax-outline` / `ax-outline-interactive` | Transparent with border |
| `ax-twotone` / `ax-twotone-interactive` | Two-tone fill |
| `ax-flat` | Flat bottom border style |
| `ax-fill` | Filled input style |
| `ax-blank` / `ax-blank-interactive` | Minimal / link style |

Combine: `class="ax-md ax-primary ax-solid"`

## States

`ax-state-disabled` · `ax-state-readonly` · `ax-state-selected` · `ax-state-loading`

## Tailwind color utilities (@theme tokens)

Use standard Tailwind utilities — tokens resolve to ACoreX CSS variables.

### Neutral surfaces

```html
<div class="bg-lightest dark:bg-darkest text-on-lightest dark:text-on-darkest border-border-lightest dark:border-border-darkest">...</div>
<div class="bg-lighter dark:bg-darker text-on-lighter dark:text-on-darker border-border-lighter dark:border-border-darker">...</div>
<div class="bg-surface text-on-surface border-border-surface">...</div>
<div class="bg-darkest text-on-darkest border-border-darkest">...</div>
```

> **Note:** Use `bg-lightest`, not `bg-lightest-surface`. The `-surface` suffix exists on CSS variables and on standalone shortcut utilities (`lightest-surface`), not on `bg-*` / `text-*` / `border-*` Tailwind prefixes.

### Semantic palettes (50–950 + surfaces)

```html
<div class="bg-primary text-on-primary">Primary</div>
<div class="bg-success-100 text-success-800">Success badge</div>
<div class="bg-danger text-on-danger">Danger</div>
<div class="bg-warning-lightest text-on-warning-lightest">Warning alert</div>
```

Palettes: **primary**, **secondary**, **success**, **warning**, **danger**, **surface**, **accent**, **accent1**–**accent6**

Each palette has:
- Shades: `{name}-50` … `{name}-950`
- Surfaces: `{name}-lightest`, `{name}-lighter`, `{name}-light`, `{name}`, `{name}-dark`, `{name}-darker`, `{name}-darkest`
- On-colors: `on-{name}-lightest`, `on-{name}`, etc.
- Borders: `border-{name}-lightest`, `border-{name}`, etc.

### Defaults

| Utility | Token |
| --- | --- |
| `bg-default` | Page background |
| `text-default` / `text` | Default text |
| `border-default` | Default border |
| `rounded-default` | `var(--ax-sys-border-radius)` |

### Common token naming mistake

| ❌ Wrong | ✅ Correct |
| --- | --- |
| `bg-lightest-surface` | `bg-lightest` |
| `text-on-lightest-surface` | `text-on-lightest` |
| `border-border-lightest-surface` | `border-border-lightest` |
| `bg-success-lighter-surface` | `bg-success-lighter` |
| `text-success-surface` | `text-success` |
| `bg-success-surface` | `bg-success` or `success-surface` (shortcut utility) |

## Typography utilities

`h1`–`h6` · `heading` · `heading-start` · `heading-center` · `heading-end` · `subtitle` · `links`

## Surface shortcut utilities

Standalone `@utility` classes (apply bg + text + border — **do not** prefix with `bg-`/`text-`/`border-`):

`lightest-surface` · `lighter-surface` · `light-surface` · `surface` · `dark-surface` · `darker-surface` · `darkest-surface` · `primary-lightest-surface` · `primary-lighter-surface` · `success-surface` · `danger-lighter-surface` · …

Full list in `knowledge/theme/tailwind-theme.json` → `surfaceUtilities`.

## System CSS variables

Key tokens (use in custom CSS or `bg-[...]` arbitrary values):

| Variable | Purpose |
| --- | --- |
| `--ax-sys-border-radius` | Default border radius (0.5rem) |
| `--ax-sys-size-base` | Base component size (2.5rem) |
| `--ax-sys-body-font-size` | Body font size (1rem) |
| `--ax-sys-transition-duration` | Transition duration (150ms) |
| `--ax-sys-color-{name}` | RGB triplet for rgba() usage |

## Rules for the agent

1. **Never hardcode hex colors** — use theme tokens (`bg-primary`, `text-on-surface`, etc.)
2. **Never append `-surface` to `bg-` / `text-` / `border-` utilities** — `@theme` maps `--color-lightest` (not `--color-lightest-surface`). Use `bg-lightest`, `text-on-lightest`, `border-border-lightest`.
3. **Use `-surface` suffix only on standalone shortcut utilities** — e.g. `class="success-surface"` or `class="lightest-surface"`, not `bg-success-surface`.
4. **Match component API** — use `color` and `look` inputs on `ax-*` components; use Tailwind utilities for layout/custom markup
5. **Read component tokens** — check `tokens` in component blueprint JSON for `--ax-comp-*` variables
6. **Dark mode** — always pair surface-level tokens with reversed `dark:` variants (see [Surface level reversal](#surface-level-reversal-required)); shade steps and base semantic tokens adapt via CSS variables
7. **Full reference** — read `knowledge/theme/tailwind-theme.json` and `knowledge/theme/default.css`

## Structured data

- `knowledge/theme/tailwind-theme.json` — parsed tokens, utilities, patterns (432 color tokens, 147 utilities)
- `knowledge/theme/default.css` — complete theme source
- `knowledge/theme/tailwind-base.js` — Tailwind v3 preset
