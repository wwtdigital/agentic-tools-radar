"use client";
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
};

const DIMENSION_LABELS = [
  { key: "autonomy", label: "AI Autonomy" },
  { key: "collaboration", label: "Collaboration" },
  { key: "context", label: "Contextual Understanding" },
  { key: "governance", label: "Governance" },
  { key: "interface", label: "User Interface" }
] as const;

export function ToolDetails({ tools }: { tools: Tool[] }) {
  if (tools.length === 0) {
    return (
      <div className="mt-6 text-center text-slate-500 text-sm py-8">
        Select tools to view detailed ratings
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between sticky top-0 bg-white py-2 border-b">
        <h2 className="text-lg font-semibold text-slate-900">Tool Details</h2>
        <a
          href="/tools"
          className="px-4 py-2 rounded border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-colors text-slate-700 text-sm font-medium"
          title="View all tools"
        >
          View All
        </a>
      </div>
      <div className="space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 150px)' }}>
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="border border-slate-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow"
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
              </div>
              {tool.rating !== null && tool.rating !== undefined && (
                <div className="flex flex-col items-end flex-shrink-0">
                  <div className="text-2xl font-bold text-slate-900">
                    {tool.rating.toFixed(1)}
                  </div>
                  <div className="text-xs text-slate-500">Overall Rating</div>
                </div>
              )}
            </div>

            {tool.quickTake && (
              <p className="text-sm text-slate-700 mb-3 leading-relaxed">
                {tool.quickTake}
              </p>
            )}

            <div className="grid grid-cols-2 gap-2 mb-3">
              {DIMENSION_LABELS.map(({ key, label }) => {
                const value = tool.dims[key];
                const description = DIMENSION_DESCRIPTIONS[label as keyof typeof DIMENSION_DESCRIPTIONS];
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between bg-slate-50 rounded px-3 py-2 relative"
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
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded shadow-lg opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity duration-200 w-64 z-10 whitespace-normal">
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
              <div className="flex flex-wrap gap-3 text-xs">
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
  );
}
