"use client";
import useSWR from "swr";
import { useMemo, useState, useEffect } from "react";
import { RadarView } from "@/components/RadarView";
import { Filters } from "@/components/Filters";
import { CompareSelect } from "@/components/CompareSelect";
import { ToolDetails } from "@/components/ToolDetails";
import { DimensionTooltip } from "@/components/DimensionTooltip";

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

  const defaultIds = filtered.slice(0, 5).map(t => t.id);
  const compareIds = selected.length ? selected : defaultIds;
  // Sort selected tools so that newly selected items appear at the top
  const selectedTools = filtered
    .filter(t => compareIds.includes(t.id))
    .sort((a, b) => compareIds.indexOf(a.id) - compareIds.indexOf(b.id));

  if (isLoading) {
    return (
      <>
        <nav className="w-full bg-black text-white">
          <div className="mx-auto max-w-[1100px] px-6 py-4">
            <h1 className="text-2xl font-bold">Agentic Developer Tools Radar</h1>
          </div>
        </nav>
        <main className="mx-auto max-w-[1100px] p-6">
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
      <nav className="w-full bg-black text-white relative z-20">
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Agentic Developer Tools Radar</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className={`px-4 py-2 rounded transition-colors flex items-center gap-2 ${
                drawerOpen ? 'bg-slate-700' : 'hover:bg-slate-700'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-sm font-medium">Tools & Filters</span>
            </button>
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

              {/* Filters Section */}
              <div className="mb-4 pb-4 border-b border-slate-200">
                <div className="grid grid-cols-2 gap-8">
                  {/* Left: Data Filters */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700 mb-3">Data Filters</h3>
                    <Filters all={data} onChange={(f) => setFilters(prev => ({ ...prev, ...f }))} />
                  </div>

                  {/* Right: Dimension Visibility */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700 mb-3">Dimension Visibility</h3>
                    <p className="text-xs text-slate-600 mb-3">Toggle dimensions on the radar chart:</p>
                    <div className="space-y-2">
                      {["Autonomy","Collaboration","Context","Governance","Interface"].map(dim => (
                        <label key={dim} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={!hiddenDims.has(dim)}
                            onChange={(e) => {
                              const next = new Set(hiddenDims);
                              e.target.checked ? next.delete(dim) : next.add(dim);
                              setHiddenDims(next);
                            }}
                          />
                          <span className="flex items-center">
                            {dim}
                            <DimensionTooltip dimension={dim} />
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tools Grid */}
              <CompareSelect all={filtered} selected={compareIds} onChange={setSelected} />
            </div>
          )}
        </div>
      </div>

      {/* Main Content - Split Layout */}
      <main className="w-full">
        <div className="flex gap-6 p-6">
          {/* Left: Radar Chart (2/3) */}
          <div className="w-2/3">
            <figure className="border rounded p-4 bg-white h-full">
              <div style={{ height: '700px' }}>
                <RadarView tools={filtered} selectedIds={compareIds} hiddenDims={hiddenDims} />
              </div>
              <figcaption className="mt-3 text-xs text-slate-500">
                Data: Agentic Developer Tools (Notion). Ratings 1–5. Overall <strong>Rating</strong> is your Notion formula.
              </figcaption>
            </figure>
          </div>

          {/* Right: Tool Details (1/3) */}
          <div className="w-1/3">
            <ToolDetails tools={selectedTools} />
          </div>
        </div>
      </main>
    </>
  );
}
