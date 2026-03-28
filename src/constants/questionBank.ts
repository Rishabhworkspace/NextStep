export interface Question {
  id: string
  concept: string
  question: string
  options: string[]
  correctIndex: number
  difficulty: "easy" | "medium" | "hard"
}

const questionBank: Question[] = [
  // ─── Data Structures ───────────────────────────────
  {
    id: "ds-1",
    concept: "Data Structures",
    question: "What is the time complexity of accessing an element in an array by index?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
    correctIndex: 0,
    difficulty: "easy",
  },
  {
    id: "ds-2",
    concept: "Data Structures",
    question: "Which data structure uses LIFO (Last In First Out) principle?",
    options: ["Queue", "Stack", "Linked List", "Tree"],
    correctIndex: 1,
    difficulty: "easy",
  },
  {
    id: "ds-3",
    concept: "Data Structures",
    question: "What is the worst-case time complexity of inserting an element at the beginning of an ArrayList?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctIndex: 2,
    difficulty: "medium",
  },
  {
    id: "ds-4",
    concept: "Data Structures",
    question: "Which data structure is best for implementing an LRU cache?",
    options: ["Array", "Stack", "HashMap + Doubly Linked List", "Binary Tree"],
    correctIndex: 2,
    difficulty: "hard",
  },

  // ─── Algorithms ─────────────────────────────────────
  {
    id: "algo-1",
    concept: "Algorithms",
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correctIndex: 1,
    difficulty: "easy",
  },
  {
    id: "algo-2",
    concept: "Algorithms",
    question: "Which sorting algorithm has the best average-case time complexity?",
    options: ["Bubble Sort O(n²)", "Merge Sort O(n log n)", "Selection Sort O(n²)", "Insertion Sort O(n²)"],
    correctIndex: 1,
    difficulty: "medium",
  },
  {
    id: "algo-3",
    concept: "Algorithms",
    question: "What algorithmic paradigm does Dijkstra's shortest path algorithm use?",
    options: ["Dynamic Programming", "Divide and Conquer", "Greedy", "Backtracking"],
    correctIndex: 2,
    difficulty: "medium",
  },
  {
    id: "algo-4",
    concept: "Algorithms",
    question: "What is the space complexity of a recursive Fibonacci implementation without memoization?",
    options: ["O(1)", "O(n)", "O(2ⁿ)", "O(log n)"],
    correctIndex: 1,
    difficulty: "hard",
  },

  // ─── Python ─────────────────────────────────────────
  {
    id: "py-1",
    concept: "Python",
    question: "What is the output of `type([]) is list` in Python?",
    options: ["True", "False", "TypeError", "None"],
    correctIndex: 0,
    difficulty: "easy",
  },
  {
    id: "py-2",
    concept: "Python",
    question: "Which keyword is used to create a generator function in Python?",
    options: ["return", "generate", "yield", "async"],
    correctIndex: 2,
    difficulty: "medium",
  },
  {
    id: "py-3",
    concept: "Python",
    question: "What does the `@staticmethod` decorator do?",
    options: [
      "Makes the method async",
      "Binds the method to the class, not instance, without cls param",
      "Makes the method private",
      "Caches the method result",
    ],
    correctIndex: 1,
    difficulty: "medium",
  },
  {
    id: "py-4",
    concept: "Python",
    question: "What is the difference between `deepcopy` and `copy`?",
    options: [
      "No difference",
      "deepcopy copies nested objects recursively, copy does not",
      "copy is faster but less accurate",
      "deepcopy only works on lists",
    ],
    correctIndex: 1,
    difficulty: "hard",
  },

  // ─── SQL ────────────────────────────────────────────
  {
    id: "sql-1",
    concept: "SQL",
    question: "Which SQL clause is used to filter rows?",
    options: ["SELECT", "WHERE", "ORDER BY", "GROUP BY"],
    correctIndex: 1,
    difficulty: "easy",
  },
  {
    id: "sql-2",
    concept: "SQL",
    question: "What type of JOIN returns rows when there is a match in both tables?",
    options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "CROSS JOIN"],
    correctIndex: 2,
    difficulty: "easy",
  },
  {
    id: "sql-3",
    concept: "SQL",
    question: "What is a subquery that returns a single value called?",
    options: ["Scalar subquery", "Correlated subquery", "Inline view", "Derived table"],
    correctIndex: 0,
    difficulty: "medium",
  },
  {
    id: "sql-4",
    concept: "SQL",
    question: "What does ACID stand for in database transactions?",
    options: [
      "Atomicity, Consistency, Isolation, Durability",
      "Add, Create, Insert, Delete",
      "Atomic, Concurrent, Indexed, Distributed",
      "Access, Control, Index, Data",
    ],
    correctIndex: 0,
    difficulty: "medium",
  },

  // ─── Web Development ────────────────────────────────
  {
    id: "web-1",
    concept: "Web Dev",
    question: "What does the `useEffect` hook do in React?",
    options: [
      "Manages component state",
      "Performs side effects after render",
      "Creates a new component",
      "Handles form validation",
    ],
    correctIndex: 1,
    difficulty: "easy",
  },
  {
    id: "web-2",
    concept: "Web Dev",
    question: "What is the purpose of a REST API's PUT method?",
    options: ["Create a new resource", "Read a resource", "Update/replace a resource", "Delete a resource"],
    correctIndex: 2,
    difficulty: "easy",
  },
  {
    id: "web-3",
    concept: "Web Dev",
    question: "What is the virtual DOM in React?",
    options: [
      "A lightweight copy of the real DOM used for diffing",
      "A browser API for fast rendering",
      "A database for storing DOM state",
      "An alternative to HTML",
    ],
    correctIndex: 0,
    difficulty: "medium",
  },
  {
    id: "web-4",
    concept: "Web Dev",
    question: "What problem does CORS (Cross-Origin Resource Sharing) solve?",
    options: [
      "Caching API responses",
      "Allowing/blocking requests from different origins",
      "Compressing HTTP payloads",
      "Encrypting API keys",
    ],
    correctIndex: 1,
    difficulty: "medium",
  },
]

export const CONCEPTS = [...new Set(questionBank.map(q => q.concept))]

export function getQuizQuestions(count = 20): Question[] {
  const shuffled = [...questionBank].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

export default questionBank
