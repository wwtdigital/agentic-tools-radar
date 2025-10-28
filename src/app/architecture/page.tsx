import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architecture - Agentic Developer Tools Radar",
  description: "AI-assisted research methodology and technical architecture combining Notion MCP, Perplexity, and modern web infrastructure",
};

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Warning */}
      <div className="md:hidden bg-yellow-50 border-b border-yellow-200 px-4 py-3">
        <p className="text-sm text-yellow-800 text-center">
          <strong>Desktop Recommended:</strong> This site is optimized for desktop viewing. Some content may be difficult to read on mobile devices.
        </p>
      </div>

      {/* Header */}
      <nav className="w-full bg-black text-white">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <h1 className="text-xl font-bold">Agentic Developer Tools Radar - Architecture</h1>
        </div>
      </nav>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-6 py-12">
        <article className="prose prose-slate max-w-none">
          <h1>Architecture</h1>

          <p className="lead">
            Two-tier architecture separating AI-assisted research from interactive presentation.
          </p>

          <hr />

          <h2>1. Data Collection (Notion Database)</h2>

          <h3>Research Methodology</h3>

          <p><strong>AI-Powered Research Pipeline:</strong></p>

          <p>
            The research process combines multiple AI platforms with desktop tool integration to ensure
            comprehensive, accurate tool evaluations:
          </p>

          <h4>1. Strategic Research (Perplexity Deep Research)</h4>
          <ul>
            <li>Generate comprehensive market analysis reports on tool categories</li>
            <li>Identify emerging trends and patterns across the agentic tools landscape</li>
            <li>Discover new tools through trend analysis and market monitoring</li>
            <li>Provide competitive context for evaluation criteria</li>
            <li>Synthesize industry insights to inform dimension scoring</li>
          </ul>

          <h4>2. Database Management via MCP (Model Context Protocol)</h4>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
            <p className="font-semibold text-blue-900 mb-2">🔌 Desktop Tool Integration</p>
            <p className="text-sm text-blue-800">
              <strong>Model Context Protocol (MCP)</strong> enables Claude Desktop and ChatGPT Desktop
              to directly access and modify the Notion database through conversational interfaces.
              This breakthrough integration removes the traditional barrier between AI research and data entry.
            </p>
          </div>

          <ul>
            <li><strong>Direct database access</strong> through AI conversations in desktop applications</li>
            <li><strong>Natural language commands</strong> create/update tool records without manual forms</li>
            <li><strong>Claude Desktop + ChatGPT Desktop</strong>: Flexible research workflows across platforms</li>
            <li><strong>Example</strong>: "Add a new tool called Windsurf with Autonomy: 4, Context: 5..." updates Notion directly</li>
            <li><strong>Conversational iteration</strong> allows rapid refinement of tool profiles</li>
            <li><strong>Zero-friction workflow</strong>: Research insights flow directly into structured data</li>
          </ul>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
            <p className="font-semibold text-green-900 mb-2">⚡ MCP Advantage</p>
            <p className="text-sm text-green-800">
              Traditional workflow: Research → Copy notes → Open browser → Navigate to Notion →
              Find database → Click add → Fill 10+ fields → Save<br /><br />
              <strong>MCP workflow</strong>: Research → "Add to database: [tool info]" → Done
            </p>
          </div>

          <h4>3. Row-Level Validation (AI Agents)</h4>
          <ul>
            <li>Access individual tool records for detailed fact-checking</li>
            <li>Verify product specifications, URLs, and company information</li>
            <li>Cross-reference claims across multiple AI platforms for accuracy</li>
            <li>Iterative refinement: AI agents review and suggest improvements to existing entries</li>
            <li>Ensure consistency in how dimensions are scored across similar tools</li>
          </ul>

          <h4>Research Workflow Example:</h4>
          <pre className="bg-slate-50 p-4 rounded-lg text-sm overflow-x-auto">
{`1. Perplexity: "Research agentic IDE assistants released in Q4 2024"
   → Generates comprehensive report with 10+ tools and trend analysis

2. Claude Desktop (with Notion MCP): "Create entries for Windsurf, Cursor, and Copilot"
   → Conversationally populates database with structured data
   → MCP handles all database operations automatically

3. ChatGPT Desktop (with Notion MCP): "Review the Windsurf entry and validate URLs"
   → Verifies facts and updates fields as needed
   → Changes sync instantly to Notion

4. Scoring: Apply evaluation framework based on research findings
   → Dimension scores informed by capability analysis and market positioning`}
          </pre>

          <h4>Evaluation Framework:</h4>

          <p><strong>Five Dimensions (1-5 scale):</strong></p>
          <ul>
            <li><strong>Autonomy</strong>: Degree of independent decision-making and task completion</li>
            <li><strong>Collaboration</strong>: Multi-user workflows and team integration capabilities</li>
            <li><strong>Context</strong>: Ability to understand and leverage codebase/project context</li>
            <li><strong>Governance</strong>: Security, compliance, and administrative controls</li>
            <li><strong>Interface</strong>: User experience, accessibility, and interaction patterns</li>
          </ul>

          <p><strong>Scoring Methodology:</strong></p>
          <ul>
            <li>Metrics grounded in internal evaluation criteria (our team's use cases and requirements)</li>
            <li>Informed by observed market trends and competitive positioning</li>
            <li>Relative scoring: tools compared within categories for consistency</li>
            <li>Formula-driven overall rating computed from dimension scores in Notion</li>
          </ul>

          <p><strong>Quality Assurance:</strong></p>
          <ul>
            <li>Multi-platform validation prevents single-source bias</li>
            <li>Conversational refinement through MCP enables iterative improvement</li>
            <li>Notion's version history tracks how evaluations evolve</li>
            <li>Deep research reports provide audit trail for scoring decisions</li>
          </ul>

          <p><strong>Benefits:</strong></p>
          <ul>
            <li><strong>Research velocity</strong>: AI agents + MCP accelerate data collection 10x vs. manual research</li>
            <li><strong>Quality</strong>: Multi-platform validation ensures accuracy and reduces bias</li>
            <li><strong>Flexibility</strong>: Desktop tool integration enables rapid iteration without technical barriers</li>
            <li><strong>Context</strong>: Deep research provides market understanding beyond individual tools</li>
            <li><strong>Collaboration</strong>: Team members can review and discuss entries via Notion UI</li>
            <li><strong>Auditability</strong>: Complete edit history and research trail maintained</li>
          </ul>

          <hr />

          <h2>2. Presentation Layer (Next.js Application)</h2>

          <h3>Stack</h3>
          <ul>
            <li><strong>Framework</strong>: Next.js 15 + React 18 + TypeScript</li>
            <li><strong>Deployment</strong>: Vercel (serverless, global CDN)</li>
            <li><strong>Visualization</strong>: Nivo (D3-based radar charts)</li>
            <li><strong>Data Fetching</strong>: SWR (client-side caching)</li>
            <li><strong>Validation</strong>: Zod (runtime type safety)</li>
          </ul>

          <h3>Key Features</h3>

          <h4>API Integration (<code>/api/tools</code>)</h4>
          <ul>
            <li>Server-side Notion query (up to 100 tools)</li>
            <li>Schema validation and data transformation</li>
            <li>Graceful fallback to demo data</li>
          </ul>

          <h4>Interactive Radar</h4>
          <ul>
            <li>Compare up to 5 tools across dimensions</li>
            <li>Tool logos via favicon API</li>
            <li>Smart collision detection with auto-stacking</li>
          </ul>

          <h4>User Interface</h4>
          <ul>
            <li>Unified drawer (tools, filters, dimensions)</li>
            <li>Category-grouped selection with bulk actions</li>
            <li>Real-time filtering (category, status, recency)</li>
            <li>Dynamic dimension visibility controls</li>
          </ul>

          <hr />

          <h2>Data Flow</h2>

          <pre className="bg-slate-50 p-4 rounded-lg text-sm overflow-x-auto">
{`AI Research Layer
├── Perplexity Desktop → Market analysis & trend reports
├── Claude Desktop (MCP) → Conversational database updates
└── ChatGPT Desktop (MCP) → Fact validation & refinement
        ↓
Notion Database (Source of Truth)
        ↓
Next.js API (/api/tools)
        ↓
SWR Cache (Client)
        ↓
React UI (Radar + Controls)`}
          </pre>

          <hr />

          <h2>Key Benefits</h2>

          <h3>Research</h3>
          <ul>
            <li><strong>Velocity</strong>: AI-assisted research + MCP desktop integration dramatically accelerates data collection</li>
            <li><strong>Accuracy</strong>: Multi-platform validation ensures quality</li>
            <li><strong>Scalability</strong>: New tools added quickly through AI workflow</li>
          </ul>

          <h3>Technology</h3>
          <ul>
            <li><strong>Type Safety</strong>: TypeScript + Zod prevent runtime errors</li>
            <li><strong>Performance</strong>: Serverless auto-scales, SWR minimizes API calls</li>
            <li><strong>Maintainability</strong>: No database/servers to manage</li>
            <li><strong>Cost</strong>: Pay-per-use serverless model</li>
          </ul>

          <h3>Operations</h3>
          <ul>
            <li><strong>Zero-downtime deploys</strong>: Vercel auto-deploy on git push</li>
            <li><strong>Team collaboration</strong>: Non-technical users edit via Notion</li>
            <li><strong>Audit ready</strong>: Complete edit history maintained</li>
            <li><strong>Fast iteration</strong>: Changes flow instantly to production</li>
          </ul>

          <hr />

          <h2>Tech Stack Summary</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Layer</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Technology</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">Research</td>
                  <td className="px-3 py-4 text-sm text-gray-900">Notion MCP (Claude/ChatGPT Desktop), Perplexity</td>
                  <td className="px-3 py-4 text-sm text-gray-900">AI-assisted data collection via desktop tools</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">Data</td>
                  <td className="px-3 py-4 text-sm text-gray-900">Notion Database</td>
                  <td className="px-3 py-4 text-sm text-gray-900">Source of truth with version control</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">API</td>
                  <td className="px-3 py-4 text-sm text-gray-900">Next.js Server Routes</td>
                  <td className="px-3 py-4 text-sm text-gray-900">Transform and validate</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">Frontend</td>
                  <td className="px-3 py-4 text-sm text-gray-900">React + TypeScript</td>
                  <td className="px-3 py-4 text-sm text-gray-900">Interactive UI</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">Visualization</td>
                  <td className="px-3 py-4 text-sm text-gray-900">Nivo</td>
                  <td className="px-3 py-4 text-sm text-gray-900">D3-based radar charts</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">Deploy</td>
                  <td className="px-3 py-4 text-sm text-gray-900">Vercel</td>
                  <td className="px-3 py-4 text-sm text-gray-900">Serverless hosting + CDN</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">Validation</td>
                  <td className="px-3 py-4 text-sm text-gray-900">Zod</td>
                  <td className="px-3 py-4 text-sm text-gray-900">Runtime type safety</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">Cache</td>
                  <td className="px-3 py-4 text-sm text-gray-900">SWR</td>
                  <td className="px-3 py-4 text-sm text-gray-900">Client-side data management</td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr />

          <div className="bg-slate-50 border-l-4 border-slate-500 p-4 my-6">
            <p className="font-semibold text-slate-900">Architecture Philosophy</p>
            <p className="text-sm text-slate-700 mt-2">
              Combine AI-assisted research with desktop tool integration (MCP) for rapid, accurate data collection,
              paired with modern web infrastructure for robust, scalable delivery.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t text-center">
            <a
              href="/radar"
              className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-slate-800 transition-colors"
            >
              View the Radar →
            </a>
          </div>
        </article>
      </main>
    </div>
  );
}
