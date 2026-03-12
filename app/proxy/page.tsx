"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, RefreshCw } from "lucide-react"
import { AppLayout } from "@/components/app-layout"
import { ConfirmModal } from "@/components/confirm-modal"

const initialProxies = [
  { id: 1, address: "127.0.0.1:5015" },
  { id: 2, address: "192.168.1.100:8080" },
  { id: 3, address: "10.0.0.1:3128" },
]

export default function ProxyPage() {
  const [proxies, setProxies] = useState(initialProxies)
  const [newProxy, setNewProxy] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editValue, setEditValue] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; proxyId: number | null }>({
    open: false,
    proxyId: null
  })

  const addProxy = () => {
    if (newProxy.trim()) {
      const newId = Math.max(...proxies.map(p => p.id), 0) + 1
      setProxies([...proxies, { id: newId, address: newProxy.trim() }])
      setNewProxy("")
    }
  }

  const startEdit = (proxy: typeof proxies[0]) => {
    setEditingId(proxy.id)
    setEditValue(proxy.address)
  }

  const saveEdit = () => {
    if (editingId && editValue.trim()) {
      setProxies(proxies.map(p => 
        p.id === editingId ? { ...p, address: editValue.trim() } : p
      ))
      setEditingId(null)
      setEditValue("")
    }
  }

  const deleteProxy = () => {
    if (deleteModal.proxyId) {
      setProxies(proxies.filter(p => p.id !== deleteModal.proxyId))
    }
    setDeleteModal({ open: false, proxyId: null })
  }

  const refresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  return (
    <AppLayout activeNav="PROXY">
      <div className="flex h-full w-full max-w-3xl flex-col">
        <div className="glass-panel panel-glow flex flex-1 flex-col p-6">
          <h2 className="text-center text-2xl font-bold tracking-[0.25em] text-foreground">
            WORKFLOW
          </h2>

          {/* Add Proxy */}
          <div className="mt-6 flex gap-3">
            <input
              type="text"
              value={newProxy}
              onChange={(e) => setNewProxy(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addProxy()}
              placeholder="Enter proxy address (e.g., 127.0.0.1:8080)"
              className="flex-1 rounded-lg border border-border/50 bg-card/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none select-text"
            />
            <button
              onClick={addProxy}
              className="flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              <Plus className="h-4 w-4" />
              Add Proxy
            </button>
          </div>

          {/* Proxy List */}
          <div className="mt-5 flex flex-1 flex-col rounded-xl border border-border/30 bg-card/30 p-4">
            <p className="mb-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
              Proxy List
            </p>

            <div className="flex-1 space-y-2 overflow-y-auto">
              {proxies.map((proxy) => (
                <div
                  key={proxy.id}
                  className="group flex items-center justify-between rounded-lg border border-border/20 bg-background/30 px-4 py-3 transition-colors hover:border-border/40"
                >
                  {editingId === proxy.id ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                      onBlur={saveEdit}
                      autoFocus
                      className="flex-1 bg-transparent font-mono text-sm text-foreground focus:outline-none select-text"
                    />
                  ) : (
                    <span className="font-mono text-sm text-foreground">{proxy.address}</span>
                  )}

                  <div className="flex items-center gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => startEdit(proxy)}
                      className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeleteModal({ open: true, proxyId: proxy.id })}
                      className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-destructive/20 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}

              {proxies.length === 0 && (
                <p className="py-6 text-center text-sm text-muted-foreground/60">
                  No proxies added yet
                </p>
              )}
            </div>
          </div>

          {/* Refresh Button */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={refresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-bold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-70"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              REFRESH
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, proxyId: null })}
        onConfirm={deleteProxy}
        title="Delete Proxy"
        message="Are you sure you want to delete this proxy?"
        confirmText="Delete"
        variant="destructive"
      />
    </AppLayout>
  )
}
