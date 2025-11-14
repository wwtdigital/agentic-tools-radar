"use client";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { ToolLogo } from "@/components/ToolLogo";
import { DIMENSION_DESCRIPTIONS } from "@/components/DimensionTooltip";
import { getStatusColor } from "@/utils/status";
import { generateSlug, findToolBySlug } from "@/utils/slug";

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

export default function ToolDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.id as string;

  const { data: tools = [], isLoading } = useSWR<Tool[]>("/api/tools", fetcher);

  const tool = findToolBySlug(tools, slug);
  const relatedTools = tool ? tools.filter(t => t.category === tool.category && generateSlug(t.tool) !== slug).slice(0, 3) : [];

  // Format last edited date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const hasWeighted = tool?.finalScore !== null && tool?.finalScore !== undefined;
  const hasRating = tool?.rating !== null && tool?.rating !== undefined;
  const scoresDiffer = hasWeighted && hasRating && Math.abs(tool.finalScore! - tool.rating!) > 0.1;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-1/3 mb-8"></div>
            <div className="h-64 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Tool Not Found</h1>
            <p className="text-slate-600 mb-6">The tool you're looking for doesn't exist or has been removed.</p>
            <Link
              href="/tools"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to All Tools
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-slate-600">
          <Link href="/tools" className="hover:text-slate-900 hover:underline">
            All Tools
          </Link>
          <span>/</span>
          <span className="text-slate-900">{tool.tool}</span>
        </nav>

        {/* Tool Header */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-6 mb-6">
            <ToolLogo
              toolName={tool.tool}
              companyName={tool.company}
              productUrl={tool.urls?.product}
              size="xl"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{tool.tool}</h1>
              {tool.company && (
                <p className="text-xl text-slate-600 mb-3">{tool.company}</p>
              )}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-800">
                  {tool.category}
                </span>
                {tool.status && (
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(tool.status)}`}>
                    {tool.status}
                  </span>
                )}
              </div>
            </div>
            {(hasWeighted || hasRating) && (
              <div className="flex flex-col items-end flex-shrink-0">
                {scoresDiffer ? (
                  <>
                    <div className="flex items-center gap-3 text-slate-900">
                      <span className="text-4xl font-bold">{tool.finalScore!.toFixed(1)}</span>
                      <span className="text-slate-400">|</span>
                      <span className="text-2xl font-semibold text-slate-600">{tool.rating!.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                      <span>Weighted</span>
                      <span>|</span>
                      <span>Rating</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-4xl font-bold text-slate-900">
                      {(hasWeighted ? tool.finalScore! : tool.rating!).toFixed(1)}
                    </div>
                    <div className="text-sm text-slate-500 mt-1">
                      {hasWeighted && hasRating ? 'Score' : hasWeighted ? 'Weighted' : 'Rating'}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Quick Take */}
          {tool.quickTake && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Quick Take</h2>
              <p className="text-slate-700 leading-relaxed">{tool.quickTake}</p>
            </div>
          )}

          {/* External Links */}
          {tool.urls && (
            <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
              {tool.urls.product && (
                <a
                  href={tool.urls.product}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  Visit Product →
                </a>
              )}
              {tool.urls.docs && (
                <a
                  href={tool.urls.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors"
                >
                  Documentation →
                </a>
              )}
              {tool.urls.company && (
                <a
                  href={tool.urls.company}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors"
                >
                  Company Website →
                </a>
              )}
            </div>
          )}
        </div>

        {/* Dimensions Section */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Evaluation Dimensions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DIMENSION_LABELS.map(({ key, label }) => {
              const value = tool.dims[key];
              const description = DIMENSION_DESCRIPTIONS[label as keyof typeof DIMENSION_DESCRIPTIONS];
              return (
                <div
                  key={key}
                  className="bg-slate-50 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-semibold text-slate-900">{label}</h3>
                    <div className="text-2xl font-bold text-slate-900">{value}<span className="text-lg text-slate-500">/20</span></div>
                  </div>
                  {description && (
                    <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Version History */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Version History</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Last Updated:</span>
              <span className="font-medium text-slate-900">{formatDate(tool.lastEdited)}</span>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              This evaluation reflects the tool's status as of the last update date. For the most current information, please visit the tool's official website.
            </p>
          </div>
        </div>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Tools in {tool.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedTools.map(relatedTool => (
                <Link
                  key={relatedTool.id}
                  href={`/tools/${generateSlug(relatedTool.tool)}`}
                  className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <ToolLogo
                      toolName={relatedTool.tool}
                      companyName={relatedTool.company}
                      productUrl={relatedTool.urls?.product}
                      size="md"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 text-sm">{relatedTool.tool}</h3>
                      {relatedTool.company && (
                        <p className="text-xs text-slate-600">{relatedTool.company}</p>
                      )}
                    </div>
                  </div>
                  {(relatedTool.finalScore !== null && relatedTool.finalScore !== undefined) && (
                    <div className="text-right">
                      <span className="text-lg font-bold text-slate-900">
                        {relatedTool.finalScore.toFixed(1)}
                      </span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            href="/tools"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to All Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
