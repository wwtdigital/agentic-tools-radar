"use client";
import useSWR from "swr";
import { useMemo, useState } from "react";
import { RadarView } from "@/components/RadarView";
import { Filters } from "@/components/Filters";
import { CompareSelect } from "@/components/CompareSelect";
import { ToolDetails } from "@/components/ToolDetails";

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
      <nav className="w-full bg-black text-white">
        <div className="mx-auto max-w-[1100px] px-6 py-4">
          <h1 className="text-2xl font-bold">Agentic Developer Tools Radar</h1>
        </div>
      </nav>
      <main className="mx-auto max-w-[1100px] p-6">
        <div className="grid grid-cols-12 gap-6">
      <aside className="col-span-3 space-y-6">
        <Filters all={data} onChange={(f) => setFilters(prev => ({ ...prev, ...f }))} />
        <CompareSelect all={filtered} selected={compareIds} onChange={setSelected} />
        <div className="space-y-2">
          <div className="text-sm text-slate-600">Dimensions</div>
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
              {dim}
            </label>
          ))}
        </div>
      </aside>

      <section className="col-span-9">
        <figure className="border rounded p-4">
          <div style={{ height: '600px' }}>
            <RadarView tools={filtered} selectedIds={compareIds} hiddenDims={hiddenDims} />
          </div>
          <figcaption className="mt-3 text-xs text-slate-500">
            Data: Agentic Developer Tools (Notion). Ratings 1–5. Overall <strong>Rating</strong> is your Notion formula.
          </figcaption>
        </figure>
        <ToolDetails tools={selectedTools} />
      </section>
      </div>
      </main>
    </>
  );
}
