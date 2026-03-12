"use client"

import { useState } from "react"
import { MessageCircle, ExternalLink, ChevronDown, Shield, Zap, HelpCircle, BookOpen, Headphones } from "lucide-react"
import { AppLayout } from "@/components/app-layout"

const faqItems = [
  {
    question: "How do I get started with 365spammer?",
    answer: "To get started, create an account and navigate to the SPAMMER tab. Configure your workflow settings and begin your first campaign. Set up proxy settings first for optimal performance.",
    icon: Zap,
  },
  {
    question: "What proxy settings should I use?",
    answer: "We recommend using residential proxies for best results. Navigate to the PROXY tab to configure your settings. Add multiple proxies and the system will automatically rotate between them.",
    icon: Shield,
  },
  {
    question: "How do I manage my sessions?",
    answer: "Sessions can be managed in the SESSIONS tab. View active sessions, terminate inactive ones, and monitor session health. Each session maintains its own state and cookies.",
    icon: BookOpen,
  },
  {
    question: "How do I deposit balance?",
    answer: "Go to your PROFILE page and click the 'Deposit Balance' button. We accept various payment methods including cryptocurrency. Balance is credited instantly after confirmation.",
    icon: HelpCircle,
  },
  {
    question: "How do I contact support?",
    answer: "Click the Telegram button below to reach our support team. We're available 24/7 and typically respond within minutes.",
    icon: Headphones,
  },
]

export default function HelpPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <AppLayout activeNav="HELP">
      <div className="w-full max-w-2xl">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <HelpCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Support Center</span>
          </div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
            How can we help?
          </h1>
          <p className="text-sm text-muted-foreground">
            Find answers to common questions or reach out to our support team
          </p>
        </div>

        {/* FAQ Section */}
        <div className="glass-panel p-6">
          <h2 className="mb-5 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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
                    className="flex w-full items-center gap-3 p-4 text-left"
                  >
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${isExpanded ? "bg-primary/20" : "bg-primary/10"}`}>
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="flex-1 text-sm font-medium text-foreground">{item.question}</span>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                  </button>

                  {isExpanded && (
                    <div className="border-t border-border/20 px-4 pb-4 pt-3">
                      <p className="pl-12 text-sm leading-relaxed text-muted-foreground">
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
        <div className="mt-6 glass-panel overflow-hidden p-6">
          <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-primary via-primary/60 to-transparent" />
          
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <MessageCircle className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 text-lg font-bold text-foreground">Need more help?</h3>
              <p className="text-sm text-muted-foreground">
                Our support team is available 24/7 on Telegram.
              </p>
            </div>
            <a
              href="https://t.me/support"
              target="_blank"
              rel="noopener noreferrer"
              className="telegram-btn flex items-center gap-2 rounded-xl bg-[#229ED9] px-5 py-2.5 font-semibold text-white transition-all hover:bg-[#1a8ac4]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              Telegram Support
              <ExternalLink className="h-4 w-4 opacity-60" />
            </a>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
