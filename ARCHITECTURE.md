# Agentic Developer Tools Radar - Architecture

## Overview

Two-tier architecture separating AI-assisted research from interactive presentation.

---

## 1. Data Collection (Notion Database)

### Research Methodology

**AI-Powered Research Pipeline:**

The research process combines multiple AI platforms to ensure comprehensive, accurate tool evaluations:

**1. Strategic Research (Perplexity Deep Research)**
- Generate comprehensive market analysis reports on tool categories
- Identify emerging trends and patterns across the agentic tools landscape
- Discover new tools through trend analysis and market monitoring
- Provide competitive context for evaluation criteria
- Synthesize industry insights to inform dimension scoring

**2. Database Management (Notion MCP)**
- **Model Context Protocol** enables direct database access through AI conversations
- Natural language commands create/update tool records without manual forms
- Used in both Claude and ChatGPT for flexible research workflows
- Example: "Add a new tool called X with these dimensions..." updates Notion directly
- Conversational iteration allows rapid refinement of tool profiles
- MCP removes friction between research insights and data entry

**3. Row-Level Validation (AI Agents)**
- Access individual tool records for detailed fact-checking
- Verify product specifications, URLs, and company information
- Cross-reference claims across multiple AI platforms for accuracy
- Iterative refinement: AI agents review and suggest improvements to existing entries
- Ensure consistency in how dimensions are scored across similar tools

**Research Workflow Example:**
```
1. Perplexity: "Research agentic IDE assistants released in Q4 2024"
   → Generates comprehensive report with 10+ tools and trend analysis

2. Claude (with Notion MCP): "Create entries for Windsurf, Cursor, and Copilot"
   → Conversationally populates database with structured data

3. ChatGPT (with Notion MCP): "Review the Windsurf entry and validate URLs"
   → Verifies facts and updates fields as needed

4. Scoring: Apply evaluation framework based on research findings
   → Dimension scores informed by capability analysis and market positioning
```

**Evaluation Framework:**

**Five Dimensions (1-20 scale):**
- **AI Autonomy**: Degree of independent decision-making and task completion
- **Collaboration**: Multi-user workflows and team integration capabilities
- **Contextual Understanding**: Ability to understand and leverage codebase/project context
- **Governance**: Security, compliance, and administrative controls
- **User Interface**: User experience, accessibility, and interaction patterns

