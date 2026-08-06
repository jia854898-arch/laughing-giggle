import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Copy, Heart, Sparkles, Check, Tag } from 'lucide-react'
import { cn, copyToClipboard } from '../lib/utils'
import type { Prompt } from '../types/app'
import { CATEGORIES, TAG_COLORS } from '../types/app'

interface Props {
  prompt: Prompt | null
  onSave: (prompt: Prompt) => void
  onFavoriteToggle: (id: string) => void
}

const EMPTY_PROMPT: Prompt = {
  id: '',
  title: '',
  content: '',
  description: '',
  category: 'writing',
  tags: [],
  isFavorite: false,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  usageCount: 0,
}

export default function PromptEditor({ prompt, onSave, onFavoriteToggle }: Props) {
  const [draft, setDraft] = useState<Prompt>(EMPTY_PROMPT)
  const [tagInput, setTagInput] = useState('')
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setDraft(prompt ? { ...prompt } : EMPTY_PROMPT)
  }, [prompt?.id])

  const hasChanges =
    prompt?.title !== draft.title ||
    prompt?.content !== draft.content ||
    prompt?.description !== draft.description ||
    prompt?.category !== draft.category ||
    JSON.stringify(prompt?.tags) !== JSON.stringify(draft.tags)

  const handleSave = () => {
    if (!draft.title.trim() || !draft.content.trim()) return
    onSave({ ...draft, updatedAt: Date.now() })
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  const handleCopy = async () => {
    if (!draft.content) return
    const ok = await copyToClipboard(draft.content)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  const handleAddTag = () => {
    const tag = tagInput.trim()
    if (!tag || draft.tags.includes(tag)) return
    setDraft(prev => ({ ...prev, tags: [...prev.tags, tag] }))
    setTagInput('')
  }

  const handleRemoveTag = (tag: string) => {
    setDraft(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))
  }

  return (
    <motion.main
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="flex-1 flex flex-col min-w-0 p-4"
    >
      <div className="flex-1 glass-panel border-gradient flex flex-col min-h-0 overflow-hidden">
        {/* 顶部工具栏 */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-black/[0.06] flex-shrink-0">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <input
              type="text"
              value={draft.title}
              onChange={e => setDraft(prev => ({ ...prev, title: e.target.value }))}
              placeholder="未命名提示词"
              className="text-base font-semibold text-ink-900 bg-transparent border-none outline-none placeholder:text-ink-300 flex-1 min-w-0"
            />
            {prompt && (
              <button
                onClick={() => onFavoriteToggle(prompt.id)}
                className={cn(
                  'btn-icon',
                  prompt.isFavorite && 'text-accent-pink border-accent-pink/30 bg-accent-pink/5'
                )}
              >
                <Heart className={cn('w-4 h-4', prompt.isFavorite && 'fill-accent-pink')} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleCopy}
              className="btn-secondary text-sm py-2"
              disabled={!draft.content}
            >
              {copied ? <Check className="w-4 h-4 text-accent-green" /> : <Copy className="w-4 h-4" />}
              {copied ? '已复制' : '复制'}
            </button>
            <button
              onClick={handleSave}
              className="btn-primary text-sm py-2"
              disabled={!draft.title.trim() || !draft.content.trim() || !hasChanges}
            >
              {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved ? '已保存' : '保存'}
            </button>
          </div>
        </div>

        {/* 编辑区 */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* 分类 & 描述 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-medium text-ink-500 mb-1.5 block">分类</label>
              <select
                value={draft.category}
                onChange={e => setDraft(prev => ({ ...prev, category: e.target.value }))}
                className="input-base h-9 px-3"
              >
                {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-medium text-ink-500 mb-1.5 block">标签</label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-400" />
                <input
                  type="text"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="按回车添加标签"
                  className="input-base h-9 pl-9 pr-3"
                />
              </div>
            </div>
          </div>

          {draft.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              {draft.tags.map(tag => (
                <span
                  key={tag}
                  className={cn(
                    'inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] border',
                    TAG_COLORS[draft.category] || 'bg-surface-100 text-ink-500 border-black/[0.06]'
                  )}
                >
                  {tag}
                  <button onClick={() => handleRemoveTag(tag)} className="hover:text-ink-900">×</button>
                </span>
              ))}
            </div>
          )}

          <div>
            <label className="text-[11px] font-medium text-ink-500 mb-1.5 block">描述</label>
            <input
              type="text"
              value={draft.description}
              onChange={e => setDraft(prev => ({ ...prev, description: e.target.value }))}
              placeholder="简短描述这个提示词的用途..."
              className="input-base h-10 px-4"
            />
          </div>

          <div className="flex-1 min-h-[300px]">
            <label className="text-[11px] font-medium text-ink-500 mb-1.5 block">提示词内容</label>
            <textarea
              value={draft.content}
              onChange={e => setDraft(prev => ({ ...prev, content: e.target.value }))}
              placeholder="在此输入提示词内容，使用 {{变量名}} 表示可替换变量..."
              className="textarea-base w-full min-h-[300px] p-4 leading-relaxed"
            />
          </div>

          {/* 变量提示 */}
          {draft.content.includes('{{') && (
            <div className="glass-card p-3 border-l-4 border-l-accent-blue">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-accent-blue mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-ink-700">检测到模板变量</p>
                  <p className="text-[11px] text-ink-500 mt-0.5">
                    {`使用时将 {{变量名}} 替换为实际内容即可。`}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.main>
  )
}
