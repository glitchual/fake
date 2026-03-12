"use client"

import { useState } from "react"
import { MessageCircle, ExternalLink, ChevronDown, Shield, Zap, HelpCircle, BookOpen, Headphones, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Logo365 } from "@/components/logo-365"

const navItems = [
  { label: "SPAMMER", href: "/" },
  { label: "PROXY", href: "/proxy" },
  { label: "SESSIONS", href: "/sessions" },
  { label: "HELP", href: "/help" },
  { label: "PROFILE", href: "/profile" },
  { label: "GAMBLE", href: "/gamble", accent: true },
]

const faqItems = [
  {
    question: "How do I get started with 365spammer?",
    answer: "To get started, create an account and navigate to the SPAMMER tab. Configure your workflow settings and begin your first campaign.",
    icon: Zap,
  },
  {
    question: "What proxy settings should I use?",
    answer: "We recommend using residential proxies for best results. Navigate to the PROXY tab to configure your settings.",
    icon: Shield,
  },
  {
    question: "How do I manage my sessions?",
    answer: "Sessions can be managed in the SESSIONS tab. View active sessions, terminate inactive ones, and monitor session health.",
    icon: BookOpen,
  },
  {
    question: "How do I deposit balance?",
    answer: "Go to your PROFILE page and click the 'Deposit Balance' button. Balance is credited instantly after confirmation.",
    icon: HelpCircle,
  },
  {
    question: "How do I contact support?",
    answer: "Click the Telegram button below to reach our support team. We're available 24/7.",
    icon: Headphones,
  },
]

