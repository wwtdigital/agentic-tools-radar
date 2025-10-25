"use client";
type Tool = { id: string; tool: string; rating?: number | null; quickTake?: string };

export function CompareSelect({
  all, selected, onChange
}: {
  all: Tool[]; selected: string[]; onChange: (ids: string[]) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="text-sm text-slate-600">Compare:</div>
      <div className="grid grid-cols-1 gap-2">
        {all.map(t => {
          const on = selected.includes(t.id);
          return (
            <button
              key={t.id}
              onClick={() => onChange(on ? selected.filter(id => id !== t.id) : [...selected, t.id])}
              className={`text-left text-sm border px-2 py-1 rounded ${on ? "bg-slate-100" : "bg-white"}`}
              title={t.quickTake}
            >
              {t.tool} <span className="text-slate-500">({t.rating ?? "—"})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
