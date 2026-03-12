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
      <div className="flex h-full w-full max-w-4xl flex-col">
        <div className="glass-panel panel-glow flex flex-1 flex-col p-8 min-h-[500px]">
          <h2 className="text-center text-2xl font-bold tracking-[0.25em] text-foreground">
            WORKFLOW
          </h2>

          <div className="mt-6 flex flex-1 flex-col gap-6 lg:flex-row">
            {/* Left - Upload and Console */}
            <div className="flex flex-1 flex-col gap-4">
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
                className="flex items-center justify-center gap-3 rounded-lg border border-border/50 bg-card/50 px-5 py-3.5 text-sm font-medium text-foreground transition-all hover:border-border hover:bg-card/70"
              >
                <Upload className="h-5 w-5 text-muted-foreground" />
                Upload Files
                {files.length > 0 && (
                  <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">
                    {files.length}
                  </span>
                )}
              </button>

              {/* Log Console - Premium Terminal Style */}
              <div className="console-container flex flex-1 flex-col overflow-hidden rounded-xl border border-border/40 bg-[#0a0a0f]">
                {/* Console Header */}
                <div className="flex items-center justify-between border-b border-border/30 bg-[#111118] px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                      <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                      <div className="h-3 w-3 rounded-full bg-[#28c840]" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                      Terminal
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-muted-foreground/40">
                      {logs.length} entries
                    </span>
                  </div>
                </div>
                
                {/* Console Body */}
                <div className="flex-1 overflow-y-auto p-4 font-mono text-[12px] leading-relaxed">
                  {logs.map((log, index) => {
                    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false })
                    const isWarn = log.includes("[WARN]")
                    const isError = log.includes("[ERROR]")
                    const isSuccess = log.includes("success") || log.includes("started")
                    
                    return (
                      <div
                        key={index}
                        className="group flex items-start gap-3 rounded px-2 py-1 transition-colors hover:bg-white/[0.02]"
                      >
                        <span className="shrink-0 text-[10px] text-muted-foreground/30 tabular-nums">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className={`shrink-0 font-bold ${
                          isError ? "text-red-500" : isWarn ? "text-amber-500" : isSuccess ? "text-emerald-500" : "text-cyan-500"
                        }`}>
                          {isError ? "ERR" : isWarn ? "WRN" : isSuccess ? "OK " : "INF"}
                        </span>
                        <span className={`flex-1 ${
                          isError ? "text-red-400/90" : isWarn ? "text-amber-400/90" : isSuccess ? "text-emerald-400/90" : "text-muted-foreground/80"
                        }`}>
                          {log.replace(/\[(INFO|WARN|ERROR)\]\s*/, '')}
                        </span>
                      </div>
                    )
                  })}
                  <div ref={logEndRef} />
                </div>
                
                {/* Console Footer */}
                <div className="flex items-center gap-2 border-t border-border/20 bg-[#111118] px-4 py-2">
                  <div className={`h-2 w-2 rounded-full ${isRunning ? 'animate-pulse bg-emerald-500' : 'bg-muted-foreground/30'}`} />
                  <span className="text-[10px] font-medium text-muted-foreground/50">
                    {isRunning ? 'Process running...' : 'Ready'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right - Start/Stop Button */}
            <div className="flex flex-col items-center justify-center lg:w-1/3">
              {isRunning ? (
                <button
                  onClick={handleStop}
                  className="flex items-center justify-center gap-2 rounded-full border border-red-900/50 bg-red-950/80 px-14 py-4 text-base font-bold tracking-wider text-red-400 transition-all hover:bg-red-900/60"
                >
                  <Square className="h-5 w-5 fill-current" />
                  STOP
                </button>
              ) : (
                <button
                  onClick={handleStart}
                  className="flex items-center justify-center gap-2 rounded-full bg-primary px-14 py-4 text-base font-bold tracking-wider text-primary-foreground transition-all hover:brightness-110"
                >
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
