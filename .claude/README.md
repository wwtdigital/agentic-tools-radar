# Claude Code Configuration

This directory contains custom slash commands and configuration for Claude Code.

## Available Commands

### `/release`
Guides you through the complete release process for the Agentic Developer Tools Radar project.

**Usage:**
```
/release
```

**What it does:**
1. Checks current version
2. Asks for release type (major/minor/patch)
3. Updates version in package.json
4. Reviews recent commits and drafts release notes
5. Updates RELEASE_NOTES.md
6. Optionally updates About page
7. Runs validation checks (validate:release, tsc, build)
8. Creates release branch and PR

**When to use:**
- You're ready to create a new release
- You want guidance through the release process
- You need to ensure all release steps are followed

## Adding New Commands

To add a new command:

1. Create a new `.md` file in `.claude/commands/`
2. Name it with the command name (e.g., `my-command.md` for `/my-command`)
3. Write the command prompt/instructions in the file
4. The command will be automatically available in Claude Code

## Documentation

For more information about the release process, see:
- `/RELEASE_PROCESS.md` - Detailed release process documentation
- `/RELEASE_NOTES.md` - Version history and release notes
- `/CONTRIBUTING.md` - General contribution guidelines
