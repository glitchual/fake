"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Upload, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

// Navigation items
const navItems = [
  { label: "SPAMMER", href: "/", active: true },
  { label: "PROXY", href: "/proxy", active: false },
  { label: "SESSIONS", href: "/sessions", active: false },
  { label: "HELP", href: "/help", active: false },
  { label: "PROFILE", href: "/profile", active: false },
  { label: "GAMBLE", href: "/gamble", active: false, accent: true },
]

// Animation variants
const scaleIn = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
}

export default function Home() {
  const [files, setFiles] = useState<File[]>([])
  const [logs, setLogs] = useState<string[]>([
    "[INFO] System initialized",
    "[INFO] Ready for file upload"
  ])
  const [isRunning, setIsRunning] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const logEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll logs
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [logs])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    if (selectedFiles.length > 0) {
      setFiles(prev => [...prev, ...selectedFiles])
      selectedFiles.forEach(file => {
        addLog(`[INFO] File added: ${file.name}`)
      })
    }
  }

  const addLog = (message: string) => {
    setLogs(prev => [...prev, message])
  }

  const handleStart = () => {
    if (files.length === 0) {
      addLog("[WARN] No files uploaded")
      return
    }
    setIsRunning(true)
    addLog("[INFO] Starting workflow...")
    addLog(`[INFO] Processing ${files.length} file(s)`)
    
    // Simulate processing
    setTimeout(() => {
      addLog("[INFO] Connecting to servers...")
    }, 500)
    setTimeout(() => {
      addLog("[INFO] Workflow started successfully")
    }, 1000)
  }

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
        <Navigation />

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
          <WorkflowPanel 
            files={files}
            logs={logs}
            isRunning={isRunning}
            fileInputRef={fileInputRef}
            logEndRef={logEndRef}
            onFileUpload={handleFileUpload}
            onStart={handleStart}
          />

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

function WorkflowPanel({
  files,
  logs,
  isRunning,
  fileInputRef,
  logEndRef,
  onFileUpload,
  onStart
}: {
  files: File[]
  logs: string[]
  isRunning: boolean
  fileInputRef: React.RefObject<HTMLInputElement | null>
  logEndRef: React.RefObject<HTMLDivElement | null>
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onStart: () => void
}) {
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
        
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={onFileUpload}
              className="hidden"
            />
            <motion.button
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-border/50 bg-card/50 px-6 py-4 text-sm font-medium text-foreground transition-all hover:border-border"
              whileHover={{ scale: 1.02, borderColor: "rgba(200, 255, 46, 0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              <Upload className="h-5 w-5 text-muted-foreground" />
              Upload Files
              {files.length > 0 && (
                <span className="ml-2 rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">
                  {files.length}
                </span>
              )}
            </motion.button>

            {/* Log Console */}
            <motion.div 
              className="mt-4 rounded-lg border border-border/30 bg-background/50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Log Console
              </p>
              <div className="h-[140px] overflow-y-auto rounded bg-background/80 p-3 font-mono text-xs">
                <AnimatePresence mode="popLayout">
                  {logs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`mb-1 ${
                        log.includes("[WARN]") 
                          ? "text-yellow-500" 
                          : log.includes("[ERROR]")
                            ? "text-destructive"
                            : "text-muted-foreground"
                      }`}
                    >
                      {log}
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={logEndRef} />
              </div>
            </motion.div>
          </motion.div>

          {/* Start Button Section */}
          <motion.div
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={onStart}
              disabled={isRunning}
              className="relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-primary px-16 py-5 text-lg font-bold tracking-wider text-primary-foreground transition-all disabled:opacity-70"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 40px rgba(200, 255, 46, 0.5)" 
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              />
              <span className="relative flex items-center gap-2">
                {isRunning ? (
                  <>
                    <motion.div
                      className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    RUNNING
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5 fill-current" />
                    START
                  </>
                )}
              </span>
            </motion.button>

            {isRunning && (
              <motion.p
                className="mt-4 text-xs text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Workflow is running...
              </motion.p>
            )}
          </motion.div>
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
