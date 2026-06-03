export const financeTemplates = [
  {
    id: 'fin-1',
    name: '专业金融',
    category: '金融',
    description: '经典金融蓝配色，适合投资报告和财务分析',
    theme: {
      primary: '#1E3A5F',
      secondary: '#3B82F6',
      accent: '#BFDBFE',
      background: '#FFFFFF',
      text: '#1E293B',
      lightBg: '#EFF6FF',
    },
    slides: [
      {
        layout: 'title',
        background: '#1E3A5F',
        elements: [
          { type: 'text', x: 8, y: 32, w: 84, h: 10, content: '投资分析报告', fontSize: 42, color: '#FFFFFF', bold: true, align: 'center' },
          { type: 'text', x: 10, y: 46, w: 80, h: 6, content: '2024年度投资组合表现分析', fontSize: 18, color: '#BFDBFE', align: 'center' },
          { type: 'text', x: 10, y: 68, w: 80, h: 5, content: '投资部 | 2024', fontSize: 13, color: '#93C5FD', align: 'center' },
        ]
      },
      {
        layout: 'content',
        background: '#FFFFFF',
        elements: [
          { type: 'text', x: 5, y: 8, w: 90, h: 8, content: '投资组合概览', fontSize: 30, color: '#1E3A5F', bold: true },
          { type: 'line', x: 5, y: 17, w: 15, h: 0.3, color: '#3B82F6' },
          { type: 'text', x: 8, y: 22, w: 25, h: 12, content: '股票\n45%', fontSize: 28, color: '#3B82F6', bold: true, align: 'center' },
          { type: 'text', x: 8, y: 36, w: 25, h: 4, content: '年化+18.5%', fontSize: 11, color: '#10B981', align: 'center' },
          { type: 'text', x: 37, y: 22, w: 25, h: 12, content: '债券\n30%', fontSize: 28, color: '#6366F1', bold: true, align: 'center' },
          { type: 'text', x: 37, y: 36, w: 25, h: 4, content: '年化+5.2%', fontSize: 11, color: '#10B981', align: 'center' },
          { type: 'text', x: 66, y: 22, w: 25, h: 12, content: '现金\n25%', fontSize: 28, color: '#8B5CF6', bold: true, align: 'center' },
          { type: 'text', x: 66, y: 36, w: 25, h: 4, content: '流动性储备', fontSize: 11, color: '#6B7280', align: 'center' },
        ]
      },
      {
        layout: 'two-column',
        background: '#FFFFFF',
        elements: [
          { type: 'text', x: 5, y: 5, w: 90, h: 6, content: '财务指标分析', fontSize: 28, color: '#1E3A5F', bold: true },
          { type: 'text', x: 5, y: 16, w: 42, h: 55, content: '盈利能力\n\n• 毛利率：42.3%\n• 净利率：18.7%\n• ROE：22.5%\n• EPS：¥3.85', fontSize: 16, color: '#334155', lineHeight: 1.8 },
          { type: 'text', x: 52, y: 16, w: 42, h: 55, content: '偿债能力\n\n• 流动比率：2.1\n• 速动比率：1.5\n• 资产负债率：45%\n• 利息保障倍数：8.3x', fontSize: 16, color: '#334155', lineHeight: 1.8 },
        ]
      },
    ]
  },
  {
    id: 'fin-2',
    name: '深色金融',
    category: '金融',
    description: '深色主题，高端大气，适合基金路演和投资人会议',
    theme: {
      primary: '#0F172A',
      secondary: '#F59E0B',
      accent: '#FDE68A',
      background: '#1E293B',
      text: '#F8FAFC',
      lightBg: '#1E293B',
    },
    slides: [
      {
        layout: 'title',
        background: '#0F172A',
        elements: [
          { type: 'shape', x: 0, y: 0, w: 100, h: 0.3, color: '#F59E0B' },
          { type: 'text', x: 8, y: 32, w: 84, h: 10, content: '私募基金路演', fontSize: 38, color: '#F59E0B', bold: true, align: 'center' },
          { type: 'text', x: 10, y: 48, w: 80, h: 6, content: '聚焦科技赛道的长期价值投资', fontSize: 16, color: '#94A3B8', align: 'center' },
          { type: 'text', x: 10, y: 68, w: 80, h: 5, content: '严格保密', fontSize: 12, color: '#64748B', align: 'center' },
        ]
      },
    ]
  },
  {
    id: 'fin-4',
    name: '银行报告',
    category: '金融',
    description: '银行风格，适合行业分析报告',
    theme: { primary: '#003366', secondary: '#0066CC', accent: '#CCE5FF', background: '#FFFFFF', text: '#1E293B', lightBg: '#F0F7FF' },
    slides: [
      { layout: 'title', background: '#003366', elements: [
        { type: 'text', x: 8, y: 32, w: 84, h: 10, content: '行业研究报告', fontSize: 36, color: '#FFFFFF', bold: true, align: 'center' },
        { type: 'text', x: 10, y: 47, w: 80, h: 6, content: '宏观经济与行业趋势分析', fontSize: 16, color: '#CCE5FF', align: 'center' },
      ]},
    ]
  },
  {
    id: 'fin-5',
    name: '加密货币',
    category: '金融',
    description: '现代加密主题，适合区块链和Web3',
    theme: { primary: '#F59E0B', secondary: '#FBBF24', accent: '#FEF3C7', background: '#0F172A', text: '#F8FAFC', lightBg: '#1E293B' },
    slides: [
      { layout: 'title', background: '#0F172A', elements: [
        { type: 'text', x: 8, y: 30, w: 84, h: 10, content: '₿ Web3 投资趋势', fontSize: 38, color: '#F59E0B', bold: true, align: 'center' },
        { type: 'text', x: 10, y: 46, w: 80, h: 6, content: '区块链与数字资产投资展望', fontSize: 16, color: '#FEF3C7', align: 'center' },
        { type: 'line', x: 35, y: 56, w: 30, h: 0.3, color: '#F59E0B' },
        { type: 'text', x: 10, y: 62, w: 80, h: 5, content: '加密研究院 | 2024', fontSize: 13, color: '#94A3B8', align: 'center' },
      ]},
    ]
  },
  {
    id: 'fin-3',
    name: '商业计划书',
    category: '金融',
    description: '投资人青睐的BP风格，适合创业融资路演',
    theme: {
      primary: '#166534',
      secondary: '#22C55E',
      accent: '#BBF7D0',
      background: '#FFFFFF',
      text: '#14532D',
      lightBg: '#F0FDF4',
    },
    slides: [
      {
        layout: 'title',
        background: '#166534',
        elements: [
          { type: 'text', x: 8, y: 30, w: 84, h: 12, content: '商业计划书', fontSize: 44, color: '#FFFFFF', bold: true, align: 'center' },
          { type: 'text', x: 10, y: 46, w: 80, h: 6, content: '打造下一代智能SaaS平台', fontSize: 18, color: '#BBF7D0', align: 'center' },
          { type: 'text', x: 10, y: 65, w: 80, h: 5, content: '创始人 · 2024', fontSize: 14, color: '#86EFAC', align: 'center' },
        ]
      },
      {
        layout: 'content',
        background: '#FFFFFF',
        elements: [
          { type: 'text', x: 5, y: 8, w: 90, h: 8, content: '市场规模', fontSize: 30, color: '#166534', bold: true },
          { type: 'text', x: 8, y: 22, w: 35, h: 10, content: 'TAM\n¥5000亿', fontSize: 24, color: '#166534', bold: true, align: 'center' },
          { type: 'text', x: 8, y: 34, w: 35, h: 4, content: '总可寻址市场', fontSize: 11, color: '#6B7280', align: 'center' },
          { type: 'text', x: 55, y: 22, w: 35, h: 10, content: 'SAM\n¥800亿', fontSize: 24, color: '#22C55E', bold: true, align: 'center' },
          { type: 'text', x: 55, y: 34, w: 35, h: 4, content: '可服务市场', fontSize: 11, color: '#6B7280', align: 'center' },
        ]
      },
    ]
  },
]
