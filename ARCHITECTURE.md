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
- Tool logos via favicon API with fallback to initials
- Smart collision detection with auto-stacking
- Interactive dimension tooltips with detailed explanations

**User Interface**
- Unified drawer (tools, filters, dimensions)
- Category-grouped selection with bulk actions
- Real-time filtering (category, status, recency)
- Dynamic dimension visibility controls
- Mobile warning banner for optimal desktop experience
- Dedicated architecture documentation page (`/architecture`)

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
