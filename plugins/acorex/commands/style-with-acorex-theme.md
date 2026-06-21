---
name: style-with-acorex-theme
description: Style UI using the ACoreX Tailwind theme tokens from default.css
---

# Style with ACoreX Theme

Apply ACoreX design system styling using the embedded Tailwind theme.

## Steps

1. Invoke the **acorex-tailwind-styling** skill.

2. Read `knowledge/theme/TAILWIND-GUIDE.md` and `knowledge/theme/tailwind-theme.json`.

3. For the user's UI request, choose:
   - Layout surfaces (`bg-lightest`, `bg-surface`, etc.)
   - Semantic colors (`primary`, `success`, `danger`, etc.)
   - Component host classes (`ax-md ax-primary ax-solid`)
   - Dark mode (`ax-dark`, `dark:` variants with surface level reversal — `bg-lighter dark:bg-darker`, `bg-lightest dark:bg-darkest`, etc.)

4. If using `ax-*` components, also read the component blueprint for `tokens` and `color`/`look` props.

5. Output templates using only theme-backed Tailwind utilities — no hardcoded colors.

6. **Never use `-surface` as a Tailwind utility suffix** (`bg-lightest-surface` is wrong). Use `bg-lightest`, `text-on-lightest`, `border-border-lightest`. Reserve `-surface` for standalone shortcut utilities only (`success-surface`, `lightest-surface`).

7. **Always reverse surface levels for dark mode** — pair `lightest↔darkest`, `lighter↔darker`, `light↔dark` (and matching `on-*` / `border-*` tokens) using `dark:` variants. See `rules/tailwind-theme.mdc` for the full table.

## Quick examples

| Request | Classes |
| --- | --- |
| White card on gray page | `bg-lighter dark:bg-darker` page + `bg-lightest dark:bg-darkest border border-border-lightest dark:border-border-darkest rounded-default p-4` card |
| Primary CTA area | `bg-primary text-on-primary p-6` |
| Success alert | `bg-success-50 text-success-900 border border-success-200` |
| Dense form | Wrap in `ax-sm`; inputs use `ax-default ax-solid` |
