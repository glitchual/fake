"use client"

import { Search, X } from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"

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
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        if (searchValue === "") {
          setSearchOpen(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [searchValue])

  const handleSearchToggle = () => {
    if (!searchOpen) {
      setSearchOpen(true)
    }
  }

  const handleClearSearch = () => {
    setSearchValue("")
    setSearchOpen(false)
  }

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-background select-none">
      {/* Background - slightly lighter ambient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="ambient-float absolute left-[5%] top-[20%] h-[400px] w-[400px] rounded-full bg-[#3b5998]/25 blur-[100px]" />
        <div className="ambient-float-reverse absolute right-[5%] top-[30%] h-[450px] w-[450px] rounded-full bg-[#26A17B]/25 blur-[100px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/80" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-center px-6 py-4">
        <nav className="flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`nav-link text-sm ${
                activeNav === item.label
                  ? "active text-foreground"
                  : item.accent
                    ? "nav-link-accent"
                    : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Collapsible Search - positioned to align with right AD panel */}
        <div className="absolute right-6 lg:right-[calc(90px+2rem)]" ref={searchContainerRef}>
          <div
            onClick={handleSearchToggle}
            className={`flex items-center gap-2 rounded-full border border-border/50 bg-card/60 backdrop-blur-sm transition-all duration-300 ${
              searchOpen ? "search-expanded" : "search-collapsed"
            } ${searchOpen ? "border-primary/30 shadow-[0_0_20px_rgba(200,255,46,0.1)]" : "hover:border-border hover:bg-card/80"}`}
          >
            <Search className={`h-4 w-4 shrink-0 transition-colors duration-200 ${searchOpen ? "text-primary" : "text-muted-foreground"}`} />
            <input
              ref={searchInputRef}
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search settings..."
              className="search-input bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
            />
            {searchOpen && (
              <button
                onClick={handleClearSearch}
                className="shrink-0 rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-border/50 hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="relative z-10 flex flex-1 justify-center px-6 py-4 lg:px-8">
        <div className="flex h-full max-h-[600px] w-full max-w-[1180px] gap-4">
          {/* Left AD panels - Top 40%, Bottom 60% */}
          <aside className="hidden w-[90px] shrink-0 flex-col gap-3 lg:flex">
            <div className="glass-panel flex h-[40%] items-center justify-center">
              <span className="text-xs font-semibold tracking-wider text-muted-foreground/30">AD</span>
            </div>
            <div className="glass-panel flex h-[60%] items-center justify-center">
              <span className="text-xs font-semibold tracking-wider text-muted-foreground/30">AD</span>
            </div>
          </aside>

          {/* Center content */}
          <main className="page-enter flex flex-1">
            {children}
          </main>

          {/* Right AD panel - Full height */}
          <aside className="hidden w-[90px] shrink-0 lg:flex">
            <div className="glass-panel flex h-full w-full items-center justify-center">
              <span className="text-xs font-semibold tracking-wider text-muted-foreground/30">AD</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
