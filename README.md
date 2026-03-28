<div align="center">
  <img src="public/images/logo.png" alt="NextStep Logo" width="120" />
  <h1>NextStep</h1>
  <p>An intelligent student success platform that maps career goals, assesses skill gaps, generates custom learning roadmaps, and automates weekly planners.</p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb" alt="MongoDB" />
  </p>
</div>

---

**NextStep** replaces fragmented learning tools with a single unified platform. It leverages advanced Generative AI and Machine Learning to diagnose a student's precise knowledge blind spots and generates step-by-step roadmaps tailored to their unique career ambitions. 

## 📑 Table of Contents
- [Core Features](#-core-features)
- [The AI & ML Stack](#-the-ai--ml-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Deployment](#-deployment)

---

## ✨ Core Features

| Feature | Description |
| :--- | :--- |
| **Adaptive Skill Assessment** | Topic-based quizzes meticulously designed for unique career domains. Precisely identifies strong and weak concepts. |
| **Generative AI Roadmaps** | Translates assessment results into high-fidelity, node-by-node learning pathways tailored to fill exact knowledge gaps. |
| **Automated Weekly Planners** | Eradicates "planning paralysis." Intelligent agents automatically break down large roadmap nodes into perfectly timed weekly to-do lists. |
| **Internship Authenticity Checker** | A hybrid machine-learning tool that protects students from job scams by detecting fraudulent red flags and verifying business legitimacy in real time. |
| **Student Benefits Portal** | A premium, interactive directory containing 125+ globally verified student discounts, free developer pack software, and premium campus deals. |
| **Data-Rich Dashboard** | A polished, real-time command center compiling an aggregate Success Score, skill proficiency radar charts, and active session streaks. |

<div align="center">
  <img src="public/images/hero-final.png" alt="NextStep Dashboard Preview" width="800" style="border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
  <br/>
  <em>A glimpse of the NextStep user interface</em>
</div>

---

## 🧠 The AI & ML Stack

NextStep relies heavily on an interconnected intelligence architecture:
- **Google Gemini 2.5 Flash:** Acts as the primary generative orchestrator. It builds dynamic roadmaps, schedules weekly planners, and provides deep contextual analysis.
- **Hugging Face (`AventIQ-AI/BERT-Spam-Job-Posting-Detection-Model`):** Provides specialized, dedicated fraud detection via binary classification inference to power the Authenticity Checker.
- **Firecrawl API / Jina Reader:** Powers high-fidelity web scraping for the Authenticity Checker, instantly turning raw job URLs into structured markdown data for the Spam Detection analysis pipeline.

---

## 🗂 Project Architecture

Built entirely within the modern **Next.js App Router** framework and strictly adhering to clean code principles:

```text
NextStep/
├── public/                 # Static assets, fonts, and images (logo, hero)
├── src/
│   ├── app/                # Next.js App Router (Layouts, Pages, Routes)
│   │   ├── (protected)/    # Authenticated dashboard, planner, and user flows 
│   │   ├── (public)/       # Landing page and unauthenticated marketing flows
│   │   └── api/            # Serverless API routes (AI orchestration, crons, auth)
│   ├── components/         # Reusable shadcn UI components & custom widgets
│   ├── lib/                # Core utilities
│   │   ├── auth.ts         # Better Auth configuration
│   │   └── db/             # Mongoose schemas and MongoDB connection adapters
│   └── styles/             # Global Tailwind v4 CSS configuration
└── tailwind.config.ts      # UI Token definitions and plugin config
```

---

## 🚀 Getting Started

Follow these instructions to mirror the production environment onto your local machine.

### Prerequisites

You will need foundational developer tools and active accounts for external service integrations:
- **Node.js** (v18.17+) & **npm** / **yarn** / **pnpm**
- **MongoDB Atlas** (Active Cluster)
- **Google Cloud Console** (For Google OAuth 2.0 Credentials)
- **Google AI Studio** (For the Gemini API key)
- **Hugging Face** (For the free Inference Token)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rishabhworkspace/NextStep.git
   cd NextStep
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Environment Variables

Bootstrap the environment by cloning the example environment file or manually creating `.env.local`:

```env
# Database
MONGODB_URI="your_mongodb_connection_string"

# Better Auth Configuration
BETTER_AUTH_SECRET="your_32_character_random_string"
BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth Integration
GOOGLE_CLIENT_ID="your_google_oauth_client_id"
GOOGLE_CLIENT_SECRET="your_google_oauth_client_secret"

# Artificial Intelligence & Scraping APIs
GEMINI_API_KEY="your_google_gemini_api_key"
FIRECRAWL_API_KEY="your_firecrawl_api_key"
HF_TOKEN="your_huggingface_read_token"
```

> [!CAUTION]
> Never commit your `.env.local` to version control. The repository explicitly ignores this file via `.gitignore`.

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) to view the application. 

---

## 🌐 Deployment

NextStep is heavily optimized for zero-configuration deployments on [Vercel](https://vercel.com/).

> [!IMPORTANT]
> **Production Authentication Setup:** 
> When transitioning to a live domain (e.g., `https://nextstep-app.vercel.app`), you **must** update two things:
> 1. Set the `BETTER_AUTH_URL` environment variable in Vercel to explicitly match your live domain exactly.
> 2. Add the Vercel domain to your **Authorized JavaScript origins** and `https://your-domain.vercel.app/api/auth/callback/google` to your **Authorized redirect URIs** within the Google Cloud Console. Failure to do this will result in rejected logins.

---
<div align="center">
  <i>Built with focus, intention, and a mission to empower the next generation of engineers.</i>
</div>