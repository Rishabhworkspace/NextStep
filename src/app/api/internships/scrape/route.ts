import { NextResponse } from "next/server"
import connectDb from "@/lib/db/connect"
import { LiveInternship } from "@/lib/db/models/LiveInternship"
import { auth } from "@/lib/auth"
import FirecrawlApp from "@mendable/firecrawl-js"

export async function POST(req: Request) {
  try {
    // 1. Authenticate user
    const session = await auth.api.getSession({ headers: req.headers })
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    // 2. Parse domain filter
    const body = await req.json()
    const rawDomain = body.domain || "All"

    await connectDb()

    // 3. Global Cooldown Check (5 Minutes per domain)
    // To save Firecrawl API credits, we won't scrape if someone already scraped this exact domain in the last 5 mins
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
    
    // If "All" we just check if ANY scrape happened in the last 5 mins
    const cooldownQuery = rawDomain === "All" 
      ? { fetchedAt: { $gte: fiveMinutesAgo } } 
      : { domain: rawDomain, fetchedAt: { $gte: fiveMinutesAgo } }
    
    const recentScrape = await LiveInternship.findOne(cooldownQuery).sort({ fetchedAt: -1 }).lean() as any
    
    if (recentScrape) {
      // It's on cooldown
      const msLeft = (recentScrape.fetchedAt as any).getTime() + (5 * 60 * 1000) - Date.now()
      const minLeft = Math.ceil(msLeft / 60000)
      return NextResponse.json(
        { error: `This category was just updated! Please wait ${minLeft} minute(s) before fetching fresh listings again to conserve API limits.` }, 
        { status: 429 }
      )
    }

    // 4. Determine Actual Domain String for Firecrawl Query
    const domainsMapping = [
      "Software Engineering",
      "Data Science",
      "Artificial Intelligence",
      "Cybersecurity",
      "Cloud Computing",
      "Product Management",
      "Mechanical Engineering",
      "Game Development"
    ]
    let randomDomain = rawDomain === "All" 
      ? domainsMapping[Math.floor(Math.random() * domainsMapping.length)]
      : rawDomain.replace("_", " ")

    // 5. Firecrawl Scraping execution
    const firecrawl = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY || "" })

    // Use highly specific URL paths to avoid aggregate pages
    const query = `"${randomDomain}" internship 2025 India "apply" site:internshala.com/internship/detail/ OR site:linkedin.com/jobs/view/ OR site:wellfound.com/jobs/`
    
    const result = await firecrawl.search(query, { limit: 15, lang: "en", country: "in" })

    if (!result.success || !result.data) {
       throw new Error(`Firecrawl API error: Failed or no data returned`)
    }

    const results = result.data || []
    let addedCount = 0

    // 6. Insertion Process
    for (const result of results) {
      const title = result.title || "Internship"
      const url = result.url || ""
      const snippet = result.description || ""
      
      // Filter out aggregate, search, and category pages
      const isAggregatePage = 
        url.includes("/internships/") || 
        url.includes("/jobs-in-") || 
        url.includes("/search") ||
        title.toLowerCase().includes("internships in") ||
        /^(\d+)\s/.test(title); // E.g., "135 Software Development Internships..."

      if (isAggregatePage || !url) {
        continue;
      }

      const companyMatch = title.split("|")[1] || title.split("-")[1] || "Unknown Company"
      const roleMatch = title.split("|")[0] || title.split("-")[0] || "Intern"
      
      let source = "Web"
      if (url.includes("internshala")) source = "Internshala"
      if (url.includes("linkedin")) source = "LinkedIn"
      if (url.includes("wellfound")) source = "Wellfound"
      if (url.includes("unstop")) source = "Unstop"

      try {
        await LiveInternship.create({
          company: companyMatch.trim(),
          role: roleMatch.trim(),
          domain: rawDomain === "All" ? randomDomain : rawDomain,
          location: "PAN India / Remote",
          workMode: snippet.toLowerCase().includes("remote") ? "Remote" : "Unknown",
          applyUrl: url,
          source,
          AI_Summary: snippet.substring(0, 150) + "...",
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days TTL
        })
        addedCount++
      } catch (err: any) {
        // Ignored duplicates (11000 error code)
        if (err.code !== 11000) console.error("Error inserting live internship:", err.message)
      }
    }

    return NextResponse.json({
      success: true,
      domainScraped: randomDomain,
      newInternshipsAdded: addedCount,
    })

  } catch (error: any) {
    console.error("Live Scraping API Error:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch live internships." }, { status: 500 })
  }
}
