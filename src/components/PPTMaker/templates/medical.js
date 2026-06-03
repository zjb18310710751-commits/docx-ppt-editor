export const medicalTemplates = [
  {
    id: 'med-1',
    name: '医疗健康',
    category: '医疗',
    description: '专业医疗风格，适合医学报告和健康讲座',
    theme: {
      primary: '#0369A1',
      secondary: '#0EA5E9',
      accent: '#BAE6FD',
      background: '#FFFFFF',
      text: '#0C4A6E',
      lightBg: '#F0F9FF',
    },
    slides: [
      {
        layout: 'title',
        background: '#0369A1',
        elements: [
          { type: 'text', x: 8, y: 32, w: 84, h: 10, content: '医学研究报告', fontSize: 40, color: '#FFFFFF', bold: true, align: 'center' },
          { type: 'text', x: 10, y: 46, w: 80, h: 6, content: '临床数据分析与治疗进展', fontSize: 18, color: '#BAE6FD', align: 'center' },
          { type: 'text', x: 10, y: 68, w: 80, h: 5, content: '某某医院 | 2024', fontSize: 13, color: '#7DD3FC', align: 'center' },
        ]
      },
      {
        layout: 'content',
        background: '#FFFFFF',
        elements: [
          { type: 'shape', x: 0, y: 0, w: 100, h: 10, color: '#F0F9FF' },
          { type: 'text', x: 5, y: 2, w: 90, h: 6, content: '研究背景', fontSize: 28, color: '#0369A1', bold: true },
          { type: 'text', x: 5, y: 16, w: 90, h: 55, content: '研究背景与目的说明...', fontSize: 16, color: '#334155' },
        ]
      },
      {
        layout: 'two-column',
        background: '#FFFFFF',
        elements: [
          { type: 'text', x: 5, y: 5, w: 90, h: 6, content: '临床数据', fontSize: 28, color: '#0369A1', bold: true },
          { type: 'text', x: 5, y: 16, w: 42, h: 55, content: '实验组数据\n\n样本数：200\n有效率：87.5%\n不良反应：3.2%', fontSize: 16, color: '#334155' },
          { type: 'text', x: 52, y: 16, w: 42, h: 55, content: '对照组数据\n\n样本数：180\n有效率：62.3%\n不良反应：5.8%', fontSize: 16, color: '#334155' },
        ]
      },
    ]
  },
  {
    id: 'med-2',
    name: '红十字',
    category: '医疗',
    description: '简洁专业，适合医疗科普和健康宣教',
    theme: {
      primary: '#DC2626',
      secondary: '#F87171',
      accent: '#FECACA',
      background: '#FFFFFF',
      text: '#1F2937',
      lightBg: '#FEF2F2',
    },
    slides: [
      {
        layout: 'title',
        background: '#FFFFFF',
        elements: [
          { type: 'shape', x: 0, y: 0, w: 100, h: 0.4, color: '#DC2626' },
          { type: 'shape', x: 42, y: 28, w: 16, h: 16, color: '#DC2626' },
          { type: 'shape', x: 42, y: 30, w: 4, h: 12, color: '#FFFFFF' },
          { type: 'shape', x: 48, y: 34, w: 4, h: 4, color: '#FFFFFF' },
          { type: 'text', x: 10, y: 50, w: 80, h: 8, content: '健康知识讲座', fontSize: 34, color: '#DC2626', bold: true, align: 'center' },
          { type: 'text', x: 10, y: 62, w: 80, h: 5, content: '关爱生命 · 守护健康', fontSize: 14, color: '#6B7280', align: 'center' },
        ]
      },
    ]
  },
  {
    id: 'med-4',
    name: '中医养生',
    category: '医疗',
    description: '传统中医风格，适合养生健康讲座',
    theme: { primary: '#5D4037', secondary: '#8D6E63', accent: '#D7CCC8', background: '#FFFBF5', text: '#3E2723', lightBg: '#FDF8F0' },
    slides: [
      { layout: 'title', background: '#5D4037', elements: [
        { type: 'text', x: 8, y: 33, w: 84, h: 10, content: '🌿 中医养生', fontSize: 38, color: '#FFFFFF', bold: true, align: 'center' },
        { type: 'text', x: 10, y: 48, w: 80, h: 6, content: '调和阴阳 · 天人合一', fontSize: 16, color: '#D7CCC8', align: 'center' },
      ]},
    ]
  },
  {
    id: 'med-5',
    name: '心理健康',
    category: '医疗',
    description: '温暖治愈风格，适合心理健康主题',
    theme: { primary: '#7C3AED', secondary: '#A78BFA', accent: '#EDE9FE', background: '#FFFFFF', text: '#1E293B', lightBg: '#F8F7FF' },
    slides: [
      { layout: 'title', background: '#7C3AED', elements: [
        { type: 'text', x: 8, y: 33, w: 84, h: 10, content: '💜 心理健康', fontSize: 38, color: '#FFFFFF', bold: true, align: 'center' },
        { type: 'text', x: 10, y: 48, w: 80, h: 6, content: '关爱身心 · 拥抱阳光', fontSize: 16, color: '#EDE9FE', align: 'center' },
      ]},
    ]
  },
  {
    id: 'med-3',
    name: '生物科技',
    category: '医疗',
    description: '前沿生物科技风格，适合科研报告和学术展示',
    theme: {
      primary: '#065F46',
      secondary: '#10B981',
      accent: '#A7F3D0',
      background: '#FFFFFF',
      text: '#064E3B',
      lightBg: '#ECFDF5',
    },
    slides: [
      {
        layout: 'title',
        background: '#065F46',
        elements: [
          { type: 'text', x: 8, y: 35, w: 84, h: 10, content: '生物技术前沿', fontSize: 38, color: '#FFFFFF', bold: true, align: 'center' },
          { type: 'text', x: 10, y: 50, w: 80, h: 6, content: '基因编辑技术最新进展', fontSize: 17, color: '#A7F3D0', align: 'center' },
        ]
      },
    ]
  },
]
