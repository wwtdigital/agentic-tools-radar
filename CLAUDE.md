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
1. **Notion Database → API Route → Client Components**
   - `/api/tools/route.ts` queries Notion API, transforms properties into standardized `Tool` schema
   - Client uses SWR to fetch from `/api/tools` endpoint
   - Schema validated with Zod (`ToolSchema` in route.ts:5)

### Expected Notion Schema
The API route expects a Notion database with these properties:
- **Tool/Name** (Title) — tool name
- **Company** (Rich Text)
- **Category** (Select) — e.g., "IDE Assistants"
- **Evaluation Status** (Status) — status property with values like "Active", "Adopted", "Feature Risk", "Deferred", "Watchlist", "Emerging", "Not Enterprise Viable", "Reviewed"
- **Product URL, Documentation Link, Company URL** (URL fields)
- **Quick Take** (Rich Text)
- **AI Autonomy, Collaboration, Contextual Understanding, Governance, User Interface** (Number or Select 1-20)
- **Rating** (Formula) — calculated overall rating (0-100)

The route handles flexible property types (route.ts:95-111), supporting number, select, and status fields for various properties.

### Component Structure
- **`/app/radar/page.tsx`** — Main radar page with page-based scrolling
  - State: filters (category/status/months), selected tool IDs, hidden dimensions, drawer open/closed
  - Mobile warning banner for desktop optimization
  - Defaults to top 5 tools by rating when nothing selected
  - Radar chart uses aspect-square for responsive 1:1 ratio
  - Top-aligned layout with items-start for radar and tool details columns
- **`/app/tools/page.tsx`** — All tools listing page grouped by category
  - Displays all tools in card format with color-coded evaluation status badges
  - Status badges positioned in bottom right corner of each card
- **`RadarView.tsx`** — Nivo ResponsiveRadar wrapper with custom logo dots
  - Takes up to 5 tools, transforms dims into Nivo data format
  - Respects `hiddenDims` set to exclude dimensions
  - Smart collision detection with auto-stacking for overlapping tool logos
- **`Filters.tsx`** — Category/status/recency filters with tooltips
- **`CompareSelect.tsx`** — Category-grouped multi-select for choosing up to 5 tools
- **`ToolDetails.tsx`** — Selected tools info panel with ratings and dimension breakdowns
  - Sticky header with tool details scrolling naturally with page
  - Displays evaluation status badges with Notion colors
- **`ToolLogo.tsx`** — Logo component with favicon fallbacks and consistent color generation
- **`DimensionTooltip.tsx`** — Interactive dimension explanations with hover tooltips
- **`Navbar.tsx`** — Shared navigation component with radar/tools toggle and version info

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

- **Auto-selection:** If user hasn't selected tools, show top 5 by rating (page.tsx:40-41)
- **Max 5 tools:** Radar comparison limited to 5 tools (page.tsx:23, RadarView.tsx:23)
- **Dimension filtering:** User can hide dimensions via checkboxes; chart updates dynamically
- **Evaluation status badges:** Display color-coded status from Notion on both tools page and radar tool details
- **Page-based scrolling:** Radar page uses natural page scrolling instead of fixed containers
- **Graceful fallback:** Missing Notion credentials → demo data, UI still functional

## TypeScript Path Aliases

Uses `@/` alias for `src/` directory (configured via Next.js).

## Utilities

### Status Color Mapping (`src/utils/status.ts`)
Shared utility function `getStatusColor(status: string)` that maps Notion evaluation status values to Tailwind CSS color classes. Used by both tools page and radar tool details to ensure consistent status badge styling across the application.

## Dependency Management

### Current Versions (Last Updated: 2025-01-27)
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
