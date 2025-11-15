# Product Roadmap

This document outlines potential features and improvements for the Agentic Developer Tools Radar.

---

## High Priority / User-Facing Features

### 1. Comparison Table View
**Status:** Not Started
**Priority:** Medium
**Effort:** Medium

Add alternative table view for side-by-side dimension comparison.

**Details:**
- Table layout showing all dimensions side-by-side
- Sortable columns for each dimension
- Toggle between radar and table view
- Sticky header for scrolling
- Highlight highest/lowest values
- Export table as CSV

**Benefits:**
- Better for detailed numerical comparison
- Alternative to visual radar for data analysis
- Appeals to data-driven users

---

## Medium Priority / UX Improvements

### 3. Persist User Selections
**Status:** Not Started
**Priority:** Medium
**Effort:** Small

Save user preferences and restore on return visit.

**Details:**
- Save to localStorage:
  - Selected tools
  - Active filters (category, status)
  - Hidden dimensions
  - View preferences
- Restore on page load
- Clear saved state button
- Respect user privacy (client-side only)

**Benefits:**
- Excellent UX for repeat visitors
- Low implementation cost
- No backend required

---

### 4. Share/Bookmark Current View
**Status:** Not Started
**Priority:** Medium
**Effort:** Small

Generate shareable URLs with current view state.

**Details:**
- Encode state in URL parameters:
  - Selected tool IDs
  - Active filters
  - Hidden dimensions
- Copy link button
- QR code generation for mobile sharing
- Social media preview cards

**Benefits:**
- Easy collaboration and sharing
- No login/auth required
- Works with bookmarks

---

### 5. Mobile Optimization
**Status:** Not Started
**Priority:** Medium
**Effort:** Large

Improve mobile experience beyond current warning banner.

**Details:**
- Responsive radar chart sizing
- Touch-friendly controls
- Mobile-optimized drawer/filters
- Swipe gestures for tool navigation
- Simplified mobile layout
- Progressive Web App (PWA) capabilities

**Benefits:**
- Reaches mobile users
- Modern expectation
- Increases accessibility

---

## Lower Priority / Nice-to-Have

### 6. Export to CSV/JSON
**Status:** Not Started
**Priority:** Low
**Effort:** Small

Download tool data in various formats.

**Details:**
- Export button with format options
- Include selected tools or all tools
- CSV format for spreadsheet analysis
- JSON format for developers
- Include all dimensions and metadata

**Benefits:**
- Enables external analysis
- Data portability
- Simple to implement

---

### 7. Dark Mode
**Status:** Not Started
**Priority:** Low
**Effort:** Medium

Toggle between light and dark themes.

**Details:**
- Dark theme color palette
- Theme toggle in navbar
- Persist theme preference
- Respect system preference
- Smooth transition animations
- Adjust radar chart colors for dark mode

**Benefits:**
- Modern UX expectation
- Reduces eye strain
- Popular user request

---

### 8. Tool Rating/Feedback
**Status:** Not Started
**Priority:** Low
**Effort:** Large

Community-driven ratings and feedback.

**Details:**
- User rating system (stars or thumbs)
- Optional comments/reviews
- Aggregate community ratings
- Moderation system
- Requires authentication
- Backend infrastructure needed

**Benefits:**
- Community engagement
- Diverse perspectives
- Real-world feedback

**Challenges:**
- Requires backend/database
- Needs moderation
- Potential for spam/abuse

---

## Completed Features

### ✅ Tool Details Page
**Completed:** 2025-11-14

Dedicated page for comprehensive tool information.

**Features:**
- Click tool card to open detailed view
- Dedicated page route `/tools/[id]` with full information
- All dimensions with complete descriptions displayed
- Full quick take (not truncated)
- Prominent external links (Product, Documentation, Company)
- Related tools suggestions from same category
- Breadcrumb navigation back to tools page
- Clickable tool cards with hover effects
- SEO-friendly shareable URLs for each tool

**Benefits:**
- Better information architecture
- Reduces clutter on tools listing page
- Dedicated space for comprehensive details
- Shareable tool-specific URLs

### ✅ v0.7.0 - Tools Enhancements & Flexible Grouping
**Completed:** 2025-11-13

- **Flexible grouping options** - Category, Status, Score Range, or None (flat list)
- **Search functionality** - Filter tools by name or company with instant results
- **Status-based filtering** - Group and filter tools by evaluation status
- Custom status ordering (production ready → emerging → risk/limitations)
- Score-based grouping (Excellent 90-100, Very Good 80-89, etc.)
- Dynamic filtering with search and grouping working together
- About page with comprehensive evaluation framework documentation
- Release validation system with automated checks
- Extracted reusable ToolCard component

### ✅ v0.6.0 - Weighted Scoring System
**Completed:** 2025-01-27

- Risk-adjusted weighted scoring accounting for validation confidence
- Smart dual-score display (shows both when they differ significantly)
- Confidence multipliers by evaluation status (40%-100%)
- Enhanced accessibility improvements (WCAG 2.1 Level AA)
- Increased radar chart fill opacity for better visibility

### ✅ v0.4.0 - Evaluation Status Badges
**Completed:** 2025-11-04

- Color-coded status badges on all tool cards
- Support for Notion status property type
- Shared status color utility
- Bottom-right badge positioning

### ✅ v0.3.0 - Shared Navigation
**Completed:** 2025-11-01

- Unified Navbar component
- Latest update date display
- Version tracking

---

## Decision Framework

When prioritizing features, consider:

1. **User Impact** - How many users benefit?
2. **Implementation Effort** - How complex is it?
3. **Strategic Value** - Does it align with product vision?
4. **Dependencies** - What needs to be in place first?

**Priority Formula:**
- High Priority = High Impact + Low Effort
- Medium Priority = High Impact + Medium Effort OR Medium Impact + Low Effort
- Low Priority = Low Impact OR High Effort

---

## How to Propose New Features

1. Add to this document in the appropriate priority section
2. Include Status, Priority, Effort, Details, and Benefits
3. Discuss with team before starting implementation
4. Move to "Completed Features" section when done

---

*Last Updated: 2025-11-14*
