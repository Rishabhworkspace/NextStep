"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { X, Clock, Loader2 } from "lucide-react"
import { useQuizStore } from "@/stores/quizStore"
import { getPathLabel } from "@/constants/questionBank"
import type { CareerPath } from "@/constants/questionBank"

export default function QuizPage() {
  const router = useRouter()
  const {
    careerPath, questions, currentIndex, answers, timeLeft, isFinished,
    setCareerPath, setQuestions, submitAnswer, nextQuestion, setTimeLeft, finishQuiz, reset,
  } = useQuizStore()

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [showExitModal, setShowExitModal] = useState(false)
  const [loadingProfile, setLoadingProfile] = useState(true)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch user profile to get targetRole
  useEffect(() => {
    reset()
    async function loadQuiz() {
      try {
        let path: CareerPath = "swe"

        // 1. Fetch user profile targetRole
        const profileRes = await fetch("/api/profile")
        if (profileRes.ok) {
          const data = await profileRes.json()
          if (data.profile?.targetRole) {
            path = data.profile.targetRole as CareerPath
          }
        }
        
        setCareerPath(path)

        // 2. Fetch Dynamic Database Questions 
        const dbRes = await fetch(`/api/quiz/questions?path=${path}&limit=20`)
        if (dbRes.ok) {
          const dbData = await dbRes.json()
          setQuestions(dbData.questions || [])
        } else {
           // Provide basic fallback structure if the DB fails to avoid app crash
           setQuestions([{
             id: "1", concept: "Fallback", question: "Failed to load questions. Please check connection.",
             options: ["A", "B", "C", "D"], correctIndex: 0, difficulty: "easy"
           }])
        }

      } catch (error) {
        console.error("Quiz Loading Error:", error)
        setCareerPath("swe")
        setQuestions([])
      } finally {
        setLoadingProfile(false)
      }
    }
    loadQuiz()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Timer countdown
  useEffect(() => {
    if (isFinished || showResult || questions.length === 0 || loadingProfile) return

    timerRef.current = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    if (timeLeft <= 0) {
      submitAnswer(-1)
      setShowResult(true)
      setTimeout(() => {
        setShowResult(false)
        setSelectedIndex(null)
        nextQuestion()
      }, 1000)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [timeLeft, isFinished, showResult, questions.length, loadingProfile, setTimeLeft, submitAnswer, nextQuestion])

  // Submit quiz when finished
  const handleSubmitQuiz = useCallback(async () => {
    if (submitting) return
    setSubmitting(true)
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, careerPath }),
      })
      if (res.ok) {
        const data = await res.json()
        router.push(`/skill-gap/report/${data.assessmentId}`)
      }
    } catch (err) {
      console.error("Submit error:", err)
    } finally {
      setSubmitting(false)
    }
  }, [answers, careerPath, router, submitting])

  useEffect(() => {
    if (isFinished && answers.length > 0 && !submitting) {
      handleSubmitQuiz()
    }
  }, [isFinished, answers.length, handleSubmitQuiz, submitting])

  // Handle answer selection
  const handleSelect = (index: number) => {
    if (showResult || selectedIndex !== null) return
    setSelectedIndex(index)
    submitAnswer(index)
    setShowResult(true)

    setTimeout(() => {
      setShowResult(false)
      setSelectedIndex(null)
      nextQuestion()
    }, 1200)
  }

  if (loadingProfile || questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-3">
        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
        <p className="text-sm text-gray-400 font-medium">Loading your personalized quiz…</p>
      </div>
    )
  }

  if (isFinished) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
        <p className="text-gray-500 font-medium">Analyzing your results with AI…</p>
      </div>
    )
  }

  const q = questions[currentIndex]
  const progress = ((currentIndex) / questions.length) * 100
  const timerColor = timeLeft <= 5 ? "text-red-500" : timeLeft <= 10 ? "text-amber-500" : "text-gray-500"

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => setShowExitModal(true)}
          className="w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="flex items-center gap-4 flex-1 max-w-md mx-8">
          <span className="text-sm font-medium text-gray-400 whitespace-nowrap">
            Q{currentIndex + 1}/{questions.length}
          </span>
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #F97316, #EC4899)",
              }}
            />
          </div>
        </div>

        <div className={`flex items-center gap-1.5 font-mono text-sm font-bold ${timerColor} transition-colors`}>
          <Clock className="w-4 h-4" />
          0:{timeLeft.toString().padStart(2, "0")}
        </div>
      </header>

      {/* Path Badge */}
      {careerPath && (
        <div className="text-center pt-6">
          <span className="inline-block px-3 py-1 rounded-full bg-gray-50 text-gray-500 text-xs font-medium border border-gray-100">
            {getPathLabel(careerPath)} Assessment
          </span>
        </div>
      )}

      {/* Question Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-2xl space-y-10">
          {/* Concept Badge */}
          <div className="text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold border border-orange-100 mb-4">
              {q.concept}
            </span>
            <h2
              className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {q.question}
            </h2>
          </div>

          {/* Answer Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {q.options.map((option, idx) => {
              let cardClass = "bg-gray-50 border-gray-200 hover:border-orange-300 hover:bg-orange-50/30 cursor-pointer"

              if (showResult && selectedIndex !== null) {
                if (idx === q.correctIndex) {
                  cardClass = "bg-emerald-50 border-emerald-400 text-emerald-800 ring-2 ring-emerald-200"
                } else if (idx === selectedIndex && selectedIndex !== q.correctIndex) {
                  cardClass = "bg-red-50 border-red-400 text-red-800 animate-shake"
                } else {
                  cardClass = "bg-gray-50 border-gray-100 opacity-50"
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={showResult}
                  className={`p-5 rounded-xl border-2 text-left text-sm font-medium transition-all ${cardClass}`}
                >
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white border border-gray-200 text-xs font-bold text-gray-500 mr-3 shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {option}
                </button>
              )
            })}
          </div>
        </div>
      </main>

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl space-y-4 text-center">
            <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "var(--font-outfit)" }}>
              Exit Quiz?
            </h3>
            <p className="text-sm text-gray-500">Your progress will be lost. Are you sure?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExitModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Continue Quiz
              </button>
              <button
                onClick={() => { reset(); router.push("/skill-gap/overview") }}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
