import { NextResponse } from "next/server";
import { z } from "zod";
import { Client } from "@notionhq/client";

const ToolSchema = z.object({
  id: z.string(),
  tool: z.string(),
  company: z.string().optional(),
  category: z.string(),
  status: z.string().optional(),
  urls: z.object({
    product: z.string().optional(),
    docs: z.string().optional(),
    company: z.string().optional()
  }),
  quickTake: z.string().optional(),
  dims: z.object({
    autonomy: z.number(),
    collaboration: z.number(),
    context: z.number(),
    governance: z.number(),
    interface: z.number()
  }),
  rating: z.number().nullable(),
  lastEdited: z.string()
});

const notion = new Client({ auth: process.env.NOTION_API_KEY! });
const DB_ID = process.env.NOTION_DB_ID!;

export async function GET() {
  // If no Notion credentials, serve a small demo dataset
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_DB_ID) {
    const demo = [{
      id: "demo-1",
      tool: "Windsurf",
      company: "Cognition",
      category: "IDE Assistants",
      status: "Adopted",
      urls: { product: "https://windsurf.com" },
      quickTake: "Fast IDE agent with Cascade planning.",
      dims: { autonomy: 4, collaboration: 4, context: 4, governance: 4, interface: 5 },
      rating: 4.2,
      lastEdited: new Date().toISOString()
    }];
    return NextResponse.json(demo);
  }

  try {
    const pages = await notion.databases.query({ database_id: DB_ID, page_size: 100 });
    const items = (await Promise.all(pages.results.map(async (p: any) => {
      const props = p.properties;
      const readSelect = (name: string) => props[name]?.select?.name ?? props[name]?.multi_select?.[0]?.name;
      const readURL = (name: string) => props[name]?.url ?? "";
      const readTitle = (name: string) => props[name]?.title?.[0]?.plain_text ?? "";
      const readText = (name: string) => props[name]?.rich_text?.[0]?.plain_text ?? "";
      const readNumberLike = (name: string) => {
        const prop = props[name];
        if (!prop) return 0;
        if (prop[prop.type] && typeof prop[prop.type].number === "number") return prop[prop.type].number;
        // Handle select 1–20 stored as names
        if (prop.select?.name) return Number(prop.select.name) || 0;
        return 0;
      };
      const ratingFormula = props["Rating"]?.formula?.number ?? null;

      const toolName = readTitle("Tool") || readTitle("Name") || "";

      // Skip tools with empty names
      if (!toolName || toolName.trim() === "") {
        return null;
      }

      const tool = {
        id: p.id,
        tool: toolName,
        company: readText("Company"),
        category: readSelect("Category") || "",
        status: readSelect("Evaluation Status") || "",
        urls: {
          product: readURL("Product URL"),
          docs: readURL("Documentation Link"),
          company: readURL("Company URL")
        },
        quickTake: readText("Quick Take"),
        dims: {
          autonomy: readNumberLike("AI Autonomy"),
          collaboration: readNumberLike("Collaboration"),
          context: readNumberLike("Contextual Understanding"),
          governance: readNumberLike("Governance"),
          interface: readNumberLike("User Interface")
        },
        rating: ratingFormula,
        lastEdited: p.last_edited_time
      };
      return ToolSchema.parse(tool);
    }))).filter(item => item !== null);

    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching from Notion:", error);
    return NextResponse.json(
      { error: "Failed to fetch tools data" },
      { status: 500 }
    );
  }
}
