import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Download, Heart, Sparkles, Copy, Check } from 'lucide-react'
import { cn, copyToClipboard } from '../lib/utils'
import type { PromptTemplate } from '../types/app'
import { CATEGORIES, TAG_COLORS } from '../types/app'

interface Props {
  templates: PromptTemplate[]
  favoriteIds: Set<string>
  onToggleFavorite: (id: string) => void
  onUseTemplate: (template: PromptTemplate) => void
}

export default function TemplateMarket({ templates, favoriteIds, onToggleFavorite, onUseTemplate }: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filteredTemplates = useMemo(() => {
    let list = templates
    if (activeCategory !== 'all') {
      list = list.filter(t => t.category === activeCategory)
    }
    if (!searchQuery.trim()) return list
    const q = searchQuery.toLowerCase()
    return list.filter(
      t =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
    )
  }, [templates, activeCategory, searchQuery])

  const handleCopy = async (template: PromptTemplate) => {
    const ok = await copyToClipboard(template.content)
    if (ok) {
      setCopiedId(template.id)
      setTimeout(() => setCopiedId(null), 1500)
    }
  }

  return (
    <motion.main
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="flex-1 flex flex-col min-w-0 p-4"
    >
      <div className="flex-1 glass-panel border-gradient flex flex-col min-h-0 overflow-hidden">
        {/* 头部 */}
        <div className="px-6 py-5 border-b border-black/[0.06] flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-ink-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent-purple" />
                模板市场
              </h2>
              <p className="text-xs text-ink-500 mt-1">浏览、收藏并一键使用社区精选提示词模板</p>
            </div>
            <div className="text-[11px] text-ink-400 font-mono">
              {filteredTemplates.length} / {templates.length}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="搜索模板..."
                className="input-base h-10 pl-9 pr-4"
              />
            </div>
          </div>

          {/* 分类筛选 */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all',
                  activeCategory === cat.id
                    ? 'bg-ink-900 text-white'
                    : 'bg-surface-100 text-ink-500 hover:bg-surface-200 border border-black/[0.04]'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 模板网格 */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredTemplates.map(template => (
              <motion.div
                key={template.id}
                whileHover={{ y: -2 }}
                className="glass-card p-4 flex flex-col group"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-ink-900 truncate">{template.title}</h3>
                    <p className="text-[11px] text-ink-500 mt-1 line-clamp-2">{template.description}</p>
                  </div>
                  {template.isOfficial && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-accent-purple/10 text-accent-purple border border-accent-purple/20 flex-shrink-0">
                      官方
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 flex-wrap mb-3">
                  <span
                    className={cn(
                      'px-1.5 py-0.5 rounded text-[9px] font-medium border',
                      TAG_COLORS[template.category] || 'bg-surface-100 text-ink-500 border-black/[0.06]'
                    )}
                  >
                    {CATEGORIES.find(c => c.id === template.category)?.label || template.category}
                  </span>
                  {template.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[9px] px-1.5 py-0.5 rounded bg-surface-100 text-ink-500 border border-black/[0.04]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex-1 min-h-[80px] rounded-lg bg-surface-50 border border-black/[0.04] p-3 mb-4">
                  <p className="text-[11px] text-ink-500 line-clamp-4 whitespace-pre-line">{template.content}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-black/[0.04]">
                  <div className="flex items-center gap-3 text-[10px] text-ink-400">
                    <span className="flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      {template.downloads}
                    </span>
                    <span>{template.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onToggleFavorite(template.id)}
                      className={cn(
                        'btn-icon w-8 h-8',
                        favoriteIds.has(template.id) && 'text-accent-pink border-accent-pink/30 bg-accent-pink/5'
                      )}
                    >
                      <Heart className={cn('w-3.5 h-3.5', favoriteIds.has(template.id) && 'fill-accent-pink')} />
                    </button>
                    <button
                      onClick={() => handleCopy(template)}
                      className="btn-icon w-8 h-8"
                    >
                      {copiedId === template.id ? <Check className="w-3.5 h-3.5 text-accent-green" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => onUseTemplate(template)}
                      className="btn-primary text-xs py-1.5 px-3"
                    >
                      使用
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.main>
  )
}
