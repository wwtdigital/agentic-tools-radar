"use client";
import { useState } from "react";

type ToolLogoProps = {
  toolName: string;
  companyName?: string;
  productUrl?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

// Extract domain from URL and generate favicon URL through our proxy
function getFaviconUrl(url?: string): string | undefined {
  if (!url) return undefined;

  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname;

    // Use our proxy endpoint to avoid CORS issues
    return `/api/favicon?domain=${domain}`;
  } catch {
    return undefined;
  }
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-12 h-12 text-sm",
  lg: "w-16 h-16 text-base",
  xl: "w-24 h-24 text-xl"
};

// Generate a consistent color based on the name
function getColorFromString(str: string): string {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-cyan-500"
  ];

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}

// Get initials from tool name
function getInitials(toolName?: string): string {
  const name = toolName || "?";

  // Split by spaces or capital letters
  const words = name.split(/[\s-]+/);

  if (words.length >= 2) {
    // Use first letter of first two words
    return (words[0][0] + words[1][0]).toUpperCase();
  } else if (name.length >= 2) {
    // Use first two capital letters or first two characters
    const capitals = name.match(/[A-Z]/g);
    if (capitals && capitals.length >= 2) {
      return (capitals[0] + capitals[1]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  return name[0].toUpperCase();
}

export function ToolLogo({
  toolName,
  companyName,
  productUrl,
  size = "md",
  className = ""
}: ToolLogoProps) {
  const [faviconError, setFaviconError] = useState(false);

  // Priority: favicon from product URL → initials
  const faviconUrl = getFaviconUrl(productUrl);
  const displayUrl = faviconUrl && !faviconError ? faviconUrl : null;

  const showInitials = !displayUrl;
  const initials = getInitials(toolName);
  const bgColor = getColorFromString(toolName);

  if (showInitials) {
    return (
      <div
        className={`${sizeClasses[size]} ${bgColor} rounded-lg flex items-center justify-center text-white font-bold ${className}`}
        title={toolName}
      >
        {initials}
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} rounded-lg overflow-hidden bg-slate-100 border border-slate-300 flex items-center justify-center ${className}`}>
      <img
        src={displayUrl}
        alt={`${toolName} logo`}
        className="w-full h-full object-contain p-1"
        onError={() => setFaviconError(true)}
      />
    </div>
  );
}
