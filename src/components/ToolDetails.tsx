"use client";
import { useState } from "react";
import Link from "next/link";
import { DIMENSION_DESCRIPTIONS } from "@/components/DimensionTooltip";
import { ToolLogo } from "@/components/ToolLogo";
import { getStatusColor } from "@/utils/status";
import { generateSlug } from "@/utils/slug";

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
  finalScore?: number | null;
};

const DIMENSION_LABELS = [
  { key: "autonomy", label: "AI Autonomy" },
  { key: "collaboration", label: "Collaboration" },
  { key: "context", label: "Contextual Understanding" },
  { key: "governance", label: "Governance" },
  { key: "interface", label: "User Interface" }
] as const;

export function ToolDetails({ tools }: { tools: Tool[] }) {
  const [showScoreInfo, setShowScoreInfo] = useState(false);

  if (tools.length === 0) {
    return (
      <div className="mt-6 text-center text-slate-500 text-sm py-8">
        Select tools to view detailed ratings
      </div>
    );
  }

  return (
    <div className="space-y-4 flex flex-col h-full">
      <div className="bg-white py-2 border-b flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-slate-900">Tool Details</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowScoreInfo(!showScoreInfo)}
              className="px-3 py-2 rounded border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-colors text-slate-700 text-sm font-medium flex items-center gap-1.5"
              aria-expanded={showScoreInfo}
              aria-label="Learn about scoring methodology"
            >
              <svg aria-hidden="true" focusable="false" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              About Scores
            </button>
            <a
              href="/tools"
              className="px-4 py-2 rounded border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-colors text-slate-700 text-sm font-medium"
              title="View all tools"
            >
              View All
            </a>
          </div>
        </div>

        {/* About Scores Section - Expanded Content */}
        {showScoreInfo && (
          <div className="mt-2 pt-3 border-t border-slate-200 space-y-3 text-sm">
            <div>
              <div className="font-semibold text-slate-900 mb-1">Weighted Score (0-100)</div>
              <p className="text-slate-600 leading-relaxed">
                Risk-adjusted rating that accounts for evaluation status and validation confidence.
                Tools with higher maturity (e.g., "Adopted") maintain their full capability scores,
                while emerging or unvalidated tools receive discounts based on confidence multipliers.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <div className="font-semibold text-slate-900 mb-1">Rating (0-100)</div>
              <p className="text-slate-600 leading-relaxed">
                Pure capability score based on the tool's technical features and performance across
                five dimensions: AI Autonomy, Collaboration, Contextual Understanding, Governance,
                and User Interface. This score does not account for validation level or enterprise readiness.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <div className="font-semibold text-slate-900 mb-1">Confidence Multipliers</div>
              <div className="text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span>Adopted:</span>
                  <span className="font-medium">100%</span>
                </div>
                <div className="flex justify-between">
                  <span>Reviewed:</span>
                  <span className="font-medium">95%</span>
                </div>
                <div className="flex justify-between">
                  <span>Active:</span>
                  <span className="font-medium">85%</span>
                </div>
                <div className="flex justify-between">
                  <span>Feature Risk:</span>
                  <span className="font-medium">80%</span>
                </div>
                <div className="flex justify-between">
                  <span>Deferred:</span>
                  <span className="font-medium">75%</span>
                </div>
                <div className="flex justify-between">
                  <span>Emerging:</span>
                  <span className="font-medium">70%</span>
                </div>
                <div className="flex justify-between">
                  <span>Watchlist:</span>
                  <span className="font-medium">60%</span>
                </div>
                <div className="flex justify-between">
                  <span>Not Enterprise Viable:</span>
                  <span className="font-medium">40%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="space-y-4 overflow-y-auto pr-3" style={{ maxHeight: 'calc(100vh - 150px)' }}>
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={`/tools/${generateSlug(tool.tool)}`}
            className="block border border-slate-200 rounded-lg p-4 bg-white hover:shadow-md hover:border-blue-300 transition-all overflow-visible group cursor-pointer"
          >
            <div className="flex items-start gap-3 mb-3">
              <ToolLogo
                toolName={tool.tool}
                companyName={tool.company}
                productUrl={tool.urls?.product}
                size="lg"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {tool.tool}
                </h3>
                {tool.company && (
                  <p className="text-sm text-slate-600">{tool.company}</p>
                )}
              </div>
              {(() => {
                const hasWeighted = tool.finalScore !== null && tool.finalScore !== undefined;
                const hasRating = tool.rating !== null && tool.rating !== undefined;
                const scoresDiffer = hasWeighted && hasRating && Math.abs(tool.finalScore! - tool.rating!) > 0.1;

                if (!hasWeighted && !hasRating) return null;

                return (
                  <div className="flex flex-col items-end flex-shrink-0">
                    {scoresDiffer ? (
                      // Show both scores when they differ (weighted primary)
                      <>
                        <div className="flex items-center gap-2 text-slate-900">
                          <span className="text-2xl font-bold">{tool.finalScore!.toFixed(1)}</span>
                          <span className="text-slate-400">|</span>
                          <span className="text-lg font-semibold text-slate-600">{tool.rating!.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                          <span>Weighted</span>
                          <span>|</span>
                          <span>Rating</span>
                        </div>
                      </>
                    ) : (
                      // Show single score when they're the same
                      <>
                        <div className="text-2xl font-bold text-slate-900">
                          {(hasWeighted ? tool.finalScore! : tool.rating!).toFixed(1)}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {hasWeighted && hasRating ? 'Score' : hasWeighted ? 'Weighted' : 'Rating'}
                        </div>
                      </>
                    )}
                  </div>
                );
              })()}
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
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (tool.urls?.product) window.open(tool.urls.product, '_blank', 'noopener,noreferrer');
                      }}
                      className="text-blue-600 hover:text-blue-800 hover:underline z-10 relative cursor-pointer bg-transparent border-0 p-0 font-inherit"
                    >
                      Product →
                    </button>
                  )}
                  {tool.urls?.docs && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (tool.urls?.docs) window.open(tool.urls.docs, '_blank', 'noopener,noreferrer');
                      }}
                      className="text-blue-600 hover:text-blue-800 hover:underline z-10 relative cursor-pointer bg-transparent border-0 p-0 font-inherit"
                    >
                      Documentation →
                    </button>
                  )}
                  {tool.urls?.company && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (tool.urls?.company) window.open(tool.urls.company, '_blank', 'noopener,noreferrer');
                      }}
                      className="text-blue-600 hover:text-blue-800 hover:underline z-10 relative cursor-pointer bg-transparent border-0 p-0 font-inherit"
                    >
                      Company →
                    </button>
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
          </Link>
        ))}
      </div>
    </div>
  );
}
