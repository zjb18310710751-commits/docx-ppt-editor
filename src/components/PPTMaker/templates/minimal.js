export const minimalTemplates = [
  {
    id: 'minimal-1',
    name: '纯白极简',
    category: '极简',
    description: '极致简约的白底设计，让内容成为焦点',
    theme: {
      primary: '#171717',
      secondary: '#525252',
      accent: '#E5E5E5',
      background: '#FFFFFF',
      text: '#171717',
      lightBg: '#FAFAFA',
    },
    slides: [
      {
        layout: 'title',
        background: '#FFFFFF',
        elements: [
          { type: 'text', x: 10, y: 35, w: 80, h: 10, content: '简约即是力量', fontSize: 48, color: '#171717', bold: true, align: 'center' },
          { type: 'text', x: 15, y: 50, w: 70, h: 5, content: 'Less is More', fontSize: 16, color: '#A3A3A3', align: 'center' },
          { type: 'text', x: 10, y: 70, w: 80, h: 5, content: '姓名 · 日期', fontSize: 12, color: '#A3A3A3', align: 'center' },
        ]
      },
      {
        layout: 'content',
        background: '#FFFFFF',
        elements: [
          { type: 'text', x: 5, y: 10, w: 90, h: 8, content: '核心观点', fontSize: 32, color: '#171717', bold: true },
          { type: 'line', x: 5, y: 19, w: 10, h: 0.2, color: '#171717' },
          { type: 'text', x: 5, y: 26, w: 90, h: 45, content: '在此输入您的内容。保持简洁、有力、直击要点。\n\n好的设计是尽可能少的设计。', fontSize: 18, color: '#525252', lineHeight: 1.8 },
        ]
      },
      {
        layout: 'two-column',
        background: '#FAFAFA',
        elements: [
          { type: 'text', x: 5, y: 8, w: 90, h: 6, content: '对比分析', fontSize: 28, color: '#171717', bold: true },
          { type: 'text', x: 5, y: 20, w: 42, h: 50, content: 'A 方案\n\n优势详情...', fontSize: 16, color: '#525252' },
          { type: 'text', x: 52, y: 20, w: 42, h: 50, content: 'B 方案\n\n优势详情...', fontSize: 16, color: '#525252' },
        ]
      },
    ]
  },
  {
    id: 'minimal-2',
    name: '日式简约',
    category: '极简',
    description: '和风美学，留白艺术，适合文化类展示',
    theme: {
      primary: '#292524',
      secondary: '#78716C',
      accent: '#E7E5E4',
      background: '#FDFBF7',
      text: '#292524',
      lightBg: '#FAFAF5',
    },
    slides: [
      {
        layout: 'title',
        background: '#FDFBF7',
        elements: [
          { type: 'shape', x: 45, y: 0, w: 0.1, h: 100, color: '#D6D3D1' },
          { type: 'text', x: 8, y: 38, w: 34, h: 10, content: '侘寂', fontSize: 44, color: '#292524', bold: true, align: 'right' },
          { type: 'text', x: 50, y: 42, w: 42, h: 6, content: 'Wabi-Sabi 美学', fontSize: 16, color: '#78716C' },
        ]
      },
    ]
  },
  {
    id: 'minimal-4',
    name: '暖灰基调',
    category: '极简',
    description: '暖灰色系，适合生活美学类展示',
    theme: { primary: '#44403C', secondary: '#A8A29E', accent: '#E7E5E4', background: '#FAFAF9', text: '#292524', lightBg: '#F5F5F4' },
    slides: [
      { layout: 'title', background: '#FAFAF9', elements: [
        { type: 'text', x: 10, y: 36, w: 80, h: 10, content: '生活美学', fontSize: 42, color: '#44403C', bold: true, align: 'center' },
        { type: 'text', x: 15, y: 52, w: 70, h: 5, content: '慢下来，感受生活的温度', fontSize: 14, color: '#A8A29E', align: 'center' },
      ]},
    ]
  },
  {
    id: 'minimal-5',
    name: '瑞士设计',
    category: '极简',
    description: '瑞士平面设计风格，网格极简',
    theme: { primary: '#DC2626', secondary: '#000000', accent: '#F5F5F5', background: '#FFFFFF', text: '#171717', lightBg: '#FAFAFA' },
    slides: [
      { layout: 'title', background: '#FFFFFF', elements: [
        { type: 'shape', x: 0, y: 0, w: 100, h: 4, color: '#DC2626' },
        { type: 'shape', x: 0, y: 96, w: 100, h: 4, color: '#000000' },
        { type: 'text', x: 10, y: 35, w: 80, h: 10, content: 'SWISS DESIGN', fontSize: 44, color: '#000000', bold: true, align: 'center' },
        { type: 'text', x: 10, y: 52, w: 80, h: 5, content: '形式追随功能', fontSize: 14, color: '#DC2626', align: 'center' },
      ]},
    ]
  },
  {
    id: 'minimal-3',
    name: '线条主义',
    category: '极简',
    description: '几何线条与负空间构成，现代极简风',
    theme: {
      primary: '#000000',
      secondary: '#404040',
      accent: '#D4D4D4',
      background: '#FFFFFF',
      text: '#000000',
      lightBg: '#F5F5F5',
    },
    slides: [
      {
        layout: 'title',
        background: '#FFFFFF',
        elements: [
          { type: 'shape', x: 0, y: 0, w: 100, h: 0.2, color: '#000000' },
          { type: 'shape', x: 0, y: 99.8, w: 100, h: 0.2, color: '#000000' },
          { type: 'text', x: 10, y: 35, w: 80, h: 10, content: 'LINE', fontSize: 56, color: '#000000', bold: true, align: 'center' },
          { type: 'text', x: 10, y: 50, w: 80, h: 5, content: '线 条 美 学', fontSize: 14, color: '#737373', align: 'center', letterSpacing: 8 },
        ]
      },
    ]
  },
]
