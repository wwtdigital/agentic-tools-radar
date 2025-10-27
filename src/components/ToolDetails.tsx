"use client";
import { DimensionTooltip } from "@/components/DimensionTooltip";
import { ToolLogo } from "@/components/ToolLogo";

type Tool = {
  id: string;
  tool: string;
  company?: string;
  category: string;
  status?: string;
  urls?: { product?: string; docs?: string; company?: string; logo?: string };
  quickTake?: string;
  dims: { autonomy: number; collaboration: number; context: number; governance: number; interface: number };
  rating?: number | null;
};

const DIMENSION_LABELS = [
  { key: "autonomy", label: "Autonomy" },
  { key: "collaboration", label: "Collaboration" },
  { key: "context", label: "Context" },
  { key: "governance", label: "Governance" },
  { key: "interface", label: "Interface" }
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
      <h2 className="text-lg font-semibold text-slate-900 sticky top-0 bg-white py-2 border-b">Tool Details</h2>
      <div className="space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 150px)' }}>
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="border border-slate-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3 mb-3">
              <ToolLogo
                logoUrl={tool.urls?.logo}
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

            <div className="space-y-1 mb-3">
              {DIMENSION_LABELS.map(({ key, label }) => {
                const value = tool.dims[key];
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between bg-slate-50 rounded px-3 py-2"
                  >
                    <div className="text-xs text-slate-600 flex items-center gap-1">
                      {label}
                      <DimensionTooltip dimension={label} />
                    </div>
                    <div className="text-base font-semibold text-slate-900">
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
