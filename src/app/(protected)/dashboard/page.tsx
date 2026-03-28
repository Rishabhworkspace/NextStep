import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Trophy, Clock, CheckCircle2, ArrowUpRight, ArrowDownRight, BookOpen, Map, GraduationCap } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-[1400px] mx-auto animate-in fade-in duration-500 pb-12">
      
      {/* Hero Banner (Dribbble Inspired, Neoplex Adaption) */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0A0F1C] text-white p-10 md:p-14 shadow-2xl flex flex-col md:flex-row justify-between gap-8 isolate border border-white/10">
        {/* Abstract Glowing Orbs for Neoplex Vibe */}
        <div className="absolute top-0 right-[-10%] w-[60%] h-[150%] bg-orange-500/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-[-50%] left-[-10%] w-[50%] h-[150%] bg-pink-500/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="absolute top-[20%] right-[30%] w-[30%] h-[100%] bg-purple-500/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
        
        <div className="relative z-10 max-w-2xl flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold uppercase tracking-tight mb-4 leading-[1.1]">
            Welcome back,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500">
              Arjun Mehta
            </span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-lg font-medium">Track your learning progress, manage your coursework activity, and achieve your goals.</p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 self-start md:self-end mt-4 md:mt-0">
          <div className="px-5 py-3.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-sm font-semibold flex items-center text-gray-200">
            Jan 1 - Jun 7 2026
          </div>
          <button className="px-6 py-3.5 rounded-xl bg-white text-[#0A0F1C] font-bold text-sm shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-all">
            + Continue Learning
          </button>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat Card 1 */}
        <Card className="rounded-[1.5rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Trophy className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Success Score</span>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 font-bold px-2 py-0.5">
                <ArrowUpRight className="w-3 h-3 mr-1" /> 5.02%
              </Badge>
            </div>
            <div className="text-4xl font-heading font-extrabold text-gray-900 mb-6 tracking-tight">
              82<span className="text-xl text-gray-400 font-semibold">/100</span>
            </div>
            <div className="relative w-full h-12">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                <path d="M0,25 C15,25 25,10 40,15 C55,20 70,5 100,0" fill="none" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M0,25 C15,25 25,10 40,15 C55,20 70,5 100,0 L100,30 L0,30 Z" fill="url(#orange-gradient)" opacity="0.1" />
                <defs>
                  <linearGradient id="orange-gradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#F97316" stopOpacity="1"/>
                    <stop offset="100%" stopColor="#F97316" stopOpacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </CardContent>
        </Card>
        
        {/* Stat Card 2 */}
        <Card className="rounded-[1.5rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Clock className="w-5 h-5 text-pink-600" />
                </div>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Time Invested</span>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 font-bold px-2 py-0.5">
                <ArrowUpRight className="w-3 h-3 mr-1" /> 1.1%
              </Badge>
            </div>
            <div className="text-4xl font-heading font-extrabold text-gray-900 mb-6 tracking-tight">
              27.5<span className="text-xl text-gray-400 font-semibold">h</span>
            </div>
            <div className="relative w-full h-12 flex items-end gap-1.5 opacity-80">
              {[30, 45, 25, 60, 40, 75, 50, 85, 45, 65, 30, 55, 40, 70, 80].map((h, i) => (
                <div key={i} className="flex-1 bg-pink-500 rounded-t-sm" style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stat Card 3 */}
        <Card className="rounded-[1.5rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Tasks Done</span>
              </div>
              <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 font-bold px-2 py-0.5">
                <ArrowDownRight className="w-3 h-3 mr-1" /> 0.8%
              </Badge>
            </div>
            <div className="text-4xl font-heading font-extrabold text-gray-900 mb-6 tracking-tight">
              12
            </div>
            <div className="relative w-full h-12">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                <path d="M0,15 C20,10 40,25 60,15 C80,5 100,20 100,20" fill="none" stroke="#A855F7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M0,15 C20,10 40,25 60,15 C80,5 100,20 100,20 L100,30 L0,30 Z" fill="url(#purple-gradient)" opacity="0.1" />
                <defs>
                  <linearGradient id="purple-gradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#A855F7" stopOpacity="1"/>
                    <stop offset="100%" stopColor="#A855F7" stopOpacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: Main Bar Chart Widget (Statistics) */}
        <div className="xl:col-span-2">
          <Card className="h-full rounded-[1.5rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white p-6 md:p-8 flex flex-col">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-xl font-heading font-extrabold text-gray-900 mb-1">Study Statistics</h3>
                <p className="text-sm font-semibold text-gray-400">your av. conversion 95%</p>
              </div>
              <div className="flex gap-4 text-xs font-bold text-gray-500">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-gradient-brand shadow-sm"></div>Completed</div>
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-sm"></div>Pending</div>
              </div>
            </div>
            
            {/* Range Selector */}
            <div className="flex gap-2 mb-8">
              <Badge variant="outline" className="bg-gray-100 text-gray-500 border-none hover:bg-gray-200 cursor-pointer px-3 py-1 font-bold">7D</Badge>
              <Badge variant="outline" className="bg-[#0A0F1C] text-white border-none shadow-md px-3 py-1 font-bold">14D</Badge>
              <Badge variant="outline" className="bg-gray-100 text-gray-500 border-none hover:bg-gray-200 cursor-pointer px-3 py-1 font-bold">1M</Badge>
              <Badge variant="outline" className="bg-gray-100 text-gray-500 border-none hover:bg-gray-200 cursor-pointer px-3 py-1 font-bold">3M</Badge>
              <Badge variant="outline" className="bg-gray-100 text-gray-500 border-none hover:bg-gray-200 cursor-pointer px-3 py-1 font-bold">1Y</Badge>
            </div>

            {/* Custom CSS Bar Chart (Imitating Dribbble UI) */}
            <div className="flex-1 flex items-end justify-between gap-2 md:gap-6 mt-auto min-h-[250px] relative">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] font-bold text-gray-400 pointer-events-none">
                <span>50K</span>
                <span>40K</span>
                <span>30K</span>
                <span>20K</span>
                <span>10K</span>
              </div>
              
              {/* Chart Grid Lines */}
              <div className="absolute left-8 right-0 top-2 border-b border-gray-100 border-dashed"></div>
              <div className="absolute left-8 right-0 top-1/4 border-b border-gray-100 border-dashed"></div>
              <div className="absolute left-8 right-0 top-2/4 border-b border-gray-100 border-dashed"></div>
              <div className="absolute left-8 right-0 top-3/4 border-b border-gray-100 border-dashed"></div>
              
              <div className="w-8 shrink-0"></div> {/* Spacer for Y-axis */}
              
              {[
                { label: '1 Jan', val1: 20, val2: 0 },
                { label: '2 Jan', val1: 45, val2: 15 },
                { label: '3 Jan', val1: 65, val2: 40 },
                { label: '4 Jan', val1: 50, val2: 30 },
                { label: '5 Jan', val1: 30, val2: 80 },
                { label: '6 Jan', val1: 70, val2: 45 },
                { label: '7 Jan', val1: 85, val2: 20 },
              ].map((data, i) => (
                <div key={i} className="flex flex-col items-center gap-4 w-full h-full justify-end z-10 relative group">
                  <div className="w-full flex justify-center gap-1.5 h-full items-end pb-1">
                    <div 
                      className="w-full max-w-[12px] md:max-w-[16px] bg-gradient-brand rounded-t-lg hover:brightness-110 transition-all cursor-pointer shadow-sm relative group" 
                      style={{ height: `${data.val1}%` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded font-bold transition-opacity">{data.val1}k</div>
                    </div>
                    {data.val2 > 0 && (
                      <div 
                        className="w-full max-w-[12px] md:max-w-[16px] bg-gradient-to-t from-purple-400 to-purple-600 rounded-t-lg hover:brightness-110 transition-all cursor-pointer shadow-sm relative group opacity-90" 
                        style={{ height: `${data.val2}%` }}
                      >
                         <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded font-bold transition-opacity">{data.val2}k</div>
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-bold text-gray-400 whitespace-nowrap">{data.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: Modules / Progress / Courses */}
        <div className="space-y-6">
          <Card className="rounded-[1.5rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-heading font-extrabold text-gray-900">Current Focus</h3>
              <button className="text-xs font-bold text-orange-500 hover:text-orange-600 uppercase tracking-wider flex items-center">
                View all <ArrowUpRight className="w-3 h-3 ml-1" />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Course Item 1 */}
              <div className="p-4 rounded-[1rem] border border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all cursor-pointer group shadow-sm">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-xl bg-[#0A0F1C] flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-1 pr-2">React Context API Masterclass</h4>
                      <span className="text-xs font-bold text-gray-900 flex items-center">34% <ArrowUpRight className="w-3 h-3 text-green-500 ml-0.5" /></span>
                    </div>
                    <p className="text-xs font-medium text-gray-400 mb-2.5">12 lessons • 4 practical works</p>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-brand h-full rounded-full w-[34%]"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Course Item 2 */}
              <div className="p-4 rounded-[1rem] border border-gray-100 hover:border-pink-200 hover:bg-pink-50/30 transition-all cursor-pointer group shadow-sm">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                    <Map className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-gray-900 group-hover:text-pink-600 transition-colors line-clamp-1 pr-2">System Design Fundamentals</h4>
                      <span className="text-xs font-bold text-gray-900 flex items-center">30% <ArrowDownRight className="w-3 h-3 text-red-500 ml-0.5" /></span>
                    </div>
                    <p className="text-xs font-medium text-gray-400 mb-2.5">5 lessons • 2 practical works</p>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-pink-500 h-full rounded-full w-[30%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Location / Meta Stats Section (adapted to 'Skills Allocation') */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-heading font-extrabold text-gray-900">Skill Allocation</h3>
                <Badge variant="outline" className="bg-gray-50 border-gray-200 text-gray-600 font-bold">+ Advanced</Badge>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: "Frontend", percent: "32.2%", width: "32.2%", color: "bg-orange-500" },
                  { name: "Backend", percent: "28%", width: "28%", color: "bg-pink-500" },
                  { name: "DevOps", percent: "17%", width: "17%", color: "bg-purple-500" },
                  { name: "Database", percent: "10.58%", width: "10.5%", color: "bg-blue-500" },
                ].map((skill, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm font-bold text-gray-600">
                    <span className="w-20">{skill.name}</span>
                    <span className="w-12 text-right text-gray-900">{skill.percent}</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden flex items-center">
                      <div className={`h-full rounded-full ${skill.color}`} style={{ width: skill.width }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </Card>
        </div>
      </div>
    </div>
  )
}
