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
      <div className="flex h-full w-full flex-col">
        <div className="glass-panel panel-glow flex flex-1 flex-col p-4">
          <h2 className="text-center text-lg font-bold tracking-[0.25em] text-foreground">
            WORKFLOW
          </h2>

          <div className="mt-3 flex flex-1 flex-col gap-4 lg:flex-row">
            {/* Left - Upload and Console */}
            <div className="flex flex-1 flex-col gap-2.5">
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
                className="flex items-center justify-center gap-2 rounded-lg border border-border/50 bg-card/50 px-4 py-2 text-xs font-medium text-foreground transition-all hover:border-border hover:bg-card/70"
              >
                <Upload className="h-4 w-4 text-muted-foreground" />
                Upload Files
                {files.length > 0 && (
                  <span className="rounded-full bg-primary/20 px-1.5 py-0.5 text-[10px] text-primary">
                    {files.length}
                  </span>
                )}
              </button>

              {/* Log Console - Premium Terminal Style */}
              <div className="console-container flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border/40 bg-[#0a0a0f]">
                {/* Console Header */}
                <div className="flex shrink-0 items-center justify-between border-b border-border/30 bg-[#111118] px-3 py-1.5">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                      <div className="h-2 w-2 rounded-full bg-[#febc2e]" />
                      <div className="h-2 w-2 rounded-full bg-[#28c840]" />
                    </div>
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                      Terminal
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-muted-foreground/40">
                      {logs.length} entries
                    </span>
                  </div>
                </div>
                
                {/* Console Body */}
                <div className="min-h-0 flex-1 overflow-y-auto p-2 font-mono text-[11px] leading-snug">
                  {logs.map((log, index) => {
                    const isWarn = log.includes("[WARN]")
                    const isError = log.includes("[ERROR]")
                    const isSuccess = log.includes("success") || log.includes("started")
                    
                    return (
                      <div
                        key={index}
                        className="group flex items-start gap-2 rounded px-1.5 py-0.5 transition-colors hover:bg-white/[0.02]"
                      >
                        <span className="shrink-0 text-[9px] text-muted-foreground/30 tabular-nums">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className={`shrink-0 text-[10px] font-bold ${
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
                <div className="flex shrink-0 items-center gap-2 border-t border-border/20 bg-[#111118] px-3 py-1">
                  <div className={`h-1.5 w-1.5 rounded-full ${isRunning ? 'animate-pulse bg-emerald-500' : 'bg-muted-foreground/30'}`} />
                  <span className="text-[9px] font-medium text-muted-foreground/50">
                    {isRunning ? 'Process running...' : 'Ready'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right - Start/Stop Button */}
            <div className="flex flex-col items-center justify-center lg:w-1/4">
              {isRunning ? (
                <button
                  onClick={handleStop}
                  className="flex items-center justify-center gap-1.5 rounded-full border border-red-900/50 bg-red-950/80 px-8 py-2.5 text-xs font-bold tracking-wider text-red-400 transition-all hover:bg-red-900/60"
                >
                  <Square className="h-3.5 w-3.5 fill-current" />
                  STOP
                </button>
              ) : (
                <button
                  onClick={handleStart}
                  className="flex items-center justify-center gap-1.5 rounded-full bg-primary px-8 py-2.5 text-xs font-bold tracking-wider text-primary-foreground transition-all hover:brightness-110"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  START
                </button>
              )}

              {isRunning && (
                <div className="mt-2 flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                  <span className="text-[10px] text-muted-foreground">Running...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
