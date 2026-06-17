---
name: acorex-tailwind-styling
description: Write styles using the ACoreX Tailwind theme from default.css. Use when creating layouts, custom CSS, Tailwind classes, theming, dark mode, surfaces, or semantic colors (primary, success, danger, etc.).
---

# ACoreX Tailwind Styling

## When to use

- Writing HTML templates with Tailwind classes
- Creating custom layouts, cards, pages, or wrappers around `ax-*` components
- Applying dark mode, surfaces, semantic colors, or typography
- Choosing correct color/look/size classes for component hosts

## Workflow

### 1. Read the theme guide

Start with `knowledge/theme/TAILWIND-GUIDE.md`, then `knowledge/theme/tailwind-theme.json` for full token lists.

When writing template markup, add section comments per **code-organization** (e.g. `<!-- Header -->`, `<!-- Form card -->`).

### 2. Choose the right token category

| Need | Use |
| --- | --- |
| Page/section background | `bg-lightest`, `bg-lighter`, `bg-surface`, `bg-default` |
| Text on surface | `text-on-lightest`, `text-on-lighter`, `text-on-surface`, `text-default` |
| Borders | `border-border-lightest`, `border-border-lighter`, `border-border-surface` |
| Brand / CTA | `bg-primary`, `text-on-primary`, `bg-primary-500` |
| Success / warning / danger | `bg-success`, `bg-warning-100`, `text-danger-800` |
| Subtle badge/chip | `bg-primary-100 text-primary-800` |
| Border radius | `rounded-default` |
| Spacing density | Parent class `ax-md` (or `ax-sm`, `ax-lg`) |

### Common token naming mistake

CSS variables end in `-surface` (e.g. `--ax-sys-color-lightest-surface`), but **Tailwind `@theme` tokens drop that suffix**:

| ❌ Wrong | ✅ Correct |
| --- | --- |
| `bg-lightest-surface` | `bg-lightest` |
| `bg-lighter-surface` | `bg-lighter` |
| `text-on-lightest-surface` | `text-on-lightest` |
| `border-border-lightest-surface` | `border-border-lightest` |
| `bg-success-lighter-surface` | `bg-success-lighter` |
| `text-success-surface` | `text-success` |
| `bg-success-surface` | `bg-success` or standalone `success-surface` utility |

Standalone `@utility` classes like `lightest-surface`, `success-surface`, `danger-lighter-surface` apply bg + text + border together — use them **without** `bg-`/`text-`/`border-` prefixes.

### 3. Component host pattern

For elements that should match ACoreX component styling:

```html
<div class="ax-md ax-default ax-solid ax-editor-container">
  <!-- inputs, custom content -->
</div>
```

### 4. Dark mode

```html
<html class="ax-dark">
  <div class="bg-darkest text-on-darkest dark:bg-darkest">
```

The `dark:` variant maps to `.ax-dark` context.

### 5. Cross-reference component blueprints

If styling around a specific component, read its blueprint `tokens` array:

```text
knowledge/docs/components/button/button.en-US.json → tokens
```

### 6. Full source when unsure

Read `knowledge/theme/default.css` for exact CSS variable values and `@utility` definitions.

## Palette reference

**Semantic:** primary, secondary, success, warning, danger

**Accents:** accent, accent1, accent2, accent3, accent4, accent5, accent6

**Each palette provides:**
- Shades: `{name}-50` … `{name}-950`
- Surface levels: `{name}-lightest` … `{name}-darkest`
- On-colors: `on-{name}`, `on-{name}-lightest`, etc.
- Borders: `border-{name}`, `border-{name}-lightest`, etc.

## Anti-patterns

- ❌ `bg-[#2b7fff]` or `color: #333`
- ❌ Bootstrap/Material color names not in theme
- ❌ `ngClass` with dynamic color strings — use theme utilities or component `color` input
- ❌ **Wrong:** `bg-lightest-surface`, `text-on-lightest-surface`, `border-border-lightest-surface`, `bg-success-lighter-surface`, `text-success-surface`
- ❌ **Wrong:** `bg-success-surface` (no such `bg-*` token — use `bg-success` or the `success-surface` shortcut utility alone)
- ✅ `bg-lightest text-on-lightest border-border-lightest`
- ✅ `bg-success-lighter/30 text-success`
- ✅ `success-surface` (shortcut utility on a host element — no `bg-`/`text-` prefix)
- ✅ `bg-primary text-on-primary`
- ✅ `ax-primary ax-solid` on component host
- ✅ Component `[color]="'primary'" [look]="'solid'"`

## Related

- Rule: `rules/tailwind-theme.mdc`
- Rule: `rules/code-organization.mdc`
- Setup: `knowledge/docs/get-started/tailwind-compatibility/tailwind-compatibility.en-US.json`
- Theming docs: `knowledge/docs/styles/theming/theming.en-US.json`
