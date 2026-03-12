"use client"

import { useState } from "react"
import { Search, Play, Square, CircleStop } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ConfirmModal } from "@/components/confirm-modal"

// Navigation items
const navItems = [
  { label: "SPAMMER", href: "/", active: false },
  { label: "PROXY", href: "/proxy", active: false },
  { label: "SESSIONS", href: "/sessions", active: true },
  { label: "HELP", href: "/help", active: false },
  { label: "PROFILE", href: "/profile", active: false },
  { label: "GAMBLE", href: "/gamble", active: false, accent: true },
]

// Session data
const initialSessions = [
  { id: 1, name: "Spammer Session #1", startedAt: "2026-03-12 14:30", status: "running" as const },
  { id: 2, name: "Spammer Session #2", startedAt: "2026-03-12 15:45", status: "running" as const },
  { id: 3, name: "Proxy Test Session", startedAt: "2026-03-12 10:20", status: "stopped" as const },
]

type Session = typeof initialSessions[0]

export default function SessionsPage() {
  const [sessions, setSessions] = useState(initialSessions)
  const [stopModal, setStopModal] = useState<{ open: boolean; sessionId: number | null }>({
    open: false,
    sessionId: null
  })

  const confirmStop = (id: number) => {
    setStopModal({ open: true, sessionId: id })
  }

  const stopSession = () => {
    if (stopModal.sessionId) {
      setSessions(sessions.map(s => 
        s.id === stopModal.sessionId ? { ...s, status: "stopped" as const } : s
      ))
    }
    setStopModal({ open: false, sessionId: null })
  }

  return (
    <div className="desktop-app relative min-h-screen overflow-hidden bg-background">
      {/* Background */}
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

          {/* Center Sessions Panel */}
          <motion.div 
            className="relative w-full max-w-4xl"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-40 blur-2xl" />
            
            <div className="glass-panel panel-glow relative p-8">
              <motion.h2 
                className="text-center text-2xl font-bold tracking-[0.2em] text-foreground md:text-3xl"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                SESSIONS
              </motion.h2>

              {/* Sessions List */}
              <motion.div 
                className="mt-8 space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <AnimatePresence mode="popLayout">
                  {sessions.map((session, index) => (
                    <SessionItem 
                      key={session.id}
                      session={session}
                      index={index}
                      onStop={() => confirmStop(session.id)}
                    />
                  ))}
                </AnimatePresence>

                {sessions.length === 0 && (
                  <motion.p 
                    className="py-12 text-center text-sm text-muted-foreground/60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    No active sessions
                  </motion.p>
                )}
              </motion.div>
            </div>
          </motion.div>

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

      {/* Stop Confirmation Modal */}
      <ConfirmModal
        isOpen={stopModal.open}
        onClose={() => setStopModal({ open: false, sessionId: null })}
        onConfirm={stopSession}
        title="Stop Session"
        message="Are you sure you want to stop this session?"
        confirmText="Stop Session"
        variant="destructive"
      />
    </div>
  )
}

// Session Item Component
function SessionItem({ 
  session, 
  index,
  onStop 
}: { 
  session: Session
  index: number
  onStop: () => void
}) {
  const isRunning = session.status === "running"

  return (
    <motion.div
      className="group flex items-center gap-4 rounded-xl border border-border/30 bg-card/30 px-5 py-4 transition-all hover:border-border/50"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: index * 0.1 }}
      layout
    >
      {/* Status Icon */}
      <motion.div
        className={`flex h-10 w-10 items-center justify-center rounded-full ${
          isRunning 
            ? "bg-primary/20" 
            : "bg-muted/50"
        }`}
        animate={isRunning ? {
          boxShadow: ["0 0 0 0 rgba(200, 255, 46, 0.4)", "0 0 0 8px rgba(200, 255, 46, 0)", "0 0 0 0 rgba(200, 255, 46, 0)"]
        } : {}}
        transition={isRunning ? { duration: 2, repeat: Infinity } : {}}
      >
        {isRunning ? (
          <Play className="h-4 w-4 text-primary fill-primary" />
        ) : (
          <CircleStop className="h-4 w-4 text-muted-foreground" />
        )}
      </motion.div>

      {/* Session Info */}
      <div className="flex-1">
        <p className="font-medium text-foreground">{session.name}</p>
        <p className="text-xs text-muted-foreground">Started: {session.startedAt}</p>
      </div>

      {/* Status Badge & Stop Button */}
      <div className="flex items-center gap-3">
        {isRunning ? (
          <>
            <motion.span
              className="flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Running
            </motion.span>
            <motion.button
              onClick={onStop}
              className="rounded-full bg-destructive/80 px-4 py-1.5 text-xs font-bold text-destructive-foreground transition-all hover:bg-destructive"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 100, 100, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              STOP
            </motion.button>
          </>
        ) : (
          <span className="rounded-full bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
            Stopped
          </span>
        )}
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
