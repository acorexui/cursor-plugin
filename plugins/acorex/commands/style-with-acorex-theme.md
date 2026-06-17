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
   - Dark mode (`ax-dark`, `dark:` variants)

4. If using `ax-*` components, also read the component blueprint for `tokens` and `color`/`look` props.

5. Output templates using only theme-backed Tailwind utilities — no hardcoded colors.

## Quick examples

| Request | Classes |
| --- | --- |
| White card on gray page | `bg-lightest border border-border-lightest rounded-default p-4` |
| Primary CTA area | `bg-primary text-on-primary p-6` |
| Success alert | `bg-success-50 text-success-900 border border-success-200` |
| Dense form | Wrap in `ax-sm`; inputs use `ax-default ax-solid` |
