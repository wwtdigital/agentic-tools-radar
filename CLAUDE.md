# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js application for displaying an interactive radar chart of agentic developer tools. The data is sourced from a Notion database with read-only API access. The app renders a radar visualization using Nivo with filtering, comparison, and dimension selection capabilities.

**Tech Stack:** Next.js 15.5.6 (App Router), React 18.3.1, TypeScript 5.5.4, Tailwind CSS 3.4.10, Nivo 0.99.0 (radar charts), SWR 2.2.5 (data fetching), Zod 3.23.8 (validation), Notion API v2.2.15

## Development Commands

```bash
# Install dependencies
pnpm i        # or npm i / yarn

# Run development server
pnpm dev      # http://localhost:3000/radar

# Build for production
pnpm build

# Start production server
pnpm start

# Lint
pnpm lint     # or: eslint . --ext .ts,.tsx
```

## Environment Setup

Required environment variables (see `.env.example`):
- `NOTION_API_KEY` — Notion integration secret (read-only access)
- `NOTION_DB_ID` — ID of the Notion database containing tool data

**Demo Mode:** If env vars are missing, `/api/tools` serves a hardcoded demo dataset so the UI still renders.

## Architecture

### Data Flow
1. **Notion Database → Build-Time Snapshot → API Route → Client Components**
   - **Build Time:** `scripts/generate-static-data.js` runs as prebuild step, fetching fresh data from Notion and saving to `src/data/tools-snapshot.json`
   - **Production:** `/api/tools/route.ts` serves the static snapshot for fast, reliable responses
   - **Development:** `/api/tools/route.ts` queries Notion API directly for live data (falls back to demo data if no credentials)
   - Client uses SWR to fetch from `/api/tools` endpoint
   - Schema validated with Zod (`ToolSchema` in route.ts:26-47)

### Expected Notion Schema
Both the API route and static data generator expect a Notion database with these properties:
- **Tool/Name** (Title) — tool name
- **Company** (Rich Text)
- **Category** (Select) — e.g., "IDE Assistants"
- **Evaluation Status** (Status) — **IMPORTANT:** Must be a Status property type (not Select). Values like "Active", "Adopted", "Feature Risk", "Deferred", "Watchlist", "Emerging", "Not Enterprise Viable", "Reviewed"
- **Product URL, Documentation Link, Company URL** (URL fields)
- **Quick Take** (Rich Text)
- **AI Autonomy, Collaboration, Contextual Understanding, Governance, User Interface** (Number or Select 1-20)
- **Rating** (Formula) — pure capability score (0-100), does not account for validation level
- **Final Score** (Formula) — risk-adjusted weighted score that accounts for evaluation status and validation confidence (0-100). Displayed as "Weighted Score" in the UI.

Both `route.ts` and `generate-static-data.js` handle flexible property types, supporting number, select, and **status** fields. The status type handling is critical for evaluation status badges to display correctly.

### Component Structure
- **`/app/radar/page.tsx`** — Main radar page with page-based scrolling
  - State: filters (category/status/months), selected tool IDs, hidden dimensions, drawer open/closed
  - Mobile warning banner for desktop optimization
  - Defaults to top 5 tools by weighted score when nothing selected
  - Category filter shows all tools in that category (not limited to 5)
  - Radar chart: 600px minimum height, collapsible dimension filters overlay (top-left), export button overlay (top-right)
  - Top-aligned layout with items-start for radar and tool details columns
- **`/app/tools/page.tsx`** — All tools listing page with flexible grouping and search
  - Flexible grouping options: Category, Status, Score Range, or None (flat list)
  - Search functionality filters tools by name or company with instant results
  - Displays all tools in card format using reusable ToolCard component
  - Shows both weighted score and rating when they differ by >0.1, single score when identical
  - Color-coded evaluation status badges positioned in bottom right corner
  - Clickable cards with hover effects (blue border, title color change)
- **`/app/tools/[id]/page.tsx`** — Tool detail page with comprehensive information
  - Dynamic route accepting tool ID parameter
  - Breadcrumb navigation back to tools listing
  - Full tool header with large logo, scores, category, and status
  - Complete quick take (not truncated)
  - Prominent external links as buttons (Product, Documentation, Company)
  - All dimensions displayed with full descriptions
  - Related tools section showing 3 tools from same category
  - 404 handling for non-existent tools
- **`/app/about/page.tsx`** — About page with project documentation
  - Comprehensive evaluation framework documentation
  - Latest release information and highlights
  - Detailed dimension explanations and scoring methodology
  - Links to complete release history on GitHub
- **`RadarView.tsx`** — Nivo ResponsiveRadar wrapper with custom logo dots
  - Takes up to 5 tools (or all tools in category filter), transforms dims into Nivo data format
  - Respects `hiddenDims` set to exclude dimensions
  - Smart collision detection with auto-stacking for overlapping tool logos
