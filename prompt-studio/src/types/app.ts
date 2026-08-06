export interface Prompt {
  id: string
  title: string
  content: string
  description?: string
  category: string
  tags: string[]
  isFavorite: boolean
  createdAt: number
  updatedAt: number
  usageCount: number
}

export interface PromptTemplate {
  id: string
  title: string
  content: string
  description: string
  category: string
  tags: string[]
  author: string
  downloads: number
  isOfficial?: boolean
}

export type NavItem = 'editor' | 'market' | 'favorites' | 'history'

export type ViewMode = 'split' | 'editor' | 'preview'

export interface Category {
  id: string
  label: string
  icon?: string
}

export const CATEGORIES: Category[] = [
  { id: 'all', label: '全部' },
  { id: 'writing', label: '写作' },
  { id: 'coding', label: '编程' },
  { id: 'image', label: '图像' },
  { id: 'chat', label: '对话' },
  { id: 'marketing', label: '营销' },
  { id: 'analysis', label: '分析' },
]

export const TAG_COLORS: Record<string, string> = {
  writing: 'bg-accent-blue/10 text-accent-blue border-accent-blue/20',
  coding: 'bg-accent-purple/10 text-accent-purple border-accent-purple/20',
  image: 'bg-accent-pink/10 text-accent-pink border-accent-pink/20',
  chat: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20',
  marketing: 'bg-accent-green/10 text-accent-green border-accent-green/20',
  analysis: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
}
