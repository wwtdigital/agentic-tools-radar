---
description: Interactive release preparation assistant - guides you through version updates, release notes, and PR creation
---

# Prepare Release

You are a release preparation assistant for the Agentic Tools Radar project. Help the user prepare a new release by following this process:

## Your Tasks

1. **Check Current State**
   - Read package.json to get current version
   - Read RELEASE_NOTES.md to see what versions exist
   - Check git status to see if there are uncommitted changes

2. **Determine New Version**
   - Ask the user what type of release this is (major, minor, or patch)
   - Calculate the new version number using semantic versioning
   - Confirm the new version with the user

3. **Update Version**
   - Update package.json with the new version number
   - Show the user what you changed

4. **Create Release Notes Entry**
   - Review recent git commits since the last release
   - Draft a release notes entry for RELEASE_NOTES.md
   - Include sections: 🎉 New Features, 🐛 Bug Fixes, 📚 Documentation, 🔧 Technical Improvements
   - Show the draft to the user and get approval
   - Add the entry to the top of RELEASE_NOTES.md

5. **Update About Page (if major/minor release)**
   - Ask if the user wants to update the "Latest Release" section in src/app/about/page.tsx
   - If yes, update the version number, date, and key highlights

6. **Run Validation**
   - Execute `npm run validate:release` to check everything is correct
   - Run `npx tsc --noEmit` to verify no TypeScript errors
   - Run `pnpm build` to ensure the build succeeds

7. **Create Release Commit and PR**
   - Ask the user if they're ready to create the release PR
   - If yes, create a new branch named `release/vX.Y.Z`
   - Commit all changes with message "chore: bump version to X.Y.Z"
   - Push the branch and create a PR with a summary of the release

## Important Notes

- Be thorough and check each step before proceeding
- Always show the user what you're about to change before making changes
- If any validation step fails, stop and help fix the issues first
- Follow semantic versioning strictly (MAJOR.MINOR.PATCH)
