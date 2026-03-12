"use client"

import { Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Logo365 } from "@/components/logo-365"

// Navigation items
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
    <div className="desktop-app relative min-h-screen overflow-hidden bg-background">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Facebook coin - left */}
        <div className="ambient-float absolute left-[5%] top-[20%] h-[400px] w-[400px] opacity-30 blur-sm">
          <Image
            src="/images/facebook-coin.png"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>
        {/* Tether coin - right */}
        <div className="ambient-float-reverse absolute right-[0%] top-[35%] h-[450px] w-[450px] opacity-30 blur-sm">
          <Image
            src="/images/tether-coin.png"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Logo365 className="h-10 w-10" />
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`relative text-sm font-bold tracking-wider transition-colors ${
                  activeNav === item.label
                    ? "text-foreground"
                    : item.accent
                      ? "text-primary hover:text-primary/80"
                      : "text-muted-foreground hover:text-foreground/80"
                }`}
              >
                {item.label}
                {activeNav === item.label && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-foreground/30" />
                )}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="relative w-64">
            <div className="search-glow flex items-center gap-2 rounded-full border border-border/40 bg-card/50 px-4 py-2 backdrop-blur-sm">
              <Search className="h-4 w-4 text-muted-foreground/70" />
              <input
                type="text"
                placeholder="find something in settings.."
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
              />
            </div>
          </div>
        </header>

        {/* Main Layout */}
        <div className="flex flex-1 gap-4 px-4 pb-6">
          {/* Left AD panels */}
          <aside className="hidden w-[140px] shrink-0 flex-col gap-4 lg:flex">
            <AdPanel />
            <AdPanel />
          </aside>

          {/* Center content */}
          <main className="flex flex-1 justify-center">
            {children}
          </main>

          {/* Right AD panel */}
          <aside className="hidden w-[140px] shrink-0 lg:block">
            <AdPanel tall />
          </aside>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

function AdPanel({ tall = false }: { tall?: boolean }) {
  return (
    <div
      className={`glass-panel flex items-center justify-center ${
        tall ? "h-full" : "h-[160px]"
      }`}
    >
      <span className="text-sm font-semibold tracking-wider text-muted-foreground/30">
        AD
      </span>
    </div>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border/20 bg-card/40 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Logo365 className="h-6 w-6" />
          <p className="max-w-[200px] text-[9px] leading-tight text-muted-foreground/60">
            365spammer founders and employees are not responsible for how users use the software.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded">
            <Image
              src="/images/comrade-logo.png"
              alt="Comrade M.V."
              fill
              className="object-cover"
            />
          </div>
          <p className="max-w-[220px] text-[9px] leading-tight text-muted-foreground/60">
            comrade, under the branding of comrade M.V. is not responsible for the use of this application.
          </p>
        </div>
      </div>
    </footer>
  )
}
