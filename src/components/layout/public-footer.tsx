import Link from "next/link"
import { Globe, Mail, MessageCircle, Link as LinkIcon } from "lucide-react"

export function PublicFooter() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-10 relative overflow-hidden">
      {/* Background Gradient matching Neoplex footer */}
      <div className="absolute bottom-0 inset-x-0 h-96 bg-gradient-to-t from-blue-100 via-pink-50 to-transparent pointer-events-none opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-heading font-extrabold text-2xl tracking-tight text-slate-900 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-btn flex items-center justify-center">
                <span className="text-white text-lg font-heading leading-none">N</span>
              </div>
              NextStep
            </Link>
            <p className="text-slate-500 font-medium max-w-sm text-sm leading-relaxed mb-6 font-sans">
              The all-in-one AI platform empowering first-gen students to discover, plan, and achieve their dream careers with clarity and confidence.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 outline-none flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:shadow-md transition-all">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 outline-none flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:shadow-md transition-all">
                <LinkIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 outline-none flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:shadow-md transition-all">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 outline-none flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:shadow-md transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 font-extrabold mb-4 font-heading">Platform</h4>
            <ul className="space-y-3 text-sm font-medium text-slate-500">
              <li><Link href="#features" className="hover:text-blue-600 transition-colors">Skill Analysis</Link></li>
              <li><Link href="#features" className="hover:text-blue-600 transition-colors">Career Roadmaps</Link></li>
              <li><Link href="#features" className="hover:text-blue-600 transition-colors">Weekly Planner</Link></li>
              <li><Link href="#features" className="hover:text-blue-600 transition-colors">Opportunities</Link></li>
              <li><Link href="#features" className="hover:text-blue-600 transition-colors">Scholarships</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-extrabold mb-4 font-heading">Company</h4>
            <ul className="space-y-3 text-sm font-medium text-slate-500">
              <li><Link href="#" className="hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-extrabold mb-4 font-heading">Legal</h4>
            <ul className="space-y-3 text-sm font-medium text-slate-500">
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 font-medium text-sm">
            © {new Date().getFullYear()} NextStep. All rights reserved.
          </p>
          <div className="text-slate-500 font-medium text-sm flex items-center gap-2">
            Built with <span className="text-pink-500">♥</span> for students everywhere
          </div>
        </div>
      </div>
    </footer>
  )
}
