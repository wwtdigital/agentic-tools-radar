import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Agentic Tools Radar",
  description: "Interactive radar to compare agentic developer tools across five key dimensions",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="overflow-hidden">
      <body className="h-screen overflow-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
