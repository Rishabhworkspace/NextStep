# NextStep — System Architecture Reference

> **Master reference for all feature-to-tech mapping across phases.**

---

## Core Architecture

```
User (Frontend UI)
        ↓
Next.js App (Frontend)
        ↓
Backend APIs (Node.js)
        ↓
┌──────────────────┬──────────────────┐
│ Data Layer       │ Intelligence     │
│ (MongoDB)        │ (Gemini AI)      │
│                  │ (Firecrawl)      │
└──────────────────┴──────────────────┘
        ↓
Final Output → Dashboard / Insights / Recommendations
```

---

## 🕸️ Web Scraping Layer (Firecrawl)

| Module | What to Scrape | Output |
|--------|---------------|--------|
| **Internship Feed** | Job listings, company details, salary, duration | Clean internship dataset |
| **Scholarship Finder** | Govt schemes, private scholarships, deadlines, eligibility | Updated scholarship DB |
| **Resource Allocator** | YouTube tutorials, free courses, articles | Learning resources mapped to skills |

> **Role:** Data Collection Layer

---

## 🤖 AI / Intelligence Layer (Gemini API)

| Module | Input | Output |
|--------|-------|--------|
| **Skill Gap Analysis** | Quiz results | Personalized insights + weak area detection |
| **Career Roadmap Generator** | User profile + goals | Step-by-step skill path |
| **Weekly Planner Generator** | Roadmap + weak areas | Weekly schedule / daily tasks |
| **Internship Authenticity Checker** | Job description / URL | Safe/risky verdict + trust score |
| **Recommendation Engine** | All user data | Next skills, internships, learning resources |

> **Role:** Decision-Making Layer (Brain)

---

## 🗄️ Database Layer (MongoDB)

| Category | What's Stored |
|----------|--------------|
| **User Data** | Profile, skills, goals |
| **Progress Data** | Quiz results, skill scores, weekly plans |
| **Opportunities** | Internships (scraped), scholarships (scraped) |
| **Planner** | Tasks, completion status |

> **Role:** Memory of the system

---

## Feature → Tech Mapping

| Feature | Tech Used |
|---------|-----------|
| Internship Feed | Firecrawl + MongoDB |
| Scholarship Finder | Firecrawl + Rule Engine |
| Resource Allocator | Firecrawl |
| Skill Gap Analysis | Gemini API |
| Career Roadmap | Gemini API + Firecrawl (resources) |
| Weekly Planner | Gemini API |
| Authenticity Checker | Firecrawl + Gemini |
| Dashboard | Next.js + Recharts |
| User System | MongoDB |
| Notifications | Backend + Email |

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Frontend | Next.js + Tailwind CSS |
| Charts | Recharts |
| Animation | Framer Motion |
| State | Zustand |
| Backend | Next.js API Routes (Node.js) |
| Database | MongoDB (Mongoose) |
| AI | Gemini API |
| Scraping | Firecrawl |
| Auth | Better Auth |
