import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const domain = searchParams.get("domain");

  if (!domain) {
    return NextResponse.json({ error: "Domain parameter required" }, { status: 400 });
  }

  // Validate domain format to prevent abuse
  if (!/^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)*$/.test(domain)) {
    return NextResponse.json({ error: "Invalid domain format" }, { status: 400 });
  }

  try {
    // Fetch favicon from Google's service
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    const response = await fetch(faviconUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AgenticToolsRadar/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch favicon: ${response.statusText}`);
    }

    const imageBuffer = await response.arrayBuffer();

    // Return the image with proper headers
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/png',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800', // Cache for 1 day, allow serving stale responses for up to 1 week while revalidating
      },
    });
  } catch (error) {
    console.error("Error fetching favicon:", error);
    return NextResponse.json(
      { error: "Failed to fetch favicon" },
      { status: 500 }
    );
  }
}
