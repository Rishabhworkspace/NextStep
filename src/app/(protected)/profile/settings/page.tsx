"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  User, Bell, Shield, Palette, Eye, EyeOff,
  Mail, Lock, Trash2, Clock, ChevronDown, ChevronUp
} from "lucide-react"

interface AccordionSectionProps {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function AccordionSection({ icon, title, children, defaultOpen = false }: AccordionSectionProps) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
            {icon}
          </div>
          <span className="font-semibold text-gray-900" style={{ fontFamily: "var(--font-outfit)" }}>{title}</span>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      {open && <div className="px-6 pb-6 space-y-4 border-t border-gray-50 pt-4">{children}</div>}
    </div>
  )
}

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [scholarshipAlerts, setScholarshipAlerts] = useState(true)
  const [weeklyReminders, setWeeklyReminders] = useState(true)
  const [opportunityAlerts, setOpportunityAlerts] = useState(false)
  const [profileVisibility, setProfileVisibility] = useState("private")
  const [theme, setTheme] = useState("light")

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-outfit)" }}>Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account, notifications, and preferences.</p>
      </div>

      {/* Account */}
      <AccordionSection icon={<User className="w-5 h-5" />} title="Account" defaultOpen>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" /> Email</label>
            <Input placeholder="you@university.edu" className="h-11 bg-gray-50 border-gray-200" disabled />
            <p className="text-xs text-gray-400">Contact support to change your email.</p>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><Lock className="w-4 h-4 text-gray-400" /> Password</label>
            <div className="grid grid-cols-2 gap-3">
              <Input type="password" placeholder="New password" className="h-11 bg-gray-50 border-gray-200" />
              <Input type="password" placeholder="Confirm password" className="h-11 bg-gray-50 border-gray-200" />
            </div>
          </div>
          <Button variant="outline" className="border-gray-200 text-gray-700">Update Password</Button>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-4 rounded-xl border-2 border-red-100 bg-red-50/50">
            <Trash2 className="w-5 h-5 text-red-500 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-700">Delete Account</p>
              <p className="text-xs text-red-500/80 mt-0.5">Permanently delete your account and all data. This cannot be undone.</p>
            </div>
            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 text-xs h-8 px-3">Delete</Button>
          </div>
        </div>
      </AccordionSection>

      {/* Notifications */}
      <AccordionSection icon={<Bell className="w-5 h-5" />} title="Notifications">
        {[
          { label: "Email notifications", desc: "Get notified about important updates", state: emailNotifications, setter: setEmailNotifications },
          { label: "Scholarship deadline alerts", desc: "Reminders for upcoming deadlines", state: scholarshipAlerts, setter: setScholarshipAlerts },
          { label: "Weekly plan reminders", desc: "Sunday evening planning nudge", state: weeklyReminders, setter: setWeeklyReminders },
          { label: "New opportunity matches", desc: "When new internships match your profile", state: opportunityAlerts, setter: setOpportunityAlerts },
        ].map(item => (
          <label key={item.label} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
            <div>
              <p className="text-sm font-medium text-gray-800">{item.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
            </div>
            <button
              onClick={() => item.setter(!item.state)}
              className={`relative w-11 h-6 rounded-full transition-colors ${item.state ? "bg-orange-500" : "bg-gray-200"}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${item.state ? "translate-x-5" : ""}`} />
            </button>
          </label>
        ))}
      </AccordionSection>

      {/* Privacy */}
      <AccordionSection icon={<Shield className="w-5 h-5" />} title="Privacy">
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700">Profile Visibility</p>
          <div className="flex gap-2">
            {["public", "private"].map(opt => (
              <button
                key={opt}
                onClick={() => setProfileVisibility(opt)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                  profileVisibility === opt
                    ? "bg-gray-900 text-white shadow-sm"
                    : "bg-gray-50 text-gray-600 border border-gray-200 hover:border-gray-300"
                }`}
              >
                {opt === "public" ? <Eye className="w-4 h-4 inline mr-1.5" /> : <EyeOff className="w-4 h-4 inline mr-1.5" />}
                {opt}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400">
            {profileVisibility === "public" ? "Other students can see your profile and progress." : "Your profile is only visible to you."}
          </p>
        </div>
      </AccordionSection>

      {/* Appearance */}
      <AccordionSection icon={<Palette className="w-5 h-5" />} title="Appearance">
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700">Theme</p>
          <div className="flex gap-2">
            {[
              { id: "light", label: "☀️ Light" },
              { id: "dark", label: "🌙 Dark" },
              { id: "system", label: "💻 System" },
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => setTheme(opt.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  theme === opt.id
                    ? "bg-gray-900 text-white shadow-sm"
                    : "bg-gray-50 text-gray-600 border border-gray-200 hover:border-gray-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </AccordionSection>

      <div className="pt-4">
        <Button
          className="w-full h-11 text-white shadow-lg shadow-orange-500/20"
          style={{ background: "linear-gradient(90deg, #F97316, #EC4899)" }}
        >
          Save Changes
        </Button>
      </div>
    </div>
  )
}
