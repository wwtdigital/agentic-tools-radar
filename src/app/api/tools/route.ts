import { NextResponse } from "next/server";
import { z } from "zod";
import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { readFileSync } from "fs";
import { join } from "path";

// Validate URLs to prevent malicious protocols (javascript:, data:, etc.)
const validateUrl = (url: string): string | undefined => {
  if (!url || url.trim() === "") return undefined;

  try {
    const urlObj = new URL(url);
    // Only allow http and https protocols
    if (!["http:", "https:"].includes(urlObj.protocol)) {
      return undefined;
    }
    return url;
  } catch {
    return undefined;
  }
};

const urlSchema = z.string().url().optional().or(z.literal("").transform(() => undefined));

const ToolSchema = z.object({
  id: z.string(),
  tool: z.string(),
  company: z.string().optional(),
  category: z.string(),
  status: z.string().optional(),
  urls: z.object({
    product: urlSchema,
    docs: urlSchema,
    company: urlSchema
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

const notion = process.env.NOTION_API_KEY ? new Client({ auth: process.env.NOTION_API_KEY }) : null;
const DB_ID = process.env.NOTION_DB_ID;
const IS_PRODUCTION = process.env.NODE_ENV === "production";

export async function GET() {
  // In production, serve static snapshot data
  if (IS_PRODUCTION) {
    try {
      const snapshotPath = join(process.cwd(), "src", "data", "tools-snapshot.json");
      const data = readFileSync(snapshotPath, "utf-8");
      const tools = JSON.parse(data);
      return NextResponse.json(tools);
    } catch (error) {
      console.error("Failed to load static snapshot, falling back to demo data:", error);
      // Fall through to demo data if snapshot doesn't exist
    }
  }

  // In development, use live Notion API
  // If no Notion credentials, serve a small demo dataset
  if (!notion || !DB_ID) {
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
    const items = (await Promise.all(pages.results.map(async (p) => {
      // Type guard to ensure we have a full page object (not a database object or partial)
      if (p.object !== "page" || !("properties" in p) || !("last_edited_time" in p)) {
        return null;
      }

      const page = p as PageObjectResponse;
      const props = page.properties;
      const readSelect = (name: string) => {
        const prop = props[name];
        if (!prop || (prop.type !== "select" && prop.type !== "multi_select")) return undefined;
        if (prop.type === "select" && "select" in prop && prop.select && typeof prop.select === "object" && "name" in prop.select) {
          return prop.select.name;
        }
        if (prop.type === "multi_select" && "multi_select" in prop && Array.isArray(prop.multi_select) && prop.multi_select.length > 0) {
          const first = prop.multi_select[0];
          if (first && typeof first === "object" && "name" in first) {
            return first.name;
          }
        }
        return undefined;
      };
      const readURL = (name: string) => {
        const prop = props[name];
        if (!prop || prop.type !== "url") return "";
        const url = typeof prop.url === "string" ? prop.url : "";
        return url;
      };
      const readTitle = (name: string) => {
        const prop = props[name];
        if (!prop || prop.type !== "title" || !Array.isArray(prop.title)) return "";
        return prop.title[0]?.plain_text ?? "";
      };
      const readText = (name: string) => {
        const prop = props[name];
        if (!prop || prop.type !== "rich_text" || !Array.isArray(prop.rich_text)) return "";
        return prop.rich_text[0]?.plain_text ?? "";
      };
      const readNumberLike = (name: string) => {
        const prop = props[name];
        if (!prop) return 0;
        
        // Handle number type
        if (prop.type === "number" && typeof prop.number === "number") {
          return prop.number;
        }
        
        // Handle select with numeric names (1-20)
        if (prop.type === "select" && "select" in prop && prop.select && typeof prop.select === "object" && "name" in prop.select) {
          return Number(prop.select.name) || 0;
        }
        
        return 0;
      };
      
      const ratingProp = props["Rating"];
      const ratingFormula = ratingProp && 
        ratingProp.type === "formula" && 
        "formula" in ratingProp &&
        ratingProp.formula &&
        typeof ratingProp.formula === "object" &&
        "type" in ratingProp.formula &&
        ratingProp.formula.type === "number" &&
        "number" in ratingProp.formula
          ? ratingProp.formula.number 
          : null;

      const toolName = readTitle("Tool") || readTitle("Name") || "";

      // Skip tools with empty names
      if (!toolName || toolName.trim() === "") {
        return null;
      }

      const tool = {
        id: page.id,
        tool: toolName,
        company: readText("Company"),
        category: readSelect("Category") || "",
        status: readSelect("Evaluation Status") || "",
        urls: {
          product: validateUrl(readURL("Product URL")),
          docs: validateUrl(readURL("Documentation Link")),
          company: validateUrl(readURL("Company URL"))
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
        lastEdited: page.last_edited_time
      };
      return ToolSchema.parse(tool);
    }))).filter((item): item is z.infer<typeof ToolSchema> => item !== null);

    return NextResponse.json(items);
  } catch (error) {
    // Log full error for server-side debugging but don't expose details to client
    console.error("Error fetching from Notion:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { error: "Failed to fetch tools data" },
      { status: 500 }
    );
  }
}
