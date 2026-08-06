import type { PromptTemplate, Prompt } from '../types/app'

export const INITIAL_TEMPLATES: PromptTemplate[] = [
  {
    id: 't1',
    title: '小红书爆款笔记',
    content: `请以一位生活方式博主的身份，为【产品/主题】写一篇小红书风格的种草笔记。

要求：
1. 标题吸睛，包含emoji，控制在20字以内
2. 开头用一句话制造痛点或好奇心
3. 正文分3-4点讲清楚使用场景和真实感受
4. 结尾引导互动（提问/求建议/号召点赞）
5. 加入5-8个相关话题标签

产品/主题：{{topic}}`,
    description: '适用于小红书种草、产品推荐、生活分享类内容创作。',
    category: 'marketing',
    tags: ['小红书', '种草', '文案'],
    author: 'Prompt Studio',
    downloads: 1240,
    isOfficial: true,
  },
  {
    id: 't2',
    title: '代码审查助手',
    content: `你是一位资深软件工程师，请对以下代码进行审查。

请从以下维度给出建议：
1. 代码可读性和命名规范
2. 潜在的性能问题
3. 安全风险和边界情况
4. 可维护性和重构建议
5. 是否有更好的实现方式

请用中文回复，并给出具体改进示例。

代码：
\`\`\`
{{code}}
\`\`\``,
    description: '帮助开发者快速发现代码问题并获得改进建议。',
    category: 'coding',
    tags: ['代码审查', '编程', '优化'],
    author: 'Prompt Studio',
    downloads: 892,
    isOfficial: true,
  },
  {
    id: 't3',
    title: 'Midjourney 提示词生成器',
    content: `请根据以下描述生成一段 Midjourney 提示词。

主题：{{subject}}
风格：{{style}}
光线/氛围：{{lighting}}
画面比例：{{aspect}}

要求：
1. 用英文输出
2. 包含主体、环境、风格、光线、色彩、质感、构图等关键词
3. 使用 Midjourney 支持的参数格式（如 --ar、--v、--s）
4. 提供3个不同版本供选择`,
    description: '为 AI 绘画工具生成结构化的英文提示词。',
    category: 'image',
    tags: ['Midjourney', 'AI绘画', '提示词'],
    author: 'Prompt Studio',
    downloads: 2156,
    isOfficial: true,
  },
  {
    id: 't4',
    title: '邮件改写专家',
    content: `请将以下邮件改写为{{tone}}风格，并保持原意不变。

可选风格：正式商务、友好亲切、简洁直接、委婉礼貌

原邮件：
{{email}}

要求：
1. 改写后的邮件主题行
2. 正文分段清晰
3. 根据风格调整措辞
4. 如有必要，补充合适的开场白和结束语`,
    description: '快速调整邮件语气，适配不同商务场景。',
    category: 'writing',
    tags: ['邮件', '商务', '改写'],
    author: 'Prompt Studio',
    downloads: 756,
    isOfficial: true,
  },
  {
    id: 't5',
    title: '角色扮演对话',
    content: `请你扮演一位{{role}}，与我进行对话。

角色设定：
- 身份：{{role}}
- 语言风格：{{style}}
- 专业领域：{{field}}
- 回答限制：{{constraints}}

开始对话吧。`,
    description: '自定义 AI 角色，进行沉浸式对话体验。',
    category: 'chat',
    tags: ['角色扮演', '对话', '创意'],
    author: 'Prompt Studio',
    downloads: 634,
    isOfficial: true,
  },
  {
    id: 't6',
    title: '数据分析报告',
    content: `请根据以下数据生成一份简要分析报告。

数据：
{{data}}

分析要求：
1. 总结关键趋势和异常点
2. 提供至少3条可执行的洞察
3. 用简洁的要点形式呈现
4. 如需，可建议下一步分析方向`,
    description: '将原始数据转化为可读的洞察报告。',
    category: 'analysis',
    tags: ['数据分析', '报告', '洞察'],
    author: 'Prompt Studio',
    downloads: 521,
    isOfficial: true,
  },
]

export const INITIAL_PROMPTS: Prompt[] = [
  {
    id: 'p1',
    title: '我的小红书模板',
    content: INITIAL_TEMPLATES[0].content,
    description: '基于官方模板修改的小红书种草模板',
    category: 'marketing',
    tags: ['小红书', '种草'],
    isFavorite: true,
    createdAt: Date.now() - 86400000 * 2,
    updatedAt: Date.now() - 86400000,
    usageCount: 12,
  },
  {
    id: 'p2',
    title: '日常代码审查',
    content: INITIAL_TEMPLATES[1].content,
    description: '团队内部使用的代码审查提示词',
    category: 'coding',
    tags: ['代码审查', '团队'],
    isFavorite: false,
    createdAt: Date.now() - 86400000 * 5,
    updatedAt: Date.now() - 86400000 * 3,
    usageCount: 7,
  },
]
