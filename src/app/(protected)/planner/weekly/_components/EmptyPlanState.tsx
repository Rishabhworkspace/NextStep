"use client"

import { motion } from "framer-motion"

interface EmptyPlanStateProps {
  onGenerate: () => void
  generating: boolean
}

export function EmptyPlanState({ onGenerate, generating }: EmptyPlanStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden pointer-events-none mt-20">
        <div className="w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl opacity-50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative overflow-hidden bg-surface/50 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-xl text-center"
      >
        {/* Glow corner */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-xl pointer-events-none" />

        {!generating ? (
          <>
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
              <span className="text-3xl">🗓️</span>
              {/* Pulsing ring */}
              <div className="absolute inset-0 rounded-full border border-accent/30 animate-ping opacity-50" />
            </div>
            
            <h2 className="text-2xl font-heading font-bold text-foreground mb-3">
              Command Central
            </h2>
            <p className="text-muted mb-8 text-sm">
              Your calendar is currently clear. We&#39;ll analyze your Career Roadmap and intelligently schedule your week to maximize your learning momentum.
            </p>

            <button
              onClick={onGenerate}
              className="w-full relative group overflow-hidden bg-accent text-white rounded-2xl p-[1px] transition-all hover:shadow-accent"
            >
              {/* Subtle animated border gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent via-quaternary to-accent opacity-0 group-hover:opacity-100 transition-opacity animate-pulse pointer-events-none" />
              
              <div className="relative bg-accent flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-medium">
                <span className="text-lg">✨</span> Generate My Action Plan
              </div>
            </button>
          </>
        ) : (
          <div className="py-6">
            <div className="flex justify-center mb-8">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-accent/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-accent rounded-full border-t-transparent animate-spin" />
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-foreground mb-4">Crafting Your Schedule...</h3>
            
            <div className="space-y-3 text-sm text-muted text-left">
              <motion.div 
                initial={{ opacity: 0.5 }} 
                animate={{ opacity: 1 }} 
                className="flex items-center gap-3 text-accent"
              >
                <div className="w-2 h-2 rounded-full bg-accent" />
                Reading your roadmap targets
              </motion.div>
              <motion.div 
                initial={{ opacity: 0.5 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 1 }}
                className="flex items-center gap-3 text-foreground"
              >
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Matching resources to timeline
              </motion.div>
              <motion.div 
                initial={{ opacity: 0.5 }} 
                animate={{ opacity: 0.5 }} 
                transition={{ delay: 2 }}
                className="flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-muted" />
                Distributing study load optimally
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
