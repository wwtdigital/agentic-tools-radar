"use client";
import useSWR from "swr";
import { useMemo, useState, useEffect, useRef } from "react";
import { toPng } from "html-to-image";
import { RadarView, DIM_LABELS } from "@/components/RadarView";
import { Filters } from "@/components/Filters";
import { CompareSelect } from "@/components/CompareSelect";
import { ToolDetails } from "@/components/ToolDetails";
import { DimensionTooltip, DIMENSION_DESCRIPTIONS } from "@/components/DimensionTooltip";
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
  finalScore?: number | null;
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
  const [dimensionsExpanded, setDimensionsExpanded] = useState<boolean>(false);
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

  // Handle Escape key to close drawer
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && drawerOpen) {
        setDrawerOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [drawerOpen]);

  const filtered = useMemo(() => {
    let out = data;
    if (filters.category) out = out.filter(t => t.category === filters.category);
    if (filters.status) out = out.filter(t => t.status === filters.status);
    if (filters.months) {
      const cutoff = new Date(); cutoff.setMonth(cutoff.getMonth() - filters.months);
      out = out.filter(t => new Date(t.lastEdited) >= cutoff);
    }
    // Sort by weighted score (with fallback to rating)
    return out.sort((a,b) => (b.finalScore ?? b.rating ?? 0) - (a.finalScore ?? a.rating ?? 0));
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
  // Sort selected tools by weighted score (with fallback to rating)
  const selectedTools = filtered
    .filter(t => compareIds.includes(t.id))
    .sort((a, b) => (b.finalScore ?? b.rating ?? 0) - (a.finalScore ?? a.rating ?? 0));

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
        <Navbar title="Agentic Developer Tools Radar" latestUpdate={latestUpdate} currentPage="radar" />
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
      {/* Skip Navigation Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-slate-900 focus:font-medium focus:border focus:border-slate-900 focus:m-2"
      >
        Skip to main content
      </a>

      {/* Mobile Warning */}
      <div className="md:hidden bg-yellow-50 border-b border-yellow-200 px-4 py-3 flex-shrink-0" role="alert" aria-live="polite">
        <p className="text-sm text-yellow-800 text-center">
          <strong>Desktop Required:</strong> This radar visualization is optimized for desktop viewing. Please access on a larger screen for the best experience.
        </p>
      </div>

      <div className="relative z-20">
        <Navbar title="Agentic Developer Tools Radar" latestUpdate={latestUpdate} currentPage="radar" />
      </div>

      {/* Backdrop overlay for drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-20 top-[57px]"
          onClick={() => setDrawerOpen(false)}
          role="presentation"
        />
      )}

      {/* Drawer - slides down from top */}
      <div
        role="dialog"
        aria-modal="false"
        aria-labelledby="drawer-title"
        aria-hidden={!drawerOpen}
        className={`fixed left-0 right-0 top-[57px] bg-white shadow-lg z-30 overflow-y-auto transition-all duration-300 ${
          drawerOpen ? 'max-h-[70vh] border-b' : 'max-h-0'
        }`}
      >
        <div className="p-6 max-w-6xl mx-auto">
          {drawerOpen && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 id="drawer-title" className="text-lg font-semibold text-slate-900">Tools & Filters</h2>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 hover:bg-red-50 bg-slate-100 rounded-lg transition-colors border border-slate-300 hover:border-red-300"
                  aria-label="Close tools and filters drawer"
                >
                  <svg aria-hidden="true" focusable="false" className="w-6 h-6 text-slate-700 hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="sr-only">Close drawer</span>
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
      <main id="main-content" role="main" aria-label="Radar visualization" className="w-full flex-1 flex flex-col overflow-hidden">
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
                  aria-label={`Select custom tools, ${selected.length || 5} tools currently selected`}
                  aria-pressed={!filters.category}
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
                      aria-label={`Filter by ${cat} category, ${count} tools available`}
                      aria-pressed={filters.category === cat}
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
                  aria-label="Reset to default view"
                >
                  <svg aria-hidden="true" focusable="false" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="sr-only">Reset</span>
                </button>
              </div>
            </div>
            <div className="relative flex-1 min-h-[600px]">
              {/* Dimension Filters - Top Left Overlay */}
              <div className="absolute top-6 left-6 z-10">
                <div className="bg-white/95 backdrop-blur-sm rounded border border-slate-200 shadow-sm">
                  <button
                    onClick={() => setDimensionsExpanded(!dimensionsExpanded)}
                    className="px-2.5 py-2 flex items-center gap-1.5 hover:bg-slate-50 transition-colors rounded"
                    aria-label={`Dimension filters${hiddenDims.size > 0 ? `, ${hiddenDims.size} hidden` : ''}`}
                    aria-expanded={dimensionsExpanded}
                  >
                    <svg aria-hidden="true" focusable="false" className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    {hiddenDims.size > 0 && (
                      <span className="text-xs font-medium text-slate-700">{hiddenDims.size}</span>
                    )}
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      className={`w-4 h-4 text-slate-500 transition-transform ${dimensionsExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {dimensionsExpanded && (
                    <div className="absolute top-full left-0 mt-1 bg-white rounded border border-slate-200 shadow-lg p-3 max-h-96 overflow-y-auto min-w-[500px]">
                      <h3 className="text-sm font-semibold text-slate-900 mb-3">Dimensions</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {DIM_LABELS.map(dim => {
                          const totalDimensions = 5;
                          const visibleCount = totalDimensions - hiddenDims.size;
                          const isChecked = !hiddenDims.has(dim);
                          const wouldBeUnderMinimum = isChecked && visibleCount <= 3;

                          const description = DIMENSION_DESCRIPTIONS[dim as keyof typeof DIMENSION_DESCRIPTIONS];
                          const dimId = `dimension-${dim.replace(/\s+/g, '-').toLowerCase()}`;
                          const descId = `${dimId}-desc`;

                          return (
                            <label key={dim} htmlFor={dimId} className={`flex items-start gap-2 text-sm ${wouldBeUnderMinimum ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                              <input
                                type="checkbox"
                                id={dimId}
                                checked={isChecked}
                                disabled={wouldBeUnderMinimum}
                                onChange={(e) => {
                                  const next = new Set(hiddenDims);
                                  e.target.checked ? next.delete(dim) : next.add(dim);
                                  setHiddenDims(next);
                                }}
                                className={`mt-0.5 ${wouldBeUnderMinimum ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                aria-describedby={description ? descId : undefined}
                                aria-invalid={wouldBeUnderMinimum}
                              />
                              <div>
                                <span className={`font-medium ${wouldBeUnderMinimum ? 'text-slate-400' : 'text-slate-700'}`}>{dim}</span>
                                {description && (
                                  <div id={descId} className="text-xs text-slate-500 mt-0.5">{description}</div>
                                )}
                              </div>
                            </label>
                          );
                        })}
                      </div>
                      <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-200">At least 3 dimensions must be selected</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Export Button - Top Right Overlay */}
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="absolute top-6 right-6 z-10 p-2 rounded border border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 shadow-sm"
                aria-label={isExporting ? 'Exporting radar chart to PNG' : 'Export radar chart as PNG image'}
              >
                <svg aria-hidden="true" focusable="false" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="sr-only">{isExporting ? 'Exporting...' : 'Export PNG'}</span>
              </button>

              {/* Chart - Only this gets exported */}
              <figure ref={radarRef} className="border rounded p-4 bg-white h-full isolate" aria-labelledby="chart-title" aria-describedby="chart-desc">
                <figcaption id="chart-title" className="sr-only">
                  Radar Chart Comparing {selectedTools.map(t => t.tool).join(", ")}
                </figcaption>
                <div id="chart-desc" className="sr-only">
                  A radar chart showing dimension scores for {selectedTools.length} {selectedTools.length === 1 ? 'tool' : 'tools'} across {5 - hiddenDims.size} dimensions: {DIM_LABELS.filter(d => !hiddenDims.has(d)).join(", ")}.
                </div>
                <div className="w-full h-full">
                  <RadarView tools={filtered} selectedIds={compareIds} hiddenDims={hiddenDims} />
                </div>
              </figure>
            </div>
          </div>

          {/* Right: Tool Details (1/3) */}
          <div className="w-1/3">
            <ToolDetails tools={selectedTools} />
          </div>
        </div>
      </main>

      {/* Live region for screen reader announcements */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {isExporting
          ? "Exporting radar chart to PNG"
          : selectedTools.length > 0
          ? `Showing ${filtered.length} tools${filters.category ? ` in ${filters.category} category` : ''}, ${selectedTools.length} selected for comparison`
          : `Showing ${filtered.length} tools${filters.category ? ` in ${filters.category} category` : ''}`
        }
      </div>
    </div>
  );
}
