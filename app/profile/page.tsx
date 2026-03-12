"use client"

import { useState } from "react"
import { User, Clock, Wallet, Crown, ExternalLink, Copy, Check, Shield, Zap } from "lucide-react"
import { AppLayout } from "@/components/app-layout"

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

export default function ProfilePage() {
  const [copied, setCopied] = useState(false)

  const copyUserId = () => {
    navigator.clipboard.writeText(userData.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AppLayout activeNav="PROFILE">
      <div className="w-full max-w-3xl">
        <div className="glass-panel panel-glow overflow-hidden p-6">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

          {/* Profile Header */}
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary/30 to-primary/10 blur-lg" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary/30 bg-gradient-to-br from-card to-background">
                <User className="h-10 w-10 text-primary" />
                <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-primary">
                  <Crown className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl font-bold text-foreground">{userData.nickname}</h2>
              <div className="mt-1 flex items-center justify-center gap-2 md:justify-start">
                <span className="text-sm text-muted-foreground">{userData.id}</span>
                <button onClick={copyUserId} className="rounded p-1 transition-colors hover:bg-card">
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </button>
              </div>
              <div className="mt-1 flex items-center justify-center gap-1 md:justify-start">
                <Shield className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium text-primary">{userData.subscriptionPlan}</span>
                <span className="text-xs text-muted-foreground">since {userData.memberSince}</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {/* Subscription */}
            <div className="rounded-xl border border-border/50 bg-card/50 p-4 transition-colors hover:border-primary/20">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-[10px] uppercase tracking-wider">Subscription</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">
                {userData.subscriptionDays}
                <span className="ml-1 text-sm font-normal text-muted-foreground">days</span>
              </p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border/50">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60"
                  style={{ width: `${(userData.subscriptionDays / 90) * 100}%` }}
                />
              </div>
            </div>

            {/* Balance */}
            <div className="rounded-xl border border-border/50 bg-card/50 p-4 transition-colors hover:border-primary/20">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Wallet className="h-4 w-4" />
                <span className="text-[10px] uppercase tracking-wider">Balance</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">${userData.balance}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">
                Total deposited: ${userData.totalDeposited}
              </p>
            </div>

            {/* Activity */}
            <div className="rounded-xl border border-border/50 bg-card/50 p-4 transition-colors hover:border-primary/20">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Zap className="h-4 w-4" />
                <span className="text-[10px] uppercase tracking-wider">Activity</span>
              </div>
              <div className="mt-2 flex items-baseline gap-4">
                <div>
                  <span className="text-xl font-bold text-foreground">{userData.sessionsRun}</span>
                  <span className="ml-1 text-[10px] text-muted-foreground">sessions</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-foreground">{userData.proxiesUsed}</span>
                  <span className="ml-1 text-[10px] text-muted-foreground">proxies</span>
                </div>
              </div>
            </div>
          </div>

          {/* Deposit Button */}
          <div className="mt-6 flex justify-center">
            <a
              href="https://t.me/support_365spammer"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-primary px-8 py-3.5 font-bold text-primary-foreground transition-all hover:shadow-[0_0_30px_rgba(200,255,46,0.4)]"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Wallet className="h-5 w-5" />
              <span className="tracking-wide">DEPOSIT BALANCE</span>
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <p className="mt-3 text-center text-[10px] text-muted-foreground/60">
            Contact our Telegram support to deposit funds
          </p>
        </div>
      </div>
    </AppLayout>
  )
}
