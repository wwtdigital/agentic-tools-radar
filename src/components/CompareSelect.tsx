"use client";
import { ToolLogo } from "@/components/ToolLogo";

type Tool = {
  id: string;
  tool: string;
  company?: string;
  rating?: number | null;
  quickTake?: string;
  urls?: { product?: string };
};

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
              className={`text-left text-sm border px-3 py-2 rounded flex items-center gap-3 ${on ? "bg-slate-100 border-slate-400" : "bg-white hover:bg-slate-50"}`}
              title={t.quickTake}
            >
              <ToolLogo
                toolName={t.tool}
                companyName={t.company}
                productUrl={t.urls?.product}
                size="sm"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-slate-900">{t.tool}</div>
                {t.company && (
                  <div className="text-xs text-slate-500">{t.company}</div>
                )}
              </div>
              <span className="text-slate-500 flex-shrink-0">({t.rating ?? "—"})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
