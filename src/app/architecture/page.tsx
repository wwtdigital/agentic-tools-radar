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
      <main className="mx-auto max-w-4xl px-6 py-16">
        <article className="prose prose-slate max-w-none">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Architecture</h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Two-tier architecture separating AI-assisted research from interactive presentation.
            </p>
          </div>

          <div className="space-y-16">
            <section className="space-y-8">
              <div className="border-l-4 border-blue-500 pl-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Data Collection (Notion Database)</h2>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Research Methodology</h3>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">AI-Powered Research Pipeline</h4>
                <p className="text-gray-700 leading-relaxed">
                  The research process combines multiple AI platforms with desktop tool integration to ensure
                  comprehensive, accurate tool evaluations:
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mr-3">1</span>
                    Strategic Research (Perplexity Deep Research)
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Generate comprehensive market analysis reports on tool categories
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Identify emerging trends and patterns across the agentic tools landscape
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Discover new tools through trend analysis and market monitoring
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Provide competitive context for evaluation criteria
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Synthesize industry insights to inform dimension scoring
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full mr-3">2</span>
                    Database Management via MCP (Model Context Protocol)
                  </h4>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">🔌</span>
                      <div>
                        <p className="font-semibold text-blue-900 mb-2">Desktop Tool Integration</p>
                        <p className="text-blue-800 leading-relaxed">
                          <strong>Model Context Protocol (MCP)</strong> enables Claude Desktop and ChatGPT Desktop
                          to directly access and modify the Notion database through conversational interfaces.
                          This breakthrough integration removes the traditional barrier between AI research and data entry.
                        </p>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <strong>Direct database access</strong> through AI conversations in desktop applications
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <strong>Natural language commands</strong> create/update tool records without manual forms
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <strong>Claude Desktop + ChatGPT Desktop</strong>: Flexible research workflows across platforms
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <strong>Example</strong>: "Add a new tool called Windsurf with AI Autonomy: 4, Contextual Understanding: 5..." updates Notion directly
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <strong>Conversational iteration</strong> allows rapid refinement of tool profiles
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <strong>Zero-friction workflow</strong>: Research insights flow directly into structured data
                    </li>
                  </ul>

                  <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mt-6">
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">⚡</span>
                      <div>
                        <p className="font-semibold text-green-900 mb-3">MCP Advantage</p>
                        <div className="text-green-800 space-y-2">
                          <p className="text-sm">
                            <strong>Traditional workflow:</strong> Research → Copy notes → Open browser → Navigate to Notion →
                            Find database → Click add → Fill 10+ fields → Save
                          </p>
                          <p className="text-sm font-semibold">
                            <strong>MCP workflow:</strong> Research → "Add to database: [tool info]" → Done
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full mr-3">3</span>
                    Row-Level Validation (AI Agents)
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Access individual tool records for detailed fact-checking
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Verify product specifications, URLs, and company information
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Cross-reference claims across multiple AI platforms for accuracy
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Iterative refinement: AI agents review and suggest improvements to existing entries
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Ensure consistency in how dimensions are scored across similar tools
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-6">Research Workflow Example</h4>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <pre className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-mono">
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
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
                <h4 className="text-xl font-semibold text-gray-900 mb-6">Evaluation Framework</h4>
                
                <div className="mb-8">
                  <h5 className="text-lg font-medium text-gray-800 mb-4">Five Dimensions (1-20 scale)</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-1">1</span>
                        <div>
                          <strong className="text-gray-900">AI Autonomy</strong>
                          <p className="text-sm text-gray-600">Degree of independent decision-making and task completion</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-1">2</span>
                        <div>
                          <strong className="text-gray-900">Collaboration</strong>
                          <p className="text-sm text-gray-600">Multi-user workflows and team integration capabilities</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-1">3</span>
                        <div>
                          <strong className="text-gray-900">Contextual Understanding</strong>
                          <p className="text-sm text-gray-600">Ability to understand and leverage codebase/project context</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-1">4</span>
                        <div>
                          <strong className="text-gray-900">Governance</strong>
                          <p className="text-sm text-gray-600">Security, compliance, and administrative controls</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-1">5</span>
                        <div>
                          <strong className="text-gray-900">User Interface</strong>
                          <p className="text-sm text-gray-600">User experience, accessibility, and interaction patterns</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h5 className="text-lg font-medium text-gray-800 mb-4">Scoring Methodology</h5>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Metrics grounded in internal evaluation criteria (our team's use cases and requirements)
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Informed by observed market trends and competitive positioning
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Relative scoring: tools compared within categories for consistency
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Formula-driven overall rating (0-100) computed from dimension scores in Notion
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-lg font-medium text-gray-800 mb-4">Quality Assurance</h5>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Multi-platform validation prevents single-source bias
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Conversational refinement through MCP enables iterative improvement
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Notion's version history tracks how evaluations evolve
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Deep research reports provide audit trail for scoring decisions
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                  <h5 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h6 className="font-semibold text-gray-900 mb-2">Research velocity</h6>
                      <p className="text-sm text-gray-600">AI agents + MCP accelerate data collection 10x vs. manual research</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h6 className="font-semibold text-gray-900 mb-2">Quality</h6>
                      <p className="text-sm text-gray-600">Multi-platform validation ensures accuracy and reduces bias</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h6 className="font-semibold text-gray-900 mb-2">Flexibility</h6>
                      <p className="text-sm text-gray-600">Desktop tool integration enables rapid iteration without technical barriers</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h6 className="font-semibold text-gray-900 mb-2">Context</h6>
                      <p className="text-sm text-gray-600">Deep research provides market understanding beyond individual tools</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h6 className="font-semibold text-gray-900 mb-2">Collaboration</h6>
                      <p className="text-sm text-gray-600">Team members can review and discuss entries via Notion UI</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h6 className="font-semibold text-gray-900 mb-2">Auditability</h6>
                      <p className="text-sm text-gray-600">Complete edit history and research trail maintained</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <div className="border-l-4 border-green-500 pl-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Presentation Layer (Next.js Application)</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Tech Stack</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Framework</span>
                      <span className="text-sm text-gray-600">Next.js 15.5.6 + React 18.3.1 + TypeScript 5.5.4</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Deployment</span>
                      <span className="text-sm text-gray-600">Vercel (serverless, global CDN)</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Visualization</span>
                      <span className="text-sm text-gray-600">Nivo 0.99.0 (D3-based radar charts)</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Styling</span>
                      <span className="text-sm text-gray-600">Tailwind CSS 3.4.10</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Data Fetching</span>
                      <span className="text-sm text-gray-600">SWR 2.2.5 (client-side caching)</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="font-medium text-gray-700">Validation</span>
                      <span className="text-sm text-gray-600">Zod 3.23.8 (runtime type safety)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Key Features</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Data Pipeline</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• <strong>Build-time generation:</strong> Scripts fetch Notion data at build time</li>
                        <li>• <strong>Production:</strong> Serves pre-generated static snapshots for fast, reliable responses</li>
                        <li>• <strong>Development:</strong> Live Notion API queries for real-time updates</li>
                        <li>• <strong>Fallback:</strong> Demo data when Notion credentials unavailable</li>
                        <li>• <strong>Validation:</strong> Zod schema ensures type safety across all data sources</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Interactive Radar (<code className="bg-gray-100 px-2 py-1 rounded text-sm">/radar</code>)</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Compare up to 5 tools (or all tools in category filter)</li>
                        <li>• Tool logos via favicon API with smart fallbacks</li>
                        <li>• Smart collision detection with auto-stacking</li>
                        <li>• PNG export functionality via overlay button</li>
                        <li>• Dynamic dimension filtering (minimum 3 required)</li>
                        <li>• Page-based scrolling for natural navigation</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">All Tools View (<code className="bg-gray-100 px-2 py-1 rounded text-sm">/tools</code>)</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Comprehensive listing grouped by category</li>
                        <li>• Smart score display (shows both scores when they differ)</li>
                        <li>• Color-coded evaluation status badges</li>
                        <li>• Consistent card layout with tool details</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">User Interface</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Unified drawer (tools, filters, dimensions)</li>
                        <li>• Category-grouped selection with bulk actions</li>
                        <li>• Real-time filtering (category, status, recency)</li>
                        <li>• Dynamic dimension visibility controls</li>
                        <li>• Status badges with Notion color mapping (8 evaluation states)</li>
                        <li>• "About Scores" documentation explaining scoring methodology</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <div className="border-l-4 border-purple-500 pl-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Data Flow</h2>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-8">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <pre className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-mono">
{`AI Research Layer
├── Perplexity Desktop → Market analysis & trend reports
├── Claude Desktop (MCP) → Conversational database updates
└── ChatGPT Desktop (MCP) → Fact validation & refinement
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
React UI (Radar + Tools Pages)`}
                  </pre>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <div className="border-l-4 border-orange-500 pl-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Benefits</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mr-3">Research</span>
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <div>
                        <strong>Velocity</strong>: AI-assisted research + MCP desktop integration dramatically accelerates data collection
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <div>
                        <strong>Accuracy</strong>: Multi-platform validation ensures quality
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <div>
                        <strong>Scalability</strong>: New tools added quickly through AI workflow
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full mr-3">Technology</span>
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <div>
                        <strong>Type Safety</strong>: TypeScript + Zod prevent runtime errors
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <div>
                        <strong>Performance</strong>: Build-time snapshots eliminate API latency in production, SWR minimizes client requests
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <div>
                        <strong>Reliability</strong>: Static snapshots ensure consistent data even during Notion API outages
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <div>
                        <strong>Maintainability</strong>: No database/servers to manage
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <div>
                        <strong>Cost</strong>: Pay-per-use serverless model, reduced API calls in production
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full mr-3">Operations</span>
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <div>
                        <strong>Zero-downtime deploys</strong>: Vercel auto-deploy on git push with fresh Notion data on every build
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <div>
                        <strong>Team collaboration</strong>: Non-technical users edit via Notion
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <div>
                        <strong>Audit ready</strong>: Complete edit history maintained in Notion
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <div>
                        <strong>Fast iteration</strong>: Changes flow to production on next deploy (automatic snapshot refresh)
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <div>
                        <strong>Developer experience</strong>: Live API in development, cached snapshots in production
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <div className="border-l-4 border-indigo-500 pl-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Tech Stack Summary</h2>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Layer</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Technology</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Version</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Research</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Notion MCP, Perplexity</td>
                        <td className="px-6 py-4 text-sm text-gray-600">-</td>
                        <td className="px-6 py-4 text-sm text-gray-600">AI-assisted data collection</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Data</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Notion Database</td>
                        <td className="px-6 py-4 text-sm text-gray-600">API v2.2.15</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Source of truth with version control</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Build</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Node.js scripts</td>
                        <td className="px-6 py-4 text-sm text-gray-600">-</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Static snapshot generation (prebuild)</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Storage</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Static JSON</td>
                        <td className="px-6 py-4 text-sm text-gray-600">-</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Production data cache (tools-snapshot.json)</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">API</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Next.js Server Routes</td>
                        <td className="px-6 py-4 text-sm text-gray-600">15.5.6</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Transform and validate</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Frontend</td>
                        <td className="px-6 py-4 text-sm text-gray-600">React + TypeScript</td>
                        <td className="px-6 py-4 text-sm text-gray-600">18.3.1 + 5.5.4</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Interactive UI</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Visualization</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Nivo</td>
                        <td className="px-6 py-4 text-sm text-gray-600">0.99.0</td>
                        <td className="px-6 py-4 text-sm text-gray-600">D3-based radar charts</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Styling</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Tailwind CSS</td>
                        <td className="px-6 py-4 text-sm text-gray-600">3.4.10</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Utility-first CSS</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Deploy</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Vercel</td>
                        <td className="px-6 py-4 text-sm text-gray-600">-</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Serverless hosting + CDN</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Validation</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Zod</td>
                        <td className="px-6 py-4 text-sm text-gray-600">3.23.8</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Runtime type safety</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Cache</td>
                        <td className="px-6 py-4 text-sm text-gray-600">SWR</td>
                        <td className="px-6 py-4 text-sm text-gray-600">2.2.5</td>
                        <td className="px-6 py-4 text-sm text-gray-600">Client-side data management</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">Export</td>
                        <td className="px-6 py-4 text-sm text-gray-600">html-to-image</td>
                        <td className="px-6 py-4 text-sm text-gray-600">1.11.13</td>
                        <td className="px-6 py-4 text-sm text-gray-600">PNG chart export</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <div className="bg-gradient-to-r from-slate-50 to-gray-50 border-l-4 border-slate-500 rounded-r-lg p-8">
                <div className="flex items-start">
                  <span className="text-3xl mr-4">🏗️</span>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">Architecture Philosophy</h3>
                    <p className="text-slate-700 leading-relaxed">
                      Combine AI-assisted research with desktop tool integration (MCP) for rapid, accurate data collection,
                      paired with modern web infrastructure for robust, scalable delivery.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-16 pt-8 border-t border-gray-200 text-center">
              <a
                href="/radar"
                className="inline-flex items-center bg-black text-white px-8 py-4 rounded-lg hover:bg-slate-800 transition-colors font-medium text-lg"
              >
                View the Radar
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
