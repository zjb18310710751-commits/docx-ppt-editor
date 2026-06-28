import { useMemo } from 'react'

// 各类别对应的装饰图案和形状配置
const categoryConfig = {
  '商务': { shapes: 'rect', angles: [0, 0, 45], grid: [2, 2], accentStyle: 'solid' },
  '教育': { shapes: 'mixed', angles: [0, -5, 3], grid: [3, 2], accentStyle: 'dots' },
  '营销': { shapes: 'circles', angles: [15, -10, 0], grid: [4, 3], accentStyle: 'burst' },
  '科技': { shapes: 'hex', angles: [0, 0, 30], grid: [3, 3], accentStyle: 'lines' },
  '创意': { shapes: 'waves', angles: [10, -5, 20], grid: [2, 3], accentStyle: 'gradient' },
  '极简': { shapes: 'lines', angles: [0, 0, 0], grid: [1, 2], accentStyle: 'minimal' },
  '医疗': { shapes: 'crosses', angles: [0, 45, 0], grid: [3, 3], accentStyle: 'solid' },
  '金融': { shapes: 'diamonds', angles: [0, 0, 0], grid: [2, 3], accentStyle: 'elegant' },
  '科学研究': { shapes: 'hex', angles: [0, 60, 0], grid: [3, 2], accentStyle: 'data' },
  '自然环保': { shapes: 'leaves', angles: [-8, 5, 0], grid: [2, 2], accentStyle: 'organic' },
  '文化艺术': { shapes: 'curves', angles: [0, -3, 5], grid: [2, 3], accentStyle: 'gradient' },
  '竞赛答辩': { shapes: 'triangles', angles: [45, 0, -45], grid: [3, 3], accentStyle: 'burst' },
  '互联网': { shapes: 'dots', angles: [0, 0, 0], grid: [4, 4], accentStyle: 'data' },
  'WPS精选': { shapes: 'diamonds', angles: [0, 0, 0], grid: [3, 2], accentStyle: 'elegant' },
}

