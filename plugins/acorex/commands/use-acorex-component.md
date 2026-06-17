---
name: use-acorex-component
description: Look up an ACoreX component blueprint and implement it correctly using the plugin knowledge base
---

# Use ACoreX Component

Find and apply the official ACoreX documentation blueprint for a component or package.

## Steps

1. Ask which component or feature the user needs (or infer from context).

2. Invoke the **acorex-component-usage** skill.

3. Search `knowledge/index.json` for matching entries by `name`, `title`, or keywords in `description`.

4. Read the blueprint at `knowledge/docs/{category}/{name}/{name}.en-US.json`.

5. Present to the user:
   - Import statement(s)
   - Key props and events
   - Relevant usage sections
   - Storybook link if available

6. Implement the feature using the blueprint API. If inside the monorepo, cross-check `apps/showcase/src/app/cases/` for the `showcasePath` demos.

7. Organize generated `.html` / `.ts` per **code-organization** (section comments + `//#region` tags).

8. For related types or events referenced in the blueprint, load those JSON files too.

## Examples

| User request | Blueprint path |
| --- | --- |
| "Add a data table" | `knowledge/docs/components/data-table/data-table.en-US.json` |
| "Use overlay CDK" | `knowledge/docs/cdk/overlay/overlay.en-US.json` |
| "Add translation" | `knowledge/docs/core/translation/translation.en-US.json` |
| "Show a dialog" | `knowledge/docs/components/dialog/dialog.en-US.json` |
