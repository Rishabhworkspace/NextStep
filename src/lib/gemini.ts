import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

// ─── Multi-Model Fallback Wrapper ───────────────────────────────────────────

/**
 * Attempts to generate content using Groq first (fastest, higher limits).
 * If Groq fails (e.g. rate limit, network issue), automatically falls back 
 * to Gemini 1.5 Flash.
 */
async function generateContentWithFallback(prompt: string): Promise<string> {
  // 1. Try Groq (llama-3.3-70b-versatile)
  try {
    const groqKey = process.env.GROQ_API_KEY;
    if (groqKey) {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${groqKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.choices?.[0]?.message?.content) {
          console.log("🤖 Successfully generated content using Groq (llama-3.3-70b)");
          return data.choices[0].message.content;
        }
      } else {
        console.warn(`⚠️ Groq API warning: ${response.status} ${response.statusText}`);
        const errText = await response.text();
        console.warn("Groq Error details:", errText);
      }
    } else {
      console.warn("⚠️ No GROQ_API_KEY found, falling back directly to Gemini.");
    }
  } catch (error) {
    console.warn("⚠️ Groq API failed, falling back to Gemini.", error);
  }

  // 2. Fallback to Gemini (gemini-1.5-flash)
  console.log("🔄 Falling back to Gemini 1.5 Flash...");
  // Use 1.5-flash as it typically has slightly better rate limit buckets for the free tier
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

// ─── Quiz Insights Generation ───────────────────────────────────────────────

export async function getSkillGapInsight(
  conceptScores: { concept: string; correct: number; total: number; percentage: number }[],
  totalPercentage: number
): Promise<string> {
  try {
    const weakAreas = conceptScores
      .filter(c => c.percentage < 60)
      .map(c => `${c.concept} (${c.percentage}%)`)
      .join(", ")

    const strongAreas = conceptScores
      .filter(c => c.percentage >= 60)
      .map(c => `${c.concept} (${c.percentage}%)`)
      .join(", ")

    const prompt = `You are an AI tutor for a student learning tech skills. Based on their quiz results:

Overall Score: ${totalPercentage}%
Strong Areas: ${strongAreas || "None"}
Weak Areas: ${weakAreas || "None"}

Provide a 3-4 sentence personalized insight:
1. Acknowledge their strengths briefly.
2. Identify the most critical weak area to focus on.
3. Suggest one specific actionable step to improve.
Keep it encouraging, concise, and practical. Do not use markdown formatting.`

    const text = await generateContentWithFallback(prompt)
    return text
  } catch (error) {
    console.error("AI Insight generation error:", error)
    return "Keep practicing! Focus on your weak areas and retake the assessment to track your improvement."
  }
}

// ─── Career Roadmap Generation ────────────────────────────────

export interface GeneratedPhase {
  id: string
  title: string
  description: string
  skills: {
    id: string
    name: string
    description: string
    estimatedHours: number
  }[]
}

export async function generateCareerRoadmap(input: {
  targetRole: string
  currentSkills: { name: string; proficiency: number }[]
  conceptScores?: { concept: string; percentage: number }[]
  timeline: string
}): Promise<{ title: string; estimatedMonths: number; phases: GeneratedPhase[] }> {
  try {
    const knownSkills = input.currentSkills
      .map(s => `${s.name} (${s.proficiency}% proficiency)`)
      .join(", ")

    const weakAreas = input.conceptScores
      ?.filter(c => c.percentage < 60)
      .map(c => c.concept)
      .join(", ") || "Not assessed yet"

    const prompt = `You are a career development AI. Generate a structured learning roadmap for a student.

TARGET ROLE: ${input.targetRole}
CURRENT SKILLS: ${knownSkills || "None specified"}
WEAK AREAS FROM ASSESSMENT: ${weakAreas}
TIMELINE: ${input.timeline}

Generate a roadmap with 4-5 phases (Foundation → Core → Intermediate → Advanced → Capstone).
Each phase should have 3-5 skills to learn.

IMPORTANT RULES:
- Skip skills the student already knows at >70% proficiency
- Prioritize weak areas from the assessment
- Each skill needs: name, short description (1 sentence), estimated hours to learn
- Use realistic hour estimates (5-40 hours per skill)
- Make it specific to the career path, not generic

Return ONLY valid JSON in this exact format (no markdown, no code fences):
{
  "title": "Your Path to [Role Title]",
  "estimatedMonths": <number>,
  "phases": [
    {
      "id": "phase-1",
      "title": "Phase Title",
      "description": "What this phase covers",
      "skills": [
        {
          "id": "skill-1-1",
          "name": "Skill Name",
          "description": "Why this skill matters and what you'll learn",
          "estimatedHours": 20
        }
      ]
    }
  ]
}`

    const text = await generateContentWithFallback(prompt)

    // Clean potential markdown fences
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim()
    const parsed = JSON.parse(cleaned)

    // Mark skills the user already knows as completed
    const knownSkillNames = new Set(
      input.currentSkills
        .filter(s => s.proficiency >= 70)
        .map(s => s.name.toLowerCase())
    )

    for (const phase of parsed.phases) {
      for (const skill of phase.skills) {
        if (knownSkillNames.has(skill.name.toLowerCase())) {
          (skill as GeneratedPhase["skills"][0] & { status?: string }).status = "completed"
        }
      }
    }

    return parsed
  } catch (error) {
    console.error("AI roadmap generation error:", error)
    // Return a minimal fallback roadmap
    return {
      title: `Your Path to ${input.targetRole}`,
      estimatedMonths: 6,
      phases: [
        {
          id: "phase-1",
          title: "Foundation",
          description: "Build your base skills",
          skills: [
            {
              id: "skill-1-1",
              name: "Core Fundamentals",
              description: "Start with the foundational concepts for your career path.",
              estimatedHours: 20,
            },
          ],
        },
      ],
    }
  }
}

