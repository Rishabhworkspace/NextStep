<div align="center">
  <br />
  <img src="public/images/logo.png" alt="NextStep Logo" width="100" />
  <h1>NextStep</h1>
  <p><strong>The AI-powered career platform built for Indian students.</strong><br/>Know your gaps. Get your roadmap. Follow your plan.</p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css" />
    <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb" />
    <img src="https://img.shields.io/badge/Gemini-2.5_Flash-4285F4?style=flat-square&logo=google" />
    <img src="https://img.shields.io/badge/Deployed%20on-Vercel-000?style=flat-square&logo=vercel" />
  </p>

  <p>
    <a href="https://next-step-fawn.vercel.app">🌐 Live Demo</a> ·
    <a href="#-getting-started">🚀 Get Started</a> ·
    <a href="#-features">✨ Features</a> ·
    <a href="#-architecture">🏗 Architecture</a>
  </p>
</div>

---

## 📖 What is NextStep?

Most students know what career they want. Very few know **how to get there**.

The internet has endless learning resources, but no single system that tells you *what* to study, *in what order*, *based on where you actually are right now*. Students waste months following generic roadmaps, falling for fake internships, and not knowing about resources they're entitled to.

**NextStep fixes this.** It's an end-to-end career intelligence platform that:

1. Diagnoses your exact knowledge gaps through adaptive assessments
2. Generates a personalised learning roadmap tailored to your skills and goals
3. Automatically converts that roadmap into a structured weekly schedule
4. Helps you remediate weak concepts with targeted boost plans
5. Protects you from fraudulent internship postings using AI + ML
6. Gives you access to 125+ verified student discounts and scholarships

---

## ✨ Features

### 🎯 Skill Gap Assessment
An adaptive, concept-mapped diagnostic quiz for your chosen career path. Pick from 14 career domains, answer 20 questions, and get:
- A **proficiency level** (Beginner / Intermediate / Advanced / Expert) per concept
- A per-concept score breakdown showing exactly where you're strong and where you're not
- A **Gemini-generated insight report** analysing your results and recommending focus areas
- A performance dashboard tracking your improvement across all quiz attempts

### 🗺️ AI Career Roadmap Generator
Powered by **Google Gemini 2.5 Flash**, the roadmap engine takes your quiz results, your current skill set, target role, and timeline — and produces a personalised, multi-phase career roadmap. Each skill node includes:
- Estimated learning hours
- Progress status (Locked / In Progress / Completed)
- **Live-scraped learning resources** (courses, articles, videos) via Firecrawl, matched specifically to that skill

No generic roadmap templates. Every roadmap is unique to the user.

### 📅 Automated Weekly Planner
Eliminates "planning paralysis" entirely. One click reads your active roadmap skills and produces a full 7-day weekly plan — broken into daily tasks with time estimates — ready for you to execute. Features:
- **AI-generated task breakdown** from your current in-progress roadmap skills
- Always uses your most recently generated career roadmap
- Weekly plan history so you can track past weeks
- Task completion tracking with real-time progress updates

### ⚡ Skill Boost
When you score below 50% on a concept, the Skill Boost engine kicks in:
- **Gemini generates a step-by-step remediation plan** for each weak concept
- Each step has a title, description, and estimated time
- **Firecrawl scrapes fresh, relevant resources** (courses, articles) for every concept
- Target score per concept set to 80% — tracks your progress to mastery

### 🔍 Internship Authenticity Checker
Fake internship postings cost students time, money, and trust. The checker uses a **two-layer AI pipeline**:

1. **Firecrawl / Jina Reader** — Scrapes the raw job listing from any URL in real-time (with automatic fallback between the two scrapers)
2. **Hugging Face BERT Model** (`AventIQ-AI/BERT-Spam-Job-Posting-Detection-Model`) — Performs binary fraud classification on the scraped text
3. **Gemini 2.5 Flash** — Analyses the full text against 5 structured checks and produces a JSON verdict

The output is a **Trust Score (0–100)** with specific red flags and green flags, and a plain-English verdict. Also supports pasting raw job description text if the URL is behind a login wall.

