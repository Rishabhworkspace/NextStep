"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react"

export default function OnboardingWizard() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const totalSteps = 5
  const progress = (step / totalSteps) * 100

  // Mock form submission
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      // Finish onboarding
      router.push("/dashboard")
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Progress Bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-heading font-bold text-xl text-accent">
          <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
            <span className="text-white text-xs leading-none">N</span>
          </div>
          NextStep
        </div>
        <div className="flex items-center gap-4 w-1/3 max-w-sm">
          <div className="flex-1 h-2 bg-surface-alt rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium text-text-muted shrink-0">Step {step} of {totalSteps}</span>
        </div>
      </header>

      {/* Main Form Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-[50vh] h-[50vh] bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="w-full max-w-xl bg-white relative z-10 animate-fade-in-up">
          
          {step === 1 && (
            <div className="space-y-8 fade-in">
              <div>
                <h1 className="text-3xl font-heading font-bold text-text mb-2">Let's start with the basics</h1>
                <p className="text-text-muted">Tell us a bit about yourself and what you're studying.</p>
              </div>

              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-text">Full Name</label>
                  <Input placeholder="John Doe" className="h-12" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-text">College or University</label>
                  <Input placeholder="e.g. IIT Madras" className="h-12" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text">Degree</label>
                    <Input placeholder="e.g. B.Tech" className="h-12" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text">Year of Study</label>
                    <select className="flex h-12 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text focus-visible:outline-none focus-visible:border-accent">
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year</option>
                      <option>Graduated</option>
                    </select>
                  </div>
                </div>
                <div className="pt-4">
                  <label className="flex items-center gap-3 p-4 border border-border rounded-xl cursor-pointer hover:border-accent transition-colors">
                    <input type="checkbox" className="w-5 h-5 rounded border-border text-accent focus:ring-accent" />
                    <div>
                      <p className="font-medium text-text">I am a first-generation college student</p>
                      <p className="text-xs text-text-muted mt-0.5">Neither of my parents completed a 4-year degree.</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 fade-in">
              <div>
                <h1 className="text-3xl font-heading font-bold text-text mb-2">How are you doing academically?</h1>
                <p className="text-text-muted">This helps us tailor learning resources for you.</p>
              </div>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text">Current CGPA</label>
                    <div className="relative">
                      <Input type="number" step="0.1" placeholder="8.5" className="h-12 pr-12" />
                      <span className="absolute right-4 top-3.5 text-text-muted text-sm border-l border-border pl-3">/ 10</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text">Specialization Stream</label>
                    <select className="flex h-12 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text">
                      <option>Computer Science</option>
                      <option>Electronics</option>
                      <option>Mechanical</option>
                      <option>Civil</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-3 pt-2">
                  <label className="text-sm font-medium text-text">Select 3 areas you feel confident in:</label>
                  <div className="flex flex-wrap gap-2">
                    {['Data Structures', 'Python', 'Web Dev', 'Algorithms', 'Databases', 'Machine Learning'].map(tag => (
                      <span key={tag} className="px-4 py-2 rounded-full border border-border text-sm text-text-muted hover:border-accent hover:text-accent cursor-pointer transition-colors bg-surface-alt">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {(step === 3 || step === 4 || step === 5) && (
            <div className="space-y-8 fade-in text-center py-12">
              <div className="w-16 h-16 bg-accent-light text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h1 className="text-2xl font-heading font-bold text-text mb-4">Step {step} Placeholder</h1>
              <p className="text-text-muted">In a full implementation, this wizard would collect Career Goals, Skills, and Financial data to populate the MongoDB Profile.</p>
              <p className="text-sm bg-surface-alt p-4 rounded-lg inline-block text-text-body border border-border">Click <strong>Continue</strong> to proceed to dashboard.</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-12 pt-6 border-t border-border">
            <Button 
              variant="ghost" 
              onClick={handleBack} 
              disabled={step === 1}
              className={step === 1 ? 'opacity-0 pointer-events-none' : ''}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <Button onClick={handleNext} className="shadow-accent px-8" size="lg">
              {step === totalSteps ? 'Complete Profile' : 'Continue'}
              {step !== totalSteps && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
          
        </div>
      </main>
    </div>
  )
}
