import { allTemplates } from '../components/PPTMaker/templates/index'

// 主题关键词映射 - 根据用户输入自动匹配模板和配色
const TOPIC_PATTERNS = [
  { keys: ['商务', '企业', '公司', '商业', '汇报', '年度', '季度', '战略', '管理', '销售', '业绩', '市场'], cat: '商务', prefer: ['企业商务', '深蓝商务'] },
  { keys: ['教育', '课程', '学习', '教学', '培训', '课件', '学校', '大学', '考试', '知识'], cat: '教育', prefer: ['清新课件', '学术报告'] },
  { keys: ['营销', '产品', '推广', '品牌', '广告', '市场', '促销', '电商', '活动', '运营'], cat: '营销', prefer: ['活力营销', '品牌推广'] },
  { keys: ['科技', '技术', 'AI', '人工智能', '软件', '代码', '程序', '算法', '数据', '架构', '开发', '编程', '互联网', '云', '安全'], cat: '科技', prefer: ['科技蓝调', 'AI产品路演'] },
  { keys: ['创意', '设计', '艺术', '灵感', '脑暴', '头脑风暴', 'idea', '创新'], cat: '创意', prefer: ['创意风暴', '艺术设计'] },
  { keys: ['简约', '极简', '简洁', '简单', '干净', '优雅', '美学'], cat: '极简', prefer: ['纯白极简', '日式简约'] },
  { keys: ['医疗', '医学', '健康', '医院', '临床', '药物', '治疗', '养生', '心理', '中医'], cat: '医疗', prefer: ['医疗健康', '生物科技'] },
  { keys: ['金融', '投资', '财务', '理财', '基金', '股票', '银行', '保险', '融资', '创业', '商业计划'], cat: '金融', prefer: ['专业金融', '商业计划书'] },
  { keys: ['科研', '论文', '实验', '学术', '研究', '答辩', '毕业', '博士', '硕士'], cat: '科学研究', prefer: ['科研论文', '学术答辩'] },
  { keys: ['环保', '绿色', '自然', '海洋', '气候', '生态', '地球', '可持续'], cat: '自然环保', prefer: ['绿色环保', '海洋保护'] },
  { keys: ['文化', '音乐', '演出', '艺术', '展览', '读书', '阅读', '中国', '传统', '国风'], cat: '文化艺术', prefer: ['中国风', '艺术展览'] },
  { keys: ['比赛', '竞赛', '大赛', '挑战', '奖学金', '评审', '路演'], cat: '竞赛答辩', prefer: ['创业大赛', '挑战杯'] },
]