### 💰 Student Benefits Portal
A curated, searchable directory of **125+ verified student discounts** — all confirmed for Indian students. Organised into 8 categories:

| Category | What's Inside |
|---|---|
| 🏷️ Discount Platforms | UNiDAYS, Student Beans, ISIC Card, SheerID |
| 🎵 Entertainment | Spotify, Apple Music, YouTube Premium, Crunchyroll |
| 💻 Technology & Software | GitHub Pack ($200k+ tools), JetBrains, Adobe CC, Microsoft 365, Azure |
| 🎓 Education | Coursera, Udemy, Notion, Khan Academy, edX |
| 👕 Fashion | Nike, Adidas, H&M, Levi's, Myntra, AJIO |
| 💆 Beauty & Wellness | Headspace, Cult.fit, Nykaa, Calm |
| ✈️ Travel | IndiGo, Air India, IRCTC, Emirates, Lufthansa |
| 🍕 Food & Dining | Swiggy, Zomato, Domino's, Subway |

Also includes a dedicated **Scholarships** section covering NSP, Fulbright-Nehru, Chevening, DAAD, MEXT, Rhodes, Gates Cambridge, and 15+ more.

### 📊 Real-Time Dashboard
A central command center aggregating all your data in one view:
- **Success Score** (0–100) — composite of quiz performance, task completion, and roadmap progress
- **Quiz Performance Trend** — sparkline chart of all past assessments
- **Skills Matrix** — proficiency bars for all skills in your profile
- **Weak & Strong Concepts** — pinpointed from quiz history
- **Upcoming Tasks** — live feed from your active weekly plan
- **Career Roadmaps** — quick access to all generated roadmaps
- **Module Engagement** — activity bars for Quizzes, Planner, Boosts, Roadmaps
- **Active Streak** — daily learning streak tracker

### 👤 5-Step Onboarding & Profile
A guided setup flow collecting:
- Personal info (name, college, degree, year)
- Academic background (CGPA, stream, confident/weak subjects)
- Career goals (target role, company type, timeline)
- Current skills with self-rated proficiency levels
- Financial info for scholarship matching

---

## 🏗 Architecture

```
                         ┌─────────────────────────────┐
                         │     Next.js 16 App Router    │
                         │   (SSR + RSC + API Routes)   │
                         └──────────────┬──────────────┘
                                        │
              ┌─────────────────────────┼──────────────────────────┐
              │                         │                          │
     ┌────────▼────────┐      ┌────────▼────────┐      ┌─────────▼────────┐
     │   AI / ML Layer  │      │  Scraping Layer  │      │   Data Layer     │
     │                 │      │                  │      │                  │
     │ Gemini 2.5 Flash│      │   Firecrawl      │      │  MongoDB Atlas   │
     │  - Roadmaps     │      │   - Resources    │      │  (Mongoose)      │
     │  - Plans        │      │   - Internships  │      │                  │
     │  - Quiz insight │      │                  │      │  8 Collections:  │
     │  - Boost plans  │      │   Jina Reader    │      │  - Users         │
     │  - Auth checker │      │   - URL fallback │      │  - Profiles      │
     │                 │      │                  │      │  - Assessments   │
     │ HuggingFace BERT│      └──────────────────┘      │  - Roadmaps      │
     │  - Fraud detect │                                 │  - WeeklyPlans   │
     └─────────────────┘                                 │  - BoostPlans    │
                                                         │  - Internships   │
                                                         │  - QuizQuestions │
                                                         └──────────────────┘
```

### Key Data Flow

```
User selects career path
       ↓
Takes Skill Gap Quiz (from seeded question bank)
       ↓
Quiz results saved → Gemini analyses → Insight report generated
       ↓
User generates Career Roadmap
  → Gemini builds phase/skill structure from quiz scores + profile
  → Firecrawl scrapes real resources for each skill node
  → Roadmap saved to MongoDB
       ↓
User generates Weekly Plan
  → Active roadmap skills fetched
  → Gemini breaks skills into daily tasks
  → Plan saved with specific dates for current week
       ↓
Skill Boost (on weak concepts)
  → Gemini generates step-by-step remediation
  → Firecrawl scrapes concept-specific resources
  → Boost plan saved linked to the assessment
```

