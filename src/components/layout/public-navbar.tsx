"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X, ArrowRight } from "lucide-react"
import { useSession } from "@/lib/auth-client"

export function PublicNavbar() {
  const { data: session, isPending } = useSession()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About us", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "Roadmaps", href: "#roadmaps" },
  ]

  return (
    <header 
      className={cn(
        "fixed top-4 inset-x-0 z-50 transition-all duration-300 px-4",
      )}
    >
      <div className={cn(
        "max-w-7xl mx-auto px-6 flex items-center justify-between rounded-full transition-all duration-300",
        isScrolled 
          ? "bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] py-3 border border-slate-100/50" 
          : "bg-white/60 backdrop-blur-md shadow-sm py-3 border border-white/60"
      )}>
        
        {/* Logo */}
        <Link 
          href="/" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1 z-50"
        >
          <div className="w-10 h-10 mix-blend-multiply relative overflow-hidden -ml-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="NextStep Logo" className="w-full h-full object-contain scale-[1.3]" />
          </div>
          <span className="font-heading font-extrabold text-[1.35rem] tracking-tight text-slate-800 pr-1">NextStep</span>
        </Link>
        
        {/* Desktop Nav - Absolutely Centered */}
        <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-[13px] font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-6 z-50">
          {isPending ? (
            <div className="h-10 w-32 bg-slate-100 animate-pulse rounded-full" />
          ) : session ? (
            <Link href="/dashboard">
              <Button className="font-bold text-sm px-6 rounded-full bg-slate-900 border-0 shadow-md text-white h-11 hover:-translate-y-0.5 transition-transform">
                Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/auth/login">
                <span className="font-bold text-sm text-slate-500 hover:text-slate-900 transition-colors">Sign in</span>
              </Link>
              <Link href="/auth/signup">
                <Button className="font-bold text-sm px-7 rounded-full bg-gradient-brand hover:opacity-90 transition-opacity border-0 shadow-md text-white h-11">
                  Registration Now
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-text z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-surface z-40 flex flex-col pt-24 px-6 md:hidden transition-transform duration-300 ease-in-out",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col gap-6 text-lg font-medium text-text">
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-border my-4 w-full" />
          {session ? (
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full mt-2 h-12 text-base shadow-md bg-slate-900 text-white">
                Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
              <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full mt-2 h-12 text-base shadow-accent">Get Started for Free</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
