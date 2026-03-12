"use client"

import { Search } from "lucide-react"
import Link from "next/link"

const navItems = [
  { label: "SPAMMER", href: "/" },
  { label: "PROXY", href: "/proxy" },
  { label: "SESSIONS", href: "/sessions" },
  { label: "HELP", href: "/help" },
  { label: "PROFILE", href: "/profile" },
  { label: "GAMBLE", href: "/gamble", accent: true },
]

interface AppLayoutProps {
  children: React.ReactNode
  activeNav: string
}

export function AppLayout({ children, activeNav }: AppLayoutProps) {
  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-background select-none">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="ambient-float absolute left-[5%] top-[20%] h-[400px] w-[400px] rounded-full bg-[#3b5998]/20 blur-[100px]" />
        <div className="ambient-float-reverse absolute right-[5%] top-[30%] h-[450px] w-[450px] rounded-full bg-[#26A17B]/20 blur-[100px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-center gap-10 px-6 py-3">
        <nav className="flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`relative py-1 text-sm font-bold tracking-wider transition-all duration-200 ${
                activeNav === item.label
                  ? "text-foreground"
                  : item.accent
                    ? "text-primary hover:text-primary/80"
                    : "text-muted-foreground hover:text-foreground/80"
              }`}
            >
              {item.label}
              {activeNav === item.label && (
                <div className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-primary/60" />
              )}
            </Link>
          ))}
        </nav>

        <div className="absolute right-6">
          <div className="flex items-center gap-2 rounded-full border border-border/40 bg-card/50 px-4 py-2 transition-all duration-200 focus-within:border-primary/30 focus-within:bg-card/70">
            <Search className="h-4 w-4 text-muted-foreground/70" />
            <input
              type="text"
              placeholder="find something in settings.."
              className="w-44 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
            />
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="relative z-10 flex flex-1 justify-center px-6 py-4 lg:px-8">
        <div className="flex h-full max-h-[600px] w-full max-w-[1180px] gap-4">
          {/* Left AD panels - Top 40%, Bottom 60% */}
          <aside className="hidden w-[90px] shrink-0 flex-col gap-3 lg:flex">
            <div className="glass-panel flex h-[40%] items-center justify-center">
              <span className="text-xs font-semibold tracking-wider text-muted-foreground/25">AD</span>
            </div>
            <div className="glass-panel flex h-[60%] items-center justify-center">
              <span className="text-xs font-semibold tracking-wider text-muted-foreground/25">AD</span>
            </div>
          </aside>

          {/* Center content */}
          <main className="page-enter flex flex-1">
            {children}
          </main>

          {/* Right AD panel - Full height */}
          <aside className="hidden w-[90px] shrink-0 lg:flex">
            <div className="glass-panel flex h-full w-full items-center justify-center">
              <span className="text-xs font-semibold tracking-wider text-muted-foreground/25">AD</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
