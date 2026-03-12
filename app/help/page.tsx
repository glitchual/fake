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

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-3">
        <Link href="/" className="shrink-0">
          <Logo365 className="h-[80px] w-[80px]" />
        </Link>

        <nav className="flex items-center gap-6">
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

        <div className="w-56">
          <div className="flex items-center gap-2 rounded-full border border-border/40 bg-card/50 px-3 py-1.5">
            <Search className="h-3.5 w-3.5 text-muted-foreground/70" />
            <input
              type="text"
              placeholder="find something in settings.."
              className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
            />
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="relative z-10 flex flex-1 gap-2 overflow-hidden px-2 pb-2">
        {/* Left AD panels */}
        <aside className="hidden w-[160px] shrink-0 flex-col gap-2 lg:flex">
          <div className="glass-panel flex flex-1 items-center justify-center">
            <span className="text-xs font-semibold tracking-wider text-muted-foreground/30">AD</span>
          </div>
          <div className="glass-panel flex flex-1 items-center justify-center">
            <span className="text-xs font-semibold tracking-wider text-muted-foreground/30">AD</span>
          </div>
        </aside>

        {/* Center content */}
        <main className="flex flex-1 justify-center overflow-y-auto py-2">
          <div className="w-full max-w-2xl space-y-4">
            {/* FAQ Section */}
            <div className="glass-panel p-5">
              <h2 className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Frequently Asked Questions
              </h2>

              <div className="space-y-2">
                {faqItems.map((item, index) => {
                  const Icon = item.icon
                  const isExpanded = expandedIndex === index

                  return (
                    <div key={index} className="overflow-hidden rounded-lg border border-border/30 bg-card/30 transition-colors hover:border-border/50">
                      <button
                        onClick={() => setExpandedIndex(isExpanded ? null : index)}
                        className="flex w-full items-center gap-3 p-3 text-left"
                      >
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${isExpanded ? "bg-primary/20" : "bg-primary/10"}`}>
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="flex-1 text-sm font-medium text-foreground">{item.question}</span>
                        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      </button>

                      {isExpanded && (
                        <div className="border-t border-border/20 px-3 pb-3 pt-2">
                          <p className="pl-11 text-sm leading-relaxed text-muted-foreground">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Support Card */}
            <div className="glass-panel p-5">
              <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-base font-bold text-foreground">Need more help?</h3>
                  <p className="text-xs text-muted-foreground">
                    Our support team is available 24/7 on Telegram.
                  </p>
                </div>
                <a
                  href="https://t.me/support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-[#229ED9] px-4 py-2 font-semibold text-white transition-all hover:bg-[#1a8ac4]"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  Telegram
                  <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                </a>
              </div>
            </div>
          </div>
        </main>

        {/* Right AD panel */}
        <aside className="hidden w-[160px] shrink-0 lg:flex">
          <div className="glass-panel flex h-full w-full items-center justify-center">
            <span className="text-xs font-semibold tracking-wider text-muted-foreground/30">AD</span>
          </div>
        </aside>
      </div>

      {/* Footer - Only on Help page */}
      <footer className="relative z-10 border-t border-border/20 bg-card/40 backdrop-blur-sm">
        <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-6">
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
