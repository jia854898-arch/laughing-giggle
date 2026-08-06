import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Clock, Star, FileText } from 'lucide-react'
import type { NavItem, Prompt } from '../types/app'
import { cn, formatDate } from '../lib/utils'

interface Props {
  activeNav: NavItem
  prompts: Prompt[]
  onClose: () => void
  onSelectPrompt: (prompt: Prompt) => void
  onFavoriteToggle: (id: string) => void
}

export default function NavPanel({ activeNav, prompts, onClose, onSelectPrompt, onFavoriteToggle }: Props) {
  const title = {
    editor: '我的提示词',
    market: '模板市场',
    favorites: '我的收藏',
    history: '最近使用',
  }[activeNav]

  const icon = {
    editor: <FileText className="w-4 h-4" />,
    market: <Star className="w-4 h-4" />,
    favorites: <Heart className="w-4 h-4" />,
    history: <Clock className="w-4 h-4" />,
  }[activeNav]

  const filteredPrompts = activeNav === 'favorites'
    ? prompts.filter(p => p.isFavorite)
    : [...prompts].sort((a, b) => b.usageCount - a.usageCount)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="absolute right-0 top-0 bottom-0 w-[380px] z-30 flex flex-col"
      >
        <div className="flex-1 m-2 ml-0 glass-panel border-gradient overflow-hidden flex flex-col">
          {/* 头部 */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06] flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-surface-100 border border-black/[0.04] flex items-center justify-center text-ink-700">
                {icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-ink-900">{title}</h3>
                <p className="text-[10px] text-ink-500 mt-0.5">{filteredPrompts.length} 个提示词</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-500 hover:bg-surface-100 hover:text-ink-900 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 内容区 */}
          <div className="flex-1 overflow-y-auto px-4 py-3">
            {filteredPrompts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-14 h-14 rounded-2xl bg-surface-100 border border-black/[0.04] flex items-center justify-center mb-4">
                  {activeNav === 'favorites' ? <Heart className="w-6 h-6 text-ink-400" /> : <Clock className="w-6 h-6 text-ink-400" />}
                </div>
                <p className="text-sm text-ink-500 font-medium">
                  {activeNav === 'favorites' ? '暂无收藏' : '暂无使用记录'}
                </p>
                <p className="text-xs text-ink-400 mt-1">
                  {activeNav === 'favorites' ? '收藏提示词后可在此快速访问' : '使用提示词后会自动记录'}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredPrompts.map(prompt => (
                  <motion.div
                    key={prompt.id}
                    whileHover={{ x: 2 }}
                    className="glass-card p-3 cursor-pointer group"
                    onClick={() => onSelectPrompt(prompt)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-100 border border-black/[0.04] flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-ink-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-medium text-ink-700 truncate">{prompt.title}</p>
                          <button
                            onClick={e => {
                              e.stopPropagation()
                              onFavoriteToggle(prompt.id)
                            }}
                            className="flex-shrink-0"
                          >
                            <Heart className={cn('w-3.5 h-3.5', prompt.isFavorite ? 'text-accent-pink fill-accent-pink' : 'text-ink-400')} />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[10px] text-ink-500">{formatDate(prompt.updatedAt)}</span>
                          <span className="text-[10px] text-ink-400">·</span>
                          <span className="text-[10px] text-ink-500">使用 {prompt.usageCount} 次</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          {prompt.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-surface-100 text-ink-500 border border-black/[0.04]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
