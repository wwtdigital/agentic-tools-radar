/**
 * Generate a URL-friendly slug from a tool name
 * @param name - Tool name to convert to slug
 * @returns URL-safe slug
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric chars with hyphens
    .replace(/^-+|-+$/g, '')       // Remove leading/trailing hyphens
    .replace(/-+/g, '-');          // Replace multiple hyphens with single hyphen
}

/**
 * Find a tool by slug from a list of tools
 * @param tools - Array of tools to search
 * @param slug - URL slug to match
 * @returns Matching tool or undefined
 */
export function findToolBySlug<T extends { tool: string }>(tools: T[], slug: string): T | undefined {
  return tools.find(t => generateSlug(t.tool) === slug);
}
