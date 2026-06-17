---
name: acorex-component-developer
description: Build and extend ACoreX UI Angular components. Use when scaffolding components in packages/components, implementing mixins, SCSS design tokens, showcase cases, or secondary entry points.
---

# ACoreX Component Developer

## When to use

- Creating a new component under `packages/components/`
- Implementing or extending mixin-based inheritance (`extends classes(...)`)
- Adding showcase demos in `apps/showcase/src/app/cases/`
- Configuring secondary entry points in `packages/components/<name>/`
- Verifying SCSS design tokens in `_base.scss` and `color-looks/`

## Workflow

1. **Check existing packages first** — Read the secondary entry points rule. Prefer `@acorex/core`, `@acorex/cdk`, and existing `@acorex/components` over new implementations.

2. **Scaffold the component** — Follow the existing package layout:
   ```text
   packages/components/<component-name>/
   ├── src/
   │   ├── index.ts
   │   └── lib/
   │       ├── <component-name>.component.ts
   │       ├── <component-name>.component.html
   │       ├── <component-name>.component.scss
   │       └── styles/
   │           ├── _base.scss
   │           └── color-looks/
   ├── ng-package.json
   └── project.json
   ```

3. **Apply Angular standards** — Standalone components, signal `input()` / `output()`, `ChangeDetectionStrategy.OnPush`, native control flow (`@if`, `@for`), `inject()` for DI, host bindings in the `host` object (not `@HostBinding`).

4. **Trace inheritance** — Document all mixin/base class properties, events, and methods. Include defaults only when defined in code.

5. **Add showcase case** — Create `apps/showcase/src/app/cases/<component-name>/` with `.page.ts` and `.page.html` demonstrating usage sections.

6. **Build and verify**:
   ```bash
   nx build components
   nx run showcase:serve
   ```

## Key conventions

- Component selector: `ax-<kebab-name>`
- Export class: `AX<PascalName>Component`
- Import path: `@acorex/components/<kebab-name>`
- Do not set `standalone: true` in decorators (default in Angular 21+)
- Use `class` and `style` bindings, not `ngClass` / `ngStyle`

## References

- Angular rule: `rules/angular-rule.mdc`
- Secondary entry points: `rules/secondary-entry-points-rules.mdc`
- Nx tasks: `rules/nx-rules.mdc`
