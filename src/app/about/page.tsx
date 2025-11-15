"use client";
import useSWR from "swr";
import { useMemo } from "react";
import { Navbar } from "@/components/Navbar";

type ToolsResponse = {
  buildDate: string;
  tools: unknown[];
};

const fetcher = (u: string) => fetch(u).then(r => r.json());

export default function AboutPage() {
  const { data } = useSWR<ToolsResponse>("/api/tools", fetcher);
  const buildDate = data?.buildDate;

  // Format build date for navbar
  const latestUpdate = useMemo(() => {
    if (!buildDate) return null;
    const date = new Date(buildDate);
    if (isNaN(date.getTime())) return null;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }, [buildDate]);

  return (
    <>
      {/* Skip Navigation Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-slate-900 focus:font-medium focus:border focus:border-slate-900 focus:m-2"
      >
        Skip to main content
      </a>

      <Navbar title="About Agentic Developer Tools Radar" latestUpdate={latestUpdate} currentPage="about" />

      <main id="main-content" role="main" aria-label="About page" className="max-w-5xl mx-auto p-6 pb-12">
        {/* Release Notes Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Latest Release</h2>

          <div className="border border-slate-200 rounded-lg p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-slate-900">Version 0.8.0</h3>
              <span className="text-sm text-slate-500">November 2025</span>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Tool Detail Pages & Release Automation</h4>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Added comprehensive individual tool pages with slug-based URLs, radar visualizations, and complete
                  dimension breakdowns. Implemented automated release workflow with custom slash command for streamlined
                  version management and release preparation.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Key Highlights:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                  <li>Individual tool pages with deep linking via /tools/[id] routes</li>
                  <li>Mini radar visualizations showing tool dimension profiles</li>
                  <li>Related tools discovery and comprehensive external links</li>
                  <li>Navbar enhancements with date display and improved TypeScript safety</li>
                  <li>Custom /release slash command for automated release workflow</li>
                  <li>Smart release notes generation and validation checks</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200">
              <a
                href="https://github.com/wwtdigital/agentic-tools-radar/blob/main/RELEASE_NOTES.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium"
              >
                View complete release history →
              </a>
            </div>
          </div>
        </section>

        {/* Purpose Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Purpose</h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              The Agentic Developer Tools Radar is an interactive visualization platform for exploring and comparing
              AI-powered development tools. Our mission is to help development teams make informed decisions about
              adopting agentic tools by providing comprehensive, data-driven evaluations across multiple dimensions.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Using AI-assisted research combined with hands-on evaluation, we assess tools across five key dimensions
              to provide both quantitative scores and qualitative insights. Our weighted scoring system accounts for
              validation confidence, helping teams understand both the capabilities and maturity level of each tool.
            </p>
          </div>
        </section>

        {/* Evaluation Framework Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Evaluation Framework</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            Each tool is evaluated across five dimensions on a scale of 1-20. These dimensions capture the essential
            capabilities that define effective agentic developer tools:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-slate-200 rounded-lg p-4 bg-white">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">AI Autonomy</h3>
              <p className="text-sm text-slate-700">
                Degree of independent decision-making and task completion. Measures how much the tool can
                accomplish without constant human guidance.
              </p>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 bg-white">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Collaboration</h3>
              <p className="text-sm text-slate-700">
                Multi-user workflows and team integration capabilities. Assesses how well the tool supports
                collaborative development practices.
              </p>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 bg-white">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Contextual Understanding</h3>
              <p className="text-sm text-slate-700">
                Ability to understand and leverage codebase and project context. Evaluates how deeply the tool
                comprehends your specific development environment.
              </p>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 bg-white">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Governance</h3>
              <p className="text-sm text-slate-700">
                Security, compliance, and administrative controls. Measures enterprise readiness including
                data privacy, access controls, and audit capabilities.
              </p>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 bg-white col-span-1 md:col-span-2">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">User Interface</h3>
              <p className="text-sm text-slate-700">
                User experience, accessibility, and interaction patterns. Assesses how intuitive and efficient
                the tool is for daily use by developers.
              </p>
            </div>
          </div>
        </section>

        {/* Scoring Methodology Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Scoring Methodology</h2>

          {/* Rating Score */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Rating (0-100)</h3>
            <p className="text-slate-700 leading-relaxed mb-3">
              The Rating is a pure capability score based on the tool's technical features and performance across
              the five dimensions. This score reflects what the tool can do when it works as intended, without
              accounting for validation level or enterprise readiness.
            </p>
            <p className="text-sm text-slate-600 italic">
              Calculated as a weighted formula from the five dimension scores (1-20 each).
            </p>
          </div>

          {/* Weighted Score */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Weighted Score (0-100)</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              The Weighted Score is a risk-adjusted rating that accounts for evaluation status and validation confidence.
              Tools with higher maturity (e.g., "Adopted") maintain their full capability scores, while emerging or
              unvalidated tools receive discounts based on confidence multipliers.
            </p>

            <h4 className="text-base font-semibold text-slate-900 mb-3 mt-4">Evaluation Status Categories</h4>
            <p className="text-sm text-slate-700 mb-3">
              Tools are categorized by maturity and validation status, ordered by priority:
            </p>
            <div className="bg-slate-50 rounded-lg p-4 space-y-3 mb-4">
              <div>
                <div className="font-semibold text-slate-900 text-sm mb-1">Production Ready (100%-85%)</div>
                <ul className="space-y-1 text-sm text-slate-700 ml-4">
                  <li><strong>Adopted:</strong> Fully validated and enterprise-ready (100%)</li>
                  <li><strong>Active:</strong> Actively in use, proven in practice (85%)</li>
                  <li><strong>Reviewed:</strong> Thorough evaluation completed (95%)</li>
                </ul>
              </div>

              <div>
                <div className="font-semibold text-slate-900 text-sm mb-1">Emerging & Monitoring (70%-60%)</div>
                <ul className="space-y-1 text-sm text-slate-700 ml-4">
                  <li><strong>Emerging:</strong> Early stage with potential, limited validation (70%)</li>
                  <li><strong>Watchlist:</strong> Monitoring for future potential (60%)</li>
                </ul>
              </div>

              <div>
                <div className="font-semibold text-slate-900 text-sm mb-1">Risk & Limitations (80%-40%)</div>
                <ul className="space-y-1 text-sm text-slate-700 ml-4">
                  <li><strong>Feature Risk:</strong> Identified limitations or concerns (80%)</li>
                  <li><strong>Deferred:</strong> Evaluation postponed (75%)</li>
                  <li><strong>Not Enterprise Viable:</strong> Significant limitations for enterprise use (40%)</li>
                </ul>
              </div>
            </div>

            <p className="text-xs text-slate-600 italic">
              Note: Tools grouped by status on the tools page appear in priority order (production-ready → emerging → risk/limitations),
              while confidence multipliers are ordered by validation confidence level.
            </p>
          </div>

          {/* Scoring Process */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Scoring Process</h3>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li>Metrics grounded in internal evaluation criteria (our team's use cases and requirements)</li>
              <li>Informed by observed market trends and competitive positioning</li>
              <li>Relative scoring: tools compared within categories for consistency</li>
              <li>Multi-platform validation prevents single-source bias</li>
              <li>Iterative refinement through hands-on testing and AI-assisted research</li>
            </ul>
          </div>
        </section>

        {/* Footer */}
        <section className="border-t border-slate-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-sm text-slate-600">
                Open source project by the{" "}
                <a
                  href="https://www.wwt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  WWT Digital Platform Engineering
                </a>{" "}
                team
              </p>
            </div>
            <div className="flex gap-4 text-sm">
              <a
                href="https://github.com/wwtdigital/agentic-tools-radar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 hover:underline"
              >
                GitHub
              </a>
              <a
                href="https://github.com/wwtdigital/agentic-tools-radar/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 hover:underline"
              >
                Report Issue
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
