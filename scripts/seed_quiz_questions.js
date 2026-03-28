require("dotenv").config({ path: ".env.local" })
const mongoose = require("mongoose")
const mammoth = require("mammoth")
const fs = require("fs")
const path = require("path")

const QuizQuestionSchema = new mongoose.Schema({
  careerPath: String,
  concept: String,
  question: String,
  options: [String],
  correctIndex: Number,
  difficulty: String,
})

const QuizQuestion = mongoose.models.QuizQuestion || mongoose.model("QuizQuestion", QuizQuestionSchema)

// Map files to valid careerPaths
const FILE_MAP = {
  "Path 1 SOFTWARE ENGINEER.docx": "swe",
  "Path 2 DATA SCIENTIST.docx": "ds",
  "Path 3 MACHINE LEARNING.docx": "ml",
  "Path 4 PRODUCT DESIGNER.docx": "design",
  "Path 5 PRODUCT MANAGER.docx": "pm",
  "Path 6 SECURITY ANALYST.docx": "security",
  "Path 7 FULL STACK DEVELOPMENT.docx": "fullstack",
  "Path 8 DevOps.docx": "devops",
  "Path 9 MOBILE APP DEVELOPMENT.docx": "mobile",
  "Path 10 CLOUD ARCHITECT.docx": "cloud",
  "Path 11 BLOCKCHAIN DEVELOPER.docx": "blockchain",
  "Path 12 GAME DEVELOPER.docx": "gamedev",
  "Path 13 BUSINESS ANALYST.docx": "ba",
  "Path 14 DIGITAL MARKETING PATH.docx": "marketing",
}

async function seed() {
  if (!process.env.MONGODB_URI) {
    console.error("Missing MONGODB_URI in .env.local")
    process.exit(1)
  }

  await mongoose.connect(process.env.MONGODB_URI)
  console.log("Connected to MongoDB -> Wiping old questions...")
  await QuizQuestion.deleteMany({})

  const questionsDir = path.join(__dirname, "../questions")
  const files = fs.readdirSync(questionsDir).filter(f => f.endsWith(".docx"))

  let totalParsed = 0
  let failedParses = 0

  for (const file of files) {
    const careerPath = FILE_MAP[file]
    if (!careerPath) {
      console.warn(`[SKIP] Unmapped file: ${file}`)
      continue
    }

    console.log(`\nParsing: ${file} (Path: ${careerPath})`)
    const result = await mammoth.extractRawText({ path: path.join(questionsDir, file) })
    const text = result.value

    // Split text by numbering pattern "1. ", "2. ", "100. "
    // Using a robust regex that checks for newline followed by number and dot, OR start of string
    const blocks = text.split(/(?:^|\n)\s*(\d+)\.\s+/).filter(Boolean)

    // blocks array alternating: [number, chunk, number, chunk...] 
    // Wait, the first split might yield text before "1.".
    // Let's iterate properly
    
    let currentChunk = ""
    for (let i = 0; i < blocks.length; i++) {
        // If it's a number, it's the start of a new question
        if (/^\d+$/.test(blocks[i].trim()) && i + 1 < blocks.length) {
            const questionNumber = blocks[i]
            const chunk = blocks[i+1]
            i++ // Skip the chunk next since we processed it!

            try {
                // 1. Extract Question Text
                // It goes until the first option 'A.'
                const questionMatch = chunk.split(/A\./)[0].trim()
                if (!questionMatch) throw new Error("Question text empty")

                // 2. Extract Options (A, B, C, D)
                // mammoth groups them oddly sometimes, so regex over the chunk looking for letters
                // Match A., B., C., D. followed by anything up to the next letter or 'Answer:'
                let options = []
                const optionRegex = /([A-D])\.\s*([\s\S]*?)(?=(?:[A-D]\.\s*)|(?:Answer:)|\n|$)/gi
                
                let match;
                while ((match = optionRegex.exec(chunk)) !== null) {
                    const optText = match[2].trim()
                    if (optText) options.push(optText)
                }

                if (options.length < 4) {
                    // Try fallback parsing if they didn't use A. B. C. D. properly
                    // For example, if it's just raw newlines. But based on terminal output, it follows A. B. C. D.
                    throw new Error(`Found ${options.length} options instead of 4`)
                }

                // 3. Extract correct index
                const answerMatch = chunk.match(/Answer:\s*([A-D])/i)
                if (!answerMatch) throw new Error("Cannot find Answer: letter")
                
                const correctLetter = answerMatch[1].toUpperCase()
                const correctIndex = correctLetter.charCodeAt(0) - 65 // 'A' -> 0, 'B' -> 1
                
                // Construct DB Object
                await QuizQuestion.create({
                    careerPath,
                    concept: "Core Fundamentals", // Generic concept, fallback
                    question: questionMatch,
                    options: options.slice(0, 4), // enforce 4
                    correctIndex,
                    difficulty: "medium" // All generic medium
                })

                totalParsed++
            } catch (err) {
                // Ignore silent skips as requested
                failedParses++
                // console.log(`[Parse Error] Q${questionNumber}: ${err.message}`)
            }
        }
    }
  }

  console.log(`\n✅ Database Seeding Complete!`)
  console.log(`- Total Questions Extracted seamlessly: ${totalParsed}`)
  console.log(`- Questions Skipped due to Typos: ${failedParses}`)

  process.exit(0)
}

seed().catch(err => {
  console.error("Fatal Seeding Error: ", err)
  process.exit(1)
})
