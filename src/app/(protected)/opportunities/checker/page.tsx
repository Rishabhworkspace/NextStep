"use client"

import { useState } from "react"
import { ShieldAlert, Link as LinkIcon, FileText, Loader2, CheckCircle2, XCircle, ChevronRight } from "lucide-react"

export default function CheckerPage() {
  const [inputType, setInputType] = useState<"url" | "text">("url")
  const [inputVal, setInputVal] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    if (!inputVal.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const bType = inputType === "url" ? { url: inputVal } : { description: inputVal }
      const res = await fetch("/api/internships/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bType),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || "Analysis failed")
      setResult(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-surface border-b border-border py-12">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-accent/10 mb-4">
            <ShieldAlert className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-heading mb-4">
            Internship Authenticity Checker
          </h1>
          <p className="text-lg text-muted">
            Found an internship that looks too good to be true? Paste the description or URL below, 
            and our AI will analyze it for common red flags and scams.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-3xl py-12">
        {/* Input Card */}
        <div className="bg-surface border border-border rounded-xl p-6 shadow-sm mb-8">
          <div className="flex bg-background border border-border rounded-lg p-1 mb-6">
            <button
              onClick={() => { setInputType("url"); setInputVal(""); setResult(null); setError(null); }}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                inputType === "url" ? "bg-accent text-white" : "text-muted hover:text-foreground"
              }`}
            >
              <LinkIcon className="inline-block w-4 h-4 mr-2 -mt-0.5" /> Link (URL)
            </button>
            <button
              onClick={() => { setInputType("text"); setInputVal(""); setResult(null); setError(null); }}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                inputType === "text" ? "bg-accent text-white" : "text-muted hover:text-foreground"
              }`}
            >
              <FileText className="inline-block w-4 h-4 mr-2 -mt-0.5" /> Paste Text
            </button>
          </div>

          <div className="mb-6">
            {inputType === "url" ? (
              <input
                type="url"
                placeholder="https://internshala.com/internship/..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-accent/50 outline-none"
              />
            ) : (
              <textarea
                placeholder="Paste the full job description here..."
                rows={6}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-accent/50 outline-none resize-none"
              />
            )}
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading || !inputVal.trim()}
            className="w-full py-3 rounded-lg bg-accent text-white font-bold text-lg hover:bg-accent-hover transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? (
              <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Analyzing...</>
            ) : (
              "Run Authenticity Check"
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 font-medium mb-8">
            <XCircle className="inline-block w-5 h-5 mr-2 -mt-0.5" />
            {error}
          </div>
        )}

        {/* Results Card */}
        {result && (
          <div className="bg-surface border border-border rounded-xl p-6 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4">
            
            {/* Score Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-border">
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold font-heading mb-1 text-foreground">
                  Trust Score
                </h2>
                <p className="text-sm text-muted">Based on 5 critical fraud parameters</p>
              </div>
              
              <div className="flex items-center justify-center">
                <div className={`relative w-24 h-24 rounded-full border-8 flex items-center justify-center ${
                  result.trustScore >= 80 ? 'border-emerald-500 text-emerald-500' :
                  result.trustScore >= 50 ? 'border-amber-500 text-amber-500' :
                  'border-rose-500 text-rose-500'
                }`}>
                  <span className="text-2xl font-black">{result.trustScore}</span>
                </div>
              </div>
            </div>

            {/* Verdict */}
            <div className={`mt-6 p-4 rounded-lg border ${
              result.trustScore >= 80 ? 'bg-emerald-500/5 border-emerald-500/20' :
              result.trustScore >= 50 ? 'bg-amber-500/5 border-amber-500/20' :
              'bg-rose-500/5 border-rose-500/20'
            }`}>
              <p className="text-foreground tracking-wide leading-relaxed">
                <strong className="font-heading text-lg">AI Verdict:</strong> <br/>
                {result.verdict}
              </p>
            </div>

            {/* Checkboxes Grid */}
            <div className="mt-8">
              <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-4">Inspection Criteria</h3>
              <div className="grid gap-3">
                <div className="flex items-center justify-between p-3 rounded-md bg-surface-alt border border-border">
                  <span className="text-sm font-medium">Payment Requested? (Huge Red Flag)</span>
                  {result.checks.paymentRequestedFlag ? 
                    <span className="text-rose-500 flex items-center gap-1"><XCircle className="w-4 h-4" /> Yes</span> : 
                    <span className="text-emerald-500 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> No</span>}
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-md bg-surface-alt border border-border">
                  <span className="text-sm font-medium">Verifiable Company Details?</span>
                  {result.checks.verifiableCompanyPass ? 
                    <span className="text-emerald-500 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Yes</span> : 
                    <span className="text-rose-500 flex items-center gap-1"><XCircle className="w-4 h-4" /> No</span>}
                </div>

                <div className="flex items-center justify-between p-3 rounded-md bg-surface-alt border border-border">
                  <span className="text-sm font-medium">Legitimate Contact Method?</span>
                  {result.checks.legitimateContactPass ? 
                    <span className="text-emerald-500 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Yes</span> : 
                    <span className="text-rose-500 flex items-center gap-1"><XCircle className="w-4 h-4" /> No</span>}
                </div>

                <div className="flex items-center justify-between p-3 rounded-md bg-surface-alt border border-border">
                  <span className="text-sm font-medium">Realistic Job Scope?</span>
                  {result.checks.realisticScopePass ? 
                    <span className="text-emerald-500 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Yes</span> : 
                    <span className="text-rose-500 flex items-center gap-1"><XCircle className="w-4 h-4" /> No</span>}
                </div>

                <div className="flex items-center justify-between p-3 rounded-md bg-surface-alt border border-border">
                  <span className="text-sm font-medium">Realistic Stipend?</span>
                  {result.checks.realisticPayPass ? 
                    <span className="text-emerald-500 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Yes</span> : 
                    <span className="text-rose-500 flex items-center gap-1"><XCircle className="w-4 h-4" /> No</span>}
                </div>
              </div>
            </div>

            {/* Red Flags List */}
            {result.redFlags && result.redFlags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="text-sm font-bold text-rose-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Specific Red Flags Spotted
                </h3>
                <ul className="space-y-2">
                  {result.redFlags.map((flag: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                      <ChevronRight className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
          </div>
        )}
      </div>
    </div>
  )
}

function AlertTriangle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}