- **`Filters.tsx`** — Category/status/recency filters with tooltips
- **`CompareSelect.tsx`** — Category-grouped multi-select for choosing up to 5 tools
- **`ToolDetails.tsx`** — Selected tools info panel with ratings and dimension breakdowns
  - Sticky header with "About Scores" expandable section explaining scoring methodology
  - Smart score display: shows both weighted and rating when differ by >0.1, single score when identical
  - Displays evaluation status badges with Notion colors
  - Tool details scrolling naturally with page
- **`ToolCard.tsx`** — Reusable clickable tool card component for tools page
  - Wrapped in Link component pointing to `/tools/[id]` detail page
  - Displays tool information with flexible grouping support
  - Adapts display based on groupBy prop (category, status, score, none)
  - Consistent styling and smart score display across all grouping modes
  - Hover effects: shadow, blue border, title color change
  - External links have stopPropagation to prevent navigation to detail page
- **`ToolLogo.tsx`** — Logo component with favicon fallbacks and consistent color generation
- **`DimensionTooltip.tsx`** — Interactive dimension explanations with hover tooltips
- **`Navbar.tsx`** — Shared navigation component with radar/tools/about navigation and version info

### Styling
- Tailwind CSS with minimal palette
- Designed for Notion Embed blocks (900–1100px width)
- Chart styling: thin strokes, low fill opacity (0.12), subtle grid (RadarView.tsx:46-56)
- Status badges: Color-coded to match Notion status colors (see `src/utils/status.ts`)
  - Red: Not Enterprise Viable
  - Gray: Watchlist
  - Purple: Emerging
  - Yellow: Active
  - Orange: Feature Risk
  - Amber: Deferred
  - Green: Adopted
  - Blue: Reviewed

## Key Behaviors

- **Auto-selection:** If user hasn't selected tools, show top 5 by weighted score (finalScore, with fallback to rating)
- **Category filter behavior:** When a category is selected with no manual tool selection, displays all tools in that category (not limited to 5)
- **Max 5 tools for manual selection:** When manually selecting tools, radar comparison limited to 5 tools
- **Sorting:** All tools sorted by Weighted Score (finalScore field, with fallback to Rating if missing)
- **Smart score display:** Intelligently hides redundant scores for better UX
  - When weighted score and rating differ by >0.1: shows both (e.g., "85.0 | 75.0" with "Weighted | Rating" labels)
  - When identical (e.g., Adopted tools at 100% confidence): shows single score with "Score" label
  - Consistent behavior across tools page and radar tool details
- **Dimension filtering:** User can hide dimensions via collapsible overlay on chart; chart updates dynamically (minimum 3 dimensions required)
- **Export functionality:** PNG export button overlays top-right of radar chart
- **About Scores documentation:** Expandable section in ToolDetails explains weighted vs rating methodology and confidence multipliers
- **Evaluation status badges:** Display color-coded status from Notion on both tools page and radar tool details
- **Page-based scrolling:** Radar page uses natural page scrolling instead of fixed containers
- **Build-time data refresh:** Every production build fetches fresh data from Notion via `prebuild` script (package.json:8)
- **Graceful fallback:** Missing Notion credentials → demo data in dev, build continues without error in production

## TypeScript Path Aliases

Uses `@/` alias for `src/` directory (configured via Next.js).

## Utilities

### Status Color Mapping (`src/utils/status.ts`)
Shared utility function `getStatusColor(status: string)` that maps Notion evaluation status values to Tailwind CSS color classes. Used by both tools page and radar tool details to ensure consistent status badge styling across the application.

## Dependency Management

### Current Versions (Last Updated: 2025-11-13)
- **Next.js:** 15.5.6 (latest stable in 15.x line)
- **React:** 18.3.1 (avoid React 19 until ecosystem stabilizes)
- **Nivo:** 0.99.0 (updated from 0.85.1)
- **@notionhq/client:** 2.2.15 (**DO NOT UPDATE**)
- **Tailwind CSS:** 3.4.10 (avoid Tailwind 4 - major rewrite)

### Update Policy

**Safe to update:**
- Next.js 15.x patch/minor versions
- Nivo packages (minor/patch updates)
- Type definitions (@types/*)

**Do not update without review:**
- **@notionhq/client** - Version 5.x has breaking changes (removed `databases.list`, new data source API). Current v2.2.15 works perfectly for our read-only database queries. No migration needed.
- **React 19** - Ecosystem still catching up, many libraries not yet compatible
- **Tailwind 4** - Complete rewrite with breaking changes requiring migration
- **Zod 4** - Major version, check for breaking changes first

**Reasoning:**
- This is a simple, focused app (read Notion DB → display radar chart)
- Stability > bleeding edge features
- Current stack meets all requirements
- Breaking changes offer no tangible benefits for our use case