---

## 🧠 AI & ML Stack

| Service | Model / Tool | Used For |
|---|---|---|
| **Google Gemini** | `gemini-2.5-flash` | Roadmap generation, weekly planning, quiz insight, skill boost plans, internship analysis |
| **Hugging Face** | `AventIQ-AI/BERT-Spam-Job-Posting-Detection-Model` | Binary fraud classification on internship listings |
| **Firecrawl** | `@mendable/firecrawl-js` | Live scraping of learning resources and internship listings |
| **Jina Reader** | `r.jina.ai` | Fallback URL scraper when Firecrawl is blocked |

---

## 🗄️ Database Schema

| Collection | Purpose | Key Fields |
|---|---|---|
| `users` | Auth-managed user accounts | email, name, image |
| `profiles` | Extended user profile | targetRole, currentSkills, timeline, college, CGPA |
| `skillassessments` | Quiz attempt records | conceptScores, percentage, level, geminiInsight |
| `careerroadmaps` | Generated roadmaps | phases[], skills[], resources[], status per skill |
| `weeklyplans` | Weekly task schedules | days[], tasks[], weekStartDate, focusSkill |
| `skillboostplans` | Concept remediation plans | concepts[], steps[], resources[], targetPercentage |
| `internships` | Curated year-round internship listings | company, role, stipend, domain, eligibility |
| `liveinternships` | Live-scraped internship feed | fetchedAt, company, role, url |
| `quizquestions` | Career-path question bank | question, options, concept, careerPath |

---

## 🗂 Project Structure

```
nextstep/
├── public/                     # Static assets (logo, images)
├── src/
│   ├── app/
│   │   ├── (onboarding)/       # Guided setup flow (5 steps)
│   │   ├── (protected)/        # Authenticated app routes
│   │   │   ├── dashboard/      # Main command center
│   │   │   ├── skill-gap/
│   │   │   │   ├── overview/   # Assessment history
│   │   │   │   ├── quiz/       # Take assessment
│   │   │   │   ├── report/     # Per-attempt result page
│   │   │   │   └── boost/      # Skill Boost plan & tracker
│   │   │   ├── career/
│   │   │   │   ├── explore/    # Career path selection UI
│   │   │   │   └── roadmap/    # Generated roadmap viewer
│   │   │   ├── planner/
│   │   │   │   ├── weekly/     # Active week plan
│   │   │   │   └── history/    # Past week plans
│   │   │   ├── opportunities/  # Internship browser + auth checker
│   │   │   ├── scholarships/   # Scholarship listings
│   │   │   ├── benefits/       # Student discounts portal
│   │   │   └── profile/        # User profile editor
│   │   ├── (public)/           # Landing page
│   │   └── api/
│   │       ├── auth/           # Better Auth handlers
│   │       ├── quiz/           # Submit quiz, fetch history
│   │       ├── roadmap/        # Generate & fetch roadmap
│   │       ├── planner/        # Generate & fetch weekly plan
│   │       ├── skill-boost/    # Generate & track boost plans
│   │       ├── internships/
│   │       │   ├── route.ts    # Browse internship listings
│   │       │   └── check/      # Authenticity checker endpoint
│   │       ├── dashboard/      # Aggregated dashboard data
│   │       └── profile/        # Profile CRUD
│   ├── components/
│   │   └── ui/                 # Shared UI components (shadcn-style)
│   └── lib/
│       ├── auth.ts             # Better Auth configuration
│       ├── gemini.ts           # All Gemini prompt functions
│       ├── firecrawl.ts        # Scraping utilities
│       └── db/
│           ├── connect.ts      # MongoDB connection
│           └── models/         # All Mongoose schemas
├── scripts/
│   └── seed_quiz_questions.js  # Seed script for question bank
├── design-system/              # Design tokens, component specs
└── .agent/                     # AI agent config & workflows
```

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Frontend** | React 19, Tailwind CSS v4 |
| **Animation** | Framer Motion |
| **Charts** | Recharts |
| **State Management** | Zustand |
| **Forms** | React Hook Form + Zod |
| **UI Components** | Custom component library (shadcn-inspired) |
| **Icons** | Lucide React |
| **Notifications** | Sonner |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **Authentication** | Better Auth (Email + Google OAuth) |
| **AI Generation** | Google Gemini 2.5 Flash |
| **ML Inference** | Hugging Face Inference API |
| **Web Scraping** | Firecrawl + Jina Reader (fallback) |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed and configured:

