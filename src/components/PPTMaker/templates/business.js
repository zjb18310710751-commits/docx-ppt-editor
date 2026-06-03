export const businessTemplates = [
  {
    id: 'business-1',
    name: '企业商务',
    category: '商务',
    description: '专业大气的企业商务演示模板，适合公司介绍、年度总结',
    theme: {
      primary: '#1E3A5F',
      secondary: '#2E86AB',
      accent: '#A5C4D4',
      background: '#FFFFFF',
      text: '#1F2937',
      lightBg: '#F0F4F8',
    },
    slides: [
      {
        layout: 'title',
        background: '#1E3A5F',
        elements: [
          { type: 'text', x: 5, y: 35, w: 90, h: 15, content: '公司名称', fontSize: 44, color: '#FFFFFF', bold: true, align: 'center' },
          { type: 'text', x: 10, y: 52, w: 80, h: 8, content: '商务演示报告', fontSize: 22, color: '#A5C4D4', align: 'center' },
          { type: 'line', x: 35, y: 62, w: 30, h: 0.3, color: '#2E86AB' },
          { type: 'text', x: 10, y: 68, w: 80, h: 6, content: '演讲者 · 2024年6月', fontSize: 14, color: '#A5C4D4', align: 'center' },
        ]
      },
      {
        layout: 'content',
        background: '#FFFFFF',
        elements: [
          { type: 'shape', x: 0, y: 0, w: 100, h: 8, color: '#1E3A5F' },
          { type: 'text', x: 5, y: 12, w: 90, h: 8, content: '目录', fontSize: 32, color: '#1E3A5F', bold: true },
          { type: 'line', x: 5, y: 21, w: 15, h: 0.3, color: '#2E86AB' },
          { type: 'text', x: 8, y: 28, w: 84, h: 5, content: '01  公司概况', fontSize: 18, color: '#1E3A5F', bold: true },
          { type: 'text', x: 8, y: 35, w: 84, h: 5, content: '02  市场分析', fontSize: 18, color: '#4B5563' },
          { type: 'text', x: 8, y: 42, w: 84, h: 5, content: '03  产品与服务', fontSize: 18, color: '#4B5563' },
          { type: 'text', x: 8, y: 49, w: 84, h: 5, content: '04  财务数据', fontSize: 18, color: '#4B5563' },
          { type: 'text', x: 8, y: 56, w: 84, h: 5, content: '05  未来规划', fontSize: 18, color: '#4B5563' },
        ]
      },
      {
        layout: 'two-column',
        background: '#FFFFFF',
        elements: [
          { type: 'text', x: 5, y: 5, w: 90, h: 6, content: '公司概况', fontSize: 28, color: '#1E3A5F', bold: true },
          { type: 'line', x: 5, y: 12, w: 15, h: 0.3, color: '#2E86AB' },
          { type: 'text', x: 5, y: 18, w: 42, h: 55, content: '在此添加公司介绍文字内容', fontSize: 16, color: '#4B5563' },
          { type: 'shape', x: 52, y: 18, w: 43, h: 55, color: '#F0F4F8' },
          { type: 'text', x: 55, y: 40, w: 37, h: 8, content: '插入图片或图表', fontSize: 14, color: '#9CA3AF', align: 'center' },
        ]
      },
      {
        layout: 'section',
        background: '#F0F4F8',
        elements: [
          { type: 'text', x: 10, y: 38, w: 80, h: 10, content: '市场分析', fontSize: 36, color: '#1E3A5F', bold: true, align: 'center' },
          { type: 'line', x: 40, y: 50, w: 20, h: 0.3, color: '#2E86AB' },
          { type: 'text', x: 15, y: 55, w: 70, h: 6, content: '深入分析市场趋势与竞争格局', fontSize: 16, color: '#6B7280', align: 'center' },
        ]
      },
    ]
  },
  {
    id: 'business-2',
    name: '深蓝商务',
    category: '商务',
    description: '深邃蓝色调，稳重而现代，适合大型企业汇报',
    theme: {
      primary: '#0F172A',
      secondary: '#3B82F6',
      accent: '#60A5FA',
      background: '#FFFFFF',
      text: '#1E293B',
      lightBg: '#EFF6FF',
    },
    slides: [
      {
        layout: 'title',
        background: '#0F172A',
        elements: [
          { type: 'shape', x: 0, y: 0, w: 3, h: 100, color: '#3B82F6' },
          { type: 'text', x: 10, y: 35, w: 80, h: 12, content: '年度战略汇报', fontSize: 42, color: '#FFFFFF', bold: true },
          { type: 'text', x: 10, y: 50, w: 80, h: 6, content: '2024年度战略规划与执行回顾', fontSize: 18, color: '#60A5FA' },
          { type: 'text', x: 10, y: 68, w: 80, h: 5, content: '某某集团 | 战略发展部', fontSize: 14, color: '#94A3B8' },
        ]
      },
      {
        layout: 'content',
        background: '#FFFFFF',
        elements: [
          { type: 'shape', x: 0, y: 0, w: 100, h: 0.3, color: '#3B82F6' },
          { type: 'text', x: 5, y: 10, w: 90, h: 7, content: '核心业绩指标', fontSize: 28, color: '#0F172A', bold: true },
          { type: 'text', x: 8, y: 22, w: 25, h: 15, content: '¥50亿', fontSize: 36, color: '#3B82F6', bold: true, align: 'center' },
          { type: 'text', x: 8, y: 38, w: 25, h: 5, content: '年度营收', fontSize: 13, color: '#64748B', align: 'center' },
          { type: 'text', x: 37, y: 22, w: 25, h: 15, content: '+32%', fontSize: 36, color: '#10B981', bold: true, align: 'center' },
          { type: 'text', x: 37, y: 38, w: 25, h: 5, content: '同比增长', fontSize: 13, color: '#64748B', align: 'center' },
          { type: 'text', x: 66, y: 22, w: 25, h: 15, content: '98%', fontSize: 36, color: '#3B82F6', bold: true, align: 'center' },
          { type: 'text', x: 66, y: 38, w: 25, h: 5, content: '客户满意度', fontSize: 13, color: '#64748B', align: 'center' },
        ]
      },
    ]
  },
  {
    id: 'business-4',
    name: '现代简约',
    category: '商务',
    description: '现代简约商务风，适合日常办公汇报',
    theme: { primary: '#334155', secondary: '#64748B', accent: '#E2E8F0', background: '#FFFFFF', text: '#1E293B', lightBg: '#F8FAFC' },
    slides: [
      { layout: 'title', background: '#334155', elements: [
        { type: 'text', x: 8, y: 35, w: 84, h: 10, content: '部门工作汇报', fontSize: 36, color: '#FFFFFF', bold: true, align: 'center' },
        { type: 'text', x: 10, y: 50, w: 80, h: 6, content: '高效 · 务实 · 创新', fontSize: 15, color: '#CBD5E1', align: 'center' },
      ]},
    ]
  },
  {
    id: 'business-5',
    name: '跨国集团',
    category: '商务',
    description: '国际化风格，适合跨国企业演示',
    theme: { primary: '#0F172A', secondary: '#38BDF8', accent: '#BAE6FD', background: '#FFFFFF', text: '#1E293B', lightBg: '#F0F9FF' },
    slides: [
      { layout: 'title', background: '#0F172A', elements: [
        { type: 'text', x: 8, y: 32, w: 84, h: 10, content: 'Global Strategy', fontSize: 42, color: '#38BDF8', bold: true, align: 'center' },
        { type: 'text', x: 10, y: 47, w: 80, h: 6, content: '国际化战略布局', fontSize: 16, color: '#BAE6FD', align: 'center' },
      ]},
    ]
  },
  {
    id: 'business-3',
    name: '金典商务',
    category: '商务',
    description: '黑金配色，奢华专业，适合高端商务演示',
    theme: {
      primary: '#1A1A1A',
      secondary: '#C9A84C',
      accent: '#E8D48D',
      background: '#FFFFFF',
      text: '#2D2D2D',
      lightBg: '#FAF8F3',
    },
    slides: [
      {
        layout: 'title',
        background: '#1A1A1A',
        elements: [
          { type: 'line', x: 10, y: 30, w: 80, h: 0.1, color: '#C9A84C' },
          { type: 'text', x: 10, y: 34, w: 80, h: 15, content: '高端商业提案', fontSize: 44, color: '#C9A84C', bold: true, align: 'center' },
          { type: 'text', x: 10, y: 52, w: 80, h: 6, content: 'PREMIUM BUSINESS PROPOSAL', fontSize: 14, color: '#E8D48D', align: 'center', letterSpacing: 4 },
          { type: 'line', x: 10, y: 62, w: 80, h: 0.1, color: '#C9A84C' },
          { type: 'text', x: 10, y: 72, w: 80, h: 5, content: '2024年6月', fontSize: 12, color: '#888888', align: 'center' },
        ]
      },
      {
        layout: 'content',
        background: '#FFFFFF',
        elements: [
          { type: 'line', x: 3, y: 0, w: 0.3, h: 100, color: '#C9A84C' },
          { type: 'text', x: 8, y: 10, w: 84, h: 8, content: '项目概述', fontSize: 30, color: '#1A1A1A', bold: true },
          { type: 'text', x: 8, y: 22, w: 84, h: 50, content: '在此添加项目概述内容', fontSize: 16, color: '#555555', lineHeight: 1.8 },
        ]
      },
    ]
  },
]
