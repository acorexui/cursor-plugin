---
name: acorex-storybook
description: Create and maintain Storybook stories for ACoreX components. Use when adding *.stories.ts files, configuring argTypes, or matching showcase page demos in Storybook.
---

# ACoreX Storybook

## When to use

- Creating `packages/components/<name>/src/lib/<name>.component.stories.ts`
- Updating Storybook after component API changes
- Fixing argTypes / args TypeScript errors in stories

## Workflow

1. **Read the showcase page** — Use `apps/showcase/src/app/cases/<name>/<name>.page.html` as the template reference.

2. **Create the stories file** next to the component:
   ```text
   packages/components/<name>/src/lib/<name>.component.stories.ts
   ```

3. **Meta configuration**:
   ```typescript
   const meta: Meta<AXComponentName> = {
     title: 'ComponentName',  // Human-readable, not class name
     component: AXComponentName,
     tags: ['autodocs'],
     // ...
   };
   ```

4. **Imports**:
   - Use `FormsModule` when binding with `ngModel`
   - Import decorator components by correct export name (e.g. `AXDecoratorClearButtonComponent`)
   - Import child components from their own files, not the parent component file

5. **argTypes** — Only include properties that exist on the component TypeScript type. Use `as any` for template-level properties (e.g. `allowClear`, size classes).

6. **Render pattern**:
   ```typescript
   render: (args) => ({
     props: args,
     imports: [FormsModule, AXComponentName],
     template: `...`,
   }),
   ```

7. **Run Storybook**:
   ```bash
   nx run components:storybook
   ```

## Common pitfalls

| Error | Fix |
| --- | --- |
| Module has no exported member | Check package `index.ts` for correct export name |
| Child not exported from parent | Import child from its own `.component.ts` file |
| Property does not exist in ArgTypes | Remove or use `as any` for template-only props |
| Wrong binding name | Use `value` in args with `[ngModel]="value"` |

## References

- Full rules: `rules/create-story-book.mdc`
- Storybook URL in docs: `rules/create-styorybook-json.mdc`
