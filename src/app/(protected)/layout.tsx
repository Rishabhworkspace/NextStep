import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { BottomNav } from "@/components/layout/bottom-nav"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-bg">
      <Sidebar />
      <div className="md:pl-[240px] flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 p-6 md:p-8 pb-24 md:pb-8">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  )
}
