import { ShieldCheck, AlertTriangle, XCircle, HelpCircle } from "lucide-react"

export function TrustBadge({
  score,
  isLive = false,
}: {
  score?: number | null
  isLive?: boolean
}) {
  if (!isLive) {
    // Year-round static DB items are always verified by us
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-bold">
        <ShieldCheck className="w-3.5 h-3.5" />
        Verified Curated
      </div>
    )
  }

  if (score === null || score === undefined) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-500 dark:text-slate-400 text-xs font-bold">
        <HelpCircle className="w-3.5 h-3.5" />
        Unverified
      </div>
    )
  }

  if (score >= 80) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-bold">
        <ShieldCheck className="w-3.5 h-3.5" />
        High Trust ({score})
      </div>
    )
  }

  if (score >= 50) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-bold">
        <AlertTriangle className="w-3.5 h-3.5" />
        Caution ({score})
      </div>
    )
  }

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 text-xs font-bold">
      <XCircle className="w-3.5 h-3.5" />
      High Risk ({score})
    </div>
  )
}