// 为各模板预定义的独特迷你图案
const patternStyles = {
  '企业商务': { accent: 'stripedTop', overlay: 'cornerBox' },
  '深蓝商务': { accent: 'leftBar', overlay: 'diagonalStripes' },
  '金典商务': { accent: 'goldLines', overlay: 'centeredDiamond' },
  '现代简约': { accent: 'topBar', overlay: 'sideCircles' },
  '跨国集团': { accent: 'globeDots', overlay: 'cornerTriangle' },
  '清新课件': { accent: 'leafAccent', overlay: 'dotGrid' },
  '学术报告': { accent: 'bookBar', overlay: 'ruleLines' },
  '趣味课堂': { accent: 'colorfulCircles', overlay: 'wavyBottom' },
  '在线课程': { accent: 'playButton', overlay: 'gradientStripes' },
  '培训教学': { accent: 'targetDots', overlay: 'sideAccent' },
  '活力营销': { accent: 'burst', overlay: 'floatingCircles' },
  '品牌推广': { accent: 'gradientBar', overlay: 'slashPattern' },
  '社交媒体': { accent: 'hashGrid', overlay: 'bubbleCluster' },
  '电商促销': { accent: 'tagRibbon', overlay: 'sparkleDots' },
  '内容营销': { accent: 'penStroke', overlay: 'quoteMarks' },
  '科技蓝调': { accent: 'circuitLines', overlay: 'hexGrid' },
  '暗黑科技': { accent: 'neonGlow', overlay: 'matrixRain' },
  '数据可视': { accent: 'barChart', overlay: 'dotMatrix' },
  '云计算': { accent: 'cloudShapes', overlay: 'nodeLinks' },
  '网络安全': { accent: 'shieldPattern', overlay: 'lockIcon' },
  '创意风暴': { accent: 'paintSplash', overlay: 'colorBlocks' },
  '艺术设计': { accent: 'goldenRatio', overlay: 'abstractCurves' },
  '彩虹渐变': { accent: 'rainbowWave', overlay: 'prismDots' },
  '霓虹都市': { accent: 'neonBorder', overlay: 'gridLines' },
  '手绘风格': { accent: 'sketchCircle', overlay: 'doodleDots' },
  '纯白极简': { accent: 'thinLine', overlay: 'geometricSquare' },
  '日式简约': { accent: 'verticalRule', overlay: 'circleZen' },
  '线条主义': { accent: 'thickBottom', overlay: 'crossLines' },
  '暖灰基调': { accent: 'warmDot', overlay: 'softGrid' },
  '瑞士设计': { accent: 'redBlock', overlay: 'gridSystem' },
  '医疗健康': { accent: 'pulseLine', overlay: 'crossAccent' },
  '红十字': { accent: 'redCross', overlay: 'subtleGrid' },
  '生物科技': { accent: 'dnaHelix', overlay: 'cellPattern' },
  '中医养生': { accent: 'yinYang', overlay: 'bambooStripe' },
  '心理健康': { accent: 'brainWave', overlay: 'softBubbles' },
  '专业金融': { accent: 'candleStick', overlay: 'gridBackground' },
  '深色金融': { accent: 'goldBorder', overlay: 'currencySymbol' },
  '商业计划书': { accent: 'growthArrow', overlay: 'lightGrid' },
  '银行报告': { accent: 'columnGraph', overlay: 'diagonalLines' },
  '加密货币': { accent: 'bitcoinCircle', overlay: 'blockchainDots' },
  // WPS精选
  '黑金商务': { accent: 'goldLines', overlay: 'centeredDiamond' },
  '星空蓝': { accent: 'globeDots', overlay: 'sideAccent' },
  '莫兰迪绿': { accent: 'leafAccent', overlay: 'softGrid' },
  '玫瑰金': { accent: 'gradientBar', overlay: 'floatingCircles' },
  '碳纤维': { accent: 'neonGlow', overlay: 'matrixRain' },
  '质感杂志': { accent: 'redBlock', overlay: 'colorBlocks' },
  '几何蒙德里安': { accent: 'colorBlocks', overlay: 'gridSystem' },
  '极简留白': { accent: 'thinLine', overlay: 'geometricSquare' },
  '孟菲斯风格': { accent: 'paintSplash', overlay: 'prismDots' },
  '水墨江南': { accent: 'verticalRule', overlay: 'bambooStripe' },
  '故宫红墙': { accent: 'goldBorder', overlay: 'cornerTriangle' },
  '青花瓷': { accent: 'blueWave', overlay: 'dotGrid' },
  '麦肯锡蓝': { accent: 'columnGraph', overlay: 'gridBackground' },
  '罗兰贝格': { accent: 'growthArrow', overlay: 'diagonalLines' },
}

