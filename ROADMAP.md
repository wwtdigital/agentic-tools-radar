# Product Roadmap

This document outlines potential features and improvements for the Agentic Developer Tools Radar.

---

## High Priority / User-Facing Features

### 1. Filter by Evaluation Status
**Status:** Not Started
**Priority:** High
**Effort:** Small

Add evaluation status filter dropdown to complement the new status badges.

**Details:**
- Add status filter dropdown (similar to category filter)
- Let users view only "Active", "Adopted", "Feature Risk" tools, etc.
- Apply to both radar and tools pages
- Show count of tools in each status
- Works naturally with existing category filters

**Benefits:**
- Natural extension of v0.4.0 status badges feature
- Helps users focus on tools in specific evaluation stages
- Low implementation complexity

---

### 2. Search/Filter Tools
**Status:** Not Started
**Priority:** High
**Effort:** Small

Add search functionality to quickly find tools by name or company.

**Details:**
- Search bar component at top of tools page and drawer
- Real-time filtering as user types
- Search across tool name, company, and quick take
- Clear/reset search functionality
- Highlight matching terms in results

**Benefits:**
- High value for users with many tools
- Improves discoverability
- Quick to implement with existing data structure

---

### 3. Comparison Table View
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

### 4. Tool Details Modal/Page
**Status:** Not Started
**Priority:** Medium
**Effort:** Medium

Dedicated view for comprehensive tool information.

**Details:**
- Click tool card/logo to open detailed view
- Modal or dedicated page with full information
- All dimensions with descriptions
- Full quick take (not truncated)
- All external links prominently displayed
- Version history/changelog if available
- Related tools suggestions

**Benefits:**
- Better information architecture
- Reduces clutter on main pages
- Dedicated space for comprehensive details

---

## Medium Priority / UX Improvements

### 5. Persist User Selections
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

### 6. Share/Bookmark Current View
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

### 7. Mobile Optimization
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

### 8. Export to CSV/JSON
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

### 9. Dark Mode
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

### 10. Tool Rating/Feedback
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

*Last Updated: 2025-11-04*
