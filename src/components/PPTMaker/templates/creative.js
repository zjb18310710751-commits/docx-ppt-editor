export const creativeTemplates = [
  {
    id: 'creative-1',
    name: '创意风暴',
    category: '创意',
    description: '大胆配色，适合创意提案和头脑风暴',
    theme: {
      primary: '#EC4899',
      secondary: '#F59E0B',
      accent: '#FDE68A',
      background: '#FFFFFF',
      text: '#1F2937',
      lightBg: '#FDF2F8',
    },
    slides: [
      {
        layout: 'title',
        background: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
        elements: [
          { type: 'text', x: 8, y: 32, w: 84, h: 12, content: '创意提案', fontSize: 44, color: '#FFFFFF', bold: true, align: 'center' },
          { type: 'text', x: 10, y: 48, w: 80, h: 6, content: '打破常规 · 创造不凡', fontSize: 18, color: '#FDE68A', align: 'center' },
          { type: 'text', x: 10, y: 68, w: 80, h: 5, content: '创意团队 | 2024', fontSize: 13, color: '#FBCFE8', align: 'center' },
        ]
      },
      {
        layout: 'content',
        background: '#FFFFFF',
        elements: [
          { type: 'text', x: 5, y: 8, w: 90, h: 8, content: '💡 核心创意', fontSize: 30, color: '#EC4899', bold: true },
          { type: 'text', x: 8, y: 22, w: 35, h: 10, content: '创意点 1', fontSize: 20, color: '#EC4899', bold: true },
          { type: 'text', x: 8, y: 34, w: 35, h: 20, content: '详细描述创意内容', fontSize: 14, color: '#6B7280' },
          { type: 'text', x: 55, y: 22, w: 35, h: 10, content: '创意点 2', fontSize: 20, color: '#8B5CF6', bold: true },
          { type: 'text', x: 55, y: 34, w: 35, h: 20, content: '详细描述创意内容', fontSize: 14, color: '#6B7280' },
          { type: 'text', x: 8, y: 58, w: 35, h: 10, content: '创意点 3', fontSize: 20, color: '#F59E0B', bold: true },
          { type: 'text', x: 8, y: 70, w: 35, h: 20, content: '详细描述创意内容', fontSize: 14, color: '#6B7280' },
        ]
      },
    ]
  },
  {
    id: 'creative-2',
    name: '艺术设计',
    category: '创意',
    description: '极富艺术感，适合设计展示和创意评审',
    theme: {
      primary: '#2D2D2D',
      secondary: '#EAB308',
      accent: '#FEF08A',
      background: '#FAFAFA',
      text: '#171717',
      lightBg: '#FEFCE8',
    },
    slides: [
      {
        layout: 'title',
        background: '#FAFAFA',
        elements: [
          { type: 'shape', x: 0, y: 0, w: 15, h: 100, color: '#EAB308' },
          { type: 'text', x: 22, y: 35, w: 70, h: 10, content: '设计作品展示', fontSize: 42, color: '#171717', bold: true },
          { type: 'text', x: 22, y: 48, w: 70, h: 6, content: 'UI/UX Design Portfolio', fontSize: 16, color: '#737373' },
        ]
      },
    ]
  },
  {
    id: 'creative-4',
    name: '霓虹都市',
    category: '创意',
    description: '赛博朋克霓虹风格，适合潮流活动',
    theme: { primary: '#0A0A0A', secondary: '#FF00FF', accent: '#00FFFF', background: '#0A0A0A', text: '#FFFFFF', lightBg: '#1A1A2E' },
    slides: [
      { layout: 'title', background: '#0A0A0A', elements: [
        { type: 'shape', x: 0, y: 0, w: 100, h: 0.3, color: '#FF00FF' },
        { type: 'text', x: 8, y: 32, w: 84, h: 10, content: 'NEON FUTURE', fontSize: 44, color: '#FF00FF', bold: true, align: 'center' },
        { type: 'text', x: 10, y: 47, w: 80, h: 6, content: '霓虹未来 · 潮流盛典', fontSize: 16, color: '#00FFFF', align: 'center' },
      ]},
    ]
  },
  {
    id: 'creative-5',
    name: '手绘风格',
    category: '创意',
    description: '轻松手绘风，适合脑暴和创意工作坊',
    theme: { primary: '#F59E0B', secondary: '#FBBF24', accent: '#FEF3C7', background: '#FFFDF5', text: '#78350F', lightBg: '#FFFBEB' },
    slides: [
      { layout: 'title', background: '#FFFDF5', elements: [
        { type: 'text', x: 8, y: 33, w: 84, h: 10, content: '✏️ 创意工作坊', fontSize: 38, color: '#F59E0B', bold: true, align: 'center' },
        { type: 'text', x: 10, y: 48, w: 80, h: 6, content: '脑洞大开 · 无限创意', fontSize: 16, color: '#B45309', align: 'center' },
      ]},
    ]
  },
  {
    id: 'creative-3',
    name: '彩虹渐变',
    category: '创意',
    description: '多彩渐变风格，适合年轻化品牌和潮流活动',
    theme: {
      primary: '#6366F1',
      secondary: '#EC4899',
      accent: '#F9A8D4',
      background: '#FFFFFF',
      text: '#1F2937',
      lightBg: '#F5F3FF',
    },
    slides: [
      {
        layout: 'title',
        background: 'linear-gradient(135deg, #6366F1, #EC4899, #F59E0B)',
        elements: [
          { type: 'text', x: 8, y: 35, w: 84, h: 10, content: '潮流品牌计划', fontSize: 42, color: '#FFFFFF', bold: true, align: 'center' },
          { type: 'text', x: 10, y: 50, w: 80, h: 6, content: '年轻 · 活力 · 无限可能', fontSize: 16, color: '#FFFFFF', align: 'center' },
        ]
      },
    ]
  },
]
