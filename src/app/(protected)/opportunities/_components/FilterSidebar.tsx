"use client"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"

export interface FilterState {
  domain: string
  mode: string
  year: string
  minStipend: string
  availability: string
}

interface FilterSidebarProps {
  filters: FilterState
  onFilterChange: (key: keyof FilterState, value: string) => void
  onClear: () => void
  isLiveTab: boolean
}

export function FilterSidebar({ filters, onFilterChange, onClear, isLiveTab }: FilterSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const domains = [
    "All",
    "SoftwareDev",
    "AI_ML",
    "DataScience",
    "Cybersecurity",
    "Cloud Computing",
    "IoT",
    "Mechanical",
    "Research",
    "Game Development"
  ]
  const modes = ["All", "Remote", "In-Person", "Hybrid"]
  const years = ["All", "1st year", "2nd year", "3rd year", "4th year", "PG"]
  const stipends = [
    { label: "All", value: "0" },
    { label: "₹10,000+", value: "10000" },
    { label: "₹25,000+", value: "25000" },
    { label: "₹50,000+", value: "50000" },
    { label: "₹1,000,000+", value: "100000" }
  ]
  const availabilities = ["All", "year_round", "Summer", "Winter"]

  return (
    <>
      <button 
        className="md:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-surface text-foreground w-full justify-center mb-4"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <Filter className="w-4 h-4" /> Filters
      </button>

      <div className={`md:block space-y-6 ${isMobileOpen ? 'block' : 'hidden md:block'}`}>
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <h2 className="font-bold text-foreground">Filters</h2>
          <button onClick={onClear} className="text-xs font-medium text-accent hover:underline">
            Clear all
          </button>
        </div>

        {/* Domain Filter */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted tracking-wide uppercase">Domain</h3>
          <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
            {domains.map((d) => (
              <label key={d} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="domain"
                  checked={filters.domain === d}
                  onChange={() => onFilterChange("domain", d)}
                  className="w-4 h-4 accent-accent rounded-sm border-border bg-surface text-accent focus:ring-accent"
                />
                <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                  {d.replace("_", " ")}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Work Mode */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted tracking-wide uppercase">Work Mode</h3>
          <div className="space-y-2">
            {modes.map((m) => (
              <label key={m} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="mode"
                  checked={filters.mode === m}
                  onChange={() => onFilterChange("mode", m)}
                  className="w-4 h-4 accent-accent rounded-sm border-border bg-surface text-accent focus:ring-accent"
                />
                <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                  {m}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Min Stipend */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted tracking-wide uppercase">Min Stipend</h3>
          <div className="space-y-2">
            {stipends.map((s) => (
              <label key={s.value} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="minStipend"
                  checked={filters.minStipend === s.value}
                  onChange={() => onFilterChange("minStipend", s.value)}
                  className="w-4 h-4 accent-accent rounded-sm border-border bg-surface text-accent focus:ring-accent"
                />
                <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                  {s.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Year Required (Not highly applicable to live but very much for static) */}
        {!isLiveTab && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted tracking-wide uppercase">Year Standing</h3>
            <div className="space-y-2">
              {years.map((y) => (
                <label key={y} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="year"
                    checked={filters.year === y}
                    onChange={() => onFilterChange("year", y)}
                    className="w-4 h-4 accent-accent rounded-sm border-border bg-surface text-accent focus:ring-accent"
                  />
                  <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                    {y}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Availability (Static Only) */}
        {!isLiveTab && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted tracking-wide uppercase">Availability</h3>
            <div className="space-y-2">
              {availabilities.map((a) => (
                <label key={a} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="availability"
                    checked={filters.availability === a}
                    onChange={() => onFilterChange("availability", a)}
                    className="w-4 h-4 accent-accent rounded-sm border-border bg-surface text-accent focus:ring-accent"
                  />
                  <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                    {a.replace("_", "-")}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

      </div>
    </>
  )
}
