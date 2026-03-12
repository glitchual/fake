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
      <div className="flex h-full w-full flex-col">
        <div className="glass-panel panel-glow flex flex-1 flex-col p-6">
          {/* Profile Header */}
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary/30 bg-gradient-to-br from-card to-background">
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
                <span className="text-sm text-muted-foreground select-text">{userData.id}</span>
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

          {/* Stats Grid - Compact */}
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {/* Subscription */}
            <div className="rounded-xl border border-border/50 bg-card/50 p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-[10px] uppercase tracking-wider">Subscription</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">
                {userData.subscriptionDays}
                <span className="ml-1 text-sm font-normal text-muted-foreground">days</span>
              </p>
              <div className="mt-3">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/50">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60"
                    style={{ width: `${(userData.subscriptionDays / 90) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Balance */}
            <div className="rounded-xl border border-border/50 bg-card/50 p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Wallet className="h-4 w-4" />
                <span className="text-[10px] uppercase tracking-wider">Balance</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">${userData.balance}</p>
              <p className="mt-2 text-[10px] text-muted-foreground">
                Total deposited: ${userData.totalDeposited}
              </p>
            </div>

            {/* Activity */}
            <div className="rounded-xl border border-border/50 bg-card/50 p-4">
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
              className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-3.5 font-bold text-primary-foreground transition-all hover:brightness-110"
            >
              <Wallet className="h-5 w-5" />
              <span className="tracking-wide">DEPOSIT BALANCE</span>
              <ExternalLink className="h-4 w-4" />
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