// 幻灯片结构模板 - AI会根据主题自动组合
const SLIDE_STRUCTURES = {
  title: (topic, theme) => ({
    layout: 'title',
    background: theme.primary,
    elements: [
      { type: 'text', x: 8, y: 30, w: 84, h: 12, content: topic, fontSize: 40, color: '#FFFFFF', bold: true, align: 'center' },
      { type: 'text', x: 10, y: 46, w: 80, h: 6, content: '专业演示文稿', fontSize: 16, color: theme.accent, align: 'center' },
      { type: 'text', x: 10, y: 60, w: 80, h: 5, content: new Date().toLocaleDateString('zh-CN'), fontSize: 12, color: theme.accent, align: 'center' },
    ],
  }),
  toc: (topic, theme) => ({
    layout: 'content',
    background: '#FFFFFF',
    elements: [
      { type: 'shape', x: 0, y: 0, w: 100, h: 8, color: theme.primary },
      { type: 'text', x: 5, y: 12, w: 90, h: 8, content: '目录', fontSize: 30, color: theme.primary, bold: true },
      { type: 'text', x: 8, y: 26, w: 84, h: 50, content: '01  概述\n02  核心内容\n03  数据分析\n04  解决方案\n05  总结展望', fontSize: 17, color: '#444', lineHeight: 2.2 },
    ],
  }),
  overview: (topic, theme) => ({
    layout: 'content',
    background: '#FFFFFF',
    elements: [
      { type: 'text', x: 5, y: 5, w: 90, h: 8, content: '概述', fontSize: 30, color: theme.primary, bold: true },
      { type: 'line', x: 5, y: 14, w: 15, h: 0.3, color: theme.secondary },
      { type: 'text', x: 5, y: 20, w: 90, h: 52, content: `关于「${topic}」的背景介绍与核心概念说明。\n\n在此详细阐述主题的背景、意义及关键要素。`, fontSize: 16, color: '#444', lineHeight: 1.8 },
    ],
  }),
  keyPoints: (topic, theme) => ({
    layout: 'content',
    background: theme.lightBg,
    elements: [
      { type: 'text', x: 5, y: 5, w: 90, h: 7, content: '核心要点', fontSize: 28, color: theme.primary, bold: true },
      { type: 'text', x: 8, y: 18, w: 84, h: 6, content: '🔑  要点一：关键信息概述', fontSize: 17, color: '#333' },
      { type: 'text', x: 8, y: 27, w: 84, h: 6, content: '📊  要点二：数据驱动决策', fontSize: 17, color: '#333' },
      { type: 'text', x: 8, y: 36, w: 84, h: 6, content: '💡  要点三：创新解决方案', fontSize: 17, color: '#333' },
      { type: 'text', x: 8, y: 45, w: 84, h: 6, content: '🎯  要点四：明确目标方向', fontSize: 17, color: '#333' },
      { type: 'text', x: 8, y: 54, w: 84, h: 6, content: '✅  要点五：实施路径规划', fontSize: 17, color: '#333' },
    ],
  }),
  twoColumn: (topic, theme) => ({
    layout: 'two-column',
    background: '#FFFFFF',
    elements: [
      { type: 'text', x: 5, y: 5, w: 90, h: 6, content: '分析与对比', fontSize: 26, color: theme.primary, bold: true },
      { type: 'text', x: 5, y: 16, w: 42, h: 55, content: '方案 A\n\n优势分析：\n• 实施成本低\n• 见效速度快\n• 风险可控\n\n适用场景说明...', fontSize: 15, color: '#444', lineHeight: 1.7 },
      { type: 'text', x: 52, y: 16, w: 42, h: 55, content: '方案 B\n\n优势分析：\n• 长期效益高\n• 扩展性强\n• 技术领先\n\n适用场景说明...', fontSize: 15, color: '#444', lineHeight: 1.7 },
    ],
  }),
  section: (topic, theme) => ({
    layout: 'section',
    background: theme.primary,
    elements: [
      { type: 'text', x: 10, y: 38, w: 80, h: 10, content: '深入探讨', fontSize: 36, color: '#FFFFFF', bold: true, align: 'center' },
      { type: 'line', x: 40, y: 50, w: 20, h: 0.3, color: theme.accent },
      { type: 'text', x: 15, y: 55, w: 70, h: 6, content: '进一步的分析与讨论', fontSize: 15, color: theme.accent, align: 'center' },
    ],
  }),
  summary: (topic, theme) => ({
    layout: 'content',
    background: '#FFFFFF',
    elements: [
      { type: 'text', x: 5, y: 5, w: 90, h: 8, content: '总结与展望', fontSize: 30, color: theme.primary, bold: true },
      { type: 'line', x: 5, y: 14, w: 15, h: 0.3, color: theme.secondary },
      { type: 'text', x: 5, y: 20, w: 90, h: 50, content: '📌  核心结论\n回顾前面的内容，总结最重要的发现和结论。\n\n🚀  未来展望\n对接下来的发展方向进行展望和规划。\n\n🙏  感谢聆听\n期待您的反馈与建议！', fontSize: 16, color: '#444', lineHeight: 1.8 },
    ],
  }),
}

/**
 * 根据用户输入的主题智能生成PPT
 * @param {string} topic - 用户输入的主题
 * @returns {{ template, slides }} 匹配的模板和生成的幻灯片数组
 */
export function generateAI_PPT(topic) {
  if (!topic || topic.trim().length < 2) {
    return null
  }

  // 1. 匹配最佳模板
  let bestTemplate = allTemplates[0]
  let maxScore = 0

  for (const pattern of TOPIC_PATTERNS) {
    for (const key of pattern.keys) {
      if (topic.includes(key)) {
        const score = key.length // 匹配越长关键词得分越高
        if (score > maxScore) {
          maxScore = score
          // 优先使用推荐模板
          const preferred = allTemplates.filter(t => pattern.prefer.includes(t.name))
          bestTemplate = preferred.length > 0 ? preferred[0] : allTemplates.find(t => t.category === pattern.cat) || allTemplates[0]
        }
      }
    }
  }

  // 如果没有匹配，根据主题长度选择
  if (maxScore === 0 && topic.length > 4) {
    // 随机选择商务或创意类
    const defaults = allTemplates.filter(t => ['商务', '创意', '科技'].includes(t.category))
    bestTemplate = defaults[Math.floor(Math.random() * defaults.length)]
  }

  const theme = bestTemplate.theme

  // 2. 根据主题复杂度生成幻灯片
  const slides = []

  // 封面
  slides.push({ ...SLIDE_STRUCTURES.title(topic, theme) })

  // 目录
  slides.push({ ...SLIDE_STRUCTURES.toc(topic, theme) })

  // 概述
  slides.push({ ...SLIDE_STRUCTURES.overview(topic, theme) })

  // 核心要点
  slides.push({ ...SLIDE_STRUCTURES.keyPoints(topic, theme) })

  // 根据主题长度决定是否有章节分隔
  if (topic.length >= 6 || topic.includes('方案') || topic.includes('报告') || topic.includes('计划')) {
    slides.push({ ...SLIDE_STRUCTURES.section(topic, theme) })
    slides.push({ ...SLIDE_STRUCTURES.twoColumn(topic, theme) })
  } else {
    slides.push({ ...SLIDE_STRUCTURES.twoColumn(topic, theme) })
  }

  // 总结
  slides.push({ ...SLIDE_STRUCTURES.summary(topic, theme) })

  return {
    template: bestTemplate,
    slides,
  }
}

