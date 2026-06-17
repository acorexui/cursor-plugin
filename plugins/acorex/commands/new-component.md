---
name: new-component
description: Scaffold a new ACoreX UI component package with showcase case and secondary entry point
---

# New ACoreX Component

Scaffold a new component in the ACoreX UI monorepo.

## Steps

1. Ask the user for the component name in kebab-case (e.g. `tag-box`).

2. Use the **acorex-component-developer** skill and **secondary-entry-points-rules** to check for naming conflicts and existing similar components.

3. Create the package under `packages/components/<name>/`:
   - Component files in `src/lib/`
   - `ng-package.json` and `project.json`
   - Export from `packages/components/<name>/src/index.ts`
   - Register secondary entry point in the components package

4. Create showcase case at `apps/showcase/src/app/cases/<name>/`.

5. Build to verify:
   ```bash
   nx build components
   ```

6. Offer follow-up: documentation JSON, Storybook stories, or both.

## Naming conventions

- Folder: `kebab-case`
- Class: `AX<PascalCase>Component`
- Selector: `ax-<kebab-case>`
- Import: `@acorex/components/<kebab-case>`