**Scoring Methodology:**
- Metrics grounded in internal evaluation criteria (our team's use cases and requirements)
- Informed by observed market trends and competitive positioning
- Relative scoring: tools compared within categories for consistency
- Formula-driven overall rating (0-100) computed from dimension scores in Notion

**Quality Assurance:**
- Multi-platform validation prevents single-source bias
- Conversational refinement through MCP enables iterative improvement
- Notion's version history tracks how evaluations evolve
- Deep research reports provide audit trail for scoring decisions

**Benefits:**
- **Research velocity**: AI agents accelerate data collection 10x vs. manual research
- **Quality**: Multi-platform validation ensures accuracy and reduces bias
- **Flexibility**: MCP enables rapid iteration without technical barriers
- **Context**: Deep research provides market understanding beyond individual tools
- **Collaboration**: Team members can review and discuss entries via Notion UI
- **Auditability**: Complete edit history and research trail maintained

---

## 2. Presentation Layer (Next.js Application)

### Stack
- **Framework**: Next.js 15.5.6 + React 18.3.1 + TypeScript 5.5.4
- **Deployment**: Vercel (serverless, global CDN)
- **Visualization**: Nivo 0.99.0 (D3-based radar charts)
- **Data Fetching**: SWR 2.2.5 (client-side caching)
- **Validation**: Zod 3.23.8 (runtime type safety)
- **Styling**: Tailwind CSS 3.4.10

### Key Features

**Data Pipeline**
- **Build-time generation**: `scripts/generate-static-data.js` runs as prebuild step
- **Production**: Serves pre-generated snapshot from `src/data/tools-snapshot.json` for fast, reliable responses
- **Development**: Live Notion API queries for real-time updates
- **Fallback**: Demo data when Notion credentials unavailable
- **Validation**: Zod schema ensures type safety across all data sources

**Interactive Radar** (`/radar`)
- Compare up to 5 tools (or all tools in category filter)
- Tool logos via favicon API with fallback to initials
- Smart collision detection with auto-stacking
- Interactive dimension tooltips with detailed explanations
- PNG export functionality via overlay button
- Dynamic dimension filtering (minimum 3 dimensions required)
- Page-based scrolling for natural navigation

**All Tools View** (`/tools`)
- Comprehensive listing grouped by category
- Smart score display (hides redundant scores for better UX)
- Color-coded evaluation status badges matching Notion colors
- Consistent card layout with tool details

**Scoring Intelligence**
- **Dual scoring system**:
  - `rating`: Pure capability score (0-100)
  - `finalScore`: Risk-adjusted weighted score accounting for evaluation status
- **Smart display logic**:
  - Shows both scores when they differ by >0.1
  - Shows single score when identical (e.g., Adopted tools at 100% confidence)
- **"About Scores" documentation**: Expandable section explaining methodology

**User Interface**
- Unified drawer (tools, filters, dimensions)
- Category-grouped selection with bulk actions
- Real-time filtering (category, status, recency)
- Dynamic dimension visibility controls
- Mobile warning banner for optimal desktop experience
- Dedicated architecture documentation page (`/architecture`)
- Status badges with Notion color mapping (8 evaluation states)

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
        ├─→ [DEV] Live API query → Next.js API
        │
        └─→ [PROD] Build-time snapshot generation
                   (scripts/generate-static-data.js)
                   ↓
            Static JSON (src/data/tools-snapshot.json)
                   ↓
            Next.js API (/api/tools)
        ↓
SWR Cache (Client)
        ↓
React UI (Radar + Tools Pages)
```

---

## Key Benefits

### Research
- **Velocity**: AI-assisted research dramatically accelerates data collection
- **Accuracy**: Multi-platform validation ensures quality
- **Scalability**: New tools added quickly through AI workflow

### Technology
- **Type Safety**: TypeScript + Zod prevent runtime errors
- **Performance**:
  - Build-time snapshot generation eliminates API latency in production
  - Serverless auto-scales, SWR minimizes client requests
  - Static JSON responses are lightning-fast and cacheable
- **Reliability**: Static snapshots ensure consistent data even during Notion API outages
- **Maintainability**: No database/servers to manage
- **Cost**: Pay-per-use serverless model, reduced API calls in production

### Operations
- **Zero-downtime deploys**: Vercel auto-deploy on git push with fresh Notion data on every build
- **Team collaboration**: Non-technical users edit via Notion
- **Audit ready**: Complete edit history maintained in Notion
- **Fast iteration**: Changes flow to production on next deploy (automatic snapshot refresh)
- **Developer experience**: Live API in development, cached snapshots in production

---

## Tech Stack Summary

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Research | Notion MCP, Perplexity | - | AI-assisted data collection |
| Data | Notion Database | API v2.2.15 | Source of truth with version control |
| Build | Node.js scripts | - | Static snapshot generation (prebuild) |
| Storage | Static JSON | - | Production data cache (tools-snapshot.json) |
| API | Next.js Server Routes | 15.5.6 | Transform and validate |
| Frontend | React + TypeScript | 18.3.1 + 5.5.4 | Interactive UI |
| Visualization | Nivo | 0.99.0 | D3-based radar charts |
| Styling | Tailwind CSS | 3.4.10 | Utility-first CSS |
| Deploy | Vercel | - | Serverless hosting + CDN |
| Validation | Zod | 3.23.8 | Runtime type safety |
| Cache | SWR | 2.2.5 | Client-side data management |
| Export | html-to-image | 1.11.13 | PNG chart export |

---

**Architecture Philosophy**: Combine AI-assisted research for rapid, accurate data collection with modern web infrastructure for robust, scalable delivery.
