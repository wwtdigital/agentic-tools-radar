# Agentic Developer Tools — Interactive Radar

An editorial, Notion-powered radar to compare agentic developer tools across five key dimensions. Built with **Next.js 15**, **Nivo**, **Tailwind CSS**, and **SWR**. Ready for **Vercel** deployment.

## Features

### 🎯 Interactive Radar Visualization

- Compare tools across 5 dimensions: AI Autonomy, Collaboration, Contextual Understanding, Governance, and User Interface
- Visual radar chart with tool logos displayed at data points
- Smart logo collision detection with automatic stacking
- **Minimum 3 dimensions required** - ensures meaningful visualizations with visual feedback when limit is reached
- Toggle dimensions on/off to customize the view
- Interactive dimension tooltips with detailed explanations
- **PNG Export** - Download radar chart as high-quality image
- Responsive design optimized for desktop viewing

### 📋 Tools Listing Page

- **Browse all tools** at `/tools` in a comprehensive card-based layout
- **Organized by category** with clear section headers and tool counts
- Each card displays full details: ratings, all dimension scores, quick take, and external links
- Tools automatically sorted by rating within categories
- Easy navigation between radar and tools views via header buttons

### 🔍 Advanced Filtering & Selection

- **Quick Category Filters**: One-click buttons above radar to view all tools in a category
- Category buttons show tool counts (e.g., "IDE Assistants (8)")
- **Category Grouping**: Tools organized by category with collapsible sections in drawer
- **Bulk Selection**: Select/deselect all tools within a category
- **Smart Filters**: Filter by status in dropdown menu
- **Reset Button**: Clear all filters and return to default view
- **Compact Grid**: 4-column responsive layout with tool logos and company info
- **Smart Defaults**: Automatically selects top 5 tools by rating when no tools are selected

### 🎨 Polished UI/UX

- **Unified Navigation**: Seamless switching between Radar and Tools pages via header buttons
- Full-width navigation with slide-down drawer interface
- 70vh drawer with integrated filters and tool selection
- Background scroll lock when drawer is open
- Click-outside-to-close behavior
- Prominent close button with visual feedback
- Tool details panel with links, quick takes, and "View All" button
- Mobile warning banner for optimal desktop experience
- Enhanced logo visibility with darker backgrounds for better contrast

### 📊 Tool Details

- Side-by-side comparison of selected tools (up to 5)
- Tool logos fetched from product URLs via favicon proxy
- Fallback to initials for tools without logos with consistent color generation
- Quick take summaries and direct links to product/docs/company
- "View All" button links to comprehensive tools listing page

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
- **React 18.3.1** — Client components with hooks (useState, useEffect, useMemo)
- **TypeScript 5.5.4** — Full type safety
- **Tailwind CSS 3.4.10** — Utility-first styling
- **Nivo 0.99.0** — Responsive radar charts with custom layers
- **SWR 2.2.5** — Data fetching and caching
- **Notion API 2.2.15** — Database integration

## Project Structure

```text
src/
├── app/
│   ├── api/
│   │   ├── tools/route.ts     # Notion API integration with demo fallback
│   │   └── favicon/route.ts   # Favicon proxy for CORS-free logo fetching
│   ├── radar/page.tsx         # Main radar page with drawer interface
│   ├── tools/page.tsx         # Tools listing page grouped by category
│   ├── architecture/page.tsx  # Architecture documentation page
│   └── not-found.tsx          # 404 page
└── components/
    ├── RadarView.tsx          # Nivo radar chart with custom logo dots
    ├── CompareSelect.tsx      # Category-grouped tool selection grid
    ├── Filters.tsx            # Status filter with tooltips
    ├── ToolDetails.tsx        # Selected tools info panel with ratings
    ├── ToolLogo.tsx           # Logo component with favicon fallbacks
    └── DimensionTooltip.tsx   # Interactive dimension explanations
```

## Notion Database Schema

Required properties:

- **Tool/Name** (Title) — Tool name
- **Company** (Rich Text) — Company name
- **Category** (Select) — Tool category
- **Evaluation Status** (Select) — Current status
- **Product URL, Documentation Link, Company URL** (URL)
- **Quick Take** (Rich Text) — Brief description
- **AI Autonomy, Collaboration, Contextual Understanding, Governance, User Interface** (Number 1-20)
- **Rating** (Formula) — Overall rating calculated 0-100

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
