"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, TrendingUp, ArrowRight, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { CAREER_PATHS, DEMAND_BADGE_COLORS } from "@/constants/careerData"

const DOMAIN_FILTERS = [
  { label: "All", value: "all" },
  { label: "Engineering", value: "engineering" },
  { label: "Data & AI", value: "data" },
  { label: "Design & Product", value: "product" },
  { label: "Security & Infra", value: "infra" },
  { label: "Business", value: "business" },
]

const DOMAIN_MAP: Record<string, string[]> = {
  engineering: ["swe", "fullstack", "mobile", "gamedev"],
  data: ["ds", "ml", "blockchain"],
  product: ["design", "pm"],
  infra: ["devops", "cloud", "security"],
  business: ["ba", "marketing"],
}

export default function CareerExplorePage() {
  const [search, setSearch] = useState("")
  const [activeDomain, setActiveDomain] = useState("all")

  const filtered = useMemo(() => {
    return CAREER_PATHS.filter(path => {
      const matchesSearch =
        !search ||
        path.title.toLowerCase().includes(search.toLowerCase()) ||
        path.keySkills.some(s => s.toLowerCase().includes(search.toLowerCase()))

      const matchesDomain =
        activeDomain === "all" || DOMAIN_MAP[activeDomain]?.includes(path.key)

      return matchesSearch && matchesDomain
    })
  }, [search, activeDomain])

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-orange-500" />
          <h1
            className="text-3xl md:text-4xl font-extrabold text-gray-900"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Explore Career Paths
          </h1>
        </div>
        <p className="text-gray-500 text-lg max-w-xl">
          Discover the right career for you. Each path comes with salary insights, demand levels, and a personalized AI roadmap.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search careers or skills..."
            className="pl-10 h-12 bg-white border-gray-200 rounded-xl shadow-sm"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {DOMAIN_FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setActiveDomain(f.value)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeDomain === f.value
                  ? "bg-gray-900 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Career Cards Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No career paths match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(path => {
            const Icon = path.icon
            const demandColors = DEMAND_BADGE_COLORS[path.demand]

            return (
              <Link
                key={path.key}
                href={`/career/roadmap?goal=${path.key}`}
                className="group"
              >
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300 p-6 h-full flex flex-col">
                  {/* Icon + Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: path.color + "15" }}
                    >
                      <Icon className="w-6 h-6" style={{ color: path.color }} />
                    </div>
                    <div>
                      <h3
                        className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        {path.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">
                        {path.description}
                      </p>
                    </div>
                  </div>

                  {/* Salary + Demand */}
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-sm font-bold font-mono"
                      style={{ color: path.color }}
                    >
                      {path.salaryRange}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${demandColors.bg} ${demandColors.text} ${demandColors.border}`}
                    >
                      <TrendingUp className="w-3 h-3" />
                      {path.demand}
                    </span>
                  </div>

                  {/* Key Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-5 flex-1">
                    {path.keySkills.slice(0, 5).map(skill => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium border border-gray-100"
                      >
                        {skill}
                      </span>
                    ))}
                    {path.keySkills.length > 5 && (
                      <span className="px-2.5 py-1 bg-gray-50 text-gray-400 rounded-lg text-xs font-medium border border-gray-100">
                        +{path.keySkills.length - 5} more
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-400 font-medium">
                      {path.keySkills.length} key skills
                    </span>
                    <span className="flex items-center gap-1 text-sm font-bold text-orange-500 group-hover:gap-2 transition-all">
                      View Roadmap <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
