"use client"

import { useState, useMemo } from "react"
import {
  Award, ExternalLink, Search, Landmark, GraduationCap,
  Globe2, IndianRupee, BookOpen, Sparkles, Filter,
  ChevronDown, ChevronUp, ArrowUpRight, Clock, Star,
  Building2, MapPin, Plane
} from "lucide-react"

// ─── Scholarship Data (from docx Section 9) ──────────────────
interface Scholarship {
  name: string
  provider: string
  amount: string
  howToAccess: string
  link: string
  type: "government" | "international" | "private"
  country: string
  tags: string[]
  deadline?: string
}

const SCHOLARSHIPS: Scholarship[] = [
  // ── Indian Government ──
  {
    name: "National Scholarship Portal (NSP)",
    provider: "Government of India",
    amount: "Central + State schemes (varies)",
    howToAccess: "Register at scholarships.gov.in with Aadhaar",
    link: "https://scholarships.gov.in/",
    type: "government",
    country: "India",
    tags: ["All Streams", "National", "UG/PG"],
    deadline: "Oct–Dec (Annual)",
  },
  {
    name: "Prime Minister's Scholarship Scheme",
    provider: "Ministry of Home Affairs",
    amount: "₹2,500–3,000/month",
    howToAccess: "Apply via National Scholarship Portal",
    link: "https://scholarships.gov.in/",
    type: "government",
    country: "India",
    tags: ["CAPF/RPF Wards", "National"],
    deadline: "Oct–Nov",
  },
  {
    name: "Post-Matric Scholarship SC/ST/OBC",
    provider: "Ministry of Social Justice",
    amount: "Full tuition + maintenance allowance",
    howToAccess: "Apply via NSP with caste certificate + enrollment",
    link: "https://scholarships.gov.in/",
    type: "government",
    country: "India",
    tags: ["SC/ST/OBC", "Full Tuition", "National"],
    deadline: "Nov–Dec",
  },
  {
    name: "National Overseas Scholarship",
    provider: "Ministry of Social Justice (MoSJE)",
    amount: "Up to ₹12.8 lakh/year",
    howToAccess: "Apply via nosmsje.gov.in",
    link: "https://nosmsje.gov.in/",
    type: "government",
    country: "Abroad",
    tags: ["SC Students", "Study Abroad", "Full Funding"],
    deadline: "March–April",
  },
  {
    name: "ICCR Scholarship",
    provider: "Indian Council for Cultural Relations",
    amount: "Free education in India for intl. students",
    howToAccess: "Apply at iccr.gov.in",
    link: "https://a2ascholarships.iccr.gov.in/",
    type: "government",
    country: "India",
    tags: ["International Students", "Full Tuition"],
    deadline: "Jan–March",
  },

  // ── International Scholarships ──
  {
    name: "Fulbright-Nehru Fellowship",
    provider: "USIEF / US Government",
    amount: "Full funding – US Master's/PhD",
    howToAccess: "Apply via USIEF India",
    link: "https://www.usief.org.in/Fellowships.aspx",
    type: "international",
    country: "USA",
    tags: ["Full Funding", "Master's/PhD", "Research"],
    deadline: "Feb–May",
  },
  {
    name: "Chevening Scholarship",
    provider: "UK Government (FCDO)",
    amount: "Fully funded Master's in UK",
    howToAccess: "Apply at chevening.org (Oct deadline)",
    link: "https://www.chevening.org/",
    type: "international",
    country: "UK",
    tags: ["Full Funding", "Master's", "Leadership"],
    deadline: "August–November",
  },
  {
    name: "Commonwealth Scholarship",
    provider: "UK Government (CSC)",
    amount: "Full tuition + living + airfare",
    howToAccess: "National Nominating Agency India",
    link: "https://cscuk.fcdo.gov.au/scholarships/",
    type: "international",
    country: "UK",
    tags: ["Full Funding", "Master's/PhD", "Commonwealth"],
    deadline: "October–December",
  },
  {
    name: "DAAD Scholarship",
    provider: "German Academic Exchange Service",
    amount: "EUR 861–1,200/month + tuition",
    howToAccess: "Apply at daad.de – India applications open",
    link: "https://www.daad.de/en/find-funding/",
    type: "international",
    country: "Germany",
    tags: ["Stipend", "Master's/PhD", "Research"],
    deadline: "Oct–Nov (varies)",
  },
  {
    name: "MEXT Scholarship",
    provider: "Japanese Government (MEXT)",
    amount: "Full tuition + JPY 117,000–145,000/month",
    howToAccess: "Apply via Japanese Embassy in India",
    link: "https://www.studyjapan.go.jp/en/toj/toj0302e.html",
    type: "international",
    country: "Japan",
    tags: ["Full Funding", "UG/PG/Research", "Stipend"],
    deadline: "April–May",
  },
  {
    name: "Swiss Govt. Excellence Scholarship",
    provider: "Swiss Government (SBFI)",
    amount: "Full tuition + CHF 1,920/month stipend",
    howToAccess: "Apply via Swiss Embassy New Delhi",
    link: "https://www.sbfi.admin.ch/sbfi/en/home/education/scholarships-and-grants/swiss-government-excellence-scholarships.html",
    type: "international",
    country: "Switzerland",
    tags: ["Full Funding", "PhD/Research", "Stipend"],
    deadline: "Aug–Nov (varies)",
  },
  {
    name: "Australian Awards Scholarship",
    provider: "Australian Government (DFAT)",
    amount: "Full tuition + AUD 28,000/year living",
    howToAccess: "Apply via DFAT – India citizens eligible",
    link: "https://www.dfat.gov.au/people-to-people/australia-awards",
    type: "international",
    country: "Australia",
    tags: ["Full Funding", "Master's/PhD", "Living Allowance"],
    deadline: "February–April",
  },
  {
    name: "GREAT Scholarships",
    provider: "British Council / UK Universities",
    amount: "GBP 10,000 toward tuition (Master's)",
    howToAccess: "British Council India / partner university",
    link: "https://study-uk.britishcouncil.org/scholarships/great-scholarships",
    type: "international",
    country: "UK",
    tags: ["Partial Funding", "Master's", "UK Universities"],
    deadline: "May–June",
  },
  {
    name: "Rhodes Scholarship (Oxford)",
    provider: "Rhodes Trust",
    amount: "Full tuition + living + airfare (Oxford)",
    howToAccess: "Apply via Rhodes Trust India",
    link: "https://www.rhodeshouse.ox.ac.uk/scholarships/",
    type: "international",
    country: "UK",
    tags: ["Full Funding", "Oxford", "Prestigious"],
    deadline: "June–August",
  },
  {
    name: "Gates Cambridge Scholarship",
    provider: "Bill & Melinda Gates Foundation",
    amount: "Full funding at Cambridge University",
    howToAccess: "Apply through University of Cambridge",
    link: "https://www.gatescambridge.org/",
    type: "international",
    country: "UK",
    tags: ["Full Funding", "Cambridge", "Prestigious"],
    deadline: "October–December",
  },

  // ── Private / Indian Foundation ──
  {
    name: "Inlaks Shivdasani Foundation",
    provider: "Inlaks Foundation",
    amount: "Up to USD 100,000 for top global universities",
    howToAccess: "Apply at inlaksfoundation.org (India-focused)",
    link: "https://www.inlaksfoundation.org/scholarships/",
    type: "private",
    country: "Abroad",
    tags: ["Full Funding", "Top Universities", "Indian Citizens"],
    deadline: "March–April",
  },
  {
    name: "JN Tata Endowment Scholarship",
    provider: "JN Tata Endowment Trust",
    amount: "₹10 Lakh – 1 Crore loan scholarship",
    howToAccess: "Apply at jntataendowment.org",
    link: "https://www.jntataendowment.org/",
    type: "private",
    country: "Abroad",
    tags: ["Loan Scholarship", "Study Abroad", "Indian Citizens"],
    deadline: "November–March",
  },
  {
    name: "KC Mahindra Scholarship",
    provider: "KC Mahindra Education Trust",
    amount: "₹5 Lakh – 10 Lakh for Master's abroad",
    howToAccess: "Apply at kcmet.org",
    link: "https://www.kcmet.org/",
    type: "private",
    country: "Abroad",
    tags: ["Master's", "Study Abroad", "Indian Citizens"],
    deadline: "March–April",
  },
  {
    name: "Aditya Birla Scholarships",
    provider: "Aditya Birla Group",
    amount: "₹65,000–75,000/year for IIT/IIM/BITS/NLU",
    howToAccess: "Apply during college interviews/campus",
    link: "https://adityabirlascholars.net/",
    type: "private",
    country: "India",
    tags: ["Merit", "IIT/IIM/BITS", "Annual"],
    deadline: "Campus-specific",
  },
  {
    name: "Tata Strive Scholarship",
    provider: "Tata Trusts",
    amount: "Vocational skill training + stipend",
    howToAccess: "Apply via Tata Strive portal",
    link: "https://tatastrive.com/",
    type: "private",
    country: "India",
    tags: ["Vocational", "Skill Training", "Stipend"],
    deadline: "Rolling",
  },
]

