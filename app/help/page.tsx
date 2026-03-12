"use client"

import { useState } from "react"
import { Search, MessageCircle, ExternalLink, ChevronDown, Shield, Zap, HelpCircle, BookOpen, Headphones } from "lucide-react"
import { Logo365 } from "@/components/logo-365"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

// Navigation items
const navItems = [
  { label: "SPAMMER", href: "/", active: false },
  { label: "PROXY", href: "/proxy", active: false },
  { label: "SESSIONS", href: "/sessions", active: false },
  { label: "HELP", href: "/help", active: true },
  { label: "PROFILE", href: "/profile", active: false },
  { label: "GAMBLE", href: "/gamble", active: false, accent: true },
]

// FAQ data
const faqItems = [
  {
    question: "How do I get started with 365spammer?",
    answer: "To get started, create an account and navigate to the SPAMMER tab. From there you can configure your workflow settings and begin your first campaign. Make sure to set up your proxy settings first for optimal performance.",
    icon: Zap,
  },
  {
    question: "What proxy settings should I use?",
    answer: "We recommend using residential proxies for best results. Navigate to the PROXY tab to configure your proxy settings. You can add multiple proxies and the system will automatically rotate between them.",
    icon: Shield,
  },
  {
    question: "How do I manage my sessions?",
    answer: "Sessions can be managed in the SESSIONS tab. Here you can view active sessions, terminate inactive ones, and monitor session health. Each session maintains its own state and cookies.",
    icon: BookOpen,
  },
  {
    question: "How do I deposit balance?",
    answer: "To deposit balance, go to your PROFILE page and click the 'Deposit Balance' button. We accept various payment methods including cryptocurrency. Your balance will be credited instantly after confirmation.",
    icon: HelpCircle,
  },
  {
    question: "How do I contact support?",
    answer: "For immediate support, click the Telegram button below to reach our support team. We're available 24/7 and typically respond within minutes. You can also check our documentation for common solutions.",
    icon: Headphones,
  },
]

// Stagger animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
}

export default function HelpPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <div className="desktop-app relative min-h-screen overflow-hidden bg-background">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute left-[5%] top-[10%] h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-[10%] top-[30%] h-[500px] w-[500px] rounded-full bg-primary/3 blur-[100px]"
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(200, 255, 46, 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(200, 255, 46, 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/90" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Top Bar with Search */}
        <TopBar />

        {/* Navigation */}
        <Navigation />

        {/* Help Content */}
        <div className="flex flex-1 flex-col items-center px-6 pb-8 pt-4">
          {/* Hero Section */}
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <HelpCircle className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Support Center</span>
            </motion.div>
            <motion.h1
              className="mb-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              How can we help?
            </motion.h1>
            <motion.p
              className="max-w-md text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Find answers to common questions or reach out to our support team
            </motion.p>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            className="w-full max-w-2xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              className="mb-6 text-center text-lg font-semibold tracking-wide text-muted-foreground"
              variants={itemVariants}
            >
              FREQUENTLY ASKED QUESTIONS
            </motion.h2>

            <div className="space-y-3">
              {faqItems.map((item, index) => (
                <FAQItem
                  key={index}
                  item={item}
                  index={index}
                  isExpanded={expandedIndex === index}
                  onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
                />
              ))}
            </div>
          </motion.div>

          {/* Support Card */}
          <motion.div
            className="mt-12 w-full max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="support-card glass-panel relative overflow-hidden p-8">
              {/* Animated accent line */}
              <motion.div
                className="absolute left-0 top-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
              />
              
              <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
                <motion.div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <MessageCircle className="h-8 w-8 text-primary" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-bold text-foreground">Need more help?</h3>
                  <p className="text-sm text-muted-foreground">
                    Our support team is available 24/7 on Telegram. Get instant responses and personalized assistance.
                  </p>
                </div>
                <motion.a
                  href="https://t.me/support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="telegram-btn group flex items-center gap-2 rounded-xl bg-[#229ED9] px-6 py-3 font-semibold text-white transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  <span>Telegram Support</span>
                  <ExternalLink className="h-4 w-4 opacity-60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer - Only on Help page */}
        <Footer />
      </div>
    </div>
  )
}

// ============ Components ============

function TopBar() {
  return (
    <motion.div
      className="flex justify-center px-6 pt-5"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <SearchBar />
    </motion.div>
  )
}

function SearchBar() {
  return (
    <div className="relative w-full max-w-xl">
      <div className="search-glow relative flex items-center gap-2.5 rounded-full border border-border/40 bg-card/50 px-4 py-2.5 backdrop-blur-sm transition-all duration-300">
        <Search className="h-4 w-4 text-muted-foreground/70" />
        <input
          type="text"
          placeholder="Search for help..."
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
        />
      </div>
    </div>
  )
}

function Navigation() {
  return (
    <motion.nav
      className="flex justify-center gap-6 px-6 py-5 md:gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      {navItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 * index }}
        >
          <Link
            href={item.href}
            className={`relative text-sm font-bold tracking-wider transition-all duration-200 md:text-base ${
              item.active
                ? "text-foreground"
                : item.accent
                  ? "text-primary hover:text-primary/80"
                  : "text-muted-foreground hover:text-foreground/80"
            }`}
          >
            {item.label}
            {item.active && (
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-foreground/30"
                layoutId="activeTab"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </Link>
        </motion.div>
      ))}
    </motion.nav>
  )
}

function FAQItem({
  item,
  index,
  isExpanded,
  onToggle,
}: {
  item: (typeof faqItems)[0]
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  const Icon = item.icon

  return (
    <motion.div
      variants={itemVariants}
      className="faq-item glass-panel overflow-hidden transition-all duration-300"
      style={{
        boxShadow: isExpanded ? "0 0 30px rgba(200, 255, 46, 0.05)" : undefined,
      }}
    >
      <motion.button
        onClick={onToggle}
        className="flex w-full items-center gap-4 p-5 text-left"
        whileHover={{ backgroundColor: "rgba(200, 255, 46, 0.02)" }}
      >
        <motion.div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10"
          animate={{
            scale: isExpanded ? 1.05 : 1,
            backgroundColor: isExpanded ? "rgba(200, 255, 46, 0.15)" : "rgba(200, 255, 46, 0.1)",
          }}
          transition={{ duration: 0.2 }}
        >
          <Icon className="h-5 w-5 text-primary" />
        </motion.div>
        <span className="flex-1 font-medium text-foreground">{item.question}</span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="border-t border-border/20 px-5 pb-5 pt-4">
              <motion.p
                className="pl-14 text-sm leading-relaxed text-muted-foreground"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                {item.answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function Footer() {
  return (
    <motion.footer
      className="relative z-10 mt-auto border-t border-border/20 bg-card/60 backdrop-blur-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <div className="mx-auto flex h-[70px] max-w-6xl items-center justify-between px-6">
        {/* 365 Logo and text */}
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center">
            <Logo365 className="h-8 w-8" />
          </div>
          <p className="max-w-[220px] text-[10px] leading-tight text-muted-foreground/70">
            365spammer founders and employees are not responsible for how users use the software.
          </p>
        </motion.div>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-border/30 sm:block" />

        {/* Comrade Logo and text */}
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md">
            <Image
              src="/images/comrade-logo.png"
              alt="Comrade M.V."
              fill
              loading="eager"
              priority
              className="object-cover"
            />
          </div>
          <p className="max-w-[260px] text-[10px] leading-tight text-muted-foreground/70">
            comrade, under the branding of comrade M.V. is not responsible for the use of this application. Everyone is responsible for their own actions.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
