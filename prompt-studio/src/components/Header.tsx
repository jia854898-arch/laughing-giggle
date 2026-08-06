import { motion } from 'framer-motion'
import { PenTool, Store, Heart, History, Sparkles, Zap } from 'lucide-react'
import { cn } from '../lib/utils'
import type { NavItem } from '../types/app'

interface Props {
  activeNav: NavItem
  onNavChange: (nav: NavItem) => void
}

const NAV_ITEMS: Array<{ id: NavItem; label: string; icon: React.ReactNode; shortcut?: string }> = [
  { id: 'editor', label: '编辑器', icon: <PenTool className="w-4 h-4" />, shortcut: '1' },
  { id: 'market', label: '模板市场', icon: <Store className="w-4 h-4" />, shortcut: '2' },
  { id: 'favorites', label: '收藏', icon: <Heart className="w-4 h-4" />, shortcut: '3' },
  { id: 'history', label: '历史', icon: <History className="w-4 h-4" />, shortcut: '4' },
]

export default function Header({ activeNav, onNavChange }: Props) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="h-14 flex-shrink-0 flex items-center justify-between px-5 border-b border-black/[0.06] bg-white/80 backdrop-blur-2xl relative z-20"
    >
      {/* Logo + 标题 */}
      <div className="flex items-center gap-3">
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-blue via-accent-purple to-accent-pink rounded-lg opacity-30 blur-md" />
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue/90 to-accent-purple/90 flex items-center justify-center shadow-glow">
            <Sparkles className="w-4 h-4 text-white" strokeWidth={1.5} />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <h1 className="font-semibold text-sm text-ink-900 tracking-tight">
            Prompt Studio
          </h1>
          <span className="text-[10px] text-ink-500 font-mono tracking-wider">BETA</span>
        </div>
      </div>

      {/* 中心导航 */}
      <nav className="flex items-center gap-1">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => onNavChange(item.id)}
            className={cn(
              'btn-ghost gap-2 px-3 py-1.5',
              activeNav === item.id && 'active'
            )}
          >
            {item.icon}
            <span className="text-xs font-medium">{item.label}</span>
            {item.shortcut && (
              <kbd className="hidden lg:inline-flex items-center justify-center w-4 h-4 rounded text-[9px] font-mono text-ink-400 bg-surface-200 border border-black/[0.04] ml-1">
                {item.shortcut}
              </kbd>
            )}
          </button>
        ))}
      </nav>

      {/* 右侧状态 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
          <span className="text-[10px] text-ink-500 font-mono">READY</span>
        </div>
        <div className="flex items-center gap-2 text-ink-500">
          <Zap className="w-3.5 h-3.5 text-accent-purple" />
          <span className="text-[10px] font-mono tracking-wider">v0.1.0</span>
        </div>
      </div>
    </motion.header>
  )
}