// ─── Helpers ──────────────────────────────────────────────────
const TYPE_CONFIG = {
  government: { label: "Government", icon: Landmark, color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200", pill: "bg-blue-100 text-blue-700" },
  international: { label: "International", icon: Globe2, color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", pill: "bg-emerald-100 text-emerald-700" },
  private: { label: "Private Foundation", icon: Building2, color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", pill: "bg-amber-100 text-amber-700" },
}

const COUNTRY_FLAGS: Record<string, string> = {
  India: "🇮🇳", USA: "🇺🇸", UK: "🇬🇧", Germany: "🇩🇪", Japan: "🇯🇵",
  Switzerland: "🇨🇭", Australia: "🇦🇺", Abroad: "🌍",
}

// ─── Component ───────────────────────────────────────────────
export default function ScholarshipMatchesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [countryFilter, setCountryFilter] = useState<string>("all")
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())

  const uniqueCountries = [...new Set(SCHOLARSHIPS.map(s => s.country))]

  const filtered = useMemo(() => {
    return SCHOLARSHIPS.filter(s => {
      const q = searchQuery.toLowerCase()
      const matchesSearch = !q ||
        s.name.toLowerCase().includes(q) ||
        s.provider.toLowerCase().includes(q) ||
        s.amount.toLowerCase().includes(q) ||
        s.tags.some(t => t.toLowerCase().includes(q))

      const matchesType = typeFilter === "all" || s.type === typeFilter
      const matchesCountry = countryFilter === "all" || s.country === countryFilter

      return matchesSearch && matchesType && matchesCountry
    })
  }, [searchQuery, typeFilter, countryFilter])

  const toggleExpand = (idx: number) => {
    setExpandedCards(prev => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  const clearFilters = () => {
    setSearchQuery("")
    setTypeFilter("all")
    setCountryFilter("all")
  }

  const govCount = SCHOLARSHIPS.filter(s => s.type === "government").length
  const intlCount = SCHOLARSHIPS.filter(s => s.type === "international").length
  const privCount = SCHOLARSHIPS.filter(s => s.type === "private").length

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Header */}
      <div className="bg-surface border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground font-heading">
                  Scholarship Finder
                </h1>
                <p className="text-sm text-muted">Government • International • Private Foundations</p>
              </div>
            </div>
            <p className="text-lg text-muted mt-3">
              {SCHOLARSHIPS.length} curated scholarships for Indian students — from government portals to prestigious global fellowships.
            </p>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <button
                onClick={() => setTypeFilter(typeFilter === "government" ? "all" : "government")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  typeFilter === "government"
                    ? "bg-blue-50 border-blue-300 shadow-sm shadow-blue-100"
                    : "bg-surface border-border hover:border-blue-200"
                }`}
              >
                <Landmark className={`w-5 h-5 mb-2 ${typeFilter === "government" ? "text-blue-600" : "text-muted"}`} />
                <p className="text-2xl font-bold font-mono text-foreground">{govCount}</p>
                <p className="text-xs text-muted font-medium">Government</p>
              </button>
              <button
                onClick={() => setTypeFilter(typeFilter === "international" ? "all" : "international")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  typeFilter === "international"
                    ? "bg-emerald-50 border-emerald-300 shadow-sm shadow-emerald-100"
                    : "bg-surface border-border hover:border-emerald-200"
                }`}
              >
                <Globe2 className={`w-5 h-5 mb-2 ${typeFilter === "international" ? "text-emerald-600" : "text-muted"}`} />
                <p className="text-2xl font-bold font-mono text-foreground">{intlCount}</p>
                <p className="text-xs text-muted font-medium">International</p>
              </button>
              <button
                onClick={() => setTypeFilter(typeFilter === "private" ? "all" : "private")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  typeFilter === "private"
                    ? "bg-amber-50 border-amber-300 shadow-sm shadow-amber-100"
                    : "bg-surface border-border hover:border-amber-200"
                }`}
              >
                <Building2 className={`w-5 h-5 mb-2 ${typeFilter === "private" ? "text-amber-600" : "text-muted"}`} />
                <p className="text-2xl font-bold font-mono text-foreground">{privCount}</p>
                <p className="text-xs text-muted font-medium">Private</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search + Filter Row */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              placeholder="Search scholarships, providers, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-surface text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
            />
          </div>

          {/* Country Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setCountryFilter("all")}
              className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                countryFilter === "all"
                  ? "bg-accent text-white border-accent shadow-sm"
                  : "bg-surface border-border text-muted hover:border-accent/30"
              }`}
            >
              🌐 All Destinations
            </button>
            {uniqueCountries.map(c => (
              <button
                key={c}
                onClick={() => setCountryFilter(countryFilter === c ? "all" : c)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  countryFilter === c
                    ? "bg-accent text-white border-accent shadow-sm"
                    : "bg-surface border-border text-muted hover:border-accent/30"
                }`}
              >
                {COUNTRY_FLAGS[c] || "🌍"} {c}
              </button>
            ))}

            {(typeFilter !== "all" || countryFilter !== "all" || searchQuery) && (
              <button
                onClick={clearFilters}
                className="px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-all"
              >
                ✕ Clear All
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted mb-6 font-medium">
          Showing <span className="text-foreground font-bold">{filtered.length}</span> of {SCHOLARSHIPS.length} scholarships
        </p>

        {/* Scholarship Cards */}
        <div className="space-y-4">
          {filtered.map((scholarship, idx) => {
            const config = TYPE_CONFIG[scholarship.type]
            const isExpanded = expandedCards.has(idx)

            return (
              <div
                key={idx}
                className={`rounded-2xl border bg-surface overflow-hidden transition-all hover:shadow-md ${config.border}`}
              >
                <div className="p-5 md:p-6">
                  {/* Top Row: Name + Type + Country */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold ${config.pill}`}>
                          <config.icon className="w-3 h-3" />
                          {config.label}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-gray-100 text-gray-600">
                          {COUNTRY_FLAGS[scholarship.country]} {scholarship.country}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground leading-tight">
                        {scholarship.name}
                      </h3>
                      <p className="text-sm text-muted mt-0.5">{scholarship.provider}</p>
                    </div>

                    <a
                      href={scholarship.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent-hover transition-all shadow-sm shadow-accent/20 whitespace-nowrap"
                    >
                      Apply Now <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Amount Row */}
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center gap-1.5">
                      <IndianRupee className="w-4 h-4 text-emerald-600" />
                      <span className="text-base font-bold font-mono text-emerald-700">
                        {scholarship.amount}
                      </span>
                    </div>
                    {scholarship.deadline && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          Deadline: {scholarship.deadline}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {scholarship.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-surface-alt text-muted border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Expandable Details */}
                  <button
                    onClick={() => toggleExpand(idx)}
                    className="flex items-center gap-1 text-xs font-semibold text-accent hover:underline mt-1"
                  >
                    {isExpanded ? (
                      <><ChevronUp className="w-3.5 h-3.5" /> Hide Details</>
                    ) : (
                      <><ChevronDown className="w-3.5 h-3.5" /> How to Apply</>
                    )}
                  </button>

                  {isExpanded && (
                    <div className={`mt-3 p-4 rounded-xl ${config.bg} border ${config.border}`}>
                      <div className="flex items-start gap-2">
                        <BookOpen className={`w-4 h-4 mt-0.5 flex-shrink-0 ${config.color}`} />
                        <div>
                          <p className="text-sm font-semibold text-foreground mb-1">How to Access</p>
                          <p className="text-sm text-muted">{scholarship.howToAccess}</p>
                          <a
                            href={scholarship.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1 mt-2 text-xs font-bold ${config.color} hover:underline`}
                          >
                            <ExternalLink className="w-3 h-3" />
                            Visit Official Portal →
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="py-20 text-center bg-surface border border-border rounded-2xl">
            <Filter className="w-12 h-12 text-muted mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-2">No scholarships found</h3>
            <p className="text-muted text-sm mb-4">
              No results match your current filters.
            </p>
            <button
              onClick={clearFilters}
              className="px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-hover transition"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Pro Tips */}
        <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-rose-500/5 border border-amber-200/30">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-foreground mb-1">Pro Tips for Scholarship Applications</h3>
              <ul className="text-sm text-muted space-y-1 list-disc list-inside">
                <li>The <strong>National Scholarship Portal</strong> (scholarships.gov.in) is the single point of access for ALL central and most state government schemes.</li>
                <li>For <strong>Fulbright-Nehru</strong> and <strong>Rhodes</strong>, start preparing 12–18 months before the deadline — they require extensive essays and recommendations.</li>
                <li><strong>JN Tata Endowment</strong> and <strong>Inlaks Foundation</strong> are India&apos;s most generous private scholarships — apply early as slots fill fast.</li>
                <li>Most international scholarships require <strong>IELTS/TOEFL</strong> scores. Start preparing early to have scores ready before application deadlines.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
