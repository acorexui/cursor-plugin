---
name: build-packages
description: Build ACoreX UI packages using Nx
---

# Build ACoreX Packages

Build one or more ACoreX packages with Nx.

## Steps

1. Determine scope from user request:
   - **All packages**: `npm run build:packages`
   - **Components only**: `nx build components`
   - **Core**: `nx build core`
   - **CDK**: `nx build cdk`
   - **Charts**: `nx build charts`
   - **Showcase**: `nx run showcase:build`
   - **Documentation**: `nx run documentation:build`
   - **Storybook static**: `nx run components:build-storybook`

2. Use `nx_workspace` to check project graph if the target is unclear.

3. Run the build and report errors. Fix TypeScript or SCSS issues in the affected package.

4. For affected builds after local changes:
   ```bash
   nx affected -t build
   ```

## Common scripts (package.json)

| Script | Command |
| --- | --- |
| `build:packages` | core + cdk + charts + components |
| `storybook` | `nx run components:storybook` |
| `start:showcase` | showcase dev server on port 4400 |
| `start:doc` | documentation dev server on port 5000 |
