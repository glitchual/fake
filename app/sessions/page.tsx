"use client"

import { useState } from "react"
import { Play, CircleStop } from "lucide-react"
import { AppLayout } from "@/components/app-layout"
import { ConfirmModal } from "@/components/confirm-modal"

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

  const stopSession = () => {
    if (stopModal.sessionId) {
      setSessions(sessions.map(s => 
        s.id === stopModal.sessionId ? { ...s, status: "stopped" as const } : s
      ))
    }
    setStopModal({ open: false, sessionId: null })
  }

  return (
    <AppLayout activeNav="SESSIONS">
      <div className="flex h-full w-full flex-col">
        <div className="glass-panel panel-glow flex flex-1 flex-col p-6">
          <h2 className="text-center text-2xl font-bold tracking-[0.25em] text-foreground">
            SESSIONS
          </h2>

          {/* Sessions List */}
          <div className="mt-6 flex-1 space-y-3 overflow-y-auto">
            {sessions.map((session) => (
              <SessionItem 
                key={session.id}
                session={session}
                onStop={() => setStopModal({ open: true, sessionId: session.id })}
              />
            ))}

            {sessions.length === 0 && (
              <p className="py-10 text-center text-sm text-muted-foreground/60">
                No active sessions
              </p>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={stopModal.open}
        onClose={() => setStopModal({ open: false, sessionId: null })}
        onConfirm={stopSession}
        title="Stop Session"
        message="Are you sure you want to stop this session?"
        confirmText="Stop"
        variant="destructive"
      />
    </AppLayout>
  )
}

function SessionItem({ session, onStop }: { session: Session; onStop: () => void }) {
  const isRunning = session.status === "running"

  return (
    <div className="flex items-center gap-4 rounded-xl border border-border/30 bg-card/30 px-5 py-4 transition-colors hover:border-border/50">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full ${
          isRunning ? "bg-primary/20" : "bg-muted/50"
        }`}
      >
        {isRunning ? (
          <Play className="h-4 w-4 fill-primary text-primary" />
        ) : (
          <CircleStop className="h-4 w-4 text-muted-foreground" />
        )}
      </div>

      <div className="flex-1">
        <p className="font-medium text-foreground">{session.name}</p>
        <p className="text-xs text-muted-foreground">Started: {session.startedAt}</p>
      </div>

      <div className="flex items-center gap-3">
        {isRunning ? (
          <>
            <span className="flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Running
            </span>
            <button
              onClick={onStop}
              className="rounded-full border border-red-900/50 bg-red-950/80 px-4 py-1.5 text-xs font-bold text-red-300 transition-colors hover:bg-red-900/60"
            >
              STOP
            </button>
          </>
        ) : (
          <span className="rounded-full bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
            Stopped
          </span>
        )}
      </div>
    </div>
  )
}
