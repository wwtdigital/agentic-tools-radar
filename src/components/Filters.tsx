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

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
        <select
          className="w-full border rounded p-1"
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            onChange({ category: e.target.value || undefined });
          }}
        >
          <option value="">All categories</option>
          {cats.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {selectedCategory && CATEGORY_TIPS[selectedCategory] ? (
          <p className="mt-1 text-xs text-blue-600 italic">{CATEGORY_TIPS[selectedCategory]}</p>
        ) : (
          <p className="mt-1 text-xs text-slate-500">Filter tools by their primary use case</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
        <select className="w-full border rounded p-1" onChange={(e) => onChange({ status: e.target.value || undefined })}>
          <option value="">All statuses</option>
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <p className="mt-1 text-xs text-slate-500">Filter by evaluation or adoption status</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Freshness</label>
        <select className="w-full border rounded p-1" onChange={(e) => onChange({ months: Number(e.target.value) || undefined })}>
          <option value="">Any freshness</option>
          <option value="3">Last 3 months</option>
          <option value="6">Last 6 months</option>
          <option value="12">Last 12 months</option>
        </select>
        <p className="mt-1 text-xs text-slate-500">Filter by last update date</p>
      </div>
    </div>
  );
}
