import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, FileText, Heart, Clock, Trash2 } from 'lucide-react'
import { cn } from '../lib/utils'
import type { Prompt, NavItem } from '../types/app'

interface Props {
  prompts: Prompt[]
  activeNav: NavItem
  selectedPromptId: string | null
  searchQuery: string
  onSearchChange: (query: string) => void
  onSelectPrompt: (prompt: Prompt) => void
  onCreatePrompt: () => void
  onDeletePrompt: (id: string) => void
}

export default function Sidebar({
  prompts,
  activeNav,
  selectedPromptId,
  searchQuery,
  onSearchChange,
  onSelectPrompt,
  onCreatePrompt,
  onDeletePrompt,
}: Props) {
  const filteredPrompts = useMemo(() => {
    let list = prompts
    if (activeNav === 'favorites') {
      list = list.filter(p => p.isFavorite)
    } else if (activeNav === 'history') {
      list = [...list].sort((a, b) => b.usageCount - a.usageCount)
    }
    if (!searchQuery.trim()) return list
    const q = searchQuery.toLowerCase()
    return list.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
    )
  }, [prompts, activeNav, searchQuery])

  const title = {
    editor: '我的提示词',
    market: '模板市场',
    favorites: '我的收藏',
    history: '最近使用',
  }[activeNav]

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="w-[280px] flex-shrink-0 border-r border-black/[0.06] bg-white/60 backdrop-blur-xl flex flex-col"
    >
      {/* 头部 */}
      <div className="p-4 border-b border-black/[0.06]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-ink-900 flex items-center gap-2">
            {activeNav === 'favorites' ? <Heart className="w-4 h-4" /> : activeNav === 'history' ? <Clock className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
            {title}
          </h2>
          <span className="text-[10px] text-ink-400 font-mono">{filteredPrompts.length}</span>
        </div>
        <button
          onClick={onCreatePrompt}
          className="btn-primary w-full text-sm py-2"
        >
          <Plus className="w-4 h-4" />
          新建提示词
        </button>
      </div>

      {/* 搜索 */}
      <div className="p-3 border-b border-black/[0.06]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="搜索提示词..."
            className="input-base h-9 pl-9 pr-3"
          />
        </div>
      </div>

      {/* 列表 */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filteredPrompts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 rounded-2xl bg-surface-100 border border-black/[0.04] flex items-center justify-center mx-auto mb-3">
              <FileText className="w-5 h-5 text-ink-400" />
            </div>
            <p className="text-xs text-ink-500">暂无提示词</p>
            <p className="text-[10px] text-ink-400 mt-1">点击上方按钮创建</p>
          </div>
        ) : (
          filteredPrompts.map(prompt => (
            <motion.div
              key={prompt.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelectPrompt(prompt)}
              onKeyDown={e => e.key === 'Enter' && onSelectPrompt(prompt)}
              whileHover={{ x: 2 }}
              className={cn(
                'w-full text-left glass-card p-3 group relative transition-all cursor-pointer',
                selectedPromptId === prompt.id && 'ring-1 ring-accent-blue/30 bg-accent-blue/[0.03]'
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-medium text-ink-700 truncate flex-1">{prompt.title}</p>
                {prompt.isFavorite && <Heart className="w-3 h-3 text-accent-pink fill-accent-pink flex-shrink-0" />}
              </div>
              <p className="text-[10px] text-ink-500 mt-1 line-clamp-2">{prompt.content.slice(0, 60)}...</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1 flex-wrap">
                  {prompt.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-surface-100 text-ink-500 border border-black/[0.04]">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={e => {
                    e.stopPropagation()
                    onDeletePrompt(prompt.id)
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-50 text-ink-400 hover:text-red-500 transition-all"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.aside>
  )
}
