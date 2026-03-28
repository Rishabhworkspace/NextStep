import { create } from "zustand"
import type { Question } from "@/constants/questionBank"

export interface QuizAnswer {
  questionId: string
  concept: string
  selectedIndex: number
  correctIndex: number
  isCorrect: boolean
}

interface QuizState {
  questions: Question[]
  currentIndex: number
  answers: QuizAnswer[]
  timeLeft: number
  isFinished: boolean

  setQuestions: (q: Question[]) => void
  submitAnswer: (selectedIndex: number) => void
  nextQuestion: () => void
  setTimeLeft: (t: number) => void
  finishQuiz: () => void
  reset: () => void
}

export const useQuizStore = create<QuizState>((set, get) => ({
  questions: [],
  currentIndex: 0,
  answers: [],
  timeLeft: 30,
  isFinished: false,

  setQuestions: (questions) => set({ questions, currentIndex: 0, answers: [], isFinished: false, timeLeft: 30 }),

  submitAnswer: (selectedIndex) => {
    const { questions, currentIndex, answers } = get()
    const q = questions[currentIndex]
    if (!q) return

    const answer: QuizAnswer = {
      questionId: q.id,
      concept: q.concept,
      selectedIndex,
      correctIndex: q.correctIndex,
      isCorrect: selectedIndex === q.correctIndex,
    }
    set({ answers: [...answers, answer] })
  },

  nextQuestion: () => {
    const { currentIndex, questions } = get()
    if (currentIndex + 1 >= questions.length) {
      set({ isFinished: true })
    } else {
      set({ currentIndex: currentIndex + 1, timeLeft: 30 })
    }
  },

  setTimeLeft: (timeLeft) => set({ timeLeft }),

  finishQuiz: () => set({ isFinished: true }),

  reset: () => set({ questions: [], currentIndex: 0, answers: [], timeLeft: 30, isFinished: false }),
}))
