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

### 2. Choose the right token category

| Need | Use |
| --- | --- |
| Page/section background | `bg-lightest`, `bg-surface`, `bg-default` |
| Text on surface | `text-on-lightest`, `text-on-surface`, `text-default` |
| Borders | `border-border-lightest`, `border-border-surface` |
| Brand / CTA | `bg-primary`, `text-on-primary`, `bg-primary-500` |
| Success / warning / danger | `bg-success`, `bg-warning-100`, `text-danger-800` |
| Subtle badge/chip | `bg-primary-100 text-primary-800` |
| Border radius | `rounded-default` |
| Spacing density | Parent class `ax-md` (or `ax-sm`, `ax-lg`) |

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
- ✅ `bg-primary text-on-primary`
- ✅ `ax-primary ax-solid` on component host
- ✅ Component `[color]="'primary'" [look]="'solid'"`

## Related

- Rule: `rules/tailwind-theme.mdc`
- Setup: `knowledge/docs/get-started/tailwind-compatibility/tailwind-compatibility.en-US.json`
- Theming docs: `knowledge/docs/styles/theming/theming.en-US.json`
