# Publishing the ACoreX Cursor Plugin

Follow this checklist to publish the plugin to the [Cursor Marketplace](https://cursor.com/marketplace/publish).

## Pre-publish checklist

- [ ] Run full sync from monorepo root:
  ```bash
  node cursor-plugin/scripts/sync-all.mjs
  ```
- [ ] Verify `knowledge/index.json` lists **368** entries
- [ ] Test locally (see [README.md](./README.md#quick-start--local-testing))
- [ ] Confirm rules, skills, and commands load in **Cursor Settings → Rules**
- [ ] Try `/use-acorex-component` or `/acorex-component-usage` in chat
- [ ] Ask the agent to implement a component (e.g. "use ax-button") and verify it reads blueprints

## Repository options

### Option A — Standalone plugin repository (recommended for marketplace)

The marketplace expects a public Git repository. Publish `cursor-plugin/` as its own repo:

```bash
# Create a new repo (e.g. acorex-ui/acorex-cursor-plugin)
cd cursor-plugin
git init
git add .
git commit -m "feat: ACoreX Cursor plugin v0.2.0 with component blueprints"
git remote add origin https://github.com/acorex-ui/acorex-cursor-plugin.git
git push -u origin main
```

Submit **the repository URL** at [cursor.com/marketplace/publish](https://cursor.com/marketplace/publish).

### Option B — Monorepo subdirectory

If publishing from `acorex-ui-workspace`, submit the repo URL and ensure the marketplace can resolve:

- `.cursor-plugin/marketplace.json` at `cursor-plugin/.cursor-plugin/marketplace.json`
- Plugin at `cursor-plugin/plugins/acorex/`

> Note: Cursor indexes the repository root. A dedicated plugin repo (Option A) is simpler for marketplace review.

## Team marketplace (Teams / Enterprise)

1. Go to **Dashboard → Settings → Plugins → Team Marketplaces**
2. Click **Add Marketplace** → **Import from Repo**
3. Point to your public GitHub repository
4. Enable **Auto Refresh** for automatic updates on push
5. Assign as **Required** or **Optional** per distribution group

See [Team marketplaces](https://cursor.com/docs/plugins#team-marketplaces).

## Updating after documentation changes

When `apps/documentation/docs` changes in the monorepo:

```bash
node cursor-plugin/scripts/sync-all.mjs
git add cursor-plugin/
git commit -m "chore(plugin): sync documentation blueprints"
git push
```

With Auto Refresh enabled, the marketplace re-indexes within ~10 minutes.

## Versioning

1. Bump `version` in `plugins/acorex/.cursor-plugin/plugin.json`
2. Bump `metadata.version` in `.cursor-plugin/marketplace.json`
3. Run `sync-all.mjs`, commit, push
4. Marketplace updates are reviewed by the Cursor team on each publish

## What's shipped in v0.2.0

| Asset | Count |
| --- | --- |
| Documentation blueprints (en-US) | 368 JSON files |
| Components | 92 |
| Types | 166 |
| Events | 61 |
| CDK modules | 14 |
| Core packages | 18 |
| Charts | 6 |
| Rules | 12 |
| Skills | 4 |
| Commands | 4 |
| Agents | 1 |

## Submission link

👉 [cursor.com/marketplace/publish](https://cursor.com/marketplace/publish)

Reference: [Cursor Plugins documentation](https://cursor.com/docs/plugins)
