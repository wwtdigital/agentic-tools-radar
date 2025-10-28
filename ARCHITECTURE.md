# Agentic Developer Tools Radar - Architecture

## Overview

Two-tier architecture separating AI-assisted research from interactive presentation.

---

## 1. Data Collection (Notion Database)

### Research Methodology

**AI-Powered Research Pipeline:**
- **Notion MCP** (Claude/ChatGPT): Conversational database updates via Model Context Protocol
- **Perplexity Deep Research**: Market analysis and trend identification
- **Row-level validation**: AI agents verify facts and specifications per tool

**Evaluation Framework:**
- Five dimensions (1-5 scale): Autonomy, Collaboration, Context, Governance, Interface
- Metrics based on internal evaluation criteria and observed market trends
- Formula-driven overall rating computed from dimension scores

**Benefits:**
- AI agents accelerate research 10x vs. manual process
- MCP enables natural language database updates
- Team collaboration via Notion UI
- Built-in version control and audit trail

---

## 2. Presentation Layer (Next.js Application)

### Stack
- **Framework**: Next.js 15 + React 18 + TypeScript
- **Deployment**: Vercel (serverless, global CDN)
- **Visualization**: Nivo (D3-based radar charts)
- **Data Fetching**: SWR (client-side caching)
- **Validation**: Zod (runtime type safety)

### Key Features

**API Integration** (`/api/tools`)
- Server-side Notion query (up to 100 tools)
- Schema validation and data transformation
- Graceful fallback to demo data

**Interactive Radar**
- Compare up to 5 tools across dimensions
- Tool logos via favicon API
- Smart collision detection with auto-stacking

**User Interface**
- Unified drawer (tools, filters, dimensions)
- Category-grouped selection with bulk actions
- Real-time filtering (category, status, recency)
- Dynamic dimension visibility controls

---

## Data Flow

```
AI Research Layer
├── Notion MCP → Conversational updates
├── Perplexity → Market analysis
└── AI Validation → Fact checking
        ↓
Notion Database (Source of Truth)
        ↓
Next.js API (/api/tools)
        ↓
SWR Cache (Client)
        ↓
React UI (Radar + Controls)
```

---

## Key Benefits

### Research
- **Velocity**: AI-assisted research dramatically accelerates data collection
- **Accuracy**: Multi-platform validation ensures quality
- **Scalability**: New tools added quickly through AI workflow

### Technology
- **Type Safety**: TypeScript + Zod prevent runtime errors
- **Performance**: Serverless auto-scales, SWR minimizes API calls
- **Maintainability**: No database/servers to manage
- **Cost**: Pay-per-use serverless model

### Operations
- **Zero-downtime deploys**: Vercel auto-deploy on git push
- **Team collaboration**: Non-technical users edit via Notion
- **Audit ready**: Complete edit history maintained
- **Fast iteration**: Changes flow instantly to production

---

## Tech Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Research | Notion MCP, Perplexity | AI-assisted data collection |
| Data | Notion Database | Source of truth with version control |
| API | Next.js Server Routes | Transform and validate |
| Frontend | React + TypeScript | Interactive UI |
| Visualization | Nivo | D3-based radar charts |
| Deploy | Vercel | Serverless hosting + CDN |
| Validation | Zod | Runtime type safety |
| Cache | SWR | Client-side data management |

---

**Architecture Philosophy**: Combine AI-assisted research for rapid, accurate data collection with modern web infrastructure for robust, scalable delivery.
