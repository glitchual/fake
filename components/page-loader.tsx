"use client"

export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Animated spinner */}
        <div className="relative">
          {/* Outer ring */}
          <div 
            className="h-12 w-12 rounded-full border-2 border-border/30"
            style={{ borderTopColor: 'var(--primary)' }}
          />
          {/* Spinning ring */}
          <div 
            className="absolute inset-0 h-12 w-12 animate-spin rounded-full border-2 border-transparent"
            style={{ 
              borderTopColor: 'var(--primary)',
              animationDuration: '0.8s'
            }}
          />
          {/* Inner glow */}
          <div 
            className="absolute inset-2 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(200, 255, 46, 0.15) 0%, transparent 70%)'
            }}
          />
        </div>
        
        {/* Loading text */}
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-muted-foreground">Loading</span>
          <span className="flex gap-0.5">
            <span className="animate-bounce text-sm text-primary" style={{ animationDelay: '0ms' }}>.</span>
            <span className="animate-bounce text-sm text-primary" style={{ animationDelay: '150ms' }}>.</span>
            <span className="animate-bounce text-sm text-primary" style={{ animationDelay: '300ms' }}>.</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export function InlineLoader({ text = "Loading" }: { text?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-8">
      <div 
        className="h-5 w-5 animate-spin rounded-full border-2 border-border/30"
        style={{ borderTopColor: 'var(--primary)' }}
      />
      <span className="text-sm text-muted-foreground">{text}</span>
    </div>
  )
}
