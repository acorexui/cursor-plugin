---
name: acorex-component-docs
description: Generate bilingual (en-US / fa-IR) JSON documentation for ACoreX Angular components. Use when creating or updating component docs, design tokens, inheritance analysis, or syncing JSDoc with documentation.
---

# ACoreX Component Documentation

## When to use

- Creating `*.en-US.json` and `*.fa-IR.json` for a component
- Updating API docs after component changes
- Verifying design tokens against SCSS source files
- Adding Storybook `extraLinks` to documentation JSON

## Workflow

1. **Read the component source** — Analyze the class, mixin chain (`extends classes(...)`), SCSS files, and showcase page (`apps/showcase/src/app/cases/<name>/`).

2. **Follow the schema** — All JSON files must adhere to `apps/documentation/docs/document.schema.json`:
   ```json
   { "$schema": "../../document.schema.json" }
   ```

3. **Output location**:
   ```text
   apps/documentation/docs/components/<component-name>/
   ├── <component-name>.en-US.json
   └── <component-name>.fa-IR.json
   ```

4. **Required sections**:
   - `title`, `description` (translate accurately to Farsi for fa-IR)
   - `extraLinks` with Storybook URL: `https://storybook.acorex.io/?path=/docs/<component-name>--documentation`
   - `imports` — standalone component import only
   - `sections` — at minimum a "Usage" section
   - `types` — props, events, methods with inheritance notes
   - `designTokens` — verified against SCSS (actual default values, no SCSS syntax)

5. **Inheritance** — Add "Inherited from [ParentClass]" to all inherited props, events, and methods.

6. **Sync code** — Update component JSDoc, remove `@ignore` from documented methods, ensure types match.

## Validation checklist

- [ ] Both en-US and fa-IR files complete
- [ ] No empty `props`, `events`, or `methods` arrays
- [ ] Links use URL paths (`/en-US/docs/...`), not file paths
- [ ] Design tokens match default SCSS values
- [ ] Farsi title and description are real translations

## References

- Full rules: `rules/component-docs-rules.mdc`
- Storybook links: `rules/create-styorybook-json.mdc`
- Event docs: `rules/event-docs-rules.mdc`
- Shared types: `rules/shared-types-rules.mdc`
