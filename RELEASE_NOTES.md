# Release Notes

## Version 0.7.0 - Tools Enhancements & Release System (November 2025)

### 🎉 New Features

#### Tools Page Enhancements
- **Flexible Grouping Options** - Choose between Category, Status, Score Range, or None (flat list)
- **Search Functionality** - Filter tools by name or company with instant results
- **Improved Status Display** - Evaluation status pill permanently visible in bottom-right corner
- **Custom Status Ordering** - Status groups follow maturity priority (Adopted → Active → Reviewed → Emerging → Watchlist → Feature Risk → Deferred → Not Enterprise Viable)
- **Score-based Grouping** - Group tools by score ranges (90-100 Excellent, 80-89 Very Good, 70-79 Good, 60-69 Fair, Below 60)
- **Dynamic Filtering** - Search and grouping work together for powerful tool discovery

#### About Page
- **Comprehensive Documentation** - New `/about` page with project details, release notes, and evaluation framework
- **Evaluation Framework** - Detailed explanation of the five dimensions (AI Autonomy, Collaboration, Contextual Understanding, Governance, User Interface)
- **Scoring Methodology** - Clear documentation of Rating vs Weighted Score with examples
- **Status Categories** - Organized into three tiers: Production Ready (100%-85%), Emerging & Monitoring (70%-60%), Risk & Limitations (80%-40%)
- **Release History** - Version history with feature highlights and key changes
- **Navigation Integration** - About link added to navbar for easy access

#### Release Preparation System
- **Validation Script** - `npm run validate:release` checks version consistency, release notes, and build success
- **Interactive Workflow** - Documented prompt-based approach for preparing releases with Claude Code
- **Complete Documentation** - RELEASE_PROCESS.md with step-by-step instructions and best practices
- **Semantic Versioning** - Automated checks ensure proper versioning (MAJOR.MINOR.PATCH)
- **Documentation Validation** - Checks for broken links and missing release notes entries

### 🏗️ Component Architecture

#### ToolCard Component
- **Extracted Reusable Component** - Eliminates 150+ lines of code duplication
- **Type Safety** - Proper TypeScript types for all four grouping modes
- **Flexible Display** - Adapts based on groupBy prop to show relevant information
- **Consistent Styling** - Unified card design across all grouping views
- **Accessibility** - Maintained WCAG 2.1 Level AA compliance

### 🐛 Bug Fixes
- **Duplicate Status Badge** - Fixed issue where evaluation status appeared twice per card
- **TypeScript Type Safety** - Added proper types for groupBy prop across components
- **Layout Improvements** - Better spacing and alignment in tool cards

### 📚 Documentation
- **RELEASE_PROCESS.md** - Complete guide for preparing and shipping releases
- **Updated About Page** - Fixed release date from January to November 2025
- **Improved Code Comments** - Better inline documentation for grouping and search logic

### 🔧 Technical Improvements
- **Validation Bot** - Automated checks for version consistency and build success
- **Search Performance** - Efficient filtering using useMemo for optimal re-renders
- **Custom Sorting** - Flexible sort logic handles status priority, score ranges, and alphabetical ordering
- **Type Definitions** - Enhanced TypeScript types for better developer experience

---

