"use client"

import { useState, useRef } from "react"
import { AppLayout } from "@/components/app-layout"
import { Gift, Sparkles, Trophy, Zap, Star, Gem, Crown, Coins, Calendar, Target, Box, RotateCw } from "lucide-react"

// Prize pool with exact win rates (must sum to 100%)
const prizePool = [
  // Balance prizes (50.8%)
  { type: "balance", label: "$0.20", value: 0.20, chance: 25, color: "#374151" },
  { type: "balance", label: "$0.50", value: 0.50, chance: 18, color: "#4B5563" },
  { type: "balance", label: "$1.00", value: 1.00, chance: 7, color: "#6B7280" },
  { type: "balance", label: "$10", value: 10, chance: 0.5, color: "#CA8A04" },
  { type: "balance", label: "$25", value: 25, chance: 0.2, color: "#22C55E" },
  { type: "balance", label: "$50", value: 50, chance: 0.1, color: "#EF4444" },
  // Subscription Days (17%)
  { type: "subscription", label: "+1 Day", value: 1, chance: 10, color: "#3B82F6" },
  { type: "subscription", label: "+3 Days", value: 3, chance: 5, color: "#6366F1" },
  { type: "subscription", label: "+7 Days", value: 7, chance: 2, color: "#8B5CF6" },
  // Campaign (8.5%)
  { type: "campaign", label: "+1 Campaign", value: 1, chance: 5, color: "#14B8A6" },
  { type: "campaign", label: "+3 Campaigns", value: 3, chance: 2.5, color: "#10B981" },
  { type: "campaign", label: "+5 Campaigns", value: 5, chance: 1, color: "#059669" },
  // Rare Bonus (2.5%)
  { type: "lootbox", label: "Lootbox $5", value: 5, chance: 1, color: "#F59E0B" },
  { type: "lootbox", label: "Lootbox $15", value: 15, chance: 0.3, color: "#D97706" },
  { type: "spin", label: "Spin x5", value: 5, chance: 1, color: "#EC4899" },
  { type: "spin", label: "Spin x10", value: 10, chance: 0.2, color: "#DB2777" },
  // Nothing (21.2% - remaining to make 100%)
  { type: "nothing", label: "Try Again", value: 0, chance: 21.2, color: "#1F2937" },
]

// Create wheel segments from prize pool (12 visible segments)
const wheelSegments = [
  { label: "$0.20", color: "#374151", type: "balance" },
  { label: "+1 Day", color: "#3B82F6", type: "subscription" },
  { label: "$0.50", color: "#4B5563", type: "balance" },
  { label: "+1 Campaign", color: "#14B8A6", type: "campaign" },
  { label: "$1.00", color: "#6B7280", type: "balance" },
  { label: "Try Again", color: "#1F2937", type: "nothing" },
  { label: "$10", color: "#CA8A04", type: "balance" },
  { label: "+3 Days", color: "#6366F1", type: "subscription" },
  { label: "$25", color: "#22C55E", type: "balance" },
  { label: "Spin x5", color: "#EC4899", type: "spin" },
  { label: "$50", color: "#EF4444", type: "balance" },
  { label: "Lootbox $5", color: "#F59E0B", type: "lootbox" },
]

// Loot boxes with specific contents
const lootBoxes = [
  { id: 1, price: 1, name: "Starter Box", icon: Gift, color: "from-zinc-600 to-zinc-700", rarity: "Common" },
  { id: 2, price: 5, name: "Bronze Box", icon: Zap, color: "from-amber-700 to-amber-800", rarity: "Uncommon" },
  { id: 3, price: 10, name: "Silver Box", icon: Star, color: "from-slate-400 to-slate-600", rarity: "Rare" },
  { id: 4, price: 15, name: "Gold Box", icon: Crown, color: "from-yellow-500 to-yellow-700", rarity: "Epic" },
  { id: 5, price: 25, name: "Diamond Box", icon: Gem, color: "from-cyan-400 to-cyan-600", rarity: "Legendary" },
  { id: 6, price: 50, name: "Legendary Box", icon: Trophy, color: "from-purple-500 to-purple-700", rarity: "Mythic" },
]

// Function to get random prize based on chances
function getRandomPrize() {
  const random = Math.random() * 100
  let cumulative = 0
  for (const prize of prizePool) {
    cumulative += prize.chance
    if (random <= cumulative) {
      return prize
    }
  }
  return prizePool[prizePool.length - 1] // fallback
}