export default function HelpPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-background select-none">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="ambient-float absolute left-[5%] top-[20%] h-[400px] w-[400px] rounded-full bg-[#3b5998]/20 blur-[100px]" />
        <div className="ambient-float-reverse absolute right-[5%] top-[30%] h-[450px] w-[450px] rounded-full bg-[#26A17B]/20 blur-[100px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
      </div>

      {/* Header - Compact */}
      <header className="relative z-10 flex items-center justify-center gap-8 px-6 py-2.5">
        <nav className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`relative text-sm font-bold tracking-wider transition-colors ${
                item.label === "HELP"
                  ? "text-foreground"
                  : item.accent
                    ? "text-primary hover:text-primary/80"
                    : "text-muted-foreground hover:text-foreground/80"
              }`}
            >
              {item.label}
              {item.label === "HELP" && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-foreground/30" />
              )}
            </Link>
          ))}
        </nav>

        <div className="absolute right-6">
          <div className="flex items-center gap-2 rounded-full border border-border/40 bg-card/50 px-3 py-1.5">
            <Search className="h-3.5 w-3.5 text-muted-foreground/70" />
            <input
              type="text"
              placeholder="find something in settings.."
              className="w-48 bg-transparent text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
            />
          </div>
        </div>
      </header>

      {/* Content Area - with proper margins and spacing */}
      <div className="relative z-10 flex flex-1 justify-center overflow-hidden px-6 py-3 lg:px-10">
        <div className="flex h-full max-h-[580px] w-full max-w-[1200px] gap-3">
          {/* Left AD panels - Top 40%, Bottom 60% */}
          <aside className="hidden w-[100px] shrink-0 flex-col gap-2 lg:flex">
            <div className="glass-panel flex h-[40%] items-center justify-center">
              <span className="text-[10px] font-semibold tracking-wider text-muted-foreground/30">AD</span>
            </div>
            <div className="glass-panel flex h-[60%] items-center justify-center">
              <span className="text-[10px] font-semibold tracking-wider text-muted-foreground/30">AD</span>
            </div>
          </aside>

          {/* Center content */}
          <main className="glass-panel panel-glow flex flex-1 flex-col overflow-hidden p-4">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold tracking-[0.2em] text-foreground">HELP CENTER</h2>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400">Online</span>
                <span className="text-[10px] text-muted-foreground">24/7 Support</span>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="flex flex-1 gap-4 overflow-hidden">
              {/* FAQ Column */}
              <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-border/30 bg-[#0a0a0f]">
                {/* FAQ Header */}
                <div className="flex shrink-0 items-center justify-between border-b border-border/30 bg-[#111118] px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                      <div className="h-2 w-2 rounded-full bg-[#febc2e]" />
                      <div className="h-2 w-2 rounded-full bg-[#28c840]" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">FAQ</span>
                  </div>
                  <span className="text-[9px] text-muted-foreground/40">{faqItems.length} topics</span>
                </div>

                {/* FAQ Items */}
                <div className="flex-1 space-y-1 overflow-y-auto p-2">
                  {faqItems.map((item, index) => {
                    const Icon = item.icon
                    const isExpanded = expandedIndex === index

                    return (
                      <div key={index} className="overflow-hidden rounded-lg border border-border/20 bg-card/40 transition-all hover:border-border/40 hover:bg-card/60">
                        <button
                          onClick={() => setExpandedIndex(isExpanded ? null : index)}
                          className="flex w-full items-center gap-3 p-2.5 text-left"
                        >
                          <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors ${isExpanded ? "bg-primary/30" : "bg-primary/10"}`}>
                            <Icon className="h-3.5 w-3.5 text-primary" />
                          </div>
                          <span className="flex-1 text-xs font-medium text-foreground">{item.question}</span>
                          <ChevronDown className={`h-4 w-4 text-muted-foreground/60 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                        </button>

                        {isExpanded && (
                          <div className="border-t border-border/20 bg-card/20 px-3 py-2.5">
                            <p className="pl-10 text-[11px] leading-relaxed text-muted-foreground/80">
                              {item.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Right Side Panel */}
              <div className="flex w-[200px] shrink-0 flex-col gap-3">
                {/* Quick Links */}
                <div className="rounded-lg border border-border/30 bg-[#0a0a0f] p-3">
                  <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">Quick Links</h3>
                  <div className="space-y-1.5">
                    <Link href="/" className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] text-muted-foreground transition-colors hover:bg-card/50 hover:text-foreground">
                      <Zap className="h-3 w-3 text-primary" />
                      Getting Started
                    </Link>
                    <Link href="/proxy" className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] text-muted-foreground transition-colors hover:bg-card/50 hover:text-foreground">
                      <Shield className="h-3 w-3 text-cyan-400" />
                      Proxy Setup
                    </Link>
                    <Link href="/sessions" className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] text-muted-foreground transition-colors hover:bg-card/50 hover:text-foreground">
                      <BookOpen className="h-3 w-3 text-amber-400" />
                      Session Guide
                    </Link>
                    <Link href="/profile" className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] text-muted-foreground transition-colors hover:bg-card/50 hover:text-foreground">
                      <HelpCircle className="h-3 w-3 text-emerald-400" />
                      Billing & Payments
                    </Link>
                  </div>
                </div>

                {/* Support Card */}
                <div className="flex flex-1 flex-col justify-between rounded-lg border border-border/30 bg-gradient-to-b from-[#0a0a0f] to-[#0d1117] p-3">
                  <div>
                    <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#229ED9]/20">
                      <MessageCircle className="h-4 w-4 text-[#229ED9]" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground">Need Help?</h3>
                    <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground/70">
                      Our support team is available around the clock to assist you.
                    </p>
                  </div>
                  <a
                    href="https://t.me/support"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-[#229ED9] px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-[#1a8ac4]"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                    Contact Support
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>
                </div>
              </div>
            </div>
          </main>

          {/* Right AD panel - Full height */}
          <aside className="hidden w-[100px] shrink-0 lg:flex">
            <div className="glass-panel flex h-full w-full items-center justify-center">
              <span className="text-[10px] font-semibold tracking-wider text-muted-foreground/30">AD</span>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer - Only on Help page */}
      <footer className="relative z-10 border-t border-border/20 bg-card/40 backdrop-blur-sm">
        <div className="mx-auto flex h-10 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Logo365 className="h-5 w-5" />
            <p className="max-w-[200px] text-[9px] leading-tight text-muted-foreground/60">
              365spammer founders and employees are not responsible for how users use the software.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded">
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
    </div>
  )
}
