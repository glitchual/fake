"use client"

import { useState } from "react"
import { Search, User, Clock, Wallet, Crown, Sparkles, ExternalLink, Copy, Check, Shield, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

// Navigation items
const navItems = [
  { label: "SPAMMER", href: "/", active: false },
  { label: "PROXY", href: "/proxy", active: false },
  { label: "SESSIONS", href: "/sessions", active: false },
  { label: "HELP", href: "/help", active: false },
  { label: "PROFILE", href: "/profile", active: true },
  { label: "GAMBLE", href: "/gamble", active: false, accent: true },
]

// Mock user data
const userData = {
  nickname: "CryptoMaster_365",
  id: "USR-2847192",
  subscriptionDays: 47,
  subscriptionPlan: "Premium",
  balance: "125.50",
  totalDeposited: "500.00",
  memberSince: "Jan 2024",
  sessionsRun: 156,
  proxiesUsed: 24,
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

const glowVariants = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: [0.5, 0.8, 0.5],
    scale: [1, 1.05, 1],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  }
}

const pulseVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.02, 1],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  }
}

export default function ProfilePage() {
  const [copied, setCopied] = useState(false)

  const copyUserId = () => {
    navigator.clipboard.writeText(userData.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="desktop-app relative min-h-screen overflow-hidden bg-background">
      {/* Background with blurred coins and ambient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="ambient-float absolute left-[10%] top-[15%] h-[450px] w-[450px] opacity-35 blur-sm">
          <Image src="/images/facebook-coin.png" alt="" fill className="object-contain" priority />
        </div>
        <div className="ambient-float-reverse absolute right-[5%] top-[30%] h-[500px] w-[500px] opacity-35 blur-sm">
          <Image src="/images/tether-coin.png" alt="" fill className="object-contain" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/85" />
        <div className="workflow-ambient absolute inset-0" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <TopBar />
        <Navigation />

        {/* Main Layout */}
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

          {/* Center Profile Panel */}
          <ProfilePanel userData={userData} copied={copied} onCopy={copyUserId} />

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
      </div>
    </div>
  )
}

// Profile Panel Component
function ProfilePanel({ 
  userData, 
  copied, 
  onCopy 
}: { 
  userData: typeof userData
  copied: boolean
  onCopy: () => void 
}) {
  return (
    <motion.div 
      className="relative w-full max-w-4xl"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      {/* Animated glow effect behind panel */}
      <motion.div 
        className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/15 via-transparent to-primary/15 blur-2xl"
        variants={glowVariants}
        initial="initial"
        animate="animate"
      />
      
      {/* Main panel */}
      <div className="glass-panel panel-glow relative overflow-hidden p-8">
        {/* Top accent line animation */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        {/* Profile Header */}
        <motion.div 
          className="flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Avatar */}
          <motion.div 
            className="relative"
            variants={itemVariants}
          >
            <motion.div 
              className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary/30 to-primary/10 blur-lg"
              variants={pulseVariants}
              initial="initial"
              animate="animate"
            />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary/30 bg-gradient-to-br from-card to-background">
              <User className="h-12 w-12 text-primary" />
              <motion.div 
                className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-primary"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
              >
                <Crown className="h-4 w-4 text-primary-foreground" />
              </motion.div>
            </div>
          </motion.div>

          {/* User Info */}
          <motion.div className="flex-1 text-center md:text-left" variants={itemVariants}>
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <h2 className="text-2xl font-bold text-foreground">{userData.nickname}</h2>
              <motion.div
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Sparkles className="h-5 w-5 text-primary" />
              </motion.div>
            </div>
            <div className="mt-1 flex items-center justify-center gap-2 md:justify-start">
              <span className="text-sm text-muted-foreground">{userData.id}</span>
              <button 
                onClick={onCopy}
                className="rounded p-1 transition-colors hover:bg-card"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check className="h-4 w-4 text-primary" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
            <div className="mt-2 flex items-center justify-center gap-1 md:justify-start">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">{userData.subscriptionPlan} Member</span>
              <span className="text-sm text-muted-foreground">since {userData.memberSince}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="mt-8 grid gap-4 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Subscription Card */}
          <motion.div 
            className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 p-5"
            variants={itemVariants}
            whileHover={{ scale: 1.02, borderColor: "rgba(200, 255, 46, 0.3)" }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
            />
            <div className="relative">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-xs uppercase tracking-wider">Subscription</span>
              </div>
              <motion.p 
                className="mt-2 text-3xl font-bold text-foreground"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                {userData.subscriptionDays}
                <span className="ml-1 text-lg font-normal text-muted-foreground">days</span>
              </motion.p>
              <div className="mt-2">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/50">
                  <motion.div 
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60"
                    initial={{ width: 0 }}
                    animate={{ width: `${(userData.subscriptionDays / 90) * 100}%` }}
                    transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Balance Card */}
          <motion.div 
            className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 p-5"
            variants={itemVariants}
            whileHover={{ scale: 1.02, borderColor: "rgba(200, 255, 46, 0.3)" }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
            />
            <div className="relative">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Wallet className="h-4 w-4" />
                <span className="text-xs uppercase tracking-wider">Balance</span>
              </div>
              <motion.p 
                className="mt-2 text-3xl font-bold text-foreground"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                ${userData.balance}
              </motion.p>
              <p className="mt-1 text-xs text-muted-foreground">
                Total deposited: ${userData.totalDeposited}
              </p>
            </div>
          </motion.div>

          {/* Activity Card */}
          <motion.div 
            className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 p-5"
            variants={itemVariants}
            whileHover={{ scale: 1.02, borderColor: "rgba(200, 255, 46, 0.3)" }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
            />
            <div className="relative">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Zap className="h-4 w-4" />
                <span className="text-xs uppercase tracking-wider">Activity</span>
              </div>
              <motion.div 
                className="mt-2 flex items-baseline gap-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div>
                  <span className="text-2xl font-bold text-foreground">{userData.sessionsRun}</span>
                  <span className="ml-1 text-xs text-muted-foreground">sessions</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-foreground">{userData.proxiesUsed}</span>
                  <span className="ml-1 text-xs text-muted-foreground">proxies</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Deposit Button */}
        <motion.div 
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <motion.a
            href="https://t.me/support_365spammer"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Button glow */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-primary via-white/20 to-primary"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative flex items-center gap-3">
              <Wallet className="h-5 w-5" />
              <span className="text-base tracking-wide">DEPOSIT BALANCE</span>
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </motion.a>
        </motion.div>

        {/* Info text */}
        <motion.p 
          className="mt-4 text-center text-xs text-muted-foreground/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Contact our Telegram support to deposit funds and extend your subscription
        </motion.p>
      </div>
    </motion.div>
  )
}

// Shared Components
function TopBar() {
  return (
    <motion.div 
      className="flex justify-center px-6 pt-5"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
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
    </motion.div>
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
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-foreground/30 rounded-full"
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

function AdPanel({ tall = false }: { tall?: boolean }) {
  return (
    <motion.div
      className={`glass-panel flex w-[180px] items-center justify-center transition-all duration-300 hover:scale-[1.01] ${
        tall ? "h-[380px]" : "h-[175px]"
      }`}
      whileHover={{ boxShadow: "0 0 30px rgba(200, 255, 46, 0.05)" }}
    >
      <span className="text-base font-semibold tracking-wider text-muted-foreground/40">AD</span>
    </motion.div>
  )
}
