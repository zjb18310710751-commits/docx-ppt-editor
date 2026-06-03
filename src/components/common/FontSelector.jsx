import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { FONT_LIST, FONT_CATEGORIES } from '../../utils/fonts'

export default function FontSelector({ currentFont, onSelect, size = 'sm' }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('全部')
  const ref = useRef()

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const filtered = FONT_LIST.filter(f => {
    if (activeCategory !== '全部' && f.category !== activeCategory) return false
    if (search && !f.name.toLowerCase().includes(search.toLowerCase()) && !f.family.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg hover:border-blue-300 bg-white transition-colors ${
          size === 'lg' ? 'min-w-[180px]' : 'min-w-[130px]'
        }`}
      >
        <span
          className="truncate text-left flex-1 text-sm"
          style={{ fontFamily: currentFont?.family || 'Microsoft YaHei' }}
        >
          {currentFont?.name || '选择字体'}
        </span>
        <ChevronDown size={14} className="text-gray-400 shrink-0" />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
          {/* Search */}
          <div className="p-2 border-b border-gray-100">
            <div className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 rounded-lg">
              <Search size={14} className="text-gray-400 shrink-0" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="搜索字体..."
                className="bg-transparent outline-none text-sm w-full"
                autoFocus
              />
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex gap-1 px-2 py-2 overflow-x-auto border-b border-gray-100">
            <button
              onClick={() => setActiveCategory('全部')}
              className={`px-2 py-1 rounded-full text-xs whitespace-nowrap shrink-0 transition-colors ${
                activeCategory === '全部' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              全部 ({FONT_LIST.length})
            </button>
            {FONT_CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-2 py-1 rounded-full text-xs whitespace-nowrap shrink-0 transition-colors ${
                  activeCategory === cat.key ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>

          {/* Font list */}
          <div className="max-h-64 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm">未找到匹配字体</div>
            ) : (
              filtered.map(font => (
                <button
                  key={font.family}
                  onClick={() => { onSelect(font); setOpen(false) }}
                  className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex flex-col ${
                    currentFont?.family === font.family ? 'bg-blue-50' : ''
                  }`}
                >
                  <span className="text-sm" style={{ fontFamily: font.family, fontSize: '18px' }}>
                    {font.name} 字体示例
                  </span>
                  <span className="text-xs text-gray-400 mt-0.5">
                    {font.name} · {font.category}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