export default function GamblePage() {
  const [balance, setBalance] = useState(125.50)
  const [subscriptionDays, setSubscriptionDays] = useState(47)
  const [campaigns, setCampaigns] = useState(3)
  const [freeSpins, setFreeSpins] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [wheelRotation, setWheelRotation] = useState(0)
  const [spinCost] = useState(2)
  const [lastWin, setLastWin] = useState<{ label: string; type: string } | null>(null)
  const [openingBox, setOpeningBox] = useState<number | null>(null)
  const [boxResult, setBoxResult] = useState<{ boxId: number; prize: typeof prizePool[0] } | null>(null)
  const wheelRef = useRef<HTMLDivElement>(null)

  const spinWheel = () => {
    if (isSpinning) return
    
    // Check if user has free spins or enough balance
    if (freeSpins > 0) {
      setFreeSpins(prev => prev - 1)
    } else if (balance >= spinCost) {
      setBalance(prev => prev - spinCost)
    } else {
      return
    }
    
    setIsSpinning(true)
    setLastWin(null)

    // Get random prize based on chances
    const prize = getRandomPrize()
    
    // Find matching segment index for visual
    const segmentIndex = wheelSegments.findIndex(s => s.label === prize.label) !== -1 
      ? wheelSegments.findIndex(s => s.label === prize.label)
      : Math.floor(Math.random() * wheelSegments.length)

    // Random rotation (5-10 full spins + land on segment)
    const spins = 5 + Math.random() * 5
    const segmentAngle = 360 / wheelSegments.length
    const newRotation = wheelRotation + (spins * 360) + (segmentIndex * segmentAngle) + (segmentAngle / 2)
    
    setWheelRotation(newRotation)

    setTimeout(() => {
      setLastWin({ label: prize.label, type: prize.type })
      
      // Apply prize
      switch (prize.type) {
        case "balance":
          setBalance(prev => prev + prize.value)
          break
        case "subscription":
          setSubscriptionDays(prev => prev + prize.value)
          break
        case "campaign":
          setCampaigns(prev => prev + prize.value)
          break
        case "spin":
          setFreeSpins(prev => prev + prize.value)
          break
        case "lootbox":
          // Could trigger auto-open of lootbox
          setBalance(prev => prev + prize.value) // Give equivalent value for now
          break
      }
      
      setIsSpinning(false)
    }, 4000)
  }

  const openLootBox = (box: typeof lootBoxes[0]) => {
    if (openingBox !== null || balance < box.price) return
    
    setBalance(prev => prev - box.price)
    setOpeningBox(box.id)
    setBoxResult(null)

    // Simulate opening animation
    setTimeout(() => {
      // Get random prize based on box tier (higher tier = better multiplier on chances)
      const tierMultiplier = box.price / 5 // 1, 1, 2, 3, 5, 10
      const prize = getRandomPrize()
      
      // Boost the value slightly based on tier
      const boostedPrize = { 
        ...prize, 
        value: prize.type === "balance" ? prize.value * (1 + tierMultiplier * 0.5) : prize.value 
      }
      
      setBoxResult({ boxId: box.id, prize: boostedPrize })
      
      // Apply prize
      switch (boostedPrize.type) {
        case "balance":
          setBalance(prev => prev + boostedPrize.value)
          break
        case "subscription":
          setSubscriptionDays(prev => prev + boostedPrize.value)
          break
        case "campaign":
          setCampaigns(prev => prev + boostedPrize.value)
          break
        case "spin":
          setFreeSpins(prev => prev + boostedPrize.value)
          break
        case "lootbox":
          setBalance(prev => prev + boostedPrize.value)
          break
      }
      
      setTimeout(() => {
        setOpeningBox(null)
        setBoxResult(null)
      }, 3000)
    }, 2000)
  }
  
  const canSpin = freeSpins > 0 || balance >= spinCost

  return (
    <AppLayout activeNav="GAMBLE">
      <div className="flex h-full w-full flex-col overflow-y-auto">
        <div className="glass-panel panel-glow flex flex-1 flex-col p-6">
          {/* Header with Stats */}
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-[0.2em] text-foreground">GAMBLE</h1>
            <div className="flex items-center gap-3">
              {freeSpins > 0 && (
                <div className="flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1.5">
                  <RotateCw className="h-4 w-4 text-pink-400" />
                  <span className="text-sm font-bold text-pink-400">{freeSpins} Free</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5">
                <Calendar className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-bold text-blue-400">{subscriptionDays}d</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1.5">
                <Target className="h-4 w-4 text-teal-400" />
                <span className="text-sm font-bold text-teal-400">{campaigns}</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5">
                <Coins className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold text-primary">${balance.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Main Content - Wheel + Loot Boxes */}
          <div className="flex flex-1 gap-6">
            {/* Left Side - Spinning Wheel */}
            <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-border/30 bg-background/50 p-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Spin & Win
              </h2>
              
              {/* Wheel Container */}
              <div className="relative">
                {/* Pointer */}
                <div className="absolute -top-2 left-1/2 z-10 -translate-x-1/2">
                  <div className="h-0 w-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-primary drop-shadow-[0_0_10px_rgba(163,230,53,0.5)]" />
                </div>
                
                {/* Wheel */}
                <div
                  ref={wheelRef}
                  className="relative h-[280px] w-[280px] rounded-full border-4 border-border/50 shadow-[0_0_30px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(0,0,0,0.3)]"
                  style={{
                    transform: `rotate(${wheelRotation}deg)`,
                    transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
                  }}
                >
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    {wheelSegments.map((segment, index) => {
                      const angle = 360 / wheelSegments.length
                      const startAngle = index * angle - 90
                      const endAngle = startAngle + angle
                      const startRad = (startAngle * Math.PI) / 180
                      const endRad = (endAngle * Math.PI) / 180
                      const x1 = 50 + 50 * Math.cos(startRad)
                      const y1 = 50 + 50 * Math.sin(startRad)
                      const x2 = 50 + 50 * Math.cos(endRad)
                      const y2 = 50 + 50 * Math.sin(endRad)
                      const largeArc = angle > 180 ? 1 : 0
                      
                      // Text position
                      const textAngle = startAngle + angle / 2
                      const textRad = (textAngle * Math.PI) / 180
                      const textX = 50 + 35 * Math.cos(textRad)
                      const textY = 50 + 35 * Math.sin(textRad)

                      return (
                        <g key={index}>
                          <path
                            d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`}
                            fill={segment.color}
                            stroke="#1a1a1a"
                            strokeWidth="0.5"
                          />
                          <text
                            x={textX}
                            y={textY}
                            fill="white"
                            fontSize="4"
                            fontWeight="bold"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            transform={`rotate(${textAngle + 90}, ${textX}, ${textY})`}
                          >
                            {segment.label}
                          </text>
                        </g>
                      )
                    })}
                    {/* Center circle */}
                    <circle cx="50" cy="50" r="8" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
                    <circle cx="50" cy="50" r="4" fill="#333" />
                  </svg>
                </div>
              </div>

              {/* Spin Button & Result */}
              <div className="mt-4 flex flex-col items-center gap-2">
                {lastWin && (
                  <div className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold animate-pulse ${
                    lastWin.type === "nothing" 
                      ? "bg-zinc-800 text-zinc-400" 
                      : lastWin.type === "balance" 
                        ? "bg-primary/20 text-primary"
                        : lastWin.type === "subscription"
                          ? "bg-blue-500/20 text-blue-400"
                          : lastWin.type === "campaign"
                            ? "bg-teal-500/20 text-teal-400"
                            : lastWin.type === "spin"
                              ? "bg-pink-500/20 text-pink-400"
                              : "bg-amber-500/20 text-amber-400"
                  }`}>
                    <Sparkles className="h-4 w-4" />
                    {lastWin.type === "nothing" ? "Try Again!" : `Won: ${lastWin.label}`}
                  </div>
                )}
                <button
                  onClick={spinWheel}
                  disabled={isSpinning || !canSpin}
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary/80 px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(163,230,53,0.3)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isSpinning ? (
                    "Spinning..."
                  ) : freeSpins > 0 ? (
                    "FREE SPIN"
                  ) : (
                    <>SPIN - ${spinCost}</>
                  )}
                </button>
              </div>
            </div>

            {/* Right Side - Loot Boxes */}
            <div className="flex flex-1 flex-col rounded-xl border border-border/30 bg-background/50 p-6">
              <h2 className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Loot Boxes
              </h2>
              
              {/* Loot Box Grid */}
              <div className="grid flex-1 grid-cols-2 gap-3">
                {lootBoxes.map((box) => {
                  const Icon = box.icon
                  const isOpening = openingBox === box.id
                  const hasResult = boxResult?.boxId === box.id
                  
                  return (
                    <button
                      key={box.id}
                      onClick={() => openLootBox(box)}
                      disabled={openingBox !== null || balance < box.price}
                      className={`group relative flex flex-col items-center justify-center rounded-xl border border-border/40 bg-gradient-to-br ${box.color} p-4 transition-all hover:scale-[1.02] hover:border-primary/50 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 ${isOpening ? 'animate-pulse' : ''}`}
                    >
                      {hasResult ? (
                        <div className="flex flex-col items-center gap-1 animate-bounce">
                          <Sparkles className="h-8 w-8 text-primary" />
                          <span className="text-xl font-bold text-primary">+${boxResult.win.toFixed(2)}</span>
                        </div>
                      ) : (
                        <>
                          <Icon className={`h-8 w-8 text-white/90 transition-transform group-hover:scale-110 ${isOpening ? 'animate-spin' : ''}`} />
                          <span className="mt-2 text-xs font-bold text-white">{box.name}</span>
                          <span className="text-[10px] text-white/60">{box.possibleWins}</span>
                          <div className="mt-2 rounded-full bg-black/30 px-3 py-1">
                            <span className="text-sm font-bold text-white">${box.price}</span>
                          </div>
                        </>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
