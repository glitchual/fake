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

function NavLink({ 
  item, 
  isActive, 
  index 
}: { 
  item: typeof navItems[0]
  isActive: boolean
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={item.href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      {/* Background glow on hover/active */}
      <div 
        className="absolute inset-0 rounded-xl transition-all duration-300"
        style={{
          background: isActive 
            ? 'linear-gradient(135deg, rgba(200, 255, 46, 0.15) 0%, rgba(200, 255, 46, 0.05) 100%)'
            : isHovered 
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)'
              : 'transparent',
          transform: isHovered && !isActive ? 'scale(1.05)' : 'scale(1)',
          boxShadow: isActive 
            ? '0 0 20px rgba(200, 255, 46, 0.2), inset 0 0 20px rgba(200, 255, 46, 0.05)'
            : 'none',
        }}
      />
      
      {/* Text */}
      <span 
        className="relative z-10 block px-4 py-2.5 text-sm font-bold tracking-wider transition-all duration-300"
        style={{
          color: item.accent 
            ? '#C8FF2E' 
            : isActive 
              ? '#FFFFFF' 
              : isHovered 
                ? '#FFFFFF' 
                : '#9A9AA8',
          textShadow: item.accent 
            ? isHovered 
              ? '0 0 30px rgba(200, 255, 46, 0.8), 0 0 60px rgba(200, 255, 46, 0.4)'
              : '0 0 20px rgba(200, 255, 46, 0.5)'
            : isActive
              ? '0 0 10px rgba(255, 255, 255, 0.3)'
              : 'none',
          transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
        }}
      >
        {item.label}
      </span>

      {/* Animated underline indicator */}
      <div 
        className="absolute bottom-0 left-1/2 h-[2px] rounded-full transition-all duration-300 ease-out"
        style={{
          background: item.accent 
            ? 'linear-gradient(90deg, transparent, #C8FF2E, transparent)'
            : 'linear-gradient(90deg, transparent, #C8FF2E, transparent)',
          width: isActive ? '70%' : isHovered ? '50%' : '0%',
          transform: 'translateX(-50%)',
          boxShadow: isActive || isHovered ? '0 0 10px rgba(200, 255, 46, 0.5)' : 'none',
        }}
      />

      {/* Pulse effect on active */}
      {isActive && (
        <div 
          className="absolute inset-0 rounded-xl animate-pulse"
          style={{
            background: 'radial-gradient(circle at center, rgba(200, 255, 46, 0.1) 0%, transparent 70%)',
            animationDuration: '3s',
          }}
        />
      )}
    </Link>
  )
}

export function AppLayout({ children, activeNav }: AppLayoutProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [searchFocused, setSearchFocused] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100)
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

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-background select-none">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="ambient-float absolute left-[5%] top-[20%] h-[400px] w-[400px] rounded-full bg-[#3b5998]/20 blur-[100px]" />
        <div className="ambient-float-reverse absolute right-[5%] top-[30%] h-[450px] w-[450px] rounded-full bg-[#26A17B]/20 blur-[100px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/70" />
      </div>

      {/* Header with glassmorphism */}
      <header className="relative z-10">
        {/* Subtle top border glow */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        <div className="flex items-center justify-center px-6 py-4">
          {/* Navigation container with glass effect */}
          <nav 
            className="relative flex items-center gap-1 rounded-2xl px-2 py-1"
            style={{
              background: 'linear-gradient(135deg, rgba(28, 28, 36, 0.6) 0%, rgba(28, 28, 36, 0.4) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            }}
          >
            {navItems.map((item, index) => (
              <NavLink
                key={item.label}
                item={item}
                isActive={activeNav === item.label}
                index={index}
              />
            ))}
          </nav>

          {/* Collapsible Search */}
          <div 
            className="absolute right-6 lg:right-[calc(90px+2rem)]" 
            ref={searchContainerRef}
          >
            <div
              onClick={() => !searchOpen && setSearchOpen(true)}
              className="relative flex items-center gap-2 overflow-hidden rounded-full transition-all duration-400 ease-out"
              style={{
                width: searchOpen ? '220px' : '44px',
                padding: searchOpen ? '10px 16px' : '10px',
                cursor: searchOpen ? 'default' : 'pointer',
                background: searchOpen 
                  ? 'linear-gradient(135deg, rgba(28, 28, 36, 0.8) 0%, rgba(28, 28, 36, 0.6) 100%)'
                  : 'linear-gradient(135deg, rgba(28, 28, 36, 0.5) 0%, rgba(28, 28, 36, 0.3) 100%)',
                backdropFilter: 'blur(20px)',
                border: searchOpen 
                  ? '1px solid rgba(200, 255, 46, 0.3)' 
                  : '1px solid rgba(255, 255, 255, 0.06)',
                boxShadow: searchOpen 
                  ? '0 0 30px rgba(200, 255, 46, 0.15), 0 4px 20px rgba(0, 0, 0, 0.3)'
                  : '0 4px 20px rgba(0, 0, 0, 0.2)',
              }}
            >
              <Search 
                className="shrink-0 transition-all duration-300"
                style={{
                  width: '18px',
                  height: '18px',
                  color: searchOpen || searchFocused ? '#C8FF2E' : '#9A9AA8',
                }}
              />
              
              <input
                ref={searchInputRef}
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search..."
                className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-all duration-300"
                style={{
                  width: searchOpen ? '140px' : '0px',
                  opacity: searchOpen ? 1 : 0,
                }}
              />
              
              {searchOpen && (
                <button
                  onClick={() => {
                    setSearchValue("")
                    setSearchOpen(false)
                  }}
                  className="shrink-0 rounded-full p-1 text-muted-foreground transition-all duration-200 hover:bg-white/10 hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom border with gradient */}
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-border/50 to-transparent" />
      </header>

      {/* Content Area */}
      <div className="relative z-10 flex flex-1 justify-center px-6 py-4 lg:px-8">
        <div className="flex h-full max-h-[600px] w-full max-w-[1180px] gap-4">
          {/* Left AD panels */}
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

          {/* Right AD panel */}
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
