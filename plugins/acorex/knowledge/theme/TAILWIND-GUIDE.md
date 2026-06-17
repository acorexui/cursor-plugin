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
<div class="bg-lightest text-on-lightest border-border-lightest">...</div>
<div class="bg-surface text-on-surface border-border-surface">...</div>
<div class="bg-darkest text-on-darkest border-border-darkest">...</div>
```

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

## Typography utilities

`h1`–`h6` · `heading` · `heading-start` · `heading-center` · `heading-end` · `subtitle` · `links`

## Surface shortcut utilities

`primary-lightest-surface` · `primary-lighter-surface` · `primary-light-surface` · `primary-surface` · `primary-dark-surface` · `primary-darker-surface` · `primary-darkest-surface` · `secondary-lightest-surface` · `secondary-lighter-surface` · `secondary-light-surface` · `secondary-surface` · `secondary-dark-surface` …

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
2. **Match component API** — use `color` and `look` inputs on `ax-*` components; use Tailwind utilities for layout/custom markup
3. **Read component tokens** — check `tokens` in component blueprint JSON for `--ax-comp-*` variables
4. **Dark mode** — always consider `dark:` / `ax-dark` variants
5. **Full reference** — read `knowledge/theme/tailwind-theme.json` and `knowledge/theme/default.css`

## Structured data

- `knowledge/theme/tailwind-theme.json` — parsed tokens, utilities, patterns (432 color tokens, 147 utilities)
- `knowledge/theme/default.css` — complete theme source
- `knowledge/theme/tailwind-base.js` — Tailwind v3 preset
