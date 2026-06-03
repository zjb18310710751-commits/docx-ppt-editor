export const scienceTemplates = [
  { id: 'sci-1', name: '科研论文', category: '科学研究', description: '严谨学术风格，适合科研论文汇报', theme: { primary: '#0F4C81', secondary: '#5B9BD5', accent: '#BDD7EE', background: '#FFFFFF', text: '#1E293B', lightBg: '#F0F5FA' }, slides: [
    { layout: 'title', background: '#0F4C81', elements: [
      { type: 'text', x: 8, y: 30, w: 84, h: 10, content: '科研课题汇报', fontSize: 38, color: '#FFFFFF', bold: true, align: 'center' },
      { type: 'text', x: 10, y: 44, w: 80, h: 6, content: '基于XXX的研究进展', fontSize: 18, color: '#BDD7EE', align: 'center' },
      { type: 'line', x: 35, y: 53, w: 30, h: 0.3, color: '#5B9BD5' },
      { type: 'text', x: 10, y: 60, w: 80, h: 5, content: '课题组 · 2024', fontSize: 13, color: '#BDD7EE', align: 'center' },
    ]},
    { layout: 'content', background: '#FFFFFF', elements: [
      { type: 'text', x: 5, y: 8, w: 90, h: 7, content: '研究背景与意义', fontSize: 28, color: '#0F4C81', bold: true },
      { type: 'text', x: 5, y: 18, w: 55, h: 50, content: '研究背景与文献综述内容...', fontSize: 15, color: '#334155' },
      { type: 'shape', x: 65, y: 18, w: 28, h: 50, color: '#F0F5FA' },
      { type: 'text', x: 68, y: 38, w: 22, h: 8, content: '图表区', fontSize: 12, color: '#94A3B8', align: 'center' },
    ]},
  ]},
  { id: 'sci-2', name: '实验报告', category: '科学研究', description: '适合实验室数据展示和实验汇报', theme: { primary: '#00695C', secondary: '#26A69A', accent: '#B2DFDB', background: '#FFFFFF', text: '#1E293B', lightBg: '#F0FAF8' }, slides: [
    { layout: 'title', background: '#00695C', elements: [
      { type: 'text', x: 8, y: 32, w: 84, h: 10, content: '实验研究报告', fontSize: 38, color: '#FFFFFF', bold: true, align: 'center' },
      { type: 'text', x: 10, y: 46, w: 80, h: 6, content: 'XX实验数据与结果分析', fontSize: 16, color: '#B2DFDB', align: 'center' },
    ]},
  ]},
  { id: 'sci-3', name: '数据分析', category: '科学研究', description: '数据驱动风格，适合统计分析报告', theme: { primary: '#283593', secondary: '#5C6BC0', accent: '#C5CAE9', background: '#FFFFFF', text: '#1E293B', lightBg: '#F5F6FC' }, slides: [
    { layout: 'title', background: '#283593', elements: [
      { type: 'text', x: 8, y: 33, w: 84, h: 10, content: '数据分析报告', fontSize: 38, color: '#FFFFFF', bold: true, align: 'center' },
      { type: 'text', x: 10, y: 48, w: 80, h: 6, content: 'SPSS统计分析结果', fontSize: 16, color: '#C5CAE9', align: 'center' },
    ]},
  ]},
  { id: 'sci-4', name: '学术答辩', category: '科学研究', description: '毕业论文答辩专用模板', theme: { primary: '#4A148C', secondary: '#AB47BC', accent: '#E1BEE7', background: '#FFFFFF', text: '#1E293B', lightBg: '#FBF5FC' }, slides: [
    { layout: 'title', background: '#4A148C', elements: [
      { type: 'text', x: 8, y: 30, w: 84, h: 12, content: '学位论文答辩', fontSize: 36, color: '#FFFFFF', bold: true, align: 'center' },
      { type: 'text', x: 10, y: 46, w: 80, h: 6, content: '论文题目完整版', fontSize: 17, color: '#E1BEE7', align: 'center' },
      { type: 'text', x: 10, y: 60, w: 80, h: 5, content: '答辩人 · 导师 · 答辩日期', fontSize: 13, color: '#CE93D8', align: 'center' },
    ]},
  ]},
]
