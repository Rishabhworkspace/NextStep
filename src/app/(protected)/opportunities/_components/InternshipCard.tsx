"use client"

import { useState } from "react"
import { Bookmark, MapPin, Building, Activity, GraduationCap, Clock, ExternalLink, Zap } from "lucide-react"
import { TrustBadge } from "./TrustBadge"
import Link from "next/link"

export function InternshipCard({ internship, isLive = false }: { internship: any, isLive?: boolean }) {
  const [saved, setSaved] = useState(false)

  const toggleSave = async () => {
    setSaved(!saved)
    try {
      const method = saved ? "DELETE" : "POST"
      await fetch("/api/internships/save", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ internshipId: internship._id, type: isLive ? "live" : "year_round" }),
      })
    } catch {
      setSaved(saved) // Revert on err
    }
  }

  // Format stipend
  let stipText = internship.stipendNote || "Not Disclosed"
  if (internship.stipendMin) {
    if (internship.stipendMax) {
      stipText = `₹${(internship.stipendMin / 1000).toFixed(0)}K – ${(internship.stipendMax / 1000).toFixed(0)}K/mo`
    } else {
      stipText = `₹${(internship.stipendMin / 1000).toFixed(0)}K+/mo`
    }
  }

  return (
    <div className="bg-surface border border-border rounded-xl p-5 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all group overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform" />
      
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Building className="w-4 h-4 text-muted" />
            <span className="text-sm font-semibold text-foreground">{internship.company}</span>
          </div>
          <h3 className="text-lg font-bold text-foreground font-heading leading-tight group-hover:text-accent transition-colors">
            {internship.role}
          </h3>
        </div>
        <button 
          onClick={toggleSave}
          className={`p-2 rounded-lg border transition-colors ${saved ? 'bg-accent/10 border-accent/30 text-accent' : 'border-border text-muted hover:text-foreground hover:bg-surface-alt'}`}
        >
          <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Tags Grid */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-alt text-xs font-medium text-foreground border border-border">
          <MapPin className="w-3.5 h-3.5 text-muted" /> {isLive ? internship.location || internship.workMode : internship.location}
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-alt text-xs font-medium text-foreground border border-border">
          <Activity className="w-3.5 h-3.5 text-muted" /> {stipText}
        </span>
        {!isLive && internship.season && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-alt text-xs font-medium text-foreground border border-border">
            <Clock className="w-3.5 h-3.5 text-muted" /> {internship.season}
          </span>
        )}
      </div>

      {/* Content depending on type */}
      {!isLive ? (
        <div className="space-y-3 mb-5">
           <div className="flex items-start gap-2 text-sm text-muted">
            <GraduationCap className="w-4 h-4 mt-0.5 shrink-0" />
            <p><strong>Eligibility:</strong> {internship.yearEligibility?.join(", ")} | {internship.degreeType?.join(", ")}</p>
          </div>
          {internship.skillsRequired && internship.skillsRequired.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {internship.skillsRequired.slice(0, 4).map((skill: string) => (
                <span key={skill} className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3 mb-5">
          <p className="text-sm text-muted line-clamp-2">{internship.AI_Summary}</p>
          <p className="text-xs text-muted/60">Source: <span className="font-medium text-foreground">{internship.source}</span></p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
        <TrustBadge score={internship.trustScore} isLive={isLive} />
        
        <div className="flex items-center gap-2">
          {isLive && (!internship.trustScore) && (
            <Link href={`/opportunities/checker?url=${encodeURIComponent(internship.applyUrl)}`}
               className="p-2 rounded-lg text-xs font-medium text-warning hover:bg-warning/10 transition-colors"
               title="Analyze this listing">
              <Zap className="w-4 h-4" />
            </Link>
          )}
          <a
            href={internship.applyUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20"
          >
            Apply <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}
