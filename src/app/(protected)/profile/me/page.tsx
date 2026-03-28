import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit2, GraduationCap, Target, Briefcase, Plus, CheckCircle2 } from "lucide-react"

export default function ProfilePage() {
  const completionPercentage: number = 85 // Mock data

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-border">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-brand flex items-center justify-center text-white text-3xl font-bold shadow-md shadow-accent/20">
            AM
          </div>
          <div>
            <h1 className="text-3xl font-heading font-bold text-text mb-1">Arjun Mehta</h1>
            <p className="text-text-muted mb-3">arjun.m@university.edu</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">
                <GraduationCap className="w-3 h-3 mr-1" />
                B.Tech CS, 3rd Year
              </Badge>
              <Badge variant="success" className="text-xs">
                First-Gen Student
              </Badge>
            </div>
          </div>
        </div>
        <Button variant="outline" className="shrink-0 gap-2 h-10 w-full md:w-auto">
          <Edit2 className="w-4 h-4" />
          Edit Profile
        </Button>
      </div>

      {/* Completion Widget */}
      <Card className="bg-surface-alt/50 border-none shadow-none">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-semibold text-text flex items-center gap-2">
                Profile Completion
                {completionPercentage === 100 && <CheckCircle2 className="w-4 h-4 text-success" />}
              </h3>
              <p className="text-xs text-text-muted mt-1">Complete your profile to unlock customized roadmaps.</p>
            </div>
            <span className="text-lg font-bold text-accent">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-surface h-2 rounded-full overflow-hidden border border-border">
            <div 
              className="bg-accent h-full rounded-full transition-all duration-1000" 
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Academic Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <GraduationCap className="w-5 h-5 text-accent" />
              Academic Snapshot
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1">CGPA</p>
                <p className="font-semibold text-text text-lg">8.5 <span className="text-sm text-text-muted font-normal">/10</span></p>
              </div>
              <div>
                <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1">Stream</p>
                <p className="font-semibold text-text">Computer Science</p>
              </div>
            </div>
            
            <div>
              <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">Confident In</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="success" className="bg-success-bg/50">Data Structures</Badge>
                <Badge variant="success" className="bg-success-bg/50">Algorithms</Badge>
                <Badge variant="success" className="bg-success-bg/50">Python</Badge>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">Needs Improvement</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="warning" className="bg-warning-bg/50">System Design</Badge>
                <Badge variant="warning" className="bg-warning-bg/50">React.js</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Career & Skills */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="w-5 h-5 text-accent" />
                Career Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1">Target Role</p>
                  <p className="font-semibold text-text text-lg">Full Stack Engineer</p>
                </div>
                <div className="flex gap-4">
                  <div>
                    <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1">Company Type</p>
                    <p className="font-medium text-text">MNC / Big Tech</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1">Timeline</p>
                    <p className="font-medium text-text">Next 12 months</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Briefcase className="w-5 h-5 text-accent" />
                Current Skills
              </CardTitle>
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <Plus className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'JavaScript', prof: 80 },
                  { name: 'React', prof: 40 },
                  { name: 'Node.js', prof: 60 }
                ].map(skill => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-text">{skill.name}</span>
                      <span className="text-text-muted">{skill.prof}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-alt rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: `${skill.prof}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
