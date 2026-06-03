export const marketingTemplates = [
  {
    id: 'mkt-1',
    name: '活力营销',
    category: '营销',
    description: '充满活力的配色，适合产品发布和营销策划',
    theme: {
      primary: '#DC2626',
      secondary: '#F43F5E',
      accent: '#FECDD3',
      background: '#FFFFFF',
      text: '#1F2937',
      lightBg: '#FFF1F2',
    },
    slides: [
      {
        layout: 'title',
        background: '#DC2626',
        elements: [
          { type: 'text', x: 8, y: 32, w: 84, h: 10, content: '新品发布方案', fontSize: 42, color: '#FFFFFF', bold: true, align: 'center' },
          { type: 'text', x: 10, y: 46, w: 80, h: 6, content: '颠覆性创新 · 重新定义用户体验', fontSize: 18, color: '#FECDD3', align: 'center' },
          { type: 'text', x: 10, y: 68, w: 80, h: 5, content: '市场部 | 2024', fontSize: 13, color: '#FCA5A5', align: 'center' },
        ]
      },
      {
        layout: 'content',
        background: '#FFFFFF',
        elements: [
          { type: 'text', x: 5, y: 8, w: 90, h: 8, content: '市场机会分析', fontSize: 30, color: '#DC2626', bold: true },
          { type: 'text', x: 5, y: 20, w: 42, h: 18, content: '市场规模\n¥200亿', fontSize: 28, color: '#DC2626', bold: true, align: 'center' },
          { type: 'text', x: 5, y: 40, w: 42, h: 5, content: '目标市场总容量', fontSize: 12, color: '#6B7280', align: 'center' },
          { type: 'text', x: 52, y: 20, w: 42, h: 18, content: '年增长率\n35%', fontSize: 28, color: '#DC2626', bold: true, align: 'center' },
          { type: 'text', x: 52, y: 40, w: 42, h: 5, content: '行业复合增长率', fontSize: 12, color: '#6B7280', align: 'center' },
        ]
      },
      {
        layout: 'section',
        background: '#FFF1F2',
        elements: [
          { type: 'text', x: 10, y: 38, w: 80, h: 10, content: '营销策略', fontSize: 36, color: '#DC2626', bold: true, align: 'center' },
          { type: 'text', x: 15, y: 52, w: 70, h: 6, content: '全渠道整合营销 · 精准触达目标用户', fontSize: 16, color: '#6B7280', align: 'center' },
        ]
      },
    ]
  },
  {
    id: 'mkt-2',
    name: '品牌推广',
    category: '营销',
    description: '现代时尚风格，适合品牌宣传和市场推广',
    theme: {
      primary: '#7C3AED',
      secondary: '#A78BFA',
      accent: '#DDD6FE',
      background: '#FFFFFF',
      text: '#1F2937',
      lightBg: '#F5F3FF',
    },
    slides: [
      {
        layout: 'title',
        background: 'linear-gradient(135deg, #7C3AED, #4C1D95)',
        elements: [
          { type: 'text', x: 8, y: 35, w: 84, h: 12, content: '品牌升级计划', fontSize: 42, color: '#FFFFFF', bold: true, align: 'center' },
          { type: 'text', x: 10, y: 52, w: 80, h: 6, content: '从优秀到卓越的品牌蜕变之旅', fontSize: 16, color: '#DDD6FE', align: 'center' },
        ]
      },
    ]
  },
  {
    id: 'mkt-4',
    name: '电商促销',
    category: '营销',
    description: '电商大促风格，适合促销活动策划',
    theme: { primary: '#DC2626', secondary: '#F97316', accent: '#FED7AA', background: '#FFFFFF', text: '#1F2937', lightBg: '#FFF7ED' },
    slides: [
      { layout: 'title', background: '#DC2626', elements: [
        { type: 'text', x: 8, y: 30, w: 84, h: 12, content: '双11大促方案', fontSize: 40, color: '#FFFFFF', bold: true, align: 'center' },
        { type: 'text', x: 10, y: 47, w: 80, h: 6, content: '年度最大力度的营销战役', fontSize: 17, color: '#FED7AA', align: 'center' },
      ]},
    ]
  },
  {
    id: 'mkt-5',
    name: '内容营销',
    category: '营销',
    description: '内容驱动风格，适合内容营销策略',
    theme: { primary: '#0F766E', secondary: '#2DD4BF', accent: '#CCFBF1', background: '#FFFFFF', text: '#1E293B', lightBg: '#F0FDFA' },
    slides: [
      { layout: 'title', background: '#0F766E', elements: [
        { type: 'text', x: 8, y: 33, w: 84, h: 10, content: '内容营销策略', fontSize: 36, color: '#FFFFFF', bold: true, align: 'center' },
        { type: 'text', x: 10, y: 48, w: 80, h: 6, content: '用优质内容驱动增长', fontSize: 16, color: '#CCFBF1', align: 'center' },
      ]},
    ]
  },
  {
    id: 'mkt-3',
    name: '社交媒体',
    category: '营销',
    description: '潮流感十足，适合社交媒体营销方案',
    theme: {
      primary: '#0EA5E9',
      secondary: '#38BDF8',
      accent: '#BAE6FD',
      background: '#FFFFFF',
      text: '#0C4A6E',
      lightBg: '#F0F9FF',
    },
    slides: [
      {
        layout: 'title',
        background: '#0EA5E9',
        elements: [
          { type: 'text', x: 8, y: 32, w: 84, h: 10, content: '社媒运营方案', fontSize: 40, color: '#FFFFFF', bold: true, align: 'center' },
          { type: 'text', x: 10, y: 46, w: 80, h: 6, content: '打造爆款内容的完整策略', fontSize: 18, color: '#BAE6FD', align: 'center' },
        ]
      },
    ]
  },
]
