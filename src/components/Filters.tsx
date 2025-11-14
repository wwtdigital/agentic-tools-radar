"use client";
import { useState } from "react";

type Tool = { category: string; status?: string; lastEdited: string };

const CATEGORY_TIPS: Record<string, string> = {
  "IDE Assistants": "AI coding assistants integrated into development environments",
  "Agentic Frameworks": "Frameworks for building autonomous AI agents",
  "Code Completion": "Tools that autocomplete code as you type",
  "Terminal Agents": "AI assistants for command-line interfaces",
  "Web Agents": "AI agents that interact with web browsers and applications",
  "Testing Tools": "AI-powered testing and quality assurance tools",
  "Documentation": "AI tools for generating and maintaining documentation"
};

export function Filters({
  all,
  onChange
}: {
  all: Tool[];
  onChange: (next: { category?: string; status?: string; months?: number }) => void;
}) {
  const cats = Array.from(new Set(all.map(t => t.category))).sort();
  const statuses = Array.from(new Set(all.map(t => t.status).filter(Boolean))) as string[];
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedMonths, setSelectedMonths] = useState<number | undefined>(undefined);

  const handleCategoryClick = (cat: string) => {
    const newCat = selectedCategory === cat ? "" : cat;
    setSelectedCategory(newCat);
    onChange({ category: newCat || undefined });
  };

  const handleStatusClick = (status: string) => {
    const newStatus = selectedStatus === status ? "" : status;
    setSelectedStatus(newStatus);
    onChange({ status: newStatus || undefined });
  };

  const handleMonthsClick = (months: number) => {
    const newMonths = selectedMonths === months ? undefined : months;
    setSelectedMonths(newMonths);
    onChange({ months: newMonths });
  };

  return (
    <div className="space-y-4">
      {/* Status Filter */}
      {statuses.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
          <div className="flex flex-wrap gap-2">
            {statuses.map(s => (
              <button
                key={s}
                onClick={() => handleStatusClick(s)}
                className={`px-3 py-1.5 text-xs border rounded transition-colors ${
                  selectedStatus === s
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:border-slate-400"
                }`}
                aria-pressed={selectedStatus === s}
                aria-label={`Filter by ${s} status`}
              >
                {s}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-slate-500">Filter by evaluation or adoption status</p>
        </div>
      )}
    </div>
  );
}
