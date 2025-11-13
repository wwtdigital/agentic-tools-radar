"use client";
import useSWR from "swr";
import { useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ToolCard } from "@/components/ToolCard";

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

type GroupBy = "category" | "status" | "score" | "none";

// Status priority order for sorting
const STATUS_ORDER = [
  "Adopted",
  "Active",
  "Reviewed",
  "Emerging",
  "Watchlist",
  "Feature Risk",
  "Deferred",
  "Not Enterprise Viable",
  "Uncategorized"
];

// Score range definitions
const SCORE_RANGES = [
  { label: "90-100 (Excellent)", min: 90, max: 100 },
  { label: "80-89 (Very Good)", min: 80, max: 89 },
  { label: "70-79 (Good)", min: 70, max: 79 },
  { label: "60-69 (Fair)", min: 60, max: 69 },
  { label: "Below 60", min: 0, max: 59 }
];

function getScoreRange(score: number): string {
  const range = SCORE_RANGES.find(r => score >= r.min && score <= r.max);
  return range ? range.label : "No Score";
}

const fetcher = (u: string) => fetch(u).then(r => r.json());

export default function ToolsPage() {
  const { data = [], isLoading } = useSWR<Tool[]>("/api/tools", fetcher);
  const [groupBy, setGroupBy] = useState<GroupBy>("category");
  const [searchQuery, setSearchQuery] = useState("");

  // Group tools by category, status, score, or none, sorted by weighted score within each group
  const groupedTools = useMemo(() => {
    // Filter by search first
    let filtered = data;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = data.filter(tool =>
        tool.tool.toLowerCase().includes(query) ||
        tool.company?.toLowerCase().includes(query)
      );
    }

    // If groupBy is "none", return all tools in a single group
    if (groupBy === "none") {
      const sorted = [...filtered].sort((a, b) => (b.finalScore ?? b.rating ?? 0) - (a.finalScore ?? a.rating ?? 0));
      return { "All Tools": sorted };
    }

    const groups: Record<string, Tool[]> = {};

    filtered.forEach(tool => {
      let groupKey: string;
      if (groupBy === "category") {
        groupKey = tool.category;
      } else if (groupBy === "status") {
        groupKey = tool.status || "Uncategorized";
      } else if (groupBy === "score") {
        const score = tool.finalScore ?? tool.rating ?? 0;
        groupKey = getScoreRange(score);
      } else {
        groupKey = "All Tools";
      }

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(tool);
    });

    // Sort tools within each group by final score (fallback to rating)
    Object.keys(groups).forEach(groupKey => {
      groups[groupKey].sort((a, b) => (b.finalScore ?? b.rating ?? 0) - (a.finalScore ?? a.rating ?? 0));
    });

    return groups;
  }, [data, groupBy, searchQuery]);

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
      <>
        <Navbar title="All Agentic Developer Tools" latestUpdate={latestUpdate} currentPage="tools" />
        <main className="p-6">
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
      <Navbar title="All Agentic Developer Tools" latestUpdate={latestUpdate} currentPage="tools" />

      <main role="main" aria-label="Tools listing" className="p-6">
        {/* Header */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-slate-600">
              Showing <strong className="text-slate-900">{Object.values(groupedTools).flat().length}</strong> of <strong className="text-slate-900">{data.length}</strong> tools
              {groupBy !== "none" && <> across <strong className="text-slate-900">{Object.keys(groupedTools).length}</strong> {groupBy === "category" ? "categories" : groupBy === "status" ? "statuses" : "score ranges"}</>}
            </p>

            {/* Group By Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Group by:</span>
              <div className="inline-flex rounded-lg border border-slate-300 bg-white p-1">
                <button
                  onClick={() => setGroupBy("category")}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    groupBy === "category"
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                  aria-pressed={groupBy === "category"}
                >
                  Category
                </button>
                <button
                  onClick={() => setGroupBy("status")}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    groupBy === "status"
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                  aria-pressed={groupBy === "status"}
                >
                  Status
                </button>
                <button
                  onClick={() => setGroupBy("score")}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    groupBy === "score"
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                  aria-pressed={groupBy === "score"}
                >
                  Score
                </button>
                <button
                  onClick={() => setGroupBy("none")}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    groupBy === "none"
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                  aria-pressed={groupBy === "none"}
                >
                  None
                </button>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2">
            <label htmlFor="search" className="text-sm text-slate-600">Search:</label>
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tool name or company..."
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              aria-label="Search tools by name or company"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="px-3 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                aria-label="Clear search"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Tools Grouped by Category, Status, Score, or None */}
        <div className="space-y-8">
          {Object.keys(groupedTools).sort((a, b) => {
            if (groupBy === "status") {
              // Use custom status priority order
              const indexA = STATUS_ORDER.indexOf(a);
              const indexB = STATUS_ORDER.indexOf(b);
              // If not found in STATUS_ORDER, put at end
              const priorityA = indexA === -1 ? 999 : indexA;
              const priorityB = indexB === -1 ? 999 : indexB;
              return priorityA - priorityB;
            } else if (groupBy === "score") {
              // Sort score ranges from highest to lowest
              const indexA = SCORE_RANGES.findIndex(r => r.label === a);
              const indexB = SCORE_RANGES.findIndex(r => r.label === b);
              return indexA - indexB;
            } else if (groupBy === "none") {
              // No sorting needed for single "All Tools" group
              return 0;
            }
            // Alphabetical sort for categories
            return a.localeCompare(b);
          }).map((groupKey) => (
            <div key={groupKey}>
              <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-slate-900">
                {groupKey} <span className="text-sm font-normal text-slate-500">({groupedTools[groupKey].length})</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedTools[groupKey].map((tool) => (
                  <ToolCard key={tool.id} tool={tool} groupBy={groupBy} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
