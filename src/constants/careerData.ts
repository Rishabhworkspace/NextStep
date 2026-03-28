import {
  Code2, Database, Brain, Palette, Briefcase, Shield,
  Layers, Server, Smartphone, Cloud, Link2, Gamepad2,
  BarChart3, Megaphone
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type CareerPathKey =
  | "swe" | "ds" | "ml" | "design" | "pm" | "security"
  | "fullstack" | "devops" | "mobile" | "cloud"
  | "blockchain" | "gamedev" | "ba" | "marketing"

export interface CareerPathData {
  key: CareerPathKey
  title: string
  shortTitle: string
  icon: LucideIcon
  description: string
  salaryRange: string
  demand: "Very High" | "High" | "Growing" | "Stable"
  keySkills: string[]
  qualifyingRoles: string[]
  color: string
}

export const CAREER_PATHS: CareerPathData[] = [
  {
    key: "swe",
    title: "Software Engineer",
    shortTitle: "SWE",
    icon: Code2,
    description: "Build scalable applications, write clean code, and solve complex engineering problems.",
    salaryRange: "₹8–30 LPA",
    demand: "Very High",
    keySkills: ["JavaScript", "TypeScript", "React", "Node.js", "SQL", "Git", "System Design", "DSA"],
    qualifyingRoles: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "SDE"],
    color: "#F97316",
  },
  {
    key: "ds",
    title: "Data Scientist",
    shortTitle: "DS",
    icon: Database,
    description: "Extract insights from data using statistics, ML, and visualization to drive business decisions.",
    salaryRange: "₹10–40 LPA",
    demand: "Very High",
    keySkills: ["Python", "SQL", "Statistics", "Pandas", "Scikit-learn", "Tableau", "Feature Engineering"],
    qualifyingRoles: ["Data Analyst", "ML Engineer", "Business Analyst", "Research Scientist"],
    color: "#3B82F6",
  },
  {
    key: "ml",
    title: "ML Engineer",
    shortTitle: "ML",
    icon: Brain,
    description: "Design and deploy machine learning models at scale, from training to production.",
    salaryRange: "₹12–50 LPA",
    demand: "Very High",
    keySkills: ["Python", "TensorFlow", "PyTorch", "Deep Learning", "NLP", "MLOps", "Linear Algebra"],
    qualifyingRoles: ["AI Engineer", "Research Scientist", "Data Scientist", "NLP Engineer"],
    color: "#8B5CF6",
  },
  {
    key: "design",
    title: "Product Designer",
    shortTitle: "Design",
    icon: Palette,
    description: "Craft intuitive user experiences through research, wireframing, and visual design.",
    salaryRange: "₹6–25 LPA",
    demand: "High",
    keySkills: ["Figma", "UI Design", "UX Research", "Prototyping", "Typography", "Design Systems", "Accessibility"],
    qualifyingRoles: ["UI Designer", "UX Designer", "Interaction Designer", "Design Lead"],
    color: "#EC4899",
  },
  {
    key: "pm",
    title: "Product Manager",
    shortTitle: "PM",
    icon: Briefcase,
    description: "Define product vision, prioritize features, and bridge business and engineering teams.",
    salaryRange: "₹12–45 LPA",
    demand: "High",
    keySkills: ["Product Strategy", "Agile/Scrum", "Analytics", "User Research", "Roadmapping", "SQL", "A/B Testing"],
    qualifyingRoles: ["Associate PM", "Product Owner", "Growth PM", "Technical PM"],
    color: "#14B8A6",
  },
  {
    key: "security",
    title: "Security Analyst",
    shortTitle: "Security",
    icon: Shield,
    description: "Protect systems from cyber threats through vulnerability assessment and incident response.",
    salaryRange: "₹8–35 LPA",
    demand: "Very High",
    keySkills: ["Network Security", "OWASP", "Cryptography", "Linux", "Ethical Hacking", "SIEM", "Compliance"],
    qualifyingRoles: ["SOC Analyst", "Penetration Tester", "Security Engineer", "CISO"],
    color: "#EF4444",
  },
  {
    key: "fullstack",
    title: "Full Stack Developer",
    shortTitle: "Full Stack",
    icon: Layers,
    description: "Master both frontend and backend to build end-to-end web applications independently.",
    salaryRange: "₹8–35 LPA",
    demand: "Very High",
    keySkills: ["React", "Next.js", "Node.js", "TypeScript", "MongoDB", "REST APIs", "Docker", "Auth"],
    qualifyingRoles: ["Full Stack Developer", "Software Engineer", "Tech Lead", "Indie Hacker"],
    color: "#F59E0B",
  },
  {
    key: "devops",
    title: "DevOps Engineer",
    shortTitle: "DevOps",
    icon: Server,
    description: "Automate infrastructure, CI/CD pipelines, and ensure reliable software delivery.",
    salaryRange: "₹10–40 LPA",
    demand: "Very High",
    keySkills: ["Docker", "Kubernetes", "AWS/GCP", "CI/CD", "Terraform", "Linux", "Monitoring", "Bash"],
    qualifyingRoles: ["DevOps Engineer", "SRE", "Platform Engineer", "Cloud Engineer"],
    color: "#06B6D4",
  },
  {
    key: "mobile",
    title: "Mobile App Developer",
    shortTitle: "Mobile",
    icon: Smartphone,
    description: "Build native and cross-platform mobile apps for iOS and Android.",
    salaryRange: "₹8–35 LPA",
    demand: "High",
    keySkills: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "REST APIs", "App Store Deployment"],
    qualifyingRoles: ["iOS Developer", "Android Developer", "React Native Developer", "Flutter Developer"],
    color: "#10B981",
  },
  {
    key: "cloud",
    title: "Cloud Architect",
    shortTitle: "Cloud",
    icon: Cloud,
    description: "Design and manage scalable cloud infrastructure across AWS, Azure, or GCP.",
    salaryRange: "₹15–60 LPA",
    demand: "Very High",
    keySkills: ["AWS", "Azure", "GCP", "Terraform", "Networking", "Security", "Serverless", "Cost Optimization"],
    qualifyingRoles: ["Cloud Engineer", "Solutions Architect", "Platform Engineer", "SRE"],
    color: "#6366F1",
  },
  {
    key: "blockchain",
    title: "Blockchain Developer",
    shortTitle: "Blockchain",
    icon: Link2,
    description: "Build decentralized applications and smart contracts on blockchain platforms.",
    salaryRange: "₹10–50 LPA",
    demand: "Growing",
    keySkills: ["Solidity", "Ethereum", "Web3.js", "Smart Contracts", "DeFi", "Cryptography", "Rust"],
    qualifyingRoles: ["Smart Contract Developer", "DApp Developer", "Protocol Engineer", "Web3 Developer"],
    color: "#A855F7",
  },
  {
    key: "gamedev",
    title: "Game Developer",
    shortTitle: "Game Dev",
    icon: Gamepad2,
    description: "Create interactive games using game engines, graphics programming, and physics.",
    salaryRange: "₹6–30 LPA",
    demand: "Growing",
    keySkills: ["Unity", "Unreal Engine", "C#", "C++", "Game Physics", "3D Math", "Shader Programming"],
    qualifyingRoles: ["Game Programmer", "Gameplay Engineer", "Engine Developer", "Technical Artist"],
    color: "#D946EF",
  },
  {
    key: "ba",
    title: "Business Analyst",
    shortTitle: "BA",
    icon: BarChart3,
    description: "Bridge business needs and technology solutions through analysis and requirements gathering.",
    salaryRange: "₹6–25 LPA",
    demand: "High",
    keySkills: ["SQL", "Excel", "Power BI", "Requirements Analysis", "Process Modeling", "Agile", "Stakeholder Mgmt"],
    qualifyingRoles: ["Business Analyst", "Systems Analyst", "Consultant", "Product Owner"],
    color: "#0EA5E9",
  },
  {
    key: "marketing",
    title: "Digital Marketer",
    shortTitle: "Marketing",
    icon: Megaphone,
    description: "Drive growth through SEO, content marketing, paid ads, and analytics.",
    salaryRange: "₹4–20 LPA",
    demand: "High",
    keySkills: ["SEO", "Google Ads", "Content Strategy", "Social Media", "Analytics", "Email Marketing", "Copywriting"],
    qualifyingRoles: ["Growth Marketer", "SEO Specialist", "Content Strategist", "Performance Marketer"],
    color: "#F43F5E",
  },
]

export const CAREER_PATH_MAP: Record<CareerPathKey, CareerPathData> =
  CAREER_PATHS.reduce((acc, path) => {
    acc[path.key] = path
    return acc
  }, {} as Record<CareerPathKey, CareerPathData>)

export const DEMAND_BADGE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "Very High": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  "High": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  "Growing": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  "Stable": { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200" },
}
