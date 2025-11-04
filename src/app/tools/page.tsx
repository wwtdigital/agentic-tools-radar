"use client";
import useSWR from "swr";
import { useMemo } from "react";
import { DIMENSION_DESCRIPTIONS } from "@/components/DimensionTooltip";
import { ToolLogo } from "@/components/ToolLogo";
import { Navbar } from "@/components/Navbar";

type Tool = {
  id: string;
  tool: string;
  company?: string;
  category: string;
  status?: string;
  urls?: { product?: string; docs?: string; company?: string };
  quickTake?: string;
  dims: { autonomy: number; collaboration: number; context: number; governance: number; interface: number };
  rating?: number | null;
  lastEdited: string;
};

const DIMENSION_LABELS = [
  { key: "autonomy", label: "AI Autonomy" },
  { key: "collaboration", label: "Collaboration" },
  { key: "context", label: "Contextual Understanding" },
  { key: "governance", label: "Governance" },
  { key: "interface", label: "User Interface" }
] as const;

const fetcher = (u: string) => fetch(u).then(r => r.json());

// Map status values to their Notion colors
const getStatusColor = (status: string) => {
  switch (status) {
    case "Not Enterprise Viable":
      return "bg-red-100 text-red-800 border-red-200";
    case "Watchlist":
      return "bg-gray-100 text-gray-800 border-gray-200";
    case "Emerging":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "Active":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Feature Risk":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "Deferred":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "Adopted":
      return "bg-green-100 text-green-800 border-green-200";
    case "Reviewed":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-slate-100 text-slate-800 border-slate-200";
  }
};

export default function ToolsPage() {
  const { data = [], isLoading } = useSWR<Tool[]>("/api/tools", fetcher);

  // Group tools by category, sorted by rating within each category
  const groupedTools = useMemo(() => {
    const groups: Record<string, Tool[]> = {};
    data.forEach(tool => {
      if (!groups[tool.category]) {
        groups[tool.category] = [];
      }
      groups[tool.category].push(tool);
    });
    // Sort tools within each category by rating
    Object.keys(groups).forEach(category => {
      groups[category].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    });
    return groups;
  }, [data]);

  // Get the most recent lastEdited date
  const latestUpdate = useMemo(() => {
    if (data.length === 0) return null;
    const dates = data.map(t => new Date(t.lastEdited)).filter(d => !isNaN(d.getTime()));
    if (dates.length === 0) return null;
    const latest = new Date(Math.max(...dates.map(d => d.getTime())));
    return latest.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }, [data]);

  if (isLoading) {
    return (
      <>
        <Navbar title="All Agentic Developer Tools" latestUpdate={latestUpdate} currentPage="tools" />
        <main className="p-6">
          <div className="flex items-center justify-center min-h-[600px]">
            <div className="text-center space-y-4">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-slate-900"></div>
              <p className="text-slate-600 text-lg">Loading tools data...</p>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar title="All Agentic Developer Tools" latestUpdate={latestUpdate} currentPage="tools" />

      <main className="p-6">
        {/* Header */}
        <div className="mb-6">
          <p className="text-slate-600">
            Showing <strong className="text-slate-900">{data.length}</strong> tools across <strong className="text-slate-900">{Object.keys(groupedTools).length}</strong> categories
          </p>
        </div>

        {/* Tools Grouped by Category */}
        <div className="space-y-8">
          {Object.keys(groupedTools).sort().map((category) => (
            <div key={category}>
              <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-900">
                {category} <span className="text-sm font-normal text-slate-500">({groupedTools[category].length})</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedTools[category].map((tool) => (
                  <div
                    key={tool.id}
                    className="border border-slate-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow flex flex-col overflow-visible"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <ToolLogo
                        toolName={tool.tool}
                        companyName={tool.company}
                        productUrl={tool.urls?.product}
                        size="lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-slate-900">
                          {tool.tool}
                        </h3>
                        {tool.company && (
                          <p className="text-sm text-slate-600">{tool.company}</p>
                        )}
                        <div className="text-xs text-slate-500 mt-1">
                          {tool.category}
                        </div>
                      </div>
                      {tool.rating !== null && tool.rating !== undefined && (
                        <div className="flex flex-col items-end flex-shrink-0">
                          <div className="text-2xl font-bold text-slate-900">
                            {tool.rating.toFixed(1)}
                          </div>
                          <div className="text-xs text-slate-500">Rating</div>
                        </div>
                      )}
                    </div>

                    {tool.quickTake && (
                      <p className="text-sm text-slate-700 mb-3 leading-relaxed line-clamp-3">
                        {tool.quickTake}
                      </p>
                    )}

                    <div className="grid grid-cols-2 gap-2 mb-3 flex-1 overflow-visible">
                      {DIMENSION_LABELS.map(({ key, label }) => {
                        const value = tool.dims[key];
                        const description = DIMENSION_DESCRIPTIONS[label as keyof typeof DIMENSION_DESCRIPTIONS];
                        return (
                          <div
                            key={key}
                            className="flex items-center justify-between bg-slate-50 rounded px-3 py-2 relative overflow-visible"
                          >
                            <div className="flex-1 min-w-0 flex items-center gap-1">
                              <div className="text-xs font-medium text-slate-900">
                                {label}
                              </div>
                              {description && (
                                <div className="group/tooltip relative inline-block">
                                  <svg className="w-3 h-3 text-slate-400 hover:text-slate-600 cursor-help" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                  </svg>
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded shadow-lg opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity duration-200 w-64 z-50 whitespace-normal">
                                    {description}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900"></div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="text-lg font-semibold text-slate-900 ml-2 pl-2 border-l-2 border-slate-300 flex-shrink-0">
                              {value}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {tool.urls && (
                      <div className="flex items-center justify-between gap-3 text-xs pt-3 border-t border-slate-200">
                        <div className="flex flex-wrap gap-3">
                          {tool.urls.product && (
                            <a
                              href={tool.urls.product}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              Product →
                            </a>
                          )}
                          {tool.urls.docs && (
                            <a
                              href={tool.urls.docs}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              Documentation →
                            </a>
                          )}
                          {tool.urls.company && (
                            <a
                              href={tool.urls.company}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              Company →
                            </a>
                          )}
                        </div>
                        {tool.status && tool.status.trim() !== "" && (
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <span className="text-xs text-slate-500">Evaluation Status:</span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getStatusColor(tool.status)}`}>
                              {tool.status}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
