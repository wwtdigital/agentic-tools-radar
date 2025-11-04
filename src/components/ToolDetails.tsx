"use client";
import { DIMENSION_DESCRIPTIONS } from "@/components/DimensionTooltip";
import { ToolLogo } from "@/components/ToolLogo";

import { getStatusColor } from "@/utils/status";

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
      <div className="flex items-center justify-between sticky top-0 bg-white py-2 border-b z-10">
        <h2 className="text-lg font-semibold text-slate-900">Tool Details</h2>
        <a
          href="/tools"
          className="px-4 py-2 rounded border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-colors text-slate-700 text-sm font-medium"
          title="View all tools"
        >
          View All
        </a>
      </div>
      <div className="space-y-4 pb-8">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="border border-slate-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow overflow-visible"
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

            <div className="grid grid-cols-2 gap-2 mb-3 overflow-visible">
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
                    </div>
                    <div className="text-lg font-semibold text-slate-900 ml-2 pl-2 border-l-2 border-slate-300 flex-shrink-0">
                      {value}
                    </div>
                  </div>
                );
              })}
            </div>

            {tool.urls && (
              <div className="flex items-center justify-between gap-3 text-xs">
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
  );
}
