"use client";
import useSWR from "swr";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { Navbar } from "@/components/Navbar";

type Tool = {
  lastEdited: string;
};

const fetcher = (u: string) => fetch(u).then(r => r.json());

export default function ReleasesPage() {
  const { data = [] } = useSWR<Tool[]>("/api/tools", fetcher);

  // Get the most recent lastEdited date for navbar
  const latestUpdate = useMemo(() => {
    if (data.length === 0) return null;
    const dates = data.map(t => new Date(t.lastEdited)).filter(d => !isNaN(d.getTime()));
    if (dates.length === 0) return null;
    const latest = new Date(Math.max(...dates.map(d => d.getTime())));
    return latest.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }, [data]);

  // Fetch release notes markdown
  const { data: releaseNotes } = useSWR("/api/releases", fetcher);

  return (
    <>
      {/* Skip Navigation Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-slate-900 focus:font-medium focus:border focus:border-slate-900 focus:m-2"
      >
        Skip to main content
      </a>

      <Navbar title="Release Notes" latestUpdate={latestUpdate} currentPage="releases" />

      <main id="main-content" role="main" aria-label="Release notes page" className="max-w-5xl mx-auto p-6 pb-12">
        {releaseNotes ? (
          <article className="prose prose-slate prose-headings:text-slate-900 prose-h1:text-4xl prose-h1:mb-8 prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-h4:text-lg prose-h4:mt-4 prose-h4:mb-2 prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700 prose-strong:text-slate-900 prose-strong:font-semibold prose-code:text-slate-900 prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline max-w-none">
            <ReactMarkdown
              components={{
                // Customize heading rendering to add anchors
                h2: ({ children, ...props }) => (
                  <h2 className="border-b border-slate-200 pb-2" {...props}>
                    {children}
                  </h2>
                ),
                // Customize list rendering
                ul: ({ children, ...props }) => (
                  <ul className="space-y-1" {...props}>
                    {children}
                  </ul>
                ),
                // Customize code blocks
                code: ({ children, className, ...props }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  if (match) {
                    return (
                      <code className={`block bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto ${className}`} {...props}>
                        {children}
                      </code>
                    );
                  }
                  return <code className={className} {...props}>{children}</code>;
                },
              }}
            >
              {releaseNotes.content}
            </ReactMarkdown>
          </article>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600">Loading release notes...</p>
          </div>
        )}
      </main>
    </>
  );
}