/**
 * 将文档内容转换为PPT幻灯片
 * @param {string} htmlContent - TipTap编辑器的HTML内容
 * @returns {{ slides, template }} 生成的幻灯片和推荐模板
 */
export function documentToPPT(htmlContent) {
  if (!htmlContent || htmlContent.trim().length < 10) {
    return null
  }

  // 1. 解析HTML提取标题和段落
  const tempDiv = { innerHTML: htmlContent }
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlContent, 'text/html')

  const h1s = Array.from(doc.querySelectorAll('h1')).map(h => h.textContent.trim())
  const h2s = Array.from(doc.querySelectorAll('h2')).map(h => h.textContent.trim())
  const paragraphs = Array.from(doc.querySelectorAll('p')).map(p => p.textContent.trim()).filter(t => t.length > 0)

  const allHeadings = [...h1s, ...h2s]
  const mainTitle = allHeadings[0] || '文档导出PPT'

  // 2. 选择模板
  const template = allTemplates.find(t => t.category === '商务') || allTemplates[0]
  const theme = template.theme

  // 3. 生成幻灯片
  const slides = []

  // 封面
  slides.push({
    layout: 'title',
    background: theme.primary,
    elements: [
      { type: 'text', x: 8, y: 30, w: 84, h: 12, content: mainTitle, fontSize: 38, color: '#FFFFFF', bold: true, align: 'center' },
      { type: 'text', x: 10, y: 46, w: 80, h: 6, content: '文档自动生成', fontSize: 16, color: theme.accent, align: 'center' },
      { type: 'text', x: 10, y: 60, w: 80, h: 5, content: new Date().toLocaleDateString('zh-CN'), fontSize: 12, color: theme.accent, align: 'center' },
    ],
  })

  // 为每个h2标题生成一张幻灯片
  h2s.forEach((h2, idx) => {
    const relatedParagraphs = paragraphs.slice(idx * 2, idx * 2 + 3)
    const bodyText = relatedParagraphs.length > 0
      ? relatedParagraphs.join('\n\n')
      : '相关内容...'

    slides.push({
      layout: 'content',
      background: idx % 2 === 0 ? '#FFFFFF' : theme.lightBg,
      elements: [
        { type: 'text', x: 5, y: 5, w: 90, h: 8, content: h2, fontSize: 26, color: theme.primary, bold: true },
        { type: 'line', x: 5, y: 14, w: 15, h: 0.3, color: theme.secondary },
        { type: 'text', x: 5, y: 20, w: 90, h: 52, content: bodyText, fontSize: 15, color: '#444', lineHeight: 1.7 },
      ],
    })
  })

  // 如果没有h2，用段落生成
  if (h2s.length === 0 && paragraphs.length > 0) {
    for (let i = 0; i < Math.min(paragraphs.length, 6); i += 2) {
      const title = paragraphs[i]?.substring(0, 30) + (paragraphs[i]?.length > 30 ? '...' : '')
      const body = paragraphs.slice(i, i + 2).join('\n\n')
      slides.push({
        layout: 'content',
        background: i % 4 === 0 ? '#FFFFFF' : theme.lightBg,
        elements: [
          { type: 'text', x: 5, y: 5, w: 90, h: 7, content: title, fontSize: 24, color: theme.primary, bold: true },
          { type: 'line', x: 5, y: 13, w: 10, h: 0.3, color: theme.secondary },
          { type: 'text', x: 5, y: 18, w: 90, h: 55, content: body, fontSize: 15, color: '#444', lineHeight: 1.7 },
        ],
      })
    }
  }

  // 结尾页
  slides.push({
    layout: 'title',
    background: theme.primary,
    elements: [
      { type: 'text', x: 8, y: 38, w: 84, h: 10, content: '感谢观看', fontSize: 38, color: '#FFFFFF', bold: true, align: 'center' },
      { type: 'text', x: 10, y: 55, w: 80, h: 6, content: '期待您的反馈', fontSize: 15, color: theme.accent, align: 'center' },
    ],
  })

  return { template, slides }
}