**Total Changes**: 7 files changed, 900+ insertions, 250+ deletions (PR #17)
**Key Areas**: Tools page enhancements, About page, release system, ToolCard component

## Version 0.6.0 - Weighted Scoring & Accessibility (January 2025)

### 🎉 New Features

#### Weighted Scoring System
- **Final Score (Weighted Score)** - New risk-adjusted rating that accounts for evaluation status and validation confidence
- Tools with higher maturity (e.g., "Adopted") maintain their full capability scores
- Emerging or unvalidated tools receive discounts based on confidence multipliers
- **Smart dual-score display** - Shows both Weighted Score and Rating when they differ significantly
- Single score display when weighted and rating values are equivalent
- Confidence multipliers range from 40% (Not Enterprise Viable) to 100% (Adopted)

#### Evaluation Status Confidence Multipliers
- Adopted: 100% (fully validated, enterprise-ready)
- Reviewed: 95% (thorough evaluation completed)
- Active: 85% (actively in use, proven in practice)
- Feature Risk: 80% (identified limitations or concerns)
- Deferred: 75% (evaluation postponed)
- Emerging: 70% (early stage, limited validation)
- Watchlist: 60% (monitoring for potential)
- Not Enterprise Viable: 40% (significant limitations for enterprise use)

### ♿ Accessibility Improvements (WCAG 2.1 Level AA)

#### Visual Enhancements
- **Increased radar chart fill opacity** from 0.08 to 0.12 for better visibility
- Improved contrast ratios across all interactive elements
- Enhanced focus indicators for keyboard navigation
- Better color differentiation for status badges

#### Interactive Elements
- Proper ARIA labels and roles throughout the application
- Keyboard navigation support for all interactive controls
- Screen reader optimizations for radar visualization
- Semantic HTML structure improvements

#### Export Functionality
- **UI controls excluded from PNG exports** - Clean, professional chart images
- Export button properly labeled for assistive technologies
- Better error handling and user feedback

### 🐛 Bug Fixes

#### Data Layer
- Fixed status property type support in static data generator
- Improved handling of Notion Status property types vs Select types
- Better validation for tool data schema

#### UI/UX
- Smart score hiding logic applied consistently across tools page and radar view
- Resolved layout issues with score display in tool cards
- Fixed edge cases in dual-score display logic

### 📚 Documentation

#### New Documentation
- **Accessibility audit documentation** - Comprehensive WCAG 2.1 compliance report
- **Product roadmap** with feature priorities and planned improvements
- **Versioning guidelines** in CONTRIBUTING.md
- Updated CLAUDE.md with weighted scoring implementation details

#### Documentation Updates
- Cleaned up debug logs and improved inline documentation
- Enhanced README with scoring methodology explanations
- Better code comments for complex scoring logic

### 🔧 Technical Improvements
- Version bumped from 0.4.0 to 0.6.0 (0.5.0 for weighted scoring, 0.6.0 for accessibility milestone)
- Dynamic version display from package.json
- Improved type safety in score calculations
- Better separation of concerns between rating and weighted score logic

---

**Total Changes**: 15+ commits in PR #10
**Key Areas**: Weighted scoring, WCAG 2.1 AA accessibility, dual-score display, documentation

## Week of November 3, 2025

### 🎉 New Features

#### Tools Listing Page
- **New `/tools` page** - Browse all agentic developer tools in a comprehensive card-based layout
- Tools are **organized by category** with clear section headers showing tool counts
- Each card displays full tool details including ratings, all dimension scores, quick take, and external links
- Tools automatically **sorted by rating** within each category for easy comparison
- **Navigation buttons** added to headers on both radar and tools pages for seamless switching between views
- **"View All" button** in Tool Details panel provides quick access to the full tools listing

#### Category Filtering
- **Category filter buttons** now displayed above the radar chart with tool counts (e.g., "IDE Assistants (8)")
- Click any category to instantly visualize all tools in that category on the radar
- Auto-display all tools in selected category without manual selection
- Toggle categories on/off with a single click

#### Dimension Controls
- **Minimum 3 dimensions required** - ensures radar chart always displays meaningful data
- Checkboxes automatically disable when unchecking would leave fewer than 3 dimensions
- Visual feedback includes grayed text, disabled cursor, and helpful tooltips
- Helper text explains the requirement below dimension controls

#### Enhanced Toolbar
- **"Select Tools"** moved to primary position as the default action
- Shows current selection count (5 default tools or custom count)
- **Reset button** with circular arrow icon clears all filters and returns to defaults
- Icon-only reset design for cleaner UI
- Export PNG button remains easily accessible

### 🎨 UI Improvements

#### Logo Visibility
- **Darker backgrounds** (slate-100) for tool logos improve contrast with white/transparent favicons
- **Adaptive logo stacking** prevents overlapping:
  - Vertical stacking on left/right axes
  - Horizontal stacking on top/bottom axes
- **Smart collision detection** ensures all 5 tool logos are always visible
- Increased radar margins prevent logo clipping at chart boundaries
- Tighter 26px stack offset for cleaner grouping

#### Consistent Styling
- Unified button sizing across toolbar (px-4 py-2)
- Consistent text sizing (text-sm) for better readability
- Active state highlighting (dark background) clearly shows current view
- Hover states with smooth transitions

### 🐛 Bug Fixes

#### PNG Export
- Resolved CORS issues with favicon proxy
- Added retry logic for more reliable exports
- Enhanced error logging for troubleshooting
- Filters external images that could cause export failures
- Export button positioned above radar chart for better accessibility

#### Visual Fixes
- Fixed logo visibility issues where tools were hidden behind each other
- Improved logo positioning at exact pixel coordinates
- Better handling of transparent and white favicon images

### 🔧 Technical Improvements
- Simplified filter dropdown (removed redundant Category and Freshness filters)
- TypeScript type guard fixes in API routes
- Added site favicon for better browser tab identification
- Favicon proxy service for consistent logo display
- Lockfile synchronization fixes

---

**Total Changes**: 20 commits since last Friday
**Key Areas**: New pages, filtering, dimension controls, logo visibility, export functionality
