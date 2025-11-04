"use client";
import useSWR from "swr";
import { useMemo, useState, useEffect, useRef } from "react";
import { toPng } from "html-to-image";
import { RadarView } from "@/components/RadarView";
import { Filters } from "@/components/Filters";
import { CompareSelect } from "@/components/CompareSelect";
import { ToolDetails } from "@/components/ToolDetails";
import { DimensionTooltip, DIMENSION_DESCRIPTIONS } from "@/components/DimensionTooltip";

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

const fetcher = (u: string) => fetch(u).then(r => r.json());

export default function RadarPage() {
  const { data = [], isLoading } = useSWR<Tool[]>("/api/tools", fetcher);
  const [filters, setFilters] = useState<{category?: string; status?: string; months?: number}>({});
  const [selected, setSelected] = useState<string[]>([]);
  const [hiddenDims, setHiddenDims] = useState<Set<string>>(new Set());
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const radarRef = useRef<HTMLDivElement>(null);

  // Export radar chart as PNG
  const handleExport = async () => {
    if (!radarRef.current) return;

    setIsExporting(true);

    try {
      const dataUrl = await toPng(radarRef.current, {
        cacheBust: false,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });

      // Create download link
      const link = document.createElement('a');
      link.download = `agentic-tools-radar-${new Date().toISOString().split('T')[0]}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export chart. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [drawerOpen]);

  const filtered = useMemo(() => {
    let out = data;
    if (filters.category) out = out.filter(t => t.category === filters.category);
    if (filters.status) out = out.filter(t => t.status === filters.status);
    if (filters.months) {
      const cutoff = new Date(); cutoff.setMonth(cutoff.getMonth() - filters.months);
      out = out.filter(t => new Date(t.lastEdited) >= cutoff);
    }
    return out.sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0));
  }, [data, filters]);

  // Default tools to display when nothing is selected
  const defaultToolNames = ["Claude Code", "Gemini Code Assist", "Windsurf", "GitHub Copilot", "Cursor"];
  const defaultIds = useMemo(() => {
    // If a category filter is active and no manual selection, show all tools in that category
    if (filters.category && selected.length === 0) {
      return filtered.map(t => t.id);
    }

    // Otherwise use the default tool names
    const matchedTools = defaultToolNames
      .map(name => filtered.find(t => t.tool === name))
      .filter((t): t is Tool => t !== undefined)
      .map(t => t.id);
    // Fallback to top 5 by rating if default tools not found
    return matchedTools.length > 0 ? matchedTools : filtered.slice(0, 5).map(t => t.id);
  }, [filtered, filters.category, selected.length]);
  const compareIds = selected.length ? selected : defaultIds;
  // Sort selected tools by rating (highest to lowest)
  const selectedTools = filtered
    .filter(t => compareIds.includes(t.id))
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

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
      <div className="h-screen flex flex-col overflow-hidden">
        <nav className="w-full bg-black text-white flex-shrink-0">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Agentic Developer Tools Radar</h1>
              <p className="text-xs text-slate-400 mt-0.5">v0.3.0</p>
            </div>
            <div className="flex gap-3">
              <a
                href="/radar"
                className="px-4 py-2 rounded border border-white text-white bg-white/10 text-sm font-medium flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="6" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="2" strokeWidth="2"/>
                </svg>
                Radar
              </a>
              <a
                href="/tools"
                className="px-4 py-2 rounded border border-white/30 hover:bg-white/10 transition-colors text-white text-sm font-medium flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Tools
              </a>
            </div>
          </div>
        </nav>
        <main className="flex-1 p-6 overflow-hidden">
          <div className="flex items-center justify-center min-h-[600px]">
            <div className="text-center space-y-4">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-slate-900"></div>
              <p className="text-slate-600 text-lg">Loading tools data...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Mobile Warning */}
      <div className="md:hidden bg-yellow-50 border-b border-yellow-200 px-4 py-3 flex-shrink-0">
        <p className="text-sm text-yellow-800 text-center">
          <strong>Desktop Required:</strong> This radar visualization is optimized for desktop viewing. Please access on a larger screen for the best experience.
        </p>
      </div>

      <nav className="w-full bg-black text-white relative z-20 flex-shrink-0">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Agentic Developer Tools Radar</h1>
            <p className="text-xs text-slate-400 mt-0.5">v0.3.0 {latestUpdate && `• Updated ${latestUpdate}`}</p>
          </div>
          <div className="flex gap-3">
            <a
              href="/radar"
              className="px-4 py-2 rounded border border-white text-white bg-white/10 text-sm font-medium flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                <circle cx="12" cy="12" r="6" strokeWidth="2"/>
                <circle cx="12" cy="12" r="2" strokeWidth="2"/>
              </svg>
              Radar
            </a>
            <a
              href="/tools"
              className="px-4 py-2 rounded border border-white/30 hover:bg-white/10 transition-colors text-white text-sm font-medium flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Tools
            </a>
          </div>
        </div>
      </nav>

      {/* Backdrop overlay for drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-20 top-[57px]"
          onClick={() => setDrawerOpen(false)}
          aria-label="Close drawer"
        />
      )}

      {/* Drawer - slides down from top */}
      <div
        className={`fixed left-0 right-0 top-[57px] bg-white shadow-lg z-30 overflow-y-auto transition-all duration-300 ${
          drawerOpen ? 'max-h-[70vh] border-b' : 'max-h-0'
        }`}
      >
        <div className="p-6 max-w-6xl mx-auto">
          {drawerOpen && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900">Tools & Filters</h2>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 hover:bg-red-50 bg-slate-100 rounded-lg transition-colors border border-slate-300 hover:border-red-300"
                  aria-label="Close drawer"
                >
                  <svg className="w-6 h-6 text-slate-700 hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Data Filters Section */}
              <div className="mb-4 pb-4 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Data Filters</h3>
                <Filters all={data} onChange={(f) => setFilters(prev => ({ ...prev, ...f }))} />
              </div>

              {/* Tools Grid */}
              <CompareSelect all={filtered} selected={compareIds} onChange={setSelected} />
            </div>
          )}
        </div>
      </div>

      {/* Main Content - Split Layout */}
      <main className="w-full flex-1 flex flex-col overflow-hidden">
        <div className="flex gap-6 p-6 flex-1 min-h-0">
          {/* Left: Radar Chart (2/3) */}
          <div className="w-2/3 flex flex-col">
            <div className="flex justify-between items-center mb-3">
              {/* Category Filters */}
              <div className="flex gap-2 flex-wrap items-center">
                <button
                  onClick={() => {
                    setFilters({});
                    setDrawerOpen(true);
                  }}
                  className={`px-4 py-2 text-sm border rounded transition-colors ${
                    !filters.category
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:border-slate-400"
                  }`}
                  title="Select custom tools"
                >
                  Select Tools <span className="ml-1 opacity-70">({selected.length || 5})</span>
                </button>
                {Array.from(new Set(data.map(t => t.category))).sort().map(cat => {
                  const count = data.filter(t => t.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setFilters(prev => ({ ...prev, category: prev.category === cat ? undefined : cat }))}
                      className={`px-4 py-2 text-sm border rounded transition-colors ${
                        filters.category === cat
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:border-slate-400"
                      }`}
                    >
                      {cat} <span className="ml-1 opacity-70">({count})</span>
                    </button>
                  );
                })}
                <button
                  onClick={() => {
                    setFilters({});
                    setSelected([]);
                  }}
                  className="px-3 py-2 rounded border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-colors text-slate-700"
                  title="Reset to default view"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>

              {/* Export Button */}
              <div className="flex gap-2">
                <button
                  onClick={handleExport}
                  disabled={isExporting}
                  className="px-4 py-2 rounded border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700"
                  title="Export radar chart as PNG"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="text-sm font-medium">{isExporting ? 'Exporting...' : 'Export PNG'}</span>
                </button>
              </div>
            </div>
            <figure ref={radarRef} className="border rounded p-4 bg-white flex-1 min-h-0 isolate">
              <div className="w-full h-full">
                <RadarView tools={filtered} selectedIds={compareIds} hiddenDims={hiddenDims} />
              </div>
            </figure>

            {/* Dimension Visibility Controls */}
            <div className="mt-3 p-3 bg-slate-50 rounded border border-slate-200">
              <div className="grid grid-cols-5 gap-4">
              {["AI Autonomy","Collaboration","Contextual Understanding","Governance","User Interface"].map(dim => {
                const totalDimensions = 5;
                const visibleCount = totalDimensions - hiddenDims.size;
                const isChecked = !hiddenDims.has(dim);
                const wouldBeUnderMinimum = isChecked && visibleCount <= 3;

                const description = DIMENSION_DESCRIPTIONS[dim as keyof typeof DIMENSION_DESCRIPTIONS];

                return (
                  <label key={dim} className={`flex items-start gap-2 text-sm ${wouldBeUnderMinimum ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={wouldBeUnderMinimum}
                      onChange={(e) => {
                        const next = new Set(hiddenDims);
                        e.target.checked ? next.delete(dim) : next.add(dim);
                        setHiddenDims(next);
                      }}
                      className={`mt-0.5 ${wouldBeUnderMinimum ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                      title={wouldBeUnderMinimum ? 'Minimum 3 dimensions required' : ''}
                    />
                    <div>
                      <span className={`font-medium ${wouldBeUnderMinimum ? 'text-slate-400' : 'text-slate-700'}`}>{dim}</span>
                      {description && (
                        <div className="text-xs text-slate-500 mt-0.5">{description}</div>
                      )}
                    </div>
                  </label>
                );
              })}
              </div>
              <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-200">At least 3 dimensions must be selected</p>
            </div>
          </div>

          {/* Right: Tool Details (1/3) */}
          <div className="w-1/3">
            <ToolDetails tools={selectedTools} />
          </div>
        </div>
      </main>
    </div>
  );
}
