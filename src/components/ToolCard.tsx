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

type ToolCardProps = {
  tool: Tool;
  groupBy: "category" | "status" | "score" | "none";
};

export function ToolCard({ tool, groupBy }: ToolCardProps) {
  const hasWeighted = tool.finalScore !== null && tool.finalScore !== undefined;
  const hasRating = tool.rating !== null && tool.rating !== undefined;
  const scoresDiffer = hasWeighted && hasRating && Math.abs(tool.finalScore! - tool.rating!) > 0.1;

  return (
    <Link
      href={`/tools/${generateSlug(tool.tool)}`}
      className="block border border-slate-200 rounded-lg p-4 bg-white hover:shadow-md hover:border-blue-300 transition-all overflow-visible relative group cursor-pointer"
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
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
            {groupBy === "status" ? (
              <span>{tool.category}</span>
            ) : (
              <span>{tool.category}</span>
            )}
          </div>
        </div>
        {(hasWeighted || hasRating) && (
          <div className="flex flex-col items-end flex-shrink-0">
            {scoresDiffer ? (
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
        <div className="flex flex-wrap gap-3 text-xs pt-3 border-t border-slate-200">
          {tool.urls.product && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(tool.urls.product, '_blank', 'noopener,noreferrer');
              }}
              className="text-blue-600 hover:text-blue-800 hover:underline z-10 relative cursor-pointer bg-transparent border-0 p-0 font-inherit"
            >
              Product →
            </button>
          )}
          {tool.urls.docs && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(tool.urls.docs, '_blank', 'noopener,noreferrer');
              }}
              className="text-blue-600 hover:text-blue-800 hover:underline z-10 relative cursor-pointer bg-transparent border-0 p-0 font-inherit"
            >
              Documentation →
            </button>
          )}
          {tool.urls.company && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(tool.urls.company, '_blank', 'noopener,noreferrer');
              }}
              className="text-blue-600 hover:text-blue-800 hover:underline z-10 relative cursor-pointer bg-transparent border-0 p-0 font-inherit"
            >
              Company →
            </button>
          )}
        </div>
      )}

      {/* Evaluation Status Pill - Bottom Right Corner */}
      {tool.status && tool.status.trim() !== "" && (
        <div className="absolute bottom-3 right-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(tool.status)}`}>
            {tool.status}
          </span>
        </div>
      )}
    </Link>
  );
}
