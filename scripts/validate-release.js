#!/usr/bin/env node

/**
 * Release Validation Script
 *
 * Validates that the project is ready for release by checking:
 * - Version consistency across package.json and RELEASE_NOTES.md
 * - RELEASE_NOTES.md has an entry for the current version
 * - Build completes successfully
 * - No critical issues in documentation
 *
 * Usage:
 *   node scripts/validate-release.js
 *   npm run validate:release
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

let hasErrors = false;
let hasWarnings = false;

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function error(message) {
  hasErrors = true;
  log(`❌ ERROR: ${message}`, colors.red);
}

function warning(message) {
  hasWarnings = true;
  log(`⚠️  WARNING: ${message}`, colors.yellow);
}

function success(message) {
  log(`✅ ${message}`, colors.green);
}

function info(message) {
  log(`ℹ️  ${message}`, colors.cyan);
}

function section(title) {
  log(`\n${'='.repeat(60)}`, colors.blue);
  log(`  ${title}`, colors.blue);
  log(`${'='.repeat(60)}`, colors.blue);
}

// Get package.json version
function getPackageVersion() {
  const packagePath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  return packageJson.version;
}

// Check if RELEASE_NOTES.md has entry for current version
function checkReleaseNotes(version) {
  section('Checking RELEASE_NOTES.md');

  const releaseNotesPath = path.join(process.cwd(), 'RELEASE_NOTES.md');

  if (!fs.existsSync(releaseNotesPath)) {
    error('RELEASE_NOTES.md not found');
    return;
  }

  const releaseNotes = fs.readFileSync(releaseNotesPath, 'utf8');

  // Check for version heading (e.g., "## Version 0.6.0")
  const versionPattern = new RegExp(`##\\s+Version\\s+${version.replace(/\./g, '\\.')}`, 'i');

  if (!versionPattern.test(releaseNotes)) {
    error(`RELEASE_NOTES.md does not contain an entry for version ${version}`);
    info(`Expected to find: "## Version ${version}"`);
    return;
  }

  success(`RELEASE_NOTES.md contains entry for version ${version}`);

  // Check if the entry has content (at least 100 characters after the version heading)
  const versionMatch = releaseNotes.match(versionPattern);
  if (versionMatch) {
    const startIndex = versionMatch.index + versionMatch[0].length;
    const nextVersionIndex = releaseNotes.indexOf('## Version', startIndex);
    const sectionContent = nextVersionIndex > -1
      ? releaseNotes.substring(startIndex, nextVersionIndex)
      : releaseNotes.substring(startIndex);

    if (sectionContent.trim().length < 100) {
      warning(`Release notes for version ${version} seem incomplete (less than 100 characters)`);
    } else {
      success('Release notes entry has substantial content');
    }
  }
}

// Check version consistency across files
function checkVersionConsistency() {
  section('Checking Version Consistency');

  const version = getPackageVersion();
  info(`Current version in package.json: ${version}`);

  checkReleaseNotes(version);
}

// Run build to ensure it completes without errors
function checkBuild() {
  section('Running Build Check');

  try {
    info('Running: npm run build');
    execSync('npm run build', {
      stdio: 'inherit',
      env: { ...process.env, CI: 'true' }
    });
    success('Build completed successfully');
  } catch (err) {
    error('Build failed - fix build errors before release');
  }
}

// Check for common documentation issues
function checkDocumentation() {
  section('Checking Documentation');

  const docsToCheck = [
    'README.md',
    'ARCHITECTURE.md',
    'RELEASE_NOTES.md',
    'CLAUDE.md'
  ];

  docsToCheck.forEach(doc => {
    const docPath = path.join(process.cwd(), doc);
    if (!fs.existsSync(docPath)) {
      warning(`${doc} not found`);
    } else {
      success(`${doc} exists`);

      // Check for broken internal links (basic check for .md files)
      const content = fs.readFileSync(docPath, 'utf8');
      const mdLinkPattern = /\[([^\]]+)\]\(([^)]+\.md)\)/g;
      let match;

      while ((match = mdLinkPattern.exec(content)) !== null) {
        const linkedFile = match[2];
        // Skip external URLs
        if (linkedFile.startsWith('http')) continue;

        const linkedPath = path.join(process.cwd(), linkedFile);
        if (!fs.existsSync(linkedPath)) {
          warning(`${doc} contains broken link to ${linkedFile}`);
        }
      }
    }
  });
}

// Check git status (optional - warning only)
function checkGitStatus() {
  section('Checking Git Status');

  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });

    if (status.trim()) {
      warning('There are uncommitted changes in the repository');
      info('Uncommitted files:');
      console.log(status);
    } else {
      success('No uncommitted changes');
    }
  } catch (err) {
    warning('Could not check git status (not a git repository?)');
  }
}

// Check that package.json version follows semver
function checkSemver() {
  section('Checking Semantic Versioning');

  const version = getPackageVersion();
  const semverPattern = /^(\d+)\.(\d+)\.(\d+)(-[a-zA-Z0-9.-]+)?(\+[a-zA-Z0-9.-]+)?$/;

  if (!semverPattern.test(version)) {
    error(`Version ${version} does not follow semantic versioning (major.minor.patch)`);
  } else {
    success(`Version ${version} follows semantic versioning`);
  }
}

// Main validation flow
async function main() {
  log('\n🤖 Release Validation Bot\n', colors.cyan);

  checkVersionConsistency();
  checkSemver();
  checkDocumentation();
  checkGitStatus();
  checkBuild();

  // Summary
  section('Validation Summary');

  if (hasErrors) {
    log('\n❌ VALIDATION FAILED', colors.red);
    log('Fix the errors above before proceeding with release.', colors.red);
    process.exit(1);
  } else if (hasWarnings) {
    log('\n⚠️  VALIDATION PASSED WITH WARNINGS', colors.yellow);
    log('Review the warnings above. Consider fixing them before release.', colors.yellow);
    process.exit(0);
  } else {
    log('\n✅ ALL CHECKS PASSED', colors.green);
    log('Project is ready for release!', colors.green);
    process.exit(0);
  }
}

main().catch(err => {
  error(`Unexpected error: ${err.message}`);
  process.exit(1);
});