// ─── Weekly Planner Generation ──────────────────────────────────────────────

export interface GeneratedWeeklyPlan {
  days: {
    dayOfWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"
    tasks: {
      id: string
      title: string
      estimatedMinutes: number
      relatedSkillId?: string
    }[]
  }[]
}

export async function generateWeeklyPlan(input: {
  activeSkills: { id: string; name: string }[]
  hoursPerWeek: number
}): Promise<GeneratedWeeklyPlan | null> {
  try {
    if (input.activeSkills.length === 0) {
      return null;
    }

    const skillsStr = input.activeSkills.map(s => `${s.name} (ID: ${s.id})`).join(", ")
    
    const prompt = `You are an AI study planner. A student wants to learn these active skills this week: ${skillsStr}
They can dedicate ${input.hoursPerWeek} hours this week to learning.

Create a 7-day study plan from Monday to Sunday. Break down the learning into actionable tasks.
Distribute the ${input.hoursPerWeek} hours realistically across the days (some days can be lighter or rest days).

Rules:
1. Provide actionable task titles (e.g., "Watch tutorial on React Hooks", "Build a small API with Node.js").
2. Assign each task an "estimatedMinutes" value.
3. If a task relates to one of the active skills, include its EXACT skill ID in "relatedSkillId".
4. Ensure at least one rest day, or lighter days to prevent burnout.
5. Return ONLY valid JSON in this exact format (no markdown, no code fences):

{
  "days": [
    {
      "dayOfWeek": "Monday",
      "tasks": [
        {
          "id": "task-mon-1",
          "title": "Read documentation on Active Skill",
          "estimatedMinutes": 60,
          "relatedSkillId": "skill-111"
        }
      ]
    },
    {
      "dayOfWeek": "Tuesday",
      "tasks": []
    }
  ]
}`

    const text = await generateContentWithFallback(prompt)

    // Clean potential markdown fences
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim()
    const parsed = JSON.parse(cleaned)
    return parsed as GeneratedWeeklyPlan
  } catch (error) {
    console.error("AI weekly plan generation error:", error)
    return null
  }
}

// ─── Skill Boost Plan Generation ────────────────────────────────────────────

export interface GeneratedBoostConcept {
  concept: string
  steps: {
    id: string
    title: string
    description: string
    estimatedMinutes: number
  }[]
}

export async function generateSkillBoostPlan(input: {
  weakConcepts: { concept: string; currentPercentage: number }[]
  careerPath: string
}): Promise<GeneratedBoostConcept[]> {
  try {
    if (input.weakConcepts.length === 0) return []

    const conceptList = input.weakConcepts
      .map(c => `${c.concept} (currently at ${c.currentPercentage}%)`)
      .join("\n- ")

    const prompt = `You are an expert online tutor helping a student improve their weak areas in ${input.careerPath}.

The student scored below 50% on these concepts in a skills quiz:
- ${conceptList}

For EACH concept, create a concrete recovery plan with 3-5 actionable steps.

RULES:
1. Steps must be specific and executable (NOT "study the topic" or "learn more").
2. Good step examples: "Watch 'SQL Joins Explained' video and take notes (30 min)", "Solve 5 Easy SQL problems on HackerRank (45 min)", "Build a mini todo-list database with 3 tables (1 hr)"
3. Each step needs a realistic time estimate in minutes.
4. Order steps from foundational to advanced for each concept.
5. Use unique IDs in format "step-conceptindex-stepnumber" (e.g. "step-0-1", "step-0-2", "step-1-1")

Return ONLY valid JSON (no markdown, no code fences):
[
  {
    "concept": "SQL Basics",
    "steps": [
      {
        "id": "step-0-1",
        "title": "Watch SQL fundamentals crash course",
        "description": "Cover SELECT, WHERE, ORDER BY basics with a video tutorial",
        "estimatedMinutes": 30
      }
    ]
  }
]`

    const text = await generateContentWithFallback(prompt)
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim()
    const parsed = JSON.parse(cleaned)
    return parsed as GeneratedBoostConcept[]
  } catch (error) {
    console.error("AI skill boost plan generation error:", error)
    // Return minimal fallback plans
    return input.weakConcepts.map((wc, idx) => ({
      concept: wc.concept,
      steps: [
        {
          id: `step-${idx}-1`,
          title: `Review fundamentals of ${wc.concept}`,
          description: `Start with introductory material on ${wc.concept}`,
          estimatedMinutes: 30,
        },
        {
          id: `step-${idx}-2`,
          title: `Practice ${wc.concept} with exercises`,
          description: `Complete practice problems to solidify understanding`,
          estimatedMinutes: 45,
        },
        {
          id: `step-${idx}-3`,
          title: `Build a mini-project using ${wc.concept}`,
          description: `Apply your knowledge in a small hands-on project`,
          estimatedMinutes: 60,
        },
      ],
    }))
  }
}
