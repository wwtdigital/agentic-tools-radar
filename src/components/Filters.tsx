"use client";
type Tool = { category: string; status?: string; lastEdited: string };

export function Filters({
  all,
  onChange
}: {
  all: Tool[];
  onChange: (next: { category?: string; status?: string; months?: number }) => void;
}) {
  const cats = Array.from(new Set(all.map(t => t.category))).sort();
  const statuses = Array.from(new Set(all.map(t => t.status).filter(Boolean))) as string[];

  return (
    <div className="space-y-3">
      <select className="w-full border rounded p-1" onChange={(e) => onChange({ category: e.target.value || undefined })}>
        <option value="">All categories</option>
        {cats.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <select className="w-full border rounded p-1" onChange={(e) => onChange({ status: e.target.value || undefined })}>
        <option value="">All statuses</option>
        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <select className="w-full border rounded p-1" onChange={(e) => onChange({ months: Number(e.target.value) || undefined })}>
        <option value="">Any freshness</option>
        <option value="3">Last 3 months</option>
        <option value="6">Last 6 months</option>
        <option value="12">Last 12 months</option>
      </select>
    </div>
  );
}
