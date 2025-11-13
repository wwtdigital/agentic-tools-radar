# Contributing Guidelines

## Versioning Strategy

This project follows [Semantic Versioning (semver)](https://semver.org/) with the format `MAJOR.MINOR.PATCH`.

### Version Bump Decision Tree

Use this guide to determine which version number to increment:

#### PATCH version (0.0.X) - Bug Fixes & Non-User-Facing Changes

Increment PATCH when making backwards-compatible bug fixes or internal improvements:

- ✅ Fix incorrect status badge colors
- ✅ Fix broken links or typos
- ✅ Performance improvements with no user-visible changes
- ✅ Dependency updates (security patches, bug fixes)
- ✅ Code refactoring with no functional changes
- ✅ Fix layout issues or visual bugs
- ✅ Documentation updates only

**Command:** `npm version patch`

**Example:** 0.4.0 → 0.4.1

---

#### MINOR version (0.X.0) - New Features

Increment MINOR when adding new functionality in a backwards-compatible manner:

- ✅ Add new UI components or pages
- ✅ Add new features (evaluation status badges, export functionality, etc.)
- ✅ Add new filtering or sorting options
- ✅ Add new API endpoints
- ✅ Enhance existing features without breaking changes
- ✅ Add new visualization options
- ✅ Support for new Notion property types

**Command:** `npm version minor`

**Example:** 0.4.0 → 0.5.0

---

#### MAJOR version (X.0.0) - Breaking Changes

Increment MAJOR when making incompatible changes that break existing functionality:

- ✅ Remove existing features or pages
- ✅ Change data structures that break existing integrations
- ✅ Complete UI redesign that changes user workflows
- ✅ Change API contracts or response formats
- ✅ Remove support for existing Notion properties
- ✅ Change URL structure or routing
- ✅ **Special case:** Move from v0.x.x to v1.0.0 when declaring production-ready

**Command:** `npm version major`

**Example:** 0.9.0 → 1.0.0 or 1.5.0 → 2.0.0

---

## Quick Decision Guide

Ask yourself:

1. **Did I break anything existing?** → MAJOR
2. **Did I add a new feature users will notice?** → MINOR
3. **Did I just fix a bug or improve internals?** → PATCH

Still unsure? Default to PATCH for safety.

---

## Version Bump Workflow

1. Make your changes and commit them
2. Determine version bump type using the guide above
3. Run the appropriate command:
   ```bash
   npm version patch   # or minor, or major
   ```
4. The version will automatically update in:
   - `package.json`
   - UI display (Navbar component reads from package.json)
5. Commit the version bump:
   ```bash
   git add package.json
   git commit -m "chore: bump version to X.Y.Z"
   git push
   ```

---

## Version History

- **v0.7.1** - Accessibility compliance improvements (PATCH - bug fixes & non-user-facing accessibility enhancements)
- **v0.7.0** - Tools enhancements & release system (MINOR - flexible grouping, search, about page, ToolCard component)
- **v0.6.0** - Weighted scoring & accessibility (MINOR - risk-adjusted scoring system, WCAG 2.1 Level AA improvements)
- **v0.5.0** - Weighted scoring system implementation (MINOR - new weighted score feature)
- **v0.4.0** - Add evaluation status badges (MINOR - new feature)
- **v0.3.0** - Add shared navbar and latest update date (MINOR - new features)
- **v0.2.0** - Initial feature set with radar and tools pages (MINOR - initial release)

---

## Pre-1.0.0 Development

We're currently in initial development (v0.x.x). Once the application reaches a stable, production-ready state with:
- All core features implemented
- Thorough testing completed
- Documentation finalized
- No planned breaking changes

We'll bump to **v1.0.0** to signal production readiness.

---

*Last Updated: 2025-11-13*
