"use client";
import { useState } from "react";

export const DIMENSION_DESCRIPTIONS = {
  autonomy: "Ability to plan and execute multi-step tasks (assistive → agentic → self-directed)",
  collaboration: "Human + AI co-creation fluency (prompting → pairing → natural collaboration)",
  context: "Depth of understanding across repos, projects, and systems (file → repo → ecosystem)",
  governance: "Enterprise readiness: compliance, observability, and trust controls",
  interface: "Interaction maturity: keyboard → chat → multimodal (\"vibe coding\")"
} as const;

type DimensionKey = keyof typeof DIMENSION_DESCRIPTIONS;

export function DimensionTooltip({
  dimension
}: {
  dimension: string
}) {
  const [isVisible, setIsVisible] = useState(false);
  const key = dimension.toLowerCase() as DimensionKey;
  const description = DIMENSION_DESCRIPTIONS[key];

  if (!description) return null;

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="ml-1 text-slate-400 hover:text-slate-600 transition-colors"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        aria-label={`Information about ${dimension}`}
      >
        <svg
          className="w-3.5 h-3.5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isVisible && (
        <div className="absolute left-0 top-full mt-1 z-50 w-64 p-3 bg-slate-900 text-white text-xs rounded-lg shadow-xl">
          <div className="font-semibold mb-1">{dimension}</div>
          <div className="text-slate-200 leading-relaxed">{description}</div>
          <div className="absolute -top-1 left-3 w-2 h-2 bg-slate-900 transform rotate-45"></div>
        </div>
      )}
    </div>
  );
}
