"use client"

import { useState } from "react"
import { MessageCircle, ExternalLink, ChevronDown, Shield, Zap, HelpCircle, BookOpen, Headphones } from "lucide-react"
import Link from "next/link"
import { AppLayout } from "@/components/app-layout"

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
    <AppLayout activeNav="HELP">
      <div className="flex h-full w-full flex-col">
        <div className="glass-panel panel-glow flex flex-1 flex-col overflow-hidden p-5">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-[0.2em] text-foreground">HELP CENTER</h2>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-medium text-emerald-400">Online</span>
              <span className="text-sm text-muted-foreground">24/7 Support</span>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="flex flex-1 gap-4 overflow-hidden">
            {/* FAQ Column */}
            <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-border/30 bg-[#0a0a0f]">
              {/* FAQ Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-border/30 bg-[#111118] px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">FAQ</span>
                </div>
                <span className="text-xs text-muted-foreground/40">{faqItems.length} topics</span>
              </div>

              {/* FAQ Items */}
              <div className="flex-1 space-y-2 overflow-y-auto p-3">
                {faqItems.map((item, index) => {
                  const Icon = item.icon
                  const isExpanded = expandedIndex === index

                  return (
                    <div key={index} className="overflow-hidden rounded-lg border border-border/20 bg-card/40 transition-all duration-200 hover:border-border/40 hover:bg-card/60">
                      <button
                        onClick={() => setExpandedIndex(isExpanded ? null : index)}
                        className="flex w-full items-center gap-3 p-3 text-left"
                      >
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${isExpanded ? "bg-primary/30" : "bg-primary/10"}`}>
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="flex-1 text-sm font-medium text-foreground">{item.question}</span>
                        <ChevronDown className={`h-4 w-4 text-muted-foreground/60 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                      </button>

                      {isExpanded && (
                        <div className="border-t border-border/20 bg-card/20 px-4 py-3">
                          <p className="pl-11 text-sm leading-relaxed text-muted-foreground/80">
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
            <div className="flex w-[220px] shrink-0 flex-col gap-4">
              {/* Quick Links */}
              <div className="rounded-xl border border-border/30 bg-[#0a0a0f] p-4">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Quick Links</h3>
                <div className="space-y-1">
                  <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all duration-200 hover:bg-card/50 hover:text-foreground">
                    <Zap className="h-4 w-4 text-primary" />
                    Getting Started
                  </Link>
                  <Link href="/proxy" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all duration-200 hover:bg-card/50 hover:text-foreground">
                    <Shield className="h-4 w-4 text-cyan-400" />
                    Proxy Setup
                  </Link>
                  <Link href="/sessions" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all duration-200 hover:bg-card/50 hover:text-foreground">
                    <BookOpen className="h-4 w-4 text-amber-400" />
                    Session Guide
                  </Link>
                  <Link href="/profile" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all duration-200 hover:bg-card/50 hover:text-foreground">
                    <HelpCircle className="h-4 w-4 text-emerald-400" />
                    Billing & Payments
                  </Link>
                </div>
              </div>

              {/* Support Card */}
              <div className="flex flex-1 flex-col justify-between rounded-xl border border-border/30 bg-gradient-to-b from-[#0a0a0f] to-[#0d1117] p-4">
                <div>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#229ED9]/20">
                    <MessageCircle className="h-5 w-5 text-[#229ED9]" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">Need Help?</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground/70">
                    Our support team is available around the clock to assist you.
                  </p>
                </div>
                <a
                  href="https://t.me/support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#229ED9] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#1a8ac4]"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  Contact Support
                  <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