// 迷你图案渲染器
function PatternOverlay({ template, theme, width = 160, height = 144 }) {
  const config = categoryConfig[template.category] || categoryConfig['商务']
  const style = patternStyles[template.name] || {}
  const c = theme

  const patterns = useMemo(() => {
    const items = []

    // 基础：几何形状装饰
    const accentColor = c.secondary || '#3B82F6'
    const primaryColor = c.primary || '#1E3A5F'

    if (config.shapes === 'circles') {
      items.push(<circle key="c1" cx={width * 0.75} cy={height * 0.2} r={18} fill={accentColor} opacity={0.25} />)
      items.push(<circle key="c2" cx={width * 0.85} cy={height * 0.35} r={10} fill={accentColor} opacity={0.15} />)
      items.push(<circle key="c3" cx={width * 0.2} cy={height * 0.75} r={24} fill={accentColor} opacity={0.12} />)
      items.push(<circle key="c4" cx={width * 0.6} cy={height * 0.8} r={8} fill={accentColor} opacity={0.2} />)
    } else if (config.shapes === 'diamonds') {
      items.push(<rect key="d1" x={width * 0.65} y={height * 0.15} width={30} height={30} fill={accentColor} opacity={0.15} transform={`rotate(45 ${width * 0.65 + 15} ${height * 0.15 + 15})`} />)
      items.push(<rect key="d2" x={width * 0.15} y={height * 0.6} width={20} height={20} fill={accentColor} opacity={0.1} transform={`rotate(45 ${width * 0.15 + 10} ${height * 0.6 + 10})`} />)
      items.push(<rect key="d3" x={width * 0.8} y={height * 0.6} width={16} height={16} fill={accentColor} opacity={0.08} transform={`rotate(45 ${width * 0.8 + 8} ${height * 0.6 + 8})`} />)
    } else if (config.shapes === 'triangles') {
      items.push(<polygon key="t1" points={`${width * 0.7},${height * 0.1} ${width * 0.85},${height * 0.35} ${width * 0.55},${height * 0.35}`} fill={accentColor} opacity={0.18} />)
      items.push(<polygon key="t2" points={`${width * 0.15},${height * 0.55} ${width * 0.3},${height * 0.8} ${width * 0.05},${height * 0.7}`} fill={accentColor} opacity={0.12} />)
    } else if (config.shapes === 'hex') {
      items.push(<circle key="h1" cx={width * 0.72} cy={height * 0.18} r={14} fill="none" stroke={accentColor} strokeWidth="1.5" opacity={0.3} />)
      items.push(<circle key="h2" cx={width * 0.82} cy={height * 0.35} r={8} fill="none" stroke={accentColor} strokeWidth="1" opacity={0.2} />)
      items.push(<circle key="h3" cx={width * 0.18} cy={height * 0.7} r={12} fill="none" stroke={accentColor} strokeWidth="1.5" opacity={0.2} />)
      items.push(<polygon key="h4" points={`${width * 0.75},${height * 0.6} ${width * 0.92},${height * 0.7} ${width * 0.92},${height * 0.85} ${width * 0.75},${height * 0.95} ${width * 0.58},${height * 0.85} ${width * 0.58},${height * 0.7}`} fill="none" stroke={accentColor} strokeWidth="1" opacity={0.15} />)
    } else if (config.shapes === 'waves') {
      items.push(<path key="w1" d={`M 0 ${height * 0.7} Q ${width * 0.25} ${height * 0.55} ${width * 0.5} ${height * 0.7} T ${width} ${height * 0.6}`} fill="none" stroke={accentColor} strokeWidth="2" opacity={0.2} />)
      items.push(<path key="w2" d={`M 0 ${height * 0.8} Q ${width * 0.3} ${height * 0.65} ${width * 0.6} ${height * 0.8} T ${width} ${height * 0.7}`} fill="none" stroke={accentColor} strokeWidth="1.5" opacity={0.12} />)
    } else if (config.shapes === 'lines') {
      items.push(<line key="l1" x1={width * 0.1} y1={height * 0.4} x2={width * 0.3} y2={height * 0.4} stroke={accentColor} strokeWidth="1.5" opacity={0.3} />)
      items.push(<line key="l2" x1={width * 0.6} y1={height * 0.7} x2={width * 0.9} y2={height * 0.7} stroke={accentColor} strokeWidth="1" opacity={0.2} />)
      items.push(<line key="l3" x1={width * 0.2} y1={height * 0.85} x2={width * 0.45} y2={height * 0.85} stroke={accentColor} strokeWidth="1" opacity={0.15} />)
    } else if (config.shapes === 'crosses') {
      items.push(<g key="cr1" opacity={0.15} transform={`translate(${width * 0.75},${height * 0.15})`}><rect x="-8" y="-2" width={16} height={4} fill={accentColor} rx="1" /><rect x="-2" y="-8" width={4} height={16} fill={accentColor} rx="1" /></g>)
      items.push(<g key="cr2" opacity={0.1} transform={`translate(${width * 0.15},${height * 0.7})`}><rect x="-6" y="-1.5" width={12} height={3} fill={accentColor} rx="1" /><rect x="-1.5" y="-6" width={3} height={12} fill={accentColor} rx="1" /></g>)
    } else {
      // 默认矩形
      items.push(<rect key="r1" x={width * 0.7} y={height * 0.12} width={width * 0.2} height={height * 0.15} fill={accentColor} opacity={0.15} rx="4" />)
      items.push(<rect key="r2" x={width * 0.08} y={height * 0.65} width={width * 0.15} height={height * 0.2} fill={accentColor} opacity={0.1} rx="3" />)
      items.push(<rect key="r3" x={width * 0.55} y={height * 0.78} width={width * 0.35} height={height * 0.08} fill={accentColor} opacity={0.08} rx="2" />)
    }

    // 额外装饰线/网格
    if (config.accentStyle === 'dots') {
      for (let i = 0; i < 8; i++) {
        const x = (i % 4) * (width * 0.2) + width * 0.15
        const y = Math.floor(i / 4) * (height * 0.3) + height * 0.5
        items.push(<circle key={`dot-${i}`} cx={x} cy={y} r={2.5} fill={accentColor} opacity={0.15} />)
      }
    } else if (config.accentStyle === 'lines') {
      items.push(<line key="tech-line" x1={width * 0.45} y1={0} x2={width * 0.45} y2={height} stroke={accentColor} strokeWidth="1" opacity={0.08} strokeDasharray="4 4" />)
    } else if (config.accentStyle === 'burst') {
      items.push(<circle key="burst1" cx={width * 0.5} cy={height * 0.5} r={35} fill="none" stroke={accentColor} strokeWidth="1" opacity={0.08} />)
      items.push(<circle key="burst2" cx={width * 0.5} cy={height * 0.5} r={50} fill="none" stroke={accentColor} strokeWidth="0.5" opacity={0.05} />)
    } else if (config.accentStyle === 'data') {
      items.push(<line key="d1" x1={width * 0.2} y1={height * 0.8} x2={width * 0.35} y2={height * 0.6} stroke={accentColor} strokeWidth="1.5" opacity={0.12} />)
      items.push(<line key="d2" x1={width * 0.35} y1={height * 0.6} x2={width * 0.5} y2={height * 0.75} stroke={accentColor} strokeWidth="1.5" opacity={0.12} />)
      items.push(<line key="d3" x1={width * 0.5} y1={height * 0.75} x2={width * 0.65} y2={height * 0.5} stroke={accentColor} strokeWidth="1.5" opacity={0.12} />)
      items.push(<line key="d4" x1={width * 0.65} y1={height * 0.5} x2={width * 0.8} y2={height * 0.65} stroke={accentColor} strokeWidth="1.5" opacity={0.12} />)
    } else if (config.accentStyle === 'elegant') {
      items.push(<line key="el1" x1={width * 0.3} y1={0} x2={width * 0.7} y2={0} stroke={accentColor} strokeWidth="3" opacity={0.3} />)
      items.push(<line key="el2" x1={width * 0.3} y1={height} x2={width * 0.7} y2={height} stroke={accentColor} strokeWidth="2" opacity={0.2} />)
    } else if (config.accentStyle === 'gradient') {
      items.push(<rect key="g1" x={width * 0.7} y={0} width={width * 0.08} height={height} fill={accentColor} opacity="0.12" />)
    } else if (config.accentStyle === 'organic') {
      items.push(<path key="org1" d={`M 0 ${height * 0.85} Q ${width * 0.3} ${height * 0.7} ${width * 0.6} ${height * 0.85} T ${width} ${height * 0.8}`} fill="none" stroke={accentColor} strokeWidth="2" opacity={0.15} />)
    }

    // 横线装饰 - 很多模板共有
    items.push(<line key="base-line" x1={width * 0.3} y1={height * 0.55} x2={width * 0.7} y2={height * 0.55} stroke={accentColor} strokeWidth="1.5" opacity={0.25} />)

    return items
  }, [template.name, template.category, theme, width, height])

  return (
    <svg width={width} height={height} className="absolute inset-0" xmlns="http://www.w3.org/2000/svg">
      {/* 渐变叠加 */}
      <defs>
        <linearGradient id={`grad-${template.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c.primary} stopOpacity="0.6" />
          <stop offset="100%" stopColor={c.secondary || c.primary} stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <rect width={width} height={height} fill={`url(#grad-${template.id})`} opacity="0.3" />
      {patterns}
    </svg>
  )
}

export default function TemplateCardPreview({ template, theme }) {
  const width = 200
  const height = 144

  return (
    <div className="h-36 relative overflow-hidden" style={{ background: theme.primary }}>
      <PatternOverlay template={template} theme={theme} width={width} height={height} />
      {/* 模板名称 */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center px-4">
          <div className="text-white font-bold text-shadow-sm" style={{ fontSize: '14px', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
            {template.name}
          </div>
          <div style={{ width: '50%', height: '2px', background: theme.secondary || theme.accent, margin: '6px auto', opacity: 0.8, borderRadius: '1px' }} />
          <div className="text-white/80 text-xs mt-2 font-medium" style={{ fontSize: '11px' }}>
            {template.slides?.length || 4} 页 · {template.category}
          </div>
        </div>
      </div>
    </div>
  )
}
