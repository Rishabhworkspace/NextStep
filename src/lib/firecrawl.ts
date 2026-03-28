import FirecrawlApp from "@mendable/firecrawl-js"

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY || "",
})

export interface ScrapedResource {
  title: string
  url: string
  type: "video" | "course" | "article"
  source: string
}

/**
 * Scrape learning resources for a given skill using Firecrawl search.
 * Returns top 3 results with title, URL, type, and source.
 */
export async function scrapeResourcesForSkill(
  skillName: string,
  careerContext: string = ""
): Promise<ScrapedResource[]> {
  try {
    const query = `best free ${skillName} tutorial ${careerContext} 2025`

    const result = await firecrawl.search(query, {
      limit: 5,
      lang: "en",
      country: "in",
    })

    if (!result.success || !result.data) {
      console.warn(`Firecrawl returned no results for: ${skillName}`)
      return getFallbackResources(skillName)
    }

    const resources: ScrapedResource[] = result.data
      .filter((item) => item.url && item.title)
      .slice(0, 3)
      .map((item) => ({
        title: (item.title as string) || skillName,
        url: item.url as string,
        type: detectResourceType(item.url as string),
        source: extractSource(item.url as string),
      }))

    return resources.length > 0 ? resources : getFallbackResources(skillName)
  } catch (error) {
    console.error(`Firecrawl error for ${skillName}:`, error)
    return getFallbackResources(skillName)
  }
}

/**
 * Batch scrape resources for multiple skills.
 * Processes sequentially to respect rate limits.
 */
export async function scrapeResourcesForSkills(
  skills: string[],
  careerContext: string = ""
): Promise<Record<string, ScrapedResource[]>> {
  const resourceMap: Record<string, ScrapedResource[]> = {}

  for (const skill of skills) {
    resourceMap[skill] = await scrapeResourcesForSkill(skill, careerContext)
    // Small delay between requests to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 300))
  }

  return resourceMap
}

function detectResourceType(url: string): "video" | "course" | "article" {
  const lower = url.toLowerCase()
  if (lower.includes("youtube.com") || lower.includes("youtu.be")) return "video"
  if (
    lower.includes("udemy") ||
    lower.includes("coursera") ||
    lower.includes("freecodecamp") ||
    lower.includes("codecademy") ||
    lower.includes("edx.org") ||
    lower.includes("khanacademy")
  ) return "course"
  return "article"
}

function extractSource(url: string): string {
  try {
    const hostname = new URL(url).hostname.replace("www.", "")
    const sourceMap: Record<string, string> = {
      "youtube.com": "YouTube",
      "youtu.be": "YouTube",
      "freecodecamp.org": "freeCodeCamp",
      "developer.mozilla.org": "MDN",
      "dev.to": "Dev.to",
      "medium.com": "Medium",
      "geeksforgeeks.org": "GeeksforGeeks",
      "w3schools.com": "W3Schools",
      "udemy.com": "Udemy",
      "coursera.org": "Coursera",
      "github.com": "GitHub",
      "stackoverflow.com": "Stack Overflow",
    }
    return sourceMap[hostname] || hostname.split(".")[0].charAt(0).toUpperCase() + hostname.split(".")[0].slice(1)
  } catch {
    return "Web"
  }
}

function getFallbackResources(skillName: string): ScrapedResource[] {
  const encoded = encodeURIComponent(skillName + " tutorial")
  return [
    {
      title: `${skillName} - YouTube Tutorial`,
      url: `https://www.youtube.com/results?search_query=${encoded}`,
      type: "video",
      source: "YouTube",
    },
    {
      title: `${skillName} - freeCodeCamp`,
      url: `https://www.freecodecamp.org/news/search/?query=${encodeURIComponent(skillName)}`,
      type: "course",
      source: "freeCodeCamp",
    },
    {
      title: `${skillName} - GeeksforGeeks`,
      url: `https://www.geeksforgeeks.org/search/${encodeURIComponent(skillName)}`,
      type: "article",
      source: "GeeksforGeeks",
    },
  ]
}
