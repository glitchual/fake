"use client"

import { useState } from "react"
import { Search, Plus, Pencil, Trash2, RefreshCw } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ConfirmModal } from "@/components/confirm-modal"

// Navigation items
const navItems = [
  { label: "SPAMMER", href: "/", active: false },
  { label: "PROXY", href: "/proxy", active: true },
  { label: "SESSIONS", href: "/sessions", active: false },
  { label: "HELP", href: "/help", active: false },
  { label: "PROFILE", href: "/profile", active: false },
  { label: "GAMBLE", href: "/gamble", active: false, accent: true },
]

// Initial proxy data
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

  const confirmDelete = (id: number) => {
    setDeleteModal({ open: true, proxyId: id })
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

          {/* Center Proxy Panel */}
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
                WORKFLOW
              </motion.h2>

              {/* Add Proxy Input */}
              <motion.div 
                className="mt-8 flex gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <input
                  type="text"
                  value={newProxy}
                  onChange={(e) => setNewProxy(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addProxy()}
                  placeholder="Enter proxy address (e.g., 127.0.0.1:8080)"
                  className="flex-1 rounded-lg border border-border/50 bg-card/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                />
                <motion.button
                  onClick={addProxy}
                  className="flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground transition-all"
                  whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(200, 255, 46, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus className="h-4 w-4" />
                  Add Proxy
                </motion.button>
              </motion.div>

              {/* Proxy List */}
              <motion.div 
                className="mt-6 rounded-xl border border-border/30 bg-card/30 p-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Proxy List
                </p>

                <div className="space-y-2">
                  <AnimatePresence mode="popLayout">
                    {proxies.map((proxy, index) => (
                      <motion.div
                        key={proxy.id}
                        className="group flex items-center justify-between rounded-lg border border-border/20 bg-background/30 px-4 py-3 transition-all hover:border-border/40"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0 }}
                        transition={{ delay: index * 0.05 }}
                        layout
                      >
                        {editingId === proxy.id ? (
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                            onBlur={saveEdit}
                            autoFocus
                            className="flex-1 bg-transparent text-sm font-mono text-foreground focus:outline-none"
                          />
                        ) : (
                          <span className="font-mono text-sm text-foreground">{proxy.address}</span>
                        )}

                        <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                          <motion.button
                            onClick={() => startEdit(proxy)}
                            className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Pencil className="h-4 w-4" />
                          </motion.button>
                          <motion.button
                            onClick={() => confirmDelete(proxy.id)}
                            className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-destructive/20 hover:text-destructive"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {proxies.length === 0 && (
                    <p className="py-8 text-center text-sm text-muted-foreground/60">
                      No proxies added yet
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Refresh Button */}
              <motion.div 
                className="mt-8 flex justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  onClick={refresh}
                  disabled={isRefreshing}
                  className="flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-bold text-primary-foreground transition-all disabled:opacity-70"
                  whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(200, 255, 46, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    animate={isRefreshing ? { rotate: 360 } : {}}
                    transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: "linear" }}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </motion.div>
                  REFRESH
                </motion.button>
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

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, proxyId: null })}
        onConfirm={deleteProxy}
        title="Delete Proxy"
        message="Are you sure you want to delete this proxy?"
        confirmText="Delete Proxy"
        variant="destructive"
      />
    </div>
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
