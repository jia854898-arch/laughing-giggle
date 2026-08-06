import { useState, useCallback, useMemo } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import PromptEditor from './components/PromptEditor'
import TemplateMarket from './components/TemplateMarket'
import NavPanel from './components/NavPanel'
import type { Prompt, PromptTemplate, NavItem } from './types/app'
import { INITIAL_PROMPTS, INITIAL_TEMPLATES } from './data/templates'
import { generateId } from './lib/utils'

export default function App() {
  const [prompts, setPrompts] = useState<Prompt[]>(INITIAL_PROMPTS)
  const [templates] = useState<PromptTemplate[]>(INITIAL_TEMPLATES)
  const [activeNav, setActiveNav] = useState<NavItem>('editor')
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(INITIAL_PROMPTS[0]?.id || null)
  const [searchQuery, setSearchQuery] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [templateFavoriteIds, setTemplateFavoriteIds] = useState<Set<string>>(new Set())

  const selectedPrompt = useMemo(
    () => prompts.find(p => p.id === selectedPromptId) || null,
    [prompts, selectedPromptId]
  )

  const handleCreatePrompt = useCallback(() => {
    const newPrompt: Prompt = {
      id: generateId('prompt'),
      title: '未命名提示词',
      content: '',
      description: '',
      category: 'writing',
      tags: [],
      isFavorite: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      usageCount: 0,
    }
    setPrompts(prev => [newPrompt, ...prev])
    setSelectedPromptId(newPrompt.id)
    setActiveNav('editor')
  }, [])

  const handleSavePrompt = useCallback((draft: Prompt) => {
    setPrompts(prev => {
      const exists = prev.find(p => p.id === draft.id)
      if (exists) {
        return prev.map(p => (p.id === draft.id ? draft : p))
      }
      return [draft, ...prev]
    })
  }, [])

  const handleDeletePrompt = useCallback((id: string) => {
    setPrompts(prev => prev.filter(p => p.id !== id))
    if (selectedPromptId === id) {
      setSelectedPromptId(null)
    }
  }, [selectedPromptId])

  const handleTogglePromptFavorite = useCallback((id: string) => {
    setPrompts(prev =>
      prev.map(p => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    )
  }, [])

  const handleToggleTemplateFavorite = useCallback((id: string) => {
    setTemplateFavoriteIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const handleSelectPrompt = useCallback((prompt: Prompt) => {
    setSelectedPromptId(prompt.id)
    setActiveNav('editor')
    setPanelOpen(false)
  }, [])

  const handleUseTemplate = useCallback((template: PromptTemplate) => {
    const newPrompt: Prompt = {
      id: generateId('prompt'),
      title: `${template.title}（副本）`,
      content: template.content,
      description: template.description,
      category: template.category,
      tags: [...template.tags],
      isFavorite: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      usageCount: 0,
    }
    setPrompts(prev => [newPrompt, ...prev])
    setSelectedPromptId(newPrompt.id)
    setActiveNav('editor')
  }, [])

  const handleNavChange = useCallback((nav: NavItem) => {
    setActiveNav(nav)
    if (nav === 'favorites' || nav === 'history') {
      setPanelOpen(true)
    } else {
      setPanelOpen(false)
    }
  }, [])

  return (
    <div className="h-screen w-screen flex flex-col bg-surface-50 relative overflow-hidden text-ink-700">
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[480px] h-[480px] bg-accent-blue/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[520px] h-[520px] bg-accent-purple/[0.02] rounded-full blur-3xl" />
      </div>

      <Header activeNav={activeNav} onNavChange={handleNavChange} />

      <div className="flex-1 flex overflow-hidden relative z-10">
        {(activeNav === 'editor' || activeNav === 'favorites' || activeNav === 'history') && (
          <Sidebar
            prompts={prompts}
            activeNav={activeNav}
            selectedPromptId={selectedPromptId}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectPrompt={handleSelectPrompt}
            onCreatePrompt={handleCreatePrompt}
            onDeletePrompt={handleDeletePrompt}
          />
        )}

        {activeNav === 'editor' && (
          <PromptEditor
            prompt={selectedPrompt}
            onSave={handleSavePrompt}
            onFavoriteToggle={handleTogglePromptFavorite}
          />
        )}

        {activeNav === 'market' && (
          <TemplateMarket
            templates={templates}
            favoriteIds={templateFavoriteIds}
            onToggleFavorite={handleToggleTemplateFavorite}
            onUseTemplate={handleUseTemplate}
          />
        )}
      </div>

      {panelOpen && (
        <NavPanel
          activeNav={activeNav}
          prompts={prompts}
          onClose={() => setPanelOpen(false)}
          onSelectPrompt={handleSelectPrompt}
          onFavoriteToggle={handleTogglePromptFavorite}
        />
      )}
    </div>
  )
}
