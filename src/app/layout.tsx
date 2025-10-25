import "@/styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Agentic Tools Radar</title>
      </head>
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
