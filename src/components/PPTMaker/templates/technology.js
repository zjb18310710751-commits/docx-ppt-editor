export const technologyTemplates = [
  {
    id: 'tech-1',
    name: '科技蓝调',
    category: '科技',
    description: '现代科技风格，适合技术分享和产品路演',
    theme: {
      primary: '#0F172A',
      secondary: '#06B6D4',
      accent: '#67E8F9',
      background: '#FFFFFF',
      text: '#F8FAFC',
      lightBg: '#ECFEFF',
    },
    slides: [
      {
        layout: 'title',
        background: '#0F172A',
        elements: [
          { type: 'shape', x: 0, y: 0, w: 100, h: 100, color: 'linear-gradient(135deg, rgba(6,182,212,0.15), transparent)' },
          { type: 'text', x: 8, y: 32, w: 84, h: 10, content: '技术架构分享', fontSize: 42, color: '#FFFFFF', bold: true, align: 'center' },
          { type: 'text', x: 10, y: 46, w: 80, h: 5, content: '微服务架构设计与实践', fontSize: 18, color: '#67E8F9', align: 'center' },
          { type: 'text', x: 10, y: 68, w: 80, h: 5, content: '技术部 | 2024', fontSize: 13, color: '#64748B', align: 'center' },
        ]
      },
      {
        layout: 'content',
        background: '#FFFFFF',
        elements: [
          { type: 'text', x: 5, y: 8, w: 90, h: 8, content: '架构总览', fontSize: 30, color: '#0F172A', bold: true },
          { type: 'line', x: 5, y: 17, w: 20, h: 0.3, color: '#06B6D4' },
          { type: 'shape', x: 10, y: 22, w: 25, h: 12, color: '#0F172A' },
          { type: 'text', x: 10, y: 25, w: 25, h: 6, content: 'API Gateway', fontSize: 14, color: '#FFFFFF', align: 'center' },
          { type: 'shape', x: 37, y: 22, w: 25, h: 12, color: '#06B6D4' },
          { type: 'text', x: 37, y: 25, w: 25, h: 6, content: 'Service A', fontSize: 14, color: '#FFFFFF', align: 'center' },
          { type: 'shape', x: 64, y: 22, w: 25, h: 12, color: '#06B6D4' },
          { type: 'text', x: 64, y: 25, w: 25, h: 6, content: 'Service B', fontSize: 14, color: '#FFFFFF', align: 'center' },
          { type: 'shape', x: 10, y: 48, w: 79, h: 8, color: '#0891B2' },
          { type: 'text', x: 10, y: 50, w: 79, h: 5, content: 'Event Bus / Message Queue', fontSize: 13, color: '#FFFFFF', align: 'center' },
          { type: 'shape', x: 10, y: 65, w: 79, h: 10, color: '#E2E8F0' },
          { type: 'text', x: 10, y: 67, w: 79, h: 6, content: 'Database Cluster', fontSize: 13, color: '#64748B', align: 'center' },
        ]
      },
      {
        layout: 'two-column',
        background: '#FFFFFF',
        elements: [
          { type: 'text', x: 5, y: 5, w: 90, h: 6, content: '技术选型对比', fontSize: 28, color: '#0F172A', bold: true },
          { type: 'text', x: 5, y: 16, w: 42, h: 6, content: '方案 A', fontSize: 20, color: '#06B6D4', bold: true },
          { type: 'text', x: 5, y: 24, w: 42, h: 40, content: '优点：\n• 性能优异\n• 社区活跃\n• 文档完善', fontSize: 15, color: '#374151' },
          { type: 'text', x: 52, y: 16, w: 42, h: 6, content: '方案 B', fontSize: 20, color: '#8B5CF6', bold: true },
          { type: 'text', x: 52, y: 24, w: 42, h: 40, content: '优点：\n• 开发效率高\n• 生态丰富\n• 上手简单', fontSize: 15, color: '#374151' },
        ]
      },
    ]
  },
  {
    id: 'tech-2',
    name: '暗黑科技',
    category: '科技',
    description: '深色主题，科技感十足，适合黑客松和技术峰会',
    theme: {
      primary: '#000000',
      secondary: '#22D3EE',
      accent: '#A5F3FC',
      background: '#111827',
      text: '#F9FAFB',
      lightBg: '#1F2937',
    },
    slides: [
      {
        layout: 'title',
        background: '#000000',
        elements: [
          { type: 'shape', x: 0, y: 0, w: 100, h: 0.2, color: '#22D3EE' },
          { type: 'text', x: 8, y: 30, w: 84, h: 10, content: 'AI 产品路演', fontSize: 44, color: '#22D3EE', bold: true, align: 'center', fontFamily: 'monospace' },
          { type: 'text', x: 10, y: 45, w: 80, h: 6, content: '下一代人工智能解决方案', fontSize: 16, color: '#67E8F9', align: 'center' },
          { type: 'shape', x: 30, y: 56, w: 40, h: 0.1, color: '#22D3EE' },
          { type: 'text', x: 10, y: 65, w: 80, h: 5, content: 'Tech Team · 2024', fontSize: 12, color: '#6B7280', align: 'center' },
        ]
      },
    ]
  },
  {
    id: 'tech-4',
    name: '云计算',
    category: '科技',
    description: '云服务主题，适合云计算架构演示',
    theme: { primary: '#1E40AF', secondary: '#60A5FA', accent: '#DBEAFE', background: '#FFFFFF', text: '#1E293B', lightBg: '#EFF6FF' },
    slides: [
      { layout: 'title', background: '#1E40AF', elements: [
        { type: 'text', x: 8, y: 33, w: 84, h: 10, content: '☁️ 云架构方案', fontSize: 36, color: '#FFFFFF', bold: true, align: 'center' },
        { type: 'text', x: 10, y: 48, w: 80, h: 6, content: '可扩展的云原生架构设计', fontSize: 16, color: '#DBEAFE', align: 'center' },
      ]},
    ]
  },
  {
    id: 'tech-5',
    name: '网络安全',
    category: '科技',
    description: '安全主题深色风格，适合安全报告',
    theme: { primary: '#0F172A', secondary: '#F43F5E', accent: '#FECDD3', background: '#0F172A', text: '#F8FAFC', lightBg: '#1E293B' },
    slides: [
      { layout: 'title', background: '#0F172A', elements: [
        { type: 'shape', x: 0, y: 0, w: 100, h: 0.3, color: '#F43F5E' },
        { type: 'text', x: 8, y: 32, w: 84, h: 10, content: '🔒 安全审计报告', fontSize: 36, color: '#FFFFFF', bold: true, align: 'center' },
        { type: 'text', x: 10, y: 48, w: 80, h: 6, content: '网络安全风险评估与防护策略', fontSize: 15, color: '#94A3B8', align: 'center' },
      ]},
    ]
  },
  {
    id: 'tech-3',
    name: '数据可视',
    category: '科技',
    description: '突出数据可视化，适合数据分析报告',
    theme: {
      primary: '#1E3A5F',
      secondary: '#10B981',
      accent: '#6EE7B7',
      background: '#F8FAFC',
      text: '#1E293B',
      lightBg: '#F0FDF4',
    },
    slides: [
      {
        layout: 'title',
        background: '#1E3A5F',
        elements: [
          { type: 'text', x: 8, y: 35, w: 84, h: 10, content: '数据分析报告', fontSize: 40, color: '#FFFFFF', bold: true, align: 'center' },
          { type: 'text', x: 10, y: 50, w: 80, h: 5, content: '基于大数据的用户行为分析', fontSize: 16, color: '#6EE7B7', align: 'center' },
        ]
      },
    ]
  },
]
