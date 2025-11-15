import { Client } from "@notionhq/client";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Validate URLs to prevent malicious protocols
const validateUrl = (url) => {
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

async function generateStaticData() {
  const NOTION_API_KEY = process.env.NOTION_API_KEY;
  const NOTION_DB_ID = process.env.NOTION_DB_ID;

  if (!NOTION_API_KEY || !NOTION_DB_ID) {
    console.error("⚠️  NOTION_API_KEY or NOTION_DB_ID not found in environment");
    console.error("⚠️  Static data generation skipped - will use demo data in production");
    process.exit(0); // Exit successfully to allow build to continue
  }

  console.log("🔄 Fetching data from Notion...");

  const notion = new Client({ auth: NOTION_API_KEY });

  try {
    const pages = await notion.databases.query({
      database_id: NOTION_DB_ID,
      page_size: 100
    });

    const readSelect = (props, name) => {
      const prop = props[name];
      if (!prop || (prop.type !== "select" && prop.type !== "multi_select" && prop.type !== "status")) return undefined;
      if (prop.type === "select" && prop.select?.name) {
        return prop.select.name;
      }
      if (prop.type === "status" && prop.status?.name) {
        return prop.status.name;
      }
      if (prop.type === "multi_select" && Array.isArray(prop.multi_select) && prop.multi_select.length > 0) {
        return prop.multi_select[0]?.name;
      }
      return undefined;
    };

    const readURL = (props, name) => {
      const prop = props[name];
      if (!prop || prop.type !== "url") return "";
      return typeof prop.url === "string" ? prop.url : "";
    };

    const readTitle = (props, name) => {
      const prop = props[name];
      if (!prop || prop.type !== "title" || !Array.isArray(prop.title)) return "";
      return prop.title[0]?.plain_text ?? "";
    };

    const readText = (props, name) => {
      const prop = props[name];
      if (!prop || prop.type !== "rich_text" || !Array.isArray(prop.rich_text)) return "";
      return prop.rich_text[0]?.plain_text ?? "";
    };

    const readNumberLike = (props, name) => {
      const prop = props[name];
      if (!prop) return 0;

      // Handle number type
      if (prop.type === "number" && typeof prop.number === "number") {
        return prop.number;
      }

      // Handle select with numeric names (1-20)
      if (prop.type === "select" && prop.select?.name) {
        return Number(prop.select.name) || 0;
      }

      return 0;
    };

    const items = pages.results
      .filter(p => p.object === "page" && "properties" in p && "last_edited_time" in p)
      .map(page => {
        const props = page.properties;

        const ratingProp = props["Rating"];
        const ratingFormula = ratingProp?.type === "formula" &&
          ratingProp.formula?.type === "number"
            ? ratingProp.formula.number
            : null;

        const finalScoreProp = props["Final Score"];
        const finalScoreFormula = finalScoreProp?.type === "formula" &&
          finalScoreProp.formula?.type === "number"
            ? finalScoreProp.formula.number
            : null;

        const toolName = readTitle(props, "Tool") || readTitle(props, "Name") || "";

        // Skip tools with empty names
        if (!toolName || toolName.trim() === "") {
          return null;
        }

        return {
          id: page.id,
          tool: toolName,
          company: readText(props, "Company"),
          category: readSelect(props, "Category") || "",
          status: readSelect(props, "Evaluation Status") || "",
          urls: {
            product: validateUrl(readURL(props, "Product URL")),
            docs: validateUrl(readURL(props, "Documentation Link")),
            company: validateUrl(readURL(props, "Company URL"))
          },
          quickTake: readText(props, "Quick Take"),
          dims: {
            autonomy: readNumberLike(props, "AI Autonomy"),
            collaboration: readNumberLike(props, "Collaboration"),
            context: readNumberLike(props, "Contextual Understanding"),
            governance: readNumberLike(props, "Governance"),
            interface: readNumberLike(props, "User Interface")
          },
          rating: ratingFormula,
          finalScore: finalScoreFormula,
          lastEdited: page.last_edited_time
        };
      })
      .filter(item => item !== null);

    // Create data directory if it doesn't exist
    const dataDir = join(__dirname, "..", "src", "data");
    mkdirSync(dataDir, { recursive: true });

    // Create snapshot with build timestamp
    const snapshot = {
      buildDate: new Date().toISOString(),
      tools: items
    };

    // Write the data to a JSON file
    const outputPath = join(dataDir, "tools-snapshot.json");
    writeFileSync(outputPath, JSON.stringify(snapshot, null, 2), "utf-8");

    console.log(`✅ Successfully generated static data: ${items.length} tools`);
    console.log(`📁 Saved to: ${outputPath}`);
    console.log(`📅 Generated at: ${snapshot.buildDate}`);

  } catch (error) {
    console.error("❌ Error fetching from Notion:", error.message);
    process.exit(1);
  }
}

generateStaticData();
