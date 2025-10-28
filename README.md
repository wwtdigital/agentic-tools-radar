# Agentic Developer Tools — Interactive Radar

An editorial, Notion-powered radar to compare agentic developer tools across five key dimensions. Built with **Next.js 15**, **Nivo**, **Tailwind CSS**, and **SWR**. Ready for **Vercel** deployment.

## Features

### 🎯 Interactive Radar Visualization
- Compare tools across 5 dimensions: Autonomy, Collaboration, Context, Governance, and Interface
- Visual radar chart with tool logos displayed at data points
- Smart logo collision detection with automatic stacking
- Toggle dimensions on/off to customize the view

### 🔍 Advanced Filtering & Selection
- **Category Grouping**: Tools organized by category with collapsible sections
- **Bulk Selection**: Select/deselect all tools within a category
- **Smart Filters**: Filter by category, status, and recency (last edited)
- **Compact Grid**: 4-column responsive layout with tool logos and company info

### 🎨 Polished UI/UX
- Full-width navigation with slide-down drawer interface
- 70vh drawer with integrated filters and tool selection
- Background scroll lock when drawer is open
- Click-outside-to-close behavior
- Prominent close button with visual feedback
- Tool details panel with links and quick takes

### 📊 Tool Details
- Side-by-side comparison of selected tools (up to 5)
- Tool logos fetched from product URLs via favicons
- Fallback to initials for tools without logos
- Quick take summaries and direct links to product/docs/company

## Setup

1. Create a Notion integration with **read-only** access to your *Agentic Developer Tools* database.
2. Add env vars (Vercel → Project Settings → Environment Variables):
   - `NOTION_API_KEY` — secret
   - `NOTION_DB_ID`  — the database ID
3. Install & run:
   ```bash
   pnpm i   # or npm i / yarn
   pnpm dev # http://localhost:3000/radar
   ```

> **Demo Mode**: If env vars are missing, `/api/tools` serves demo data so the UI still works.

## Tech Stack

- **Next.js 15.5.6** — App Router with Server Components
- **React 18** — Client components with hooks (useState, useEffect, useMemo)
- **TypeScript** — Full type safety
- **Tailwind CSS 3** — Utility-first styling
- **Nivo 0.99** — Responsive radar charts with custom layers
- **SWR** — Data fetching and caching
- **Notion API 2.3.0** — Database integration

## Project Structure

```
src/
├── app/
│   ├── api/tools/route.ts    # Notion API integration
│   ├── radar/page.tsx         # Main radar page
│   └── not-found.tsx          # 404 page
└── components/
    ├── RadarView.tsx          # Nivo radar chart wrapper
    ├── CompareSelect.tsx      # Tool selection grid
    ├── Filters.tsx            # Category/status/recency filters
    ├── ToolDetails.tsx        # Selected tools info panel
    ├── ToolLogo.tsx           # Logo component with fallbacks
    └── DimensionTooltip.tsx   # Dimension explanations
```

## Notion Database Schema

Required properties:
- **Tool/Name** (Title) — Tool name
- **Company** (Rich Text) — Company name
- **Category** (Select) — Tool category
- **Evaluation Status** (Select) — Current status
- **Product URL, Documentation Link, Company URL** (URL)
- **Quick Take** (Rich Text) — Brief description
- **Autonomy, Collaboration, Context, Governance, Interface** (Number 1-5)
- **Rating** (Formula) — Overall rating

## Development

```bash
# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint
pnpm lint
```

## Deployment

Optimized for Vercel:
1. Connect your GitHub repository
2. Add environment variables in Project Settings
3. Deploy automatically on push to main

## License

Internal use.
