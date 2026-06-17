---
name: generate-component-docs
description: Generate bilingual en-US and fa-IR JSON documentation for an ACoreX component
---

# Generate Component Documentation

Generate or update JSON documentation for an ACoreX component.

## Steps

1. Ask which component to document (kebab-case folder name).

2. Invoke the **acorex-component-docs** skill workflow.

3. Analyze:
   - `packages/components/<name>/src/lib/*.component.ts` (and mixin chain)
   - SCSS in `src/lib/styles/`
   - Showcase at `apps/showcase/src/app/cases/<name>/`
   - Schema at `apps/documentation/docs/document.schema.json`

4. Create or update:
   - `apps/documentation/docs/components/<name>/<name>.en-US.json`
   - `apps/documentation/docs/components/<name>/<name>.fa-IR.json`

5. Include Storybook `extraLinks` per **create-styorybook-json** rule.

6. Sync JSDoc in the component source to match the documentation.

7. Validate JSON syntax and run documentation app if requested:
   ```bash
   nx run documentation:serve --port 5000
   ```
