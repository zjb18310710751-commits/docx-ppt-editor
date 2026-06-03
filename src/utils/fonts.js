// 丰富的字体选择 - 覆盖中英文常用字体
export const FONT_LIST = [
  // === 中文字体（宋/黑/楷/仿 四大印刷体）===
  { name: '微软雅黑', family: 'Microsoft YaHei, sans-serif', category: '中文-无衬线' },
  { name: '黑体', family: 'SimHei, sans-serif', category: '中文-无衬线' },
  { name: '思源黑体', family: 'Noto Sans SC, sans-serif', category: '中文-无衬线' },
  { name: '苹方', family: 'PingFang SC, sans-serif', category: '中文-无衬线' },
  { name: '冬青黑体', family: 'Hiragino Sans GB, sans-serif', category: '中文-无衬线' },

  { name: '宋体', family: 'SimSun, serif', category: '中文-衬线' },
  { name: '思源宋体', family: 'Noto Serif SC, serif', category: '中文-衬线' },
  { name: '华文宋体', family: 'STSong, serif', category: '中文-衬线' },
  { name: '新宋体', family: 'NSimSun, serif', category: '中文-衬线' },

  { name: '楷体', family: 'KaiTi, serif', category: '中文-手写/楷体' },
  { name: '华文楷体', family: 'STKaiti, serif', category: '中文-手写/楷体' },
  { name: '华文行楷', family: 'STXingkai, cursive', category: '中文-手写/楷体' },

  { name: '仿宋', family: 'FangSong, serif', category: '中文-仿宋' },
  { name: '华文仿宋', family: 'STFangsong, serif', category: '中文-仿宋' },

  { name: '幼圆', family: 'YouYuan, sans-serif', category: '中文-艺术' },
  { name: '华文细黑', family: 'STXihei, sans-serif', category: '中文-艺术' },
  { name: '华文隶书', family: 'STLiti, cursive', category: '中文-艺术' },
  { name: '华文新魏', family: 'STXinwei, cursive', category: '中文-艺术' },

  // === 英文字体 ===
  { name: 'Arial', family: 'Arial, sans-serif', category: '英文-无衬线' },
  { name: 'Helvetica', family: 'Helvetica, sans-serif', category: '英文-无衬线' },
  { name: 'Verdana', family: 'Verdana, sans-serif', category: '英文-无衬线' },
  { name: 'Tahoma', family: 'Tahoma, sans-serif', category: '英文-无衬线' },
  { name: 'Trebuchet MS', family: 'Trebuchet MS, sans-serif', category: '英文-无衬线' },
  { name: 'Calibri', family: 'Calibri, sans-serif', category: '英文-无衬线' },
  { name: 'Segoe UI', family: 'Segoe UI, sans-serif', category: '英文-无衬线' },
  { name: 'Roboto', family: 'Roboto, sans-serif', category: '英文-无衬线' },
  { name: 'Open Sans', family: 'Open Sans, sans-serif', category: '英文-无衬线' },
  { name: 'Lato', family: 'Lato, sans-serif', category: '英文-无衬线' },
  { name: 'Montserrat', family: 'Montserrat, sans-serif', category: '英文-无衬线' },
  { name: 'Poppins', family: 'Poppins, sans-serif', category: '英文-无衬线' },

  { name: 'Times New Roman', family: 'Times New Roman, serif', category: '英文-衬线' },
  { name: 'Georgia', family: 'Georgia, serif', category: '英文-衬线' },
  { name: 'Garamond', family: 'Garamond, serif', category: '英文-衬线' },
  { name: 'Playfair Display', family: 'Playfair Display, serif', category: '英文-衬线' },
  { name: 'Merriweather', family: 'Merriweather, serif', category: '英文-衬线' },
  { name: 'Libre Baskerville', family: 'Libre Baskerville, serif', category: '英文-衬线' },

  { name: 'Courier New', family: 'Courier New, monospace', category: '英文-等宽' },
  { name: 'Consolas', family: 'Consolas, monospace', category: '英文-等宽' },
  { name: 'Source Code Pro', family: 'Source Code Pro, monospace', category: '英文-等宽' },
  { name: 'JetBrains Mono', family: 'JetBrains Mono, monospace', category: '英文-等宽' },
  { name: 'Fira Code', family: 'Fira Code, monospace', category: '英文-等宽' },

  { name: 'Comic Sans MS', family: 'Comic Sans MS, cursive', category: '英文-手写/趣味' },
  { name: 'Pacifico', family: 'Pacifico, cursive', category: '英文-手写/趣味' },
  { name: 'Dancing Script', family: 'Dancing Script, cursive', category: '英文-手写/趣味' },
  { name: 'Caveat', family: 'Caveat, cursive', category: '英文-手写/趣味' },

  { name: 'Impact', family: 'Impact, sans-serif', category: '英文-展示' },
  { name: 'Oswald', family: 'Oswald, sans-serif', category: '英文-展示' },
  { name: 'Bebas Neue', family: 'Bebas Neue, sans-serif', category: '英文-展示' },
]

// 按分类分组
export const FONT_CATEGORIES = [
  { key: '中文-无衬线', label: '中文 · 无衬线', emoji: '🔤' },
  { key: '中文-衬线', label: '中文 · 衬线', emoji: '📖' },
  { key: '中文-手写/楷体', label: '中文 · 手写/楷体', emoji: '✍️' },
  { key: '中文-仿宋', label: '中文 · 仿宋', emoji: '📜' },
  { key: '中文-艺术', label: '中文 · 艺术', emoji: '🎨' },
  { key: '英文-无衬线', label: '英文 · Sans-serif', emoji: 'Aa' },
  { key: '英文-衬线', label: '英文 · Serif', emoji: '𝐀𝐚' },
  { key: '英文-等宽', label: '英文 · Monospace', emoji: '⌨️' },
  { key: '英文-手写/趣味', label: '英文 · Handwriting', emoji: '🖊️' },
  { key: '英文-展示', label: '英文 · Display', emoji: '🏷️' },
]

export function getFontByFamily(family) {
  return FONT_LIST.find(f => f.family.includes(family)) || FONT_LIST[0]
}

export function getDefaultFont(category = '中文-无衬线') {
  return FONT_LIST.find(f => f.category === category) || FONT_LIST[0]
}
