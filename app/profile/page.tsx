"use client"

import { useState } from "react"
import { User, Clock, Wallet, Crown, ExternalLink, Copy, Check, Shield, Zap, TrendingUp, Calendar, Settings, CreditCard } from "lucide-react"
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
  successRate: 94.2,
  lastActive: "2 hours ago",
}

const recentActivity = [
  { action: "Session completed", time: "2h ago", status: "success" },
  { action: "Balance deposited", time: "1d ago", status: "success" },
  { action: "Proxy configured", time: "2d ago", status: "success" },
  { action: "Session started", time: "3d ago", status: "success" },
]

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
        <div className="glass-panel panel-glow flex flex-1 flex-col overflow-hidden p-5">
          {/* Two Column Layout */}
          <div className="flex flex-1 gap-5 overflow-hidden">
            {/* Left Column - Profile Info */}
            <div className="flex w-[280px] shrink-0 flex-col gap-4">
              {/* Profile Card */}
              <div className="rounded-xl border border-border/30 bg-[#0a0a0f] p-4">
                <div className="flex flex-col items-center">
                  {/* Avatar */}
                  <div className="relative mb-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/30 bg-gradient-to-br from-card to-background">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#0a0a0f] bg-primary">
                      <Crown className="h-3 w-3 text-primary-foreground" />
                    </div>
                  </div>

                  {/* User Info */}
                  <h2 className="text-lg font-bold text-foreground">{userData.nickname}</h2>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-sm text-muted-foreground select-text">{userData.id}</span>
                    <button onClick={copyUserId} className="rounded p-1 transition-colors hover:bg-card">
                      {copied ? (
                        <Check className="h-3.5 w-3.5 text-primary" />
                      ) : (
                        <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-primary" />
                    <span className="text-sm font-medium text-primary">{userData.subscriptionPlan}</span>
                  </div>
                  <span className="mt-1 text-xs text-muted-foreground">Member since {userData.memberSince}</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border/30 bg-[#0a0a0f] p-3 text-center">
                  <span className="text-xl font-bold text-foreground">{userData.sessionsRun}</span>
                  <p className="text-xs text-muted-foreground">Sessions</p>
                </div>
                <div className="rounded-lg border border-border/30 bg-[#0a0a0f] p-3 text-center">
                  <span className="text-xl font-bold text-foreground">{userData.proxiesUsed}</span>
                  <p className="text-xs text-muted-foreground">Proxies</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="flex-1 rounded-xl border border-border/30 bg-[#0a0a0f] p-4">
                <h3 className="mb-3 text-sm font-semibold text-foreground">Recent Activity</h3>
                <div className="space-y-2">
                  {recentActivity.map((item, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg bg-card/30 px-3 py-2">
                      <span className="text-sm text-muted-foreground">{item.action}</span>
                      <span className="text-xs text-muted-foreground/60">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Stats & Actions */}
            <div className="flex flex-1 flex-col gap-4">
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4">
                {/* Subscription */}
                <div className="rounded-xl border border-border/30 bg-[#0a0a0f] p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-wider">Subscription</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-foreground">
                    {userData.subscriptionDays}
                    <span className="ml-1 text-sm font-normal text-muted-foreground">days</span>
                  </p>
                  <div className="mt-3">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-border/50">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-500"
                        style={{ width: `${(userData.subscriptionDays / 90) * 100}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground/60">of 90-day plan</p>
                  </div>
                </div>

                {/* Balance */}
                <div className="rounded-xl border border-border/30 bg-[#0a0a0f] p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Wallet className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-wider">Balance</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-foreground">${userData.balance}</p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Total deposited: <span className="text-foreground">${userData.totalDeposited}</span>
                  </p>
                </div>

                {/* Success Rate */}
                <div className="rounded-xl border border-border/30 bg-[#0a0a0f] p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-wider">Success Rate</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-emerald-400">{userData.successRate}%</p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Last active: <span className="text-foreground">{userData.lastActive}</span>
                  </p>
                </div>
              </div>

              {/* Action Cards */}
              <div className="grid flex-1 grid-cols-2 gap-4">
                {/* Deposit Card */}
                <div className="flex flex-col justify-between rounded-xl border border-primary/20 bg-gradient-to-br from-[#0a0a0f] to-[#0d1117] p-5">
                  <div>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Deposit Balance</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Add funds to your account via Telegram support. Instant processing available.
                    </p>
                  </div>
                  <a
                    href="https://t.me/support_365spammer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-all duration-200 hover:brightness-110"
                  >
                    <Wallet className="h-4 w-4" />
                    Deposit Now
                    <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                  </a>
                </div>

                {/* Extend Subscription Card */}
                <div className="flex flex-col justify-between rounded-xl border border-border/30 bg-gradient-to-br from-[#0a0a0f] to-[#0d1117] p-5">
                  <div>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/20">
                      <Calendar className="h-5 w-5 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Extend Plan</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Extend your subscription and keep all premium features active.
                    </p>
                  </div>
                  <a
                    href="https://t.me/support_365spammer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-border/50 bg-card/50 px-4 py-2.5 text-sm font-bold text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-card/70"
                  >
                    <Clock className="h-4 w-4" />
                    Extend Subscription
                    <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                  </a>
                </div>

                {/* Settings Card */}
                <div className="flex flex-col justify-between rounded-xl border border-border/30 bg-[#0a0a0f] p-5">
                  <div>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20">
                      <Settings className="h-5 w-5 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Account Settings</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Manage your profile, security settings, and preferences.
                    </p>
                  </div>
                  <button className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-border/50 bg-card/50 px-4 py-2.5 text-sm font-bold text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-card/70">
                    <Settings className="h-4 w-4" />
                    Open Settings
                  </button>
                </div>

                {/* Support Card */}
                <div className="flex flex-col justify-between rounded-xl border border-border/30 bg-[#0a0a0f] p-5">
                  <div>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#229ED9]/20">
                      <Zap className="h-5 w-5 text-[#229ED9]" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Get Support</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Need help? Our support team is available 24/7 on Telegram.
                    </p>
                  </div>
                  <a
                    href="https://t.me/support"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#229ED9] px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:bg-[#1a8ac4]"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                    Contact Support
                    <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
