import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export const dynamic = "force-static";

export async function GET() {
  try {
    // Read the RELEASE_NOTES.md file from the project root
    const filePath = join(process.cwd(), "RELEASE_NOTES.md");
    const content = await readFile(filePath, "utf-8");

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Error reading release notes:", error);
    return NextResponse.json(
      { error: "Failed to load release notes" },
      { status: 500 }
    );
  }
}
