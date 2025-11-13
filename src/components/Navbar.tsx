"use client";
import packageJson from "../../package.json";

type NavbarProps = {
  title: string;
  latestUpdate: string | null;
  currentPage: "radar" | "tools";
};

export function Navbar({ title, latestUpdate, currentPage }: NavbarProps) {
  return (
    <nav aria-label="Main navigation" className="w-full bg-black text-white flex-shrink-0">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            v{packageJson.version} {latestUpdate && `• Updated ${latestUpdate}`}
          </p>
        </div>
        <div className="flex gap-3">
          <a
            href="/radar"
            className={`px-4 py-2 rounded border text-white text-sm font-medium flex items-center gap-2 ${
              currentPage === "radar"
                ? "border-white bg-white/10"
                : "border-white/30 hover:bg-white/10 transition-colors"
            }`}
            aria-current={currentPage === "radar" ? "page" : undefined}
          >
            <svg aria-hidden="true" focusable="false" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <circle cx="12" cy="12" r="6" strokeWidth="2"/>
              <circle cx="12" cy="12" r="2" strokeWidth="2"/>
            </svg>
            Radar
          </a>
          <a
            href="/tools"
            className={`px-4 py-2 rounded border text-white text-sm font-medium flex items-center gap-2 ${
              currentPage === "tools"
                ? "border-white bg-white/10"
                : "border-white/30 hover:bg-white/10 transition-colors"
            }`}
            aria-current={currentPage === "tools" ? "page" : undefined}
          >
            <svg aria-hidden="true" focusable="false" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Tools
          </a>
        </div>
      </div>
    </nav>
  );
}
