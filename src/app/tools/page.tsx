"use client";
import useSWR from "swr";
import { useMemo } from "react";
import { DIMENSION_DESCRIPTIONS } from "@/components/DimensionTooltip";
import { ToolLogo } from "@/components/ToolLogo";

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

  if (isLoading) {
    return (
      <>
        <nav className="w-full bg-black text-white">
          <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">All Agentic Developer Tools</h1>
            <div className="flex gap-3">
              <a
                href="/radar"
                className="px-4 py-2 rounded border border-white/30 hover:bg-white/10 transition-colors text-white text-sm font-medium"
              >
                Radar
              </a>
              <a
                href="/tools"
                className="px-4 py-2 rounded border border-white text-white bg-white/10 text-sm font-medium"
              >
                Tools
              </a>
            </div>
          </div>
        </nav>
        <main className="mx-auto max-w-7xl p-6">
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
      <nav className="w-full bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">All Agentic Developer Tools</h1>
          <div className="flex gap-3">
            <a
              href="/radar"
              className="px-4 py-2 rounded border border-white/30 hover:bg-white/10 transition-colors text-white text-sm font-medium"
            >
              Radar
            </a>
            <a
              href="/tools"
              className="px-4 py-2 rounded border border-white text-white bg-white/10 text-sm font-medium"
            >
              Tools
            </a>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl p-6">
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
                    className="border border-slate-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow flex flex-col"
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

                    <div className="space-y-1 mb-3 flex-1">
                      {DIMENSION_LABELS.map(({ key, label }) => {
                        const value = tool.dims[key];
                        const description = DIMENSION_DESCRIPTIONS[label as keyof typeof DIMENSION_DESCRIPTIONS];
                        return (
                          <div
                            key={key}
                            className="flex items-center justify-between bg-slate-50 rounded px-3 py-2"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-medium text-slate-900">
                                {label}
                              </div>
                              {description && (
                                <div className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                                  {description}
                                </div>
                              )}
                            </div>
                            <div className="text-xl font-semibold text-slate-900 ml-3 pl-3 border-l-2 border-slate-300 flex-shrink-0">
                              {value}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {tool.urls && (
                      <div className="flex flex-wrap gap-3 text-xs pt-3 border-t border-slate-200">
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
