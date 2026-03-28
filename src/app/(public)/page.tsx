"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PublicFooter } from "@/components/layout/public-footer"
import { ArrowRight, Target, Map, Calendar, ShieldCheck, CheckCircle2, Star, PlayCircle, Trophy, Sparkles, BookOpen, Layers, Users, ChevronDown, Check } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="w-full overflow-hidden bg-bg relative">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-[#FAFAFA]">

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-20">
          <div className="grid lg:grid-cols-2 gap-4 items-center min-h-[calc(100vh-80px)]">
            
            {/* Left Column: Text Content */}
            <div className="flex flex-col items-start text-left relative z-20 pt-24 lg:pt-0">
              <h1 className="text-[2.75rem] sm:text-[3.5rem] lg:text-[4.75rem] font-heading font-extrabold text-slate-900 leading-[1.05] tracking-tight mb-6">
                Every student{"'"}s<br />
                one stop<br />
                solution.
              </h1>
              
              <p className="text-sm sm:text-base text-slate-500 mb-8 max-w-sm font-medium leading-relaxed">
                At NextStep, we make career success accessible, interactive, and inspiring, helping you gain real-world skills through expert-led courses and a community of learners.
              </p>
              
              <div className="flex flex-row items-center gap-4 mb-10">
                <Link href="/auth/signup">
                  <Button size="lg" className="text-sm font-bold rounded-full bg-[linear-gradient(to_right,#3B82F6,#FDBA74)] border-0 h-12 px-8 text-white hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-md">
                    Explore Courses
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline" size="lg" className="text-sm font-bold h-12 px-8 rounded-full border border-slate-200 bg-white shadow-sm hover:bg-slate-50 text-slate-700 hover:shadow-md transition-all">
                    How it works
                  </Button>
                </Link>
              </div>

              {/* User Avatars + Count */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-500 shadow-sm overflow-hidden z-10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="ml-2">
                  <span className="text-base font-heading font-extrabold text-slate-900">6M+</span>
                  <p className="text-[11px] font-medium text-slate-500 leading-none mt-0.5">User worldwide</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Image natively feathered into the background */}
            <div className="relative hidden lg:block h-[calc(100vh-80px)] w-full -mr-6">
              
              {/* Underlying Colorful Blob (Pale Peach / Pinkish Purple / Light Blue) matching the image exactly, extended to merge spaces on both sides */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1000px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-50/80 via-pink-100/50 to-transparent rounded-full blur-[120px] z-0 pointer-events-none"></div>

              {/* The generated image has a matching gradient background. We use a single linear CSS mask to dissolve both its left and right hard edges into the underlying abstract background. */}
              <div 
                className="absolute bottom-0 w-[130%] h-[120%] left-[45%] -translate-x-1/2 z-10 pointer-events-none mix-blend-multiply"
                style={{ 
                  maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)', 
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
                }}
              >
                <Image 
                  src="/images/hero-final2.png" 
                  alt="Student Success Hero" 
                  fill 
                  className="object-contain object-bottom" 
                  priority
                />
              </div>

              {/* Bottom White Fade to ensure the very bottom cuts off smoothly */}
              <div className="absolute bottom-0 w-[150%] left-1/2 -translate-x-1/2 h-32 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/90 to-transparent pointer-events-none z-20"></div>

              {/* Floating Element: Generated 3D Book Stack (top-left area) */}
              <div className="absolute top-[28%] left-[0%] bg-white/90 backdrop-blur-xl p-3 rounded-[1.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-white z-30 flex items-center justify-center hover:-translate-y-2 transition-transform duration-500 cursor-default">
                <div className="w-16 h-16 relative mix-blend-multiply opacity-90 drop-shadow-sm">
                  <Image src="/images/books-stack-v2.png" alt="Books" fill className="object-contain" />
                </div>
              </div>

              {/* Floating Element: 4.9 Rating Card (bottom-left area) */}
              <div className="absolute bottom-[20%] left-[5%] bg-white/90 backdrop-blur-xl py-3 px-5 rounded-[1.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-white z-30 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[linear-gradient(to_bottom_right,#93C5FD,#C084FC)] flex items-center justify-center text-white shadow-inner ring-4 ring-blue-50/50">
                  <Star className="w-4 h-4 fill-white text-white drop-shadow-md" />
                </div>
                <div>
                  <div className="flex items-end gap-1">
                     <div className="flex -space-x-1 relative -top-0.5">
                       {/* Removing the 4.9 text and replacing it with something matching the ref image maybe? Ah, wait, the reference image shows 4.9/5.00 TRUSTED BY STUDENT. I'll keep the 4.9 */}
                        <span className="text-[1.35rem] font-heading font-black text-slate-800 leading-none">4.9</span>
                        <span className="text-[10px] font-bold text-slate-300 leading-none pb-[2px] ml-1">/ 5.00</span>
                     </div>
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-wider">Trusted by student</p>
                </div>
              </div>

              {/* Floating Element: Verified Internships Badge (Replaced 20% OFF) */}
              <div className="absolute top-[45%] right-[0%] bg-white/90 backdrop-blur-xl py-3 px-5 rounded-[1.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-white z-30 flex items-center gap-3 hover:scale-105 transition-transform cursor-default">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
                  <CheckCircle2 className="w-5 h-5 fill-emerald-100" />
                </div>
                <div>
                  <p className="text-sm font-heading font-black text-slate-800 leading-tight">Verified</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Internships</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. INFINITE SCROLLING MARQUEE (Solid logic for all monitor sizes) */}
      <section className="py-8 border-t border-slate-100/60 bg-white overflow-hidden flex group">
        
        {/* Play State Paused on Hover */}
        <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 px-8 text-slate-800 font-heading font-extrabold tracking-tight text-xl md:text-2xl whitespace-nowrap opacity-90">
              <span className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-brand transition-all cursor-default relative">Roadmap</span>
              <span className="text-slate-300">•</span>
              <span className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-brand transition-all cursor-default">Internship</span>
              <span className="text-slate-300">•</span>
              <span className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-brand transition-all cursor-default">Scholarships</span>
              <span className="text-slate-300">•</span>
              <span className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-brand transition-all cursor-default">Student Benefits</span>
              <span className="text-slate-300">•</span>
            </div>
          ))}
        </div>

        {/* Identical Twin for Seamless Loop */}
        <div className="flex animate-marquee group-hover:[animation-play-state:paused]" aria-hidden="true">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 px-8 text-slate-800 font-heading font-extrabold tracking-tight text-xl md:text-2xl whitespace-nowrap opacity-90">
              <span className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-brand transition-all cursor-default relative">Roadmap</span>
              <span className="text-slate-300">•</span>
              <span className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-brand transition-all cursor-default">Internship</span>
              <span className="text-slate-300">•</span>
              <span className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-brand transition-all cursor-default">Scholarships</span>
              <span className="text-slate-300">•</span>
              <span className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-brand transition-all cursor-default">Student Benefits</span>
              <span className="text-slate-300">•</span>
            </div>
          ))}
        </div>

      </section>

      {/* 3. PROBLEM / STATS STRIP (Neoplex Glassmorphism) */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-40 mix-blend-multiply"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 mb-6 max-w-3xl mx-auto leading-tight tracking-tight">
              One unified platform to replace the chaos of fragmented student tools.
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stat 1 */}
            <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all hover:-translate-y-1 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform"><Target className="w-6 h-6" /></div>
              <h3 className="text-4xl font-heading font-black text-slate-800 mb-2">5+</h3>
              <p className="text-sm font-bold text-slate-500 leading-relaxed">Disconnected fragmented tools completely replaced</p>
            </div>
            
            {/* Stat 2 */}
            <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all hover:-translate-y-1 group">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform"><BookOpen className="w-6 h-6" /></div>
              <h3 className="text-4xl font-heading font-black text-slate-800 mb-2">100%</h3>
              <p className="text-sm font-bold text-slate-500 leading-relaxed">Personalized AI-driven Roadmaps generated</p>
            </div>
            
            {/* Stat 3 */}
            <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all hover:-translate-y-1 group">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-500 mb-6 group-hover:scale-110 transition-transform"><Star className="w-6 h-6" /></div>
              <h3 className="text-4xl font-heading font-black text-slate-800 mb-2">50+</h3>
              <p className="text-sm font-bold text-slate-500 leading-relaxed">Domain-specific interactive skill assessments</p>
            </div>
            
            {/* Stat 4 */}
            <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all hover:-translate-y-1 group">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform"><Sparkles className="w-6 h-6" /></div>
              <h3 className="text-4xl font-heading font-black text-slate-800 mb-2">₹Lakhs</h3>
              <p className="text-sm font-bold text-slate-500 leading-relaxed">In missed verified scholarships now accessible</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PREMIUM FEATURES (Alternating Rows) */}
      <section id="features" className="py-24 bg-white relative overflow-hidden">
        
        {/* Feature 1: Skill Gap */}
        <div className="max-w-7xl mx-auto px-6 mb-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div className="order-2 lg:order-1 relative">
               <div className="absolute inset-0 bg-blue-100/50 rounded-full blur-[100px] -z-10 transform -translate-x-1/4"></div>
               <div className="bg-white/60 backdrop-blur-xl border border-slate-100 p-8 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative transform hover:-translate-y-2 transition-transform duration-500">
                 {/* Mock UI: Radar Chart & Score */}
                 <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-100">
                   <div>
                     <p className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-1">Overall Skill Match</p>
                     <h4 className="text-4xl font-heading font-black text-blue-600">84%</h4>
                   </div>
                   <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center border-4 border-white shadow-sm">
                     <Target className="w-6 h-6 text-blue-500" />
                   </div>
                 </div>
                 <div className="space-y-4">
                   {[
                     { name: 'React Fundamentals', score: 92, color: 'bg-blue-500' },
                     { name: 'Advanced State Management', score: 65, color: 'bg-orange-400' },
                     { name: 'System Design', score: 40, color: 'bg-pink-400' }
                   ].map((skill, i) => (
                     <div key={i}>
                       <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                         <span>{skill.name}</span>
                         <span>{skill.score}%</span>
                       </div>
                       <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                         <div className={`${skill.color} h-full rounded-full`} style={{ width: `${skill.score}%` }}></div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
             
             <div className="order-1 lg:order-2">
               <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 font-bold text-sm tracking-wide mb-6">
                 ✦ Step 1: Diagnose
               </span>
               <h2 className="text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 leading-tight mb-6">
                 Pinpoint your technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">blind spots</span>.
               </h2>
               <p className="text-lg font-medium text-slate-600 mb-8 leading-relaxed max-w-lg">
                 Stop guessing what to learn next. Our adaptive quiz engine diagnoses your proficiency across domains and visually highlights exactly where you need to improve to pass industry interviews.
               </p>
               <Button className="rounded-full bg-slate-900 text-white hover:bg-slate-800 px-8 h-12 shadow-md transition-transform hover:-translate-y-1">
                 Take Free Assessment <ArrowRight className="w-4 h-4 ml-2" />
               </Button>
             </div>
          </div>
        </div>

        {/* Feature 2: Roadmaps */}
        <div className="max-w-7xl mx-auto px-6 mb-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div>
               <span className="inline-block py-1.5 px-4 rounded-full bg-purple-50 text-purple-600 font-bold text-sm tracking-wide mb-6">
                 ✦ Step 2: Navigate
               </span>
               <h2 className="text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 leading-tight mb-6">
                 AI generates your flawless <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">career roadmap</span>.
               </h2>
               <p className="text-lg font-medium text-slate-600 mb-8 leading-relaxed max-w-lg">
                 Based on your current skill gaps and ultimate career goal, NextStep's Gemini-powered engine plots a precise, node-by-node learning path designed uniquely for you.
               </p>
               <Button className="rounded-full bg-slate-900 text-white hover:bg-slate-800 px-8 h-12 shadow-md transition-transform hover:-translate-y-1">
                 Explore Roadmaps <ArrowRight className="w-4 h-4 ml-2" />
               </Button>
             </div>

             <div className="relative">
               <div className="absolute inset-0 bg-purple-100/50 rounded-full blur-[100px] -z-10 transform translate-x-1/4"></div>
               <div className="bg-white border border-slate-100 p-8 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative transform hover:-translate-y-2 transition-transform duration-500 overflow-hidden">
                 {/* Mock UI: Roadmap Nodes */}
                 <div className="absolute w-1 h-full bg-slate-100 left-12 top-0 bottom-0 z-0"></div>
                 <div className="space-y-8 relative z-10">
                   {[
                     { title: 'Learn React Hooks', status: 'done', color: 'bg-green-500 border-green-200' },
                     { title: 'Redux Toolkit & Zustand', status: 'current', color: 'bg-purple-500 border-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.5)]' },
                     { title: 'Next.js App Router', status: 'locked', color: 'bg-slate-200 border-white' }
                   ].map((node, i) => (
                     <div key={i} className={`flex items-center gap-6 p-4 rounded-2xl transition-colors ${node.status === 'current' ? 'bg-purple-50/50' : 'hover:bg-slate-50'}`}>
                       <div className={`w-8 h-8 rounded-full border-[6px] shrink-0 z-10 ${node.color}`}></div>
                       <div>
                         <h4 className={`font-heading font-bold text-lg ${node.status === 'locked' ? 'text-slate-400' : 'text-slate-800'}`}>{node.title}</h4>
                         <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{node.status === 'done' ? 'Completed' : node.status === 'current' ? 'In Progress' : 'Locked'}</p>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
          </div>
        </div>

        {/* Feature 3: Action Plan */}
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div className="order-2 lg:order-1 relative">
               <div className="absolute inset-0 bg-orange-100/50 rounded-full blur-[100px] -z-10 transform -translate-x-1/4"></div>
               <div className="bg-white/60 backdrop-blur-xl border border-slate-100 p-8 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative transform hover:-translate-y-2 transition-transform duration-500">
                 {/* Mock UI: Weekly Planner */}
                 <div className="flex justify-between items-center mb-8">
                   <h4 className="font-heading font-bold text-slate-900 text-xl">This Week</h4>
                   <Badge className="bg-orange-50 text-orange-600 font-bold border-0 hover:bg-orange-50 pointer-events-none">3 Tasks Left</Badge>
                 </div>
                 <div className="space-y-4">
                   {[
                     { task: 'Read: React Server Components', time: '45 mins', done: true },
                     { task: 'Build: Simple Todo App', time: '2 hours', done: false },
                     { task: 'Quiz: State Management', time: '15 mins', done: false }
                   ].map((task, i) => (
                     <div key={i} className={`flex items-start gap-4 p-5 rounded-2xl border transition-colors ${task.done ? 'bg-slate-50/50 border-slate-100' : 'bg-white border-slate-200 shadow-sm'}`}>
                       <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center mt-0.5 transition-colors ${task.done ? 'bg-green-500 text-white' : 'border-2 border-slate-200 bg-slate-50'}`}>
                         {task.done && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                       </div>
                       <div>
                         <p className={`font-bold ${task.done ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{task.task}</p>
                         <p className="text-sm text-slate-500 font-medium mt-1">Est. {task.time}</p>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
             
             <div className="order-1 lg:order-2">
               <span className="inline-block py-1.5 px-4 rounded-full bg-orange-50 text-orange-600 font-bold text-sm tracking-wide mb-6">
                 ✦ Step 3: Execute
               </span>
               <h2 className="text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 leading-tight mb-6">
                 Automated <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Weekly Planners</span> to keep you on track.
               </h2>
               <p className="text-lg font-medium text-slate-600 mb-8 leading-relaxed max-w-lg">
                 Say goodbye to planning paralysis. NextStep automatically breaks down your custom roadmap into bite-sized, actionable weekly tasks so you can focus entirely on learning.
               </p>
               <Button className="rounded-full bg-slate-900 text-white hover:bg-slate-800 px-8 h-12 shadow-md transition-transform hover:-translate-y-1">
                 View Action Plans <ArrowRight className="w-4 h-4 ml-2" />
               </Button>
             </div>
          </div>
        </div>

      </section>

      {/* 6. TESTIMONIALS (Premium Grid) */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Soft Background Blob */}
        <div className="absolute right-0 top-0 w-[800px] h-[800px] bg-pink-100/40 rounded-full blur-[120px] pointer-events-none mix-blend-multiply"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 mb-6">
              Don't just take our word for it.
            </h2>
            <p className="text-lg font-medium text-slate-600 max-w-2xl mx-auto">
              Thousands of students across India are landing top-tier internships and jobs by following NextStep's structured roadmaps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative group hover:-translate-y-2 transition-transform duration-500">
              <div className="absolute top-8 right-8 text-blue-100 group-hover:text-blue-200 transition-colors"><svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg></div>
              <div className="flex gap-1 text-orange-400 mb-6">
                <Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/>
              </div>
              <p className="text-slate-700 font-medium leading-relaxed mb-8 relative z-10">
                "The customized roadmap completely changed my preparation. Instead of watching random tutorials, I focused exactly on my weak points. I cleared my <strong>Amazon backend interview</strong> in 4 months!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">AK</div>
                <div>
                  <h4 className="font-heading font-bold text-slate-900">Aryan Kapoor</h4>
                  <p className="text-xs font-bold text-slate-500">Tier-3 College → SDE 1</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative group hover:-translate-y-2 transition-transform duration-500 md:translate-y-8">
              <div className="absolute top-8 right-8 text-purple-100 group-hover:text-purple-200 transition-colors"><svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg></div>
              <div className="flex gap-1 text-orange-400 mb-6">
                <Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/>
              </div>
              <p className="text-slate-700 font-medium leading-relaxed mb-8 relative z-10">
                "The Weekly Planner is magic. I used to struggle with consistency, but having automated tasks fed to me daily kept me accountable. Plus, the Scholarship matcher found me ₹50k!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">PS</div>
                <div>
                  <h4 className="font-heading font-bold text-slate-900">Priya Sharma</h4>
                  <p className="text-xs font-bold text-slate-500">B.Tech IT, 3rd Year</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative group hover:-translate-y-2 transition-transform duration-500">
              <div className="absolute top-8 right-8 text-orange-100 group-hover:text-orange-200 transition-colors"><svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg></div>
              <div className="flex gap-1 text-orange-400 mb-6">
                <Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/>
              </div>
              <p className="text-slate-700 font-medium leading-relaxed mb-8 relative z-10">
                "As a self-taught designer, I didn't know what I didn't know. The Skill Gap Quiz immediately pointed out my missing knowledge in accessibility standards. Highly recommend."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">RK</div>
                <div>
                  <h4 className="font-heading font-bold text-slate-900">Rohan Kumar</h4>
                  <p className="text-xs font-bold text-slate-500">UI/UX Designer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ (Minimalist Split) */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-5 sticky top-32">
            <h2 className="text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 leading-tight mb-6">
              Clear your doubts.
            </h2>
            <p className="text-lg font-medium text-slate-600 mb-8">
              Everything you need to know about NextStep and how it accelerates your career completely for free.
            </p>
            <div className="hidden md:flex items-center gap-4 text-slate-500">
               <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100"><Users className="w-5 h-5"/></div>
               <div>
                 <p className="text-sm font-bold text-slate-800">Still have questions?</p>
                 <p className="text-xs">Chat with our community.</p>
               </div>
            </div>
          </div>
          
          <div className="md:col-span-7 space-y-4">
            {/* Open FAQ */}
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-heading font-bold text-slate-900 text-xl">What exactly is NextStep?</h4>
                <div className="w-10 h-10 rounded-full bg-slate-200/50 flex items-center justify-center text-slate-600"><ChevronDown className="w-5 h-5 rotate-180" /></div>
              </div>
              <p className="text-base font-medium text-slate-600 leading-relaxed">
                NextStep is an intelligent student success hub. It diagnoses your current skill gaps, generates highly personalized AI learning roadmaps, automates your weekly planning, and connects you exclusively to verified internships and valid scholarships.
              </p>
            </div>
            
            {/* Closed FAQs */}
            {[
              "Is the platform actually 100% free?",
              "How are the internships and scholarships verified?",
              "Can I change my career domain midway?",
              "Does it work for non-tech fields like Design or Management?"
            ].map((q, i) => (
              <div key={i} className="border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 p-8 rounded-3xl flex justify-between items-center cursor-pointer transition-all group">
                <h4 className="font-heading font-bold text-slate-700 text-xl group-hover:text-blue-900">{q}</h4>
                <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors"><ChevronDown className="w-5 h-5" /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA BANNER (Massive Edge-to-Edge Style) */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
            {/* Neon glowing elements */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-heading font-black text-white mb-8 leading-[1.1] tracking-tight">
                Ready to take your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">NextStep?</span>
              </h2>
              <p className="text-slate-300 text-xl font-medium mb-12 leading-relaxed">
                Join thousands of driven students mastering their craft, staying highly accountable, and launching their careers faster than ever before.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/auth/signup">
                  <Button size="lg" className="bg-gradient-btn text-white hover:opacity-90 font-bold text-lg h-16 px-10 rounded-full shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:shadow-[0_0_60px_rgba(59,130,246,0.6)] transition-all hover:-translate-y-1 border-0">
                    Get Started For Free
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 font-bold text-lg h-16 px-10 rounded-full bg-transparent">
                    Explore Features
                  </Button>
                </Link>
              </div>
              <p className="text-sm font-bold text-slate-500 mt-8">No credit card required. Setting up takes 60 seconds.</p>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
