# Release Process

This document outlines the release process for the Agentic Developer Tools Radar project.

## Overview

We use semantic versioning (MAJOR.MINOR.PATCH) and maintain comprehensive release notes for each version. The release validation bot helps ensure consistency and quality across releases.

## Semantic Versioning

- **MAJOR** (x.0.0): Breaking changes, major architectural changes
- **MINOR** (0.x.0): New features, non-breaking changes
- **PATCH** (0.0.x): Bug fixes, minor improvements

## Pre-Release Checklist

### Option 1: Release Preparation Assistant (Recommended)

Use Claude Code to guide you through the entire release process. Simply send this message:

```
Prepare a new release. Follow these steps:

1. Check the current version in package.json
2. Ask me what type of release this is (major/minor/patch)
3. Calculate and update the new version number
4. Review recent commits and draft release notes for RELEASE_NOTES.md
5. Ask if I want to update the About page
6. Run validation: npm run validate:release, npx tsc --noEmit, pnpm build
7. Create a release branch, commit changes, and create a PR

Be thorough and show me what you're doing at each step.
```

The assistant will:
- ✅ Determine the new version number
- ✅ Update package.json with the new version
- ✅ Create release notes entry
- ✅ Update the About page (for major/minor releases)
- ✅ Run validation checks (build, types, etc.)
- ✅ Create the release PR

### Option 2: Manual Validation

Alternatively, you can manually run the validation bot:

```bash
npm run validate:release
```

This checks:
- ✅ Version consistency across `package.json` and `RELEASE_NOTES.md`
- ✅ Release notes entry exists for current version
- ✅ Build completes successfully
- ✅ Documentation is up to date
- ✅ No broken internal links in markdown files
- ✅ Version follows semantic versioning

## Release Steps

### 1. Update Version Number

Update the version in `package.json`:

```bash
# For a minor version bump (new features)
npm version minor

# For a patch version bump (bug fixes)
npm version patch

# For a major version bump (breaking changes)
npm version major
```

Or manually edit `package.json`:
```json
{
  "version": "0.7.0"
}
```

### 2. Update RELEASE_NOTES.md

Add a new section at the top of `RELEASE_NOTES.md` following this template:

```markdown
## Version X.Y.Z - Feature Name (Month Year)

### 🎉 New Features

#### Feature Name
- Feature description
- Key capabilities
- User benefits

### 🐛 Bug Fixes

#### Issue Description
- What was fixed
- Impact on users
- Related issue/PR numbers

### 📚 Documentation

- Updates to documentation
- New guides or tutorials

### 🔧 Technical Improvements

- Performance optimizations
- Code quality improvements
- Dependency updates

---

**Total Changes**: N commits in PR #X
**Key Areas**: List of main focus areas
```

### 3. Update About Page (Optional)

If this is a significant release, update the "Latest Release" section in `src/app/about/page.tsx`:

- Update version number
- Update release date
- Update key highlights

### 4. Run Release Validation

```bash
npm run validate:release
```

Fix any errors or warnings before proceeding.

### 5. Commit Changes

```bash
git add package.json RELEASE_NOTES.md src/app/about/page.tsx
git commit -m "chore: bump version to X.Y.Z"
```

### 6. Create Pull Request

```bash
git checkout -b release/vX.Y.Z
git push -u origin release/vX.Y.Z
gh pr create --title "chore: release version X.Y.Z" --body "..."
```

### 7. Merge and Tag

After PR approval and CI passes:

1. Merge the PR to main
2. Create a git tag:
   ```bash
   git checkout main
   git pull
   git tag -a vX.Y.Z -m "Release version X.Y.Z"
   git push origin vX.Y.Z
   ```

3. Create GitHub release from tag with release notes

## Automated Checks

### CI/CD Pipeline

On merge to `main`, Vercel automatically:
1. Runs the prebuild script (`generate-static-data.js`)
2. Builds the Next.js application
3. Deploys to production

## Hotfix Process

For urgent fixes to production:

1. Create hotfix branch from `main`:
   ```bash
   git checkout -b hotfix/vX.Y.Z main
   ```

2. Make the fix and update version (PATCH bump)

3. Update RELEASE_NOTES.md with hotfix entry

4. Run validation: `npm run validate:release`

5. Create PR, get expedited review, merge

6. Tag and deploy as normal

## Version History

All version history is maintained in `RELEASE_NOTES.md`.

## Rollback Procedure

If a release causes issues:

1. Revert the release commit on main
2. Deploy previous version via Vercel dashboard
3. Create hotfix branch to address the issue
4. Follow normal release process with incremented version

## Release Communication

After release:
1. Update project README if needed
2. Announce in team channels
3. Update any external documentation or blog posts
4. Monitor for issues in first 24-48 hours

## Troubleshooting

### "RELEASE_NOTES.md does not contain an entry"

Ensure you have a heading exactly matching:
```markdown
## Version X.Y.Z
```

### "Build failed"

Check build output for errors. Common issues:
- TypeScript errors
- Missing dependencies
- Environment variable issues

Run `npm run build` locally to debug.

### "Uncommitted changes"

Either commit your changes or use `git stash` if they're not part of the release.

## Tools & Scripts

- `npm run validate:release` - Run full release validation
- `npm run build` - Build the application
- `npm run lint` - Run ESLint
- `npx tsc --noEmit` - TypeScript type check
- `npm run generate-snapshot` - Regenerate tools data snapshot

## Support

For questions or issues with the release process:
- Check this document first
- Review recent PRs for examples
- Ask in the team channel
- Create an issue in the repository
