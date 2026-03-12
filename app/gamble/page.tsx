"use client"

import { useState, useRef } from "react"
import { AppLayout } from "@/components/app-layout"
import { Gift, Sparkles, Trophy, Zap, Star, Gem, Crown, Coins } from "lucide-react"

// Wheel segments with prizes
const wheelSegments = [
  { label: "$0.50", color: "#374151", multiplier: 0.5 },
  { label: "$1", color: "#4B5563", multiplier: 1 },
  { label: "$2", color: "#374151", multiplier: 2 },
  { label: "$5", color: "#4B5563", multiplier: 5 },
  { label: "$0.25", color: "#374151", multiplier: 0.25 },
  { label: "$10", color: "#CA8A04", multiplier: 10 },
  { label: "$0.10", color: "#4B5563", multiplier: 0.1 },
  { label: "$20", color: "#374151", multiplier: 20 },
  { label: "$0.50", color: "#4B5563", multiplier: 0.5 },
  { label: "$50", color: "#22C55E", multiplier: 50 },
  { label: "$1", color: "#374151", multiplier: 1 },
  { label: "$100", color: "#EF4444", multiplier: 100 },
]

// Loot boxes configuration
const lootBoxes = [
  { id: 1, price: 1, name: "Starter Box", icon: Gift, color: "from-gray-600 to-gray-700", possibleWins: "$0.10 - $5" },
  { id: 2, price: 5, name: "Bronze Box", icon: Zap, color: "from-amber-700 to-amber-800", possibleWins: "$0.50 - $25" },
  { id: 3, price: 10, name: "Silver Box", icon: Star, color: "from-slate-400 to-slate-600", possibleWins: "$1 - $50" },
  { id: 4, price: 15, name: "Gold Box", icon: Crown, color: "from-yellow-500 to-yellow-700", possibleWins: "$2 - $100" },
  { id: 5, price: 25, name: "Diamond Box", icon: Gem, color: "from-cyan-400 to-cyan-600", possibleWins: "$5 - $250" },
  { id: 6, price: 50, name: "Legendary Box", icon: Trophy, color: "from-purple-500 to-purple-700", possibleWins: "$10 - $500" },
]

export default function GamblePage() {
  const [balance, setBalance] = useState(125.50)
  const [isSpinning, setIsSpinning] = useState(false)
  const [wheelRotation, setWheelRotation] = useState(0)
  const [spinCost] = useState(2)
  const [lastWin, setLastWin] = useState<string | null>(null)
  const [openingBox, setOpeningBox] = useState<number | null>(null)
  const [boxResult, setBoxResult] = useState<{ boxId: number; win: number } | null>(null)
  const wheelRef = useRef<HTMLDivElement>(null)

  const spinWheel = () => {
    if (isSpinning || balance < spinCost) return
    
    setBalance(prev => prev - spinCost)
    setIsSpinning(true)
    setLastWin(null)

    // Random rotation (5-10 full spins + random segment)
    const spins = 5 + Math.random() * 5
    const segmentAngle = 360 / wheelSegments.length
    const randomSegment = Math.floor(Math.random() * wheelSegments.length)
    const newRotation = wheelRotation + (spins * 360) + (randomSegment * segmentAngle) + (segmentAngle / 2)
    
    setWheelRotation(newRotation)

    setTimeout(() => {
      const winningSegment = wheelSegments[randomSegment]
      setLastWin(winningSegment.label)
      setBalance(prev => prev + (winningSegment.multiplier))
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
      // Random win based on box price (0.1x to 10x)
      const minMultiplier = 0.1
      const maxMultiplier = 10
      const randomMultiplier = minMultiplier + (Math.random() * (maxMultiplier - minMultiplier))
      const win = Math.round(box.price * randomMultiplier * 100) / 100
      
      setBoxResult({ boxId: box.id, win })
      setBalance(prev => prev + win)
      
      setTimeout(() => {
        setOpeningBox(null)
        setBoxResult(null)
      }, 3000)
    }, 2000)
  }

  return (
    <AppLayout activeNav="GAMBLE">
      <div className="flex h-full w-full flex-col overflow-y-auto">
        <div className="glass-panel panel-glow flex flex-1 flex-col p-6">
          {/* Header with Balance */}
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-[0.2em] text-foreground">GAMBLE</h1>
            <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
              <Coins className="h-5 w-5 text-primary" />
              <span className="font-bold text-primary">${balance.toFixed(2)}</span>
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
              <div className="mt-6 flex flex-col items-center gap-3">
                {lastWin && (
                  <div className="flex items-center gap-2 text-lg font-bold text-primary animate-pulse">
                    <Sparkles className="h-5 w-5" />
                    You won {lastWin}!
                  </div>
                )}
                <button
                  onClick={spinWheel}
                  disabled={isSpinning || balance < spinCost}
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary/80 px-8 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(163,230,53,0.3)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isSpinning ? (
                    "Spinning..."
                  ) : (
                    <>
                      SPIN - ${spinCost}
                    </>
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
