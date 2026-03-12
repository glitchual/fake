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

              {/* Log Console */}
              <div className="flex flex-1 flex-col rounded-lg border border-border/30 bg-background/50 p-4">
                <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
                  Log Console
                </p>
                <div className="flex-1 overflow-y-auto rounded bg-background/80 p-2.5 font-mono text-[11px]">
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
            <div className="flex flex-col items-center justify-center lg:w-1/3">
              {isRunning ? (
                <button
                  onClick={handleStop}
                  className="flex items-center justify-center gap-2 rounded-full bg-destructive px-14 py-4 text-base font-bold tracking-wider text-destructive-foreground transition-all hover:bg-destructive/90"
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
