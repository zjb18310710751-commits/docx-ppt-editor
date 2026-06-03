export const competitionTemplates = [
  { id: 'comp-1', name: '创业大赛', category: '竞赛答辩', description: '激情澎湃的创业路演模板', theme: { primary: '#E65100', secondary: '#FF9800', accent: '#FFE0B2', background: '#FFFFFF', text: '#212121', lightBg: '#FFF3E0' }, slides: [
    { layout: 'title', background: '#E65100', elements: [
      { type: 'text', x: 8, y: 28, w: 84, h: 12, content: '创业计划书', fontSize: 40, color: '#FFFFFF', bold: true, align: 'center' },
      { type: 'text', x: 10, y: 44, w: 80, h: 6, content: '颠覆传统 · 创造未来', fontSize: 18, color: '#FFE0B2', align: 'center' },
      { type: 'text', x: 10, y: 60, w: 80, h: 5, content: '团队名称 · 2024', fontSize: 13, color: '#FFCC80', align: 'center' },
    ]},
    { layout: 'content', background: '#FFFFFF', elements: [
      { type: 'text', x: 5, y: 8, w: 90, h: 7, content: '市场痛点', fontSize: 28, color: '#E65100', bold: true },
      { type: 'text', x: 5, y: 18, w: 55, h: 50, content: '痛点分析与解决方案...', fontSize: 15, color: '#333' },
      { type: 'shape', x: 65, y: 18, w: 28, h: 50, color: '#FFF3E0' },
      { type: 'text', x: 68, y: 38, w: 22, h: 8, content: '解决方案图', fontSize: 12, color: '#999', align: 'center' },
    ]},
  ]},
  { id: 'comp-2', name: '挑战杯', category: '竞赛答辩', description: '科技创新竞赛答辩模板', theme: { primary: '#0D47A1', secondary: '#1E88E5', accent: '#BBDEFB', background: '#FFFFFF', text: '#1E293B', lightBg: '#E3F2FD' }, slides: [
    { layout: 'title', background: '#0D47A1', elements: [
      { type: 'text', x: 8, y: 30, w: 84, h: 10, content: '科技创新项目', fontSize: 36, color: '#FFFFFF', bold: true, align: 'center' },
      { type: 'text', x: 10, y: 45, w: 80, h: 6, content: '挑战杯 · 创新大赛', fontSize: 17, color: '#BBDEFB', align: 'center' },
      { type: 'text', x: 10, y: 62, w: 80, h: 5, content: '项目团队 · 指导教师', fontSize: 13, color: '#90CAF9', align: 'center' },
    ]},
  ]},
  { id: 'comp-3', name: '奖学金答辩', category: '竞赛答辩', description: '个人能力展示模板', theme: { primary: '#1B5E20', secondary: '#43A047', accent: '#C8E6C9', background: '#FFFFFF', text: '#1E293B', lightBg: '#E8F5E9' }, slides: [
    { layout: 'title', background: '#1B5E20', elements: [
      { type: 'text', x: 8, y: 32, w: 84, h: 10, content: '奖学金答辩', fontSize: 36, color: '#FFFFFF', bold: true, align: 'center' },
      { type: 'text', x: 10, y: 46, w: 80, h: 6, content: '个人能力与成果展示', fontSize: 16, color: '#C8E6C9', align: 'center' },
    ]},
  ]},
  { id: 'comp-4', name: '项目评审', category: '竞赛答辩', description: '专业项目评审汇报模板', theme: { primary: '#37474F', secondary: '#78909C', accent: '#CFD8DC', background: '#FFFFFF', text: '#263238', lightBg: '#ECEFF1' }, slides: [
    { layout: 'title', background: '#37474F', elements: [
      { type: 'text', x: 8, y: 30, w: 84, h: 10, content: '项目评审汇报', fontSize: 38, color: '#FFFFFF', bold: true, align: 'center' },
      { type: 'text', x: 10, y: 45, w: 80, h: 6, content: '项目进展与成果汇报', fontSize: 16, color: '#CFD8DC', align: 'center' },
    ]},
  ]},
]
