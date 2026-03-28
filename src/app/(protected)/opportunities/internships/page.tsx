"use client"

import { useState, useEffect } from "react"
import { FilterSidebar, FilterState } from "../_components/FilterSidebar"
import { InternshipCard } from "../_components/InternshipCard"
import { Search, Loader2, Sparkles, Zap, Flame, CalendarDays } from "lucide-react"

export default function InternshipsPage() {
  const [activeTab, setActiveTab] = useState<"year_round" | "live">("year_round")
  const [internships, setInternships] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isScraping, setIsScraping] = useState(false)
  const [scrapeFeedback, setScrapeFeedback] = useState<{message: string, type: "success" | "error" | "info"} | null>(null)
  const [lastFetched, setLastFetched] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [filters, setFilters] = useState<FilterState>({
    domain: "All",
    mode: "All",
    year: "All",
    minStipend: "0",
    availability: "All",
  })

  const [search, setSearch] = useState("")

  const fetchInternships = async (p = 1) => {
    setLoading(true)
    try {
      const q = new URLSearchParams()
      q.append("type", activeTab)
      q.append("page", p.toString())
      if (search) q.append("search", search)
      if (filters.domain !== "All") q.append("domain", filters.domain)
      if (filters.mode !== "All") q.append("mode", filters.mode)
      if (filters.year !== "All") q.append("year", filters.year)
      if (filters.minStipend !== "0") q.append("minStipend", filters.minStipend)
      if (filters.availability !== "All") q.append("availability", filters.availability)

      const res = await fetch(`/api/internships?${q.toString()}`)
      const data = await res.json()
      
      setInternships(data.internships || [])
      setTotalPages(data.totalPages || 1)
      setPage(data.page || 1)
      if (data.lastFetchedAt) setLastFetched(data.lastFetchedAt)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Trigger fetch on filter/tab changes
  useEffect(() => {
    fetchInternships()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, filters])

  // Bounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchInternships()
    }, 500)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleClear = () => {
    setFilters({
      domain: "All",
      mode: "All",
      year: "All",
      minStipend: "0",
      availability: "All",
    })
    setSearch("")
    setScrapeFeedback(null)
  }

  const handleScrape = async () => {
    setIsScraping(true)
    setScrapeFeedback({ message: "Scraping Web (This takes ~10-15 seconds)...", type: "info" })
    try {
      const res = await fetch("/api/internships/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: filters.domain }),
      })
      const data = await res.json()
      
      if (!res.ok) {
        setScrapeFeedback({ message: data.error || "Failed to scrape.", type: "error" })
        return
      }

      setScrapeFeedback({ 
        message: `Successfully found ${data.newInternshipsAdded} new ${data.domainScraped} internships!`, 
        type: "success" 
      })
      
      // Auto-refresh the feed to show the newly fetched internships
      fetchInternships(1)

    } catch (err: any) {
      setScrapeFeedback({ message: "Network error. Please try again.", type: "error" })
    } finally {
      setIsScraping(false)
      // Clear feedback after a few seconds if it was successful
      setTimeout(() => {
        setScrapeFeedback(null)
      }, 8000)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground font-heading mb-4 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-accent" />
              Internships Hub
            </h1>
            <p className="text-lg text-muted">
              Discover curated, verified year-round internships or browse freshly 
              scraped live opportunities across the web.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tab Switcher & Search */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
          <div className="flex p-1 bg-surface border border-border rounded-xl">
            <button
              onClick={() => setActiveTab("year_round")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
                activeTab === "year_round" 
                  ? "bg-accent text-white shadow-md shadow-accent/20" 
                  : "text-muted hover:text-foreground"
              }`}
            >
              <CalendarDays className="w-4 h-4" /> Curated & Year-Round
            </button>
            <button
              onClick={() => setActiveTab("live")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
                activeTab === "live" 
                  ? "bg-accent text-white shadow-md shadow-accent/20" 
                  : "text-muted hover:text-foreground"
              }`}
            >
              <Zap className="w-4 h-4" /> Live Web Listings
            </button>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search companies or roles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-surface text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
        </div>

        {/* Live Tab Info Banner & Scrape Controls */}
        {activeTab === "live" && (
          <div className="mb-8 p-5 rounded-lg bg-surface border border-border flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />
            <div className="flex-1">
              <div className="flex items-center gap-2 text-foreground font-semibold mb-1">
                <Flame className="w-5 h-5 text-orange-500" />
                Live Web Scraper
              </div>
              <p className="text-sm text-muted">
                These opportunities are fetched directly from major platforms (LinkedIn, Internshala, Wellfound). 
                {lastFetched && ` Last system update: ${new Date(lastFetched).toLocaleString()}`}
              </p>
              
              {/* Optional Feedback Message */}
              {scrapeFeedback && (
                <div className={`mt-3 text-sm font-medium px-3 py-2 rounded-md ${
                  scrapeFeedback.type === "error" ? "bg-rose-500/10 text-rose-500 border border-rose-500/20" :
                  scrapeFeedback.type === "success" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                  "bg-accent/10 text-accent border border-accent/20 animate-pulse"
                }`}>
                  {scrapeFeedback.message}
                </div>
              )}
            </div>

            <div className="flex-shrink-0">
              <button
                onClick={handleScrape}
                disabled={isScraping}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-medium hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isScraping ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Scraping Web...</>
                ) : (
                  <><Zap className="w-4 h-4" /> Fetch Fresh Internships</>
                )}
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FilterSidebar 
              filters={filters} 
              onFilterChange={handleFilterChange} 
              onClear={handleClear}
              isLiveTab={activeTab === "live"} 
            />
          </div>

          {/* Feed */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center text-muted">
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-accent" />
                <p>Loading opportunities...</p>
              </div>
            ) : internships.length === 0 ? (
              <div className="py-20 text-center bg-surface border border-border rounded-xl">
                <h3 className="text-xl font-bold text-foreground mb-2">No internships found</h3>
                <p className="text-muted mb-6">Try adjusting your filters or search terms.</p>
                <button 
                  onClick={handleClear}
                  className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-surface-alt transition"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {internships.map((internship) => (
                  <InternshipCard 
                    key={internship._id} 
                    internship={internship} 
                    isLive={activeTab === "live"} 
                  />
                ))}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-8 pt-8 border-t border-border">
                    <button
                      disabled={page === 1}
                      onClick={() => fetchInternships(page - 1)}
                      className="px-4 py-2 rounded-lg border border-border disabled:opacity-50 hover:bg-surface transition"
                    >
                      Previous
                    </button>
                    <span className="text-sm font-medium text-muted">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      disabled={page === totalPages}
                      onClick={() => fetchInternships(page + 1)}
                      className="px-4 py-2 rounded-lg border border-border disabled:opacity-50 hover:bg-surface transition"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
