"use client";
import { ToolLogo } from "@/components/ToolLogo";
import { useMemo } from "react";

type Tool = {
  id: string;
  tool: string;
  company?: string;
  category: string;
  rating?: number | null;
  quickTake?: string;
  urls?: { product?: string };
};

export function CompareSelect({
  all, selected, onChange
}: {
  all: Tool[]; selected: string[]; onChange: (ids: string[]) => void;
}) {
  // Group tools by category
  const groupedTools = useMemo(() => {
    const groups = new Map<string, Tool[]>();
    all.forEach(tool => {
      if (!groups.has(tool.category)) {
        groups.set(tool.category, []);
      }
      groups.get(tool.category)!.push(tool);
    });
    // Sort categories alphabetically
    return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [all]);

  return (
    <div className="space-y-3">
      {groupedTools.map(([category, tools]) => (
        <div key={category} className="space-y-1">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide px-1">
            {category}
          </h3>
          <div className="grid grid-cols-2 gap-1.5">
            {tools.map(t => {
              const on = selected.includes(t.id);
              return (
                <button
                  key={t.id}
                  onClick={() => onChange(on ? selected.filter(id => id !== t.id) : [...selected, t.id])}
                  className={`text-left text-xs border px-2 py-1.5 rounded flex items-center gap-2 transition-colors ${
                    on ? "bg-slate-100 border-slate-400 shadow-sm" : "bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                  title={t.quickTake}
                >
                  <ToolLogo
                    toolName={t.tool}
                    companyName={t.company}
                    productUrl={t.urls?.product}
                    size="sm"
                    className="flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <div className="font-medium text-slate-900 truncate">{t.tool}</div>
                  </div>
                  <span className="text-slate-500 flex-shrink-0 text-[10px]">{t.rating ?? "—"}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
