export const educationTemplates = [
  {
    id: 'edu-1',
    name: '清新课件',
    category: '教育',
    description: '清新自然的配色，适合课堂教学和在线课程',
    theme: {
      primary: '#059669',
      secondary: '#34D399',
      accent: '#A7F3D0',
      background: '#FFFFFF',
      text: '#1F2937',
      lightBg: '#ECFDF5',
    },
    slides: [
      {
        layout: 'title',
        background: '#059669',
        elements: [
          { type: 'text', x: 10, y: 30, w: 80, h: 10, content: '课程名称', fontSize: 40, color: '#FFFFFF', bold: true, align: 'center' },
          { type: 'text', x: 10, y: 43, w: 80, h: 6, content: '第X章 · 章节标题', fontSize: 20, color: '#A7F3D0', align: 'center' },
          { type: 'shape', x: 30, y: 54, w: 40, h: 0.3, color: '#FFFFFF' },
          { type: 'text', x: 10, y: 60, w: 80, h: 5, content: '授课教师 · 2024年', fontSize: 14, color: '#A7F3D0', align: 'center' },
        ]
      },
      {
        layout: 'content',
        background: '#FFFFFF',
        elements: [
          { type: 'shape', x: 0, y: 0, w: 100, h: 12, color: '#059669' },
          { type: 'text', x: 5, y: 2, w: 90, h: 8, content: '学习目标', fontSize: 28, color: '#FFFFFF', bold: true },
          { type: 'text', x: 8, y: 18, w: 84, h: 5, content: '🎯  理解核心概念的定义与原理', fontSize: 17, color: '#374151' },
          { type: 'text', x: 8, y: 25, w: 84, h: 5, content: '📝  掌握关键公式的推导过程', fontSize: 17, color: '#374151' },
          { type: 'text', x: 8, y: 32, w: 84, h: 5, content: '💡  能够运用知识解决实际问题', fontSize: 17, color: '#374151' },
          { type: 'text', x: 8, y: 39, w: 84, h: 5, content: '🔬  培养科学探究的思维方式', fontSize: 17, color: '#374151' },
        ]
      },
      {
        layout: 'two-column',
        background: '#FFFFFF',
        elements: [
          { type: 'text', x: 5, y: 5, w: 90, h: 6, content: '知识要点', fontSize: 28, color: '#059669', bold: true },
          { type: 'text', x: 5, y: 16, w: 42, h: 55, content: '重点内容讲解区域\n\n1. 第一要点\n2. 第二要点\n3. 第三要点', fontSize: 16, color: '#374151' },
          { type: 'shape', x: 52, y: 16, w: 43, h: 55, color: '#ECFDF5' },
          { type: 'text', x: 55, y: 40, w: 37, h: 8, content: '示例/图表区域', fontSize: 14, color: '#6B7280', align: 'center' },
        ]
      },
    ]
  },
  {
    id: 'edu-2',
    name: '学术报告',
    category: '教育',
    description: '严谨的学术风格，适合论文答辩和学术会议',
    theme: {
      primary: '#1E40AF',
      secondary: '#6366F1',
      accent: '#C7D2FE',
      background: '#FFFFFF',
      text: '#1E293B',
      lightBg: '#EEF2FF',
    },
    slides: [
      {
        layout: 'title',
        background: '#1E40AF',
        elements: [
          { type: 'text', x: 8, y: 32, w: 84, h: 12, content: '研究论文题目', fontSize: 38, color: '#FFFFFF', bold: true, align: 'center' },
          { type: 'text', x: 8, y: 48, w: 84, h: 6, content: '——副标题说明', fontSize: 18, color: '#C7D2FE', align: 'center' },
          { type: 'text', x: 8, y: 65, w: 84, h: 5, content: '作者 | 导师 | 院系 | 日期', fontSize: 14, color: '#A5B4FC', align: 'center' },
        ]
      },
      {
        layout: 'content',
        background: '#FFFFFF',
        elements: [
          { type: 'text', x: 5, y: 8, w: 90, h: 8, content: '研究背景与意义', fontSize: 30, color: '#1E40AF', bold: true },
          { type: 'line', x: 5, y: 17, w: 20, h: 0.3, color: '#6366F1' },
          { type: 'text', x: 5, y: 22, w: 90, h: 50, content: '研究背景与意义内容...', fontSize: 16, color: '#334155' },
        ]
      },
    ]
  },
  {
    id: 'edu-4',
    name: '在线课程',
    category: '教育',
    description: '现代在线教育风格，适合MOOC和网课',
    theme: { primary: '#6366F1', secondary: '#818CF8', accent: '#E0E7FF', background: '#FFFFFF', text: '#1E293B', lightBg: '#EEF2FF' },
    slides: [
      { layout: 'title', background: '#6366F1', elements: [
        { type: 'text', x: 8, y: 33, w: 84, h: 10, content: '在线课程', fontSize: 36, color: '#FFFFFF', bold: true, align: 'center' },
        { type: 'text', x: 10, y: 48, w: 80, h: 6, content: '随时随地 · 高效学习', fontSize: 16, color: '#E0E7FF', align: 'center' },
      ]},
    ]
  },
  {
    id: 'edu-5',
    name: '培训教学',
    category: '教育',
    description: '企业培训风格，适合内部培训材料',
    theme: { primary: '#0F766E', secondary: '#14B8A6', accent: '#CCFBF1', background: '#FFFFFF', text: '#134E4A', lightBg: '#F0FDFA' },
    slides: [
      { layout: 'title', background: '#0F766E', elements: [
        { type: 'text', x: 8, y: 33, w: 84, h: 10, content: '员工培训', fontSize: 36, color: '#FFFFFF', bold: true, align: 'center' },
        { type: 'text', x: 10, y: 48, w: 80, h: 6, content: '技能提升与职业发展', fontSize: 16, color: '#CCFBF1', align: 'center' },
      ]},
    ]
  },
  {
    id: 'edu-3',
    name: '趣味课堂',
    category: '教育',
    description: '活泼多彩的设计，适合少儿教育和趣味课程',
    theme: {
      primary: '#EA580C',
      secondary: '#F97316',
      accent: '#FED7AA',
      background: '#FFFFFF',
      text: '#374151',
      lightBg: '#FFF7ED',
    },
    slides: [
      {
        layout: 'title',
        background: 'linear-gradient(135deg, #EA580C, #F97316)',
        elements: [
          { type: 'text', x: 10, y: 30, w: 80, h: 10, content: '🌟 趣味科学探索', fontSize: 40, color: '#FFFFFF', bold: true, align: 'center' },
          { type: 'text', x: 15, y: 44, w: 70, h: 6, content: '让我们一起发现世界的奥秘', fontSize: 18, color: '#FED7AA', align: 'center' },
          { type: 'text', x: 10, y: 65, w: 80, h: 5, content: '适合年龄：8-12岁', fontSize: 14, color: '#FFFFFF', align: 'center' },
        ]
      },
    ]
  },
]
