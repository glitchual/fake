"use client"

import { useState, useRef, useEffect } from "react"
import { Upload, Play, Square } from "lucide-react"
import { AppLayout } from "@/components/app-layout"

export default function Home() {
  const [files, setFiles] = useState<File[]>([])
  const [logs, setLogs] = useState<string[]>([
    "[INFO] System initialized",
    "[INFO] Ready for file upload"
  ])
  const [isRunning, setIsRunning] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const logEndRef = useRef<HTMLDivElement>(null)

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
    
    setTimeout(() => addLog("[INFO] Connecting to servers..."), 500)
    setTimeout(() => addLog("[INFO] Workflow started successfully"), 1000)
  }

  const handleStop = () => {
    setIsRunning(false)
    addLog("[INFO] Workflow stopped by user")
  }

  return (
    <AppLayout activeNav="SPAMMER">
      <div className="w-full max-w-3xl">
        {/* Main Panel */}
        <div className="glass-panel panel-glow p-6">
          <h2 className="text-center text-2xl font-bold tracking-[0.25em] text-foreground">
            WORKFLOW
          </h2>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Left - Upload and Console */}
            <div className="space-y-4">
              {/* Upload Button */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-border/50 bg-card/50 px-5 py-3.5 text-sm font-medium text-foreground transition-all hover:border-border hover:bg-card/70"
              >
                <Upload className="h-5 w-5 text-muted-foreground" />
                Upload Files
                {files.length > 0 && (
                  <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">
                    {files.length}
                  </span>
                )}
              </button>

              {/* Log Console */}
              <div className="rounded-lg border border-border/30 bg-background/50 p-4">
                <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
                  Log Console
                </p>
                <div className="h-[120px] overflow-y-auto rounded bg-background/80 p-2.5 font-mono text-[11px]">
                  {logs.map((log, index) => (
                    <div
                      key={index}
                      className={`mb-0.5 ${
                        log.includes("[WARN]")
                          ? "text-yellow-500"
                          : log.includes("[ERROR]")
                            ? "text-destructive"
                            : "text-muted-foreground/80"
                      }`}
                    >
                      {log}
                    </div>
                  ))}
                  <div ref={logEndRef} />
                </div>
              </div>
            </div>

            {/* Right - Start/Stop Button */}
            <div className="flex flex-col items-center justify-center">
              {isRunning ? (
                <button
                  onClick={handleStop}
                  className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-destructive px-14 py-4 text-base font-bold tracking-wider text-destructive-foreground transition-all hover:bg-destructive/90"
                >
                  <Square className="h-5 w-5 fill-current" />
                  STOP
                </button>
              ) : (
                <button
                  onClick={handleStart}
                  className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-14 py-4 text-base font-bold tracking-wider text-primary-foreground transition-all hover:shadow-[0_0_30px_rgba(200,255,46,0.4)]"
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <Play className="h-5 w-5 fill-current" />
                  START
                </button>
              )}

              {isRunning && (
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                  <span className="text-xs text-muted-foreground">Running...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
