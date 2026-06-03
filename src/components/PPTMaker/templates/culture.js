export const cultureTemplates = [
  { id: 'cult-1', name: '中国风', category: '文化艺术', description: '传统中国风设计，适合国风文化展示', theme: { primary: '#B71C1C', secondary: '#D4A574', accent: '#FDE0B2', background: '#FFF8F0', text: '#3E2723', lightBg: '#FFF3E0' }, slides: [
    { layout: 'title', background: '#B71C1C', elements: [
      { type: 'text', x: 8, y: 30, w: 84, h: 12, content: '中国传统文化', fontSize: 40, color: '#FFD54F', bold: true, align: 'center' },
      { type: 'text', x: 10, y: 46, w: 80, h: 6, content: '传承与创新 · 文化自信', fontSize: 17, color: '#FDE0B2', align: 'center' },
      { type: 'text', x: 10, y: 62, w: 80, h: 5, content: '文化研究院 | 2024', fontSize: 13, color: '#FFAB91', align: 'center' },
    ]},
    { layout: 'content', background: '#FFF8F0', elements: [
      { type: 'text', x: 5, y: 8, w: 90, h: 7, content: '文化概述', fontSize: 28, color: '#B71C1C', bold: true },
      { type: 'text', x: 5, y: 18, w: 90, h: 50, content: '传统文化内容介绍...', fontSize: 15, color: '#3E2723' },
    ]},
  ]},
  { id: 'cult-2', name: '艺术展览', category: '文化艺术', description: '画廊风格，适合艺术作品展示', theme: { primary: '#212121', secondary: '#757575', accent: '#E0E0E0', background: '#FAFAFA', text: '#212121', lightBg: '#F5F5F5' }, slides: [
    { layout: 'title', background: '#212121', elements: [
      { type: 'text', x: 8, y: 32, w: 84, h: 10, content: '艺术展览', fontSize: 42, color: '#FFFFFF', bold: true, align: 'center' },
      { type: 'text', x: 10, y: 47, w: 80, h: 6, content: '当代艺术 · 视觉盛宴', fontSize: 15, color: '#BDBDBD', align: 'center' },
    ]},
  ]},
  { id: 'cult-3', name: '音乐演出', category: '文化艺术', description: '音乐主题风格，适合演出和活动策划', theme: { primary: '#311B92', secondary: '#7C4DFF', accent: '#D1C4E9', background: '#FFFFFF', text: '#1E293B', lightBg: '#F5F0FF' }, slides: [
    { layout: 'title', background: '#311B92', elements: [
      { type: 'text', x: 8, y: 32, w: 84, h: 10, content: '🎵 音乐盛典', fontSize: 38, color: '#FFFFFF', bold: true, align: 'center' },
      { type: 'text', x: 10, y: 47, w: 80, h: 6, content: '2024年度音乐演出季', fontSize: 16, color: '#D1C4E9', align: 'center' },
    ]},
  ]},
  { id: 'cult-4', name: '读书分享', category: '文化艺术', description: '书香风格，适合读书会和文学分享', theme: { primary: '#5D4037', secondary: '#8D6E63', accent: '#D7CCC8', background: '#FFFBF5', text: '#3E2723', lightBg: '#EFEBE9' }, slides: [
    { layout: 'title', background: '#5D4037', elements: [
      { type: 'text', x: 8, y: 33, w: 84, h: 10, content: '📚 读书分享会', fontSize: 36, color: '#FFFFFF', bold: true, align: 'center' },
      { type: 'text', x: 10, y: 48, w: 80, h: 6, content: '阅读 · 思考 · 成长', fontSize: 16, color: '#D7CCC8', align: 'center' },
    ]},
  ]},
]