- **Node.js** v18.17 or higher
- **npm** / **yarn** / **pnpm**
- A **MongoDB Atlas** cluster (free tier works)
- A **Google Cloud** project with OAuth 2.0 credentials
- A **Google AI Studio** account for the Gemini API key
- A **Firecrawl** account for the scraping API key
- A **Hugging Face** account for the inference token

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Rishabhworkspace/NextStep.git
cd NextStep
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure environment variables**

Create a `.env.local` file in the root directory:

```env
# ── Database ──────────────────────────────────────
MONGODB_URI="mongodb+srv://<user>:<password>@cluster.mongodb.net/nextstep"

# ── Authentication (Better Auth) ──────────────────
BETTER_AUTH_SECRET="your-random-32-character-secret"
BETTER_AUTH_URL="http://localhost:3000"

# ── Google OAuth ──────────────────────────────────
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"

# ── AI & Scraping APIs ────────────────────────────
GEMINI_API_KEY="your-google-gemini-api-key"
FIRECRAWL_API_KEY="your-firecrawl-api-key"
HF_TOKEN="your-huggingface-read-token"
```

**4. Seed the quiz question bank**
```bash
node scripts/seed_quiz_questions.js
```

**5. Start the development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to open NextStep locally.

---

## 🌐 Deployment

NextStep is optimised for zero-configuration deployment on **Vercel**.

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Rishabhworkspace/NextStep)

### Post-Deployment Configuration

> **Important:** After deploying, update these two things or authentication will fail:

1. In your **Vercel project settings**, add all environment variables from `.env.local` — and update `BETTER_AUTH_URL` to your live Vercel domain (e.g., `https://your-app.vercel.app`).

2. In your **Google Cloud Console**, add your Vercel domain to:
   - **Authorised JavaScript origins**: `https://your-app.vercel.app`
   - **Authorised redirect URIs**: `https://your-app.vercel.app/api/auth/callback/google`

---

## 📋 Career Paths Supported

| Path ID | Career |
|---|---|
| `swe` | Software Engineer |
| `fullstack` | Full Stack Developer |
| `ds` | Data Scientist |
| `ml` | ML Engineer |
| `devops` | DevOps Engineer |
| `cloud` | Cloud Architect |
| `mobile` | Mobile App Developer |
| `design` | Product Designer |
| `pm` | Product Manager |
| `security` | Security Analyst |
| `blockchain` | Blockchain Developer |
| `gamedev` | Game Developer |
| `ba` | Business Analyst |
| `marketing` | Digital Marketer |

---

## 🔐 Authentication

NextStep uses **Better Auth** for authentication. Two sign-in methods are supported:

- **Email + Password** — standard credential-based auth
- **Google OAuth 2.0** — one-click sign in with a Google account

Sessions are server-side managed. All protected routes check session validity via middleware before rendering.

---

## 🤝 Contributing

Contributions are welcome. To get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

Please follow the existing code style and run `npm run lint` before submitting.

---

## 📄 License

This project is for educational and hackathon purposes. All third-party services (Gemini, Firecrawl, Hugging Face) are used under their respective free-tier terms of service.

---

<div align="center">
  <p>Built with focus, intention, and a real frustration with how career prep works for students in India.</p>
  <p><strong>NextStep — because knowing what to do next changes everything.</strong></p>
</div>