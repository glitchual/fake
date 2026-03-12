"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Logo365 } from "@/components/logo-365"
import Image from "next/image"
import { motion } from "framer-motion"

// Navigation items
const navItems = [
  { label: "SPAMMER", active: true },
  { label: "PROXY", active: false },
  { label: "SESSIONS", active: false },
  { label: "HELP", active: false },
  { label: "PROFILE", active: false },
  { label: "GAMBLE", active: false, accent: true },
]

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" }
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("SPAMMER")

  return (
    <div className="desktop-app relative min-h-screen overflow-hidden bg-background">
      {/* Background with blurred coins and ambient effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Facebook coin - left side */}
        <div className="ambient-float absolute left-[10%] top-[15%] h-[450px] w-[450px] opacity-35 blur-sm">
          <Image
            src="/images/facebook-coin.png"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>
        {/* Tether coin - right side */}
        <div className="ambient-float-reverse absolute right-[5%] top-[30%] h-[500px] w-[500px] opacity-35 blur-sm">
          <Image
            src="/images/tether-coin.png"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/85" />
        {/* Ambient glow behind workflow area */}
        <div className="workflow-ambient absolute inset-0" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Top Bar with Search */}
        <TopBar />

        {/* Navigation */}
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Layout - Ads + Content + Ads */}
        <div className="flex flex-1 items-start justify-center gap-6 px-6 pb-20 pt-2">
          {/* Left Ad Panels */}
          <motion.div 
            className="hidden flex-col gap-4 lg:flex"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <AdPanel />
            <AdPanel />
          </motion.div>

          {/* Center Workflow Panel */}
          <WorkflowPanel />

          {/* Right Ad Panel */}
          <motion.div 
            className="hidden lg:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <AdPanel tall />
          </motion.div>
        </div>

        {/* Footer */}
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
          placeholder="find something in settings.."
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
        />
      </div>
    </div>
  )
}

function Navigation({ 
  activeTab, 
  setActiveTab 
}: { 
  activeTab: string
  setActiveTab: (tab: string) => void 
}) {
  return (
    <motion.nav 
      className="flex justify-center gap-6 px-6 py-5 md:gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      {navItems.map((item, index) => (
        <motion.button
          key={item.label}
          onClick={() => setActiveTab(item.label)}
          className={`relative text-sm font-bold tracking-wider transition-all duration-200 md:text-base ${
            activeTab === item.label
              ? "text-foreground"
              : item.accent
                ? "text-primary hover:text-primary/80"
                : "text-muted-foreground hover:text-foreground/80"
          }`}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 * index }}
          whileHover={{ y: -1 }}
        >
          {item.label}
          {activeTab === item.label && (
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-foreground/30 rounded-full"
              layoutId="activeTab"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </motion.nav>
  )
}

function WorkflowPanel() {
  return (
    <motion.div 
      className="relative w-full max-w-4xl"
      {...scaleIn}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      {/* Glow effect behind panel */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-40 blur-2xl" />
      
      {/* Main panel */}
      <div className="glass-panel panel-glow relative p-8">
        <h2 className="text-center text-2xl font-bold tracking-[0.2em] text-foreground md:text-3xl">
          WORKFLOW
        </h2>
        <div className="mt-8 min-h-[280px]">
          {/* Workflow content placeholder */}
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted-foreground/60">
              Select a workflow to begin
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function AdPanel({ tall = false }: { tall?: boolean }) {
  return (
    <motion.div
      className={`glass-panel flex w-[180px] items-center justify-center transition-all duration-300 hover:scale-[1.01] ${
        tall ? "h-[380px]" : "h-[175px]"
      }`}
      whileHover={{ 
        boxShadow: "0 0 30px rgba(200, 255, 46, 0.05)",
      }}
    >
      <span className="text-base font-semibold tracking-wider text-muted-foreground/40">
        AD
      </span>
    </motion.div>
  )
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/20 bg-card/60 backdrop-blur-md">
      <div className="mx-auto flex h-[70px] max-w-6xl items-center justify-between px-6">
        {/* 365 Logo and text */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center">
            <Logo365 className="h-8 w-8" />
          </div>
          <p className="max-w-[220px] text-[10px] leading-tight text-muted-foreground/70">
            365spammer founders and employees are not responsible for how users use the software.
          </p>
        </div>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-border/30 sm:block" />

        {/* Comrade Logo and text */}
        <div className="flex items-center gap-3">
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
        </div>
      </div>
    </footer>
  )
}
