# Agentic Developer Tools — Interactive Radar

An editorial, Notion-powered radar to compare agentic developer tools. Built with **Next.js**, **Nivo**, and **Tailwind**. Ready for **Vercel** deployment.

## Setup

1. Create a Notion integration with **read-only** access to your *Agentic Developer Tools* database.
2. Add env vars (Vercel → Project Settings → Environment Variables):
   - `NOTION_API_KEY` — secret
   - `NOTION_DB_ID`  — the database ID
3. Install & run:
   ```bash
   pnpm i   # or npm i / yarn
   pnpm dev # http://localhost:3000/radar
   ```

> Tip: If env vars are missing, `/api/tools` serves a tiny demo record so the UI still boots.

## Pages
- `/radar` — interactive chart with filters, compare up to 5, export controls (add later).

## Editorial polish
- Minimal palette, thin strokes, caption under figure.
- Ready for Notion **Embed** block (900–1100 px width).

## License
Internal use.
