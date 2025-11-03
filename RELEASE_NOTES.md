# Release Notes

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
