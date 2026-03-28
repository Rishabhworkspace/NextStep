"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { signIn } from "@/lib/auth-client"
import { Input } from "@/components/ui/input"
import { ArrowRight, Loader2 } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    await signIn.email({
      email,
      password,
      callbackURL: "/auth/onboarding",
      fetchOptions: {
        onError: (ctx) => {
          setError(ctx.error.message || "Invalid credentials");
          setLoading(false);
        }
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#FAFAFA] pt-20 pb-12 px-4">
      {/* Neoplex Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-300/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-300/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-purple-300/30 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Glassmorphic Auth Card */}
      <div className="w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white p-8 sm:p-10 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative z-10 flex flex-col">
        
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 relative mb-4">
            <Image src="/images/logo.png" alt="NextStep Logo" fill className="object-contain scale-[1.3] mix-blend-multiply" />
          </div>
          <h1 className="text-3xl font-heading font-extrabold text-[#111827] tracking-tight mb-2">Welcome back</h1>
          <p className="text-[#4B5563] text-sm">Sign in to continue your journey.</p>
        </div>
          
        <div className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2 h-11 bg-white hover:bg-gray-50 text-[#111827] border-gray-200 shadow-sm" 
            type="button"
            onClick={() => signIn.social({ provider: "google", callbackURL: "/auth/onboarding" })}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="18px" height="18px">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
            Continue with Google
          </Button>
          
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-border"></div>
            <span className="flex-shrink-0 mx-4 text-[#9CA3AF] font-medium text-xs uppercase tracking-wider">or email</span>
            <div className="flex-grow border-t border-border"></div>
          </div>

          {error && <div className="p-3 text-sm text-red-500 bg-red-50 text-center rounded-lg border border-red-100">{error}</div>}

          <form className="space-y-4" onSubmit={handleEmailLogin}>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-[#374151]" htmlFor="email">Email address</label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@university.edu" 
                className="h-11 bg-white/50 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 shadow-none transition-all" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                disabled={loading}
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-[#374151]" htmlFor="password">Password</label>
                <Link href="#" className="text-xs text-orange-500 hover:text-orange-600 hover:underline transition-colors">Forgot password?</Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className="h-11 bg-white/50 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 shadow-none transition-all" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                disabled={loading}
              />
            </div>
            
            <Button type="submit" className="w-full h-11 text-base bg-[#111827] text-white hover:bg-black rounded-xl group transition-all mt-2" disabled={loading}>
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Sign In <ArrowRight className="w-4 h-4 ml-2 opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all" /></>}
            </Button>
          </form>
        </div>
        
        <p className="mt-8 text-center text-sm text-[#4B5563]">
          Don't have an account? <Link href="/auth/signup" className="text-orange-500 hover:text-orange-600 hover:underline font-semibold transition-colors">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
