import { useState, useCallback, useRef } from 'react'
import {
  Plus, Trash2, Download, Copy, ChevronLeft, ChevronRight,
  Type, Square, ImageIcon, Layout, Eye, Undo2, Redo2,
  Grid3X3, Check, Sparkles, FileText, X, Monitor,
  AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline,
  Layers, Minus, SlidersHorizontal, PaintBucket, RotateCw,
  MoveDiagonal, StretchHorizontal, StretchVertical, Palette, Upload
} from 'lucide-react'
import { allTemplates, categories } from './templates/index'
import { exportPPTX } from '../../utils/exportPPTX'
import FontSelector from '../common/FontSelector'
import { FONT_LIST } from '../../utils/fonts'
import { generateAI_PPT, documentToPPT } from '../../utils/aiGeneratePPT'
import mammoth from 'mammoth'
import TemplateCardPreview from './TemplateCardPreview'

// ── 预设颜色 ──
const PRESET_COLORS = [
  '#000000','#FFFFFF','#1F2937','#4B5563','#9CA3AF','#D1D5DB',
  '#DC2626','#EF4444','#F87171','#FCA5A5',
  '#EA580C','#F97316','#FB923C','#FDBA74',
  '#F59E0B','#FBBF24','#FCD34D','#FDE68A',
  '#16A34A','#22C55E','#4ADE80','#86EFAC',
  '#2563EB','#3B82F6','#60A5FA','#93C5FD',
  '#7C3AED','#8B5CF6','#A78BFA','#C4B5FD',
  '#EC4899','#F43F5E','#FB7185','#FDA4AF',
  '#0EA5E9','#06B6D4','#22D3EE','#67E8F9',
  '#0891B2','#0D9488','#14B8A6','#5EEADB',
]

// ── 幻灯片布局模板 ──
const SLIDE_LAYOUTS = [
  { id: 'blank', name: '空白页', icon: Square, desc: '完全空白，自由创作', elements: [] },
  { id: 'title', name: '标题页', icon: Type, desc: '大标题+副标题', elements: [
    { type: 'text', x: 8, y: 32, w: 84, h: 14, content: '标题文字', fontSize: 40, color: '#1F2937', bold: true, align: 'center' },
    { type: 'text', x: 12, y: 50, w: 76, h: 8, content: '副标题或描述文字', fontSize: 18, color: '#6B7280', align: 'center' },
  ]},
  { id: 'content', name: '内容页', icon: AlignLeft, desc: '标题+正文内容', elements: [
    { type: 'text', x: 5, y: 5, w: 90, h: 8, content: '页面标题', fontSize: 28, color: '#1F2937', bold: true },
    { type: 'text', x: 5, y: 16, w: 90, h: 55, content: '在此输入正文内容...', fontSize: 16, color: '#4B5563' },
  ]},
  { id: 'twoCol', name: '双栏对比', icon: Layout, desc: '左右两栏对比展示', elements: [
    { type: 'text', x: 5, y: 4, w: 90, h: 6, content: '对比标题', fontSize: 26, color: '#1F2937', bold: true },
    { type: 'text', x: 5, y: 14, w: 42, h: 55, content: '左侧内容...', fontSize: 15, color: '#444' },
    { type: 'text', x: 52, y: 14, w: 42, h: 55, content: '右侧内容...', fontSize: 15, color: '#444' },
  ]},
  { id: 'image', name: '图文混排', icon: ImageIcon, desc: '图片+文字布局', elements: [
    { type: 'text', x: 5, y: 4, w: 90, h: 6, content: '图文标题', fontSize: 26, color: '#1F2937', bold: true },
    { type: 'shape', x: 5, y: 16, w: 48, h: 55, color: '#E5E7EB' },
    { type: 'text', x: 58, y: 16, w: 37, h: 55, content: '图片说明文字...', fontSize: 15, color: '#444' },
  ]},
  { id: 'section', name: '章节分隔', icon: Minus, desc: '大标题章节转换页', elements: [
    { type: 'text', x: 10, y: 38, w: 80, h: 12, content: '章节标题', fontSize: 38, color: '#FFFFFF', bold: true, align: 'center' },
    { type: 'text', x: 15, y: 54, w: 70, h: 6, content: '章节描述', fontSize: 15, color: '#D1D5DB', align: 'center' },
  ]},
  { id: 'quote', name: '引用金句', icon: Monitor, desc: '大号引用文字', elements: [
    { type: 'text', x: 12, y: 30, w: 76, h: 20, content: '"引用一句经典名言或金句"', fontSize: 30, color: '#1F2937', align: 'center', italic: true },
    { type: 'text', x: 10, y: 55, w: 80, h: 6, content: '—— 作者/出处', fontSize: 14, color: '#9CA3AF', align: 'center' },
  ]},
  { id: 'stats', name: '数据展示', icon: Layers, desc: '关键数字突出展示', elements: [
    { type: 'text', x: 5, y: 5, w: 90, h: 7, content: '关键数据', fontSize: 28, color: '#1F2937', bold: true },
    { type: 'text', x: 8, y: 22, w: 25, h: 15, content: '85%', fontSize: 44, color: '#2563EB', bold: true, align: 'center' },
    { type: 'text', x: 8, y: 38, w: 25, h: 5, content: '指标A', fontSize: 13, color: '#6B7280', align: 'center' },
    { type: 'text', x: 37, y: 22, w: 25, h: 15, content: '2.4x', fontSize: 44, color: '#16A34A', bold: true, align: 'center' },
    { type: 'text', x: 37, y: 38, w: 25, h: 5, content: '指标B', fontSize: 13, color: '#6B7280', align: 'center' },
    { type: 'text', x: 66, y: 22, w: 25, h: 15, content: '99%', fontSize: 44, color: '#7C3AED', bold: true, align: 'center' },
    { type: 'text', x: 66, y: 38, w: 25, h: 5, content: '指标C', fontSize: 13, color: '#6B7280', align: 'center' },
  ]},
]

// ── Template card ──
function TemplateCard({ template, selected, onSelect, onPreview }) {
  const theme = template.theme
  return (
    <div className={`template-card ${selected ? 'selected' : ''}`} onClick={() => onSelect(template)}>
      <TemplateCardPreview template={template} theme={theme} />
      <div className="p-3">
        <h3 className="font-semibold text-sm text-gray-900">{template.name}</h3>
        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{template.description}</p>
        <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full mt-2 inline-block">{template.category}</span>
      </div>
      {selected && <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center"><Check size={14} className="text-white" /></div>}
      <button onClick={(e) => { e.stopPropagation(); onPreview(template) }}
        className="absolute top-2 left-2 px-2 py-1 bg-white/90 rounded text-xs font-medium hover:bg-white transition-opacity opacity-0 group-hover:opacity-100">预览</button>
    </div>
  )
}

// ── Slide thumbnail ──
function SlideThumbnail({ slide, index, isActive, onClick, onDelete, totalSlides }) {
  const bg = slide.background
  const bgColor = bg?.startsWith('linear-gradient') ? (bg.match(/#[A-Fa-f0-9]{6}/)?.[0] || '#ddd') : (bg || '#fff')
  return (
    <div className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all group ${isActive ? 'border-blue-500 shadow-md scale-105' : 'border-gray-200 hover:border-gray-300'}`}
      onClick={() => onClick(index)}>
      <div className="slide-canvas" style={{ aspectRatio: '16/9', background: bgColor }}>
        <div className="absolute inset-0 p-2 flex flex-col items-center justify-center">
          {slide.elements?.slice(0, 3).map((el, i) => {
            if (el.type === 'text') return (
              <div key={i} className="truncate w-full text-center" style={{ fontSize: Math.max(6, (el.fontSize || 16) * 0.25), color: el.color || '#333', fontWeight: el.bold ? 'bold' : 'normal', marginBottom: '2px', transform: 'scale(0.85)' }}>
                {el.content?.substring(0, 20)}
              </div>
            )
            if (el.type === 'shape') return <div key={i} style={{ width: '60%', height: '4px', background: el.color, marginBottom: '2px', borderRadius: '2px' }} />
            return null
          })}
          <div className="text-xs text-gray-400 mt-1" style={{ fontSize: '8px' }}>{index + 1}</div>
        </div>
      </div>
      {totalSlides > 1 && (
        <button onClick={(e) => { e.stopPropagation(); onDelete(index) }}
          className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Trash2 size={10} />
        </button>
      )}
    </div>
  )
}

// ── Main PPTMaker ──
export default function PPTMaker() {
  const [step, setStep] = useState('gallery')
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [slides, setSlides] = useState([])
  const [editingElement, setEditingElement] = useState(null)
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [showAddSlideMenu, setShowAddSlideMenu] = useState(false)
  const [showAIModal, setShowAIModal] = useState(false)
  const [aiTopic, setAiTopic] = useState('')
  const [aiGenerating, setAiGenerating] = useState(false)
  const [importingDoc, setImportingDoc] = useState(false)
  const fileInputRef = useRef(null)

  const addSlideMenuRef = useRef(null)

  const filteredTemplates = selectedCategory === '全部' ? allTemplates : allTemplates.filter(t => t.category === selectedCategory)

  // ── Template selection ──
  const handleSelectTemplate = useCallback((template) => {
    setSelectedTemplate(template)
    const initialSlides = template.slides.map(s => ({ ...s, elements: s.elements.map(el => ({ ...el })) }))
    setSlides(initialSlides)
    setCurrentSlideIndex(0)
    setEditingElement(null)
    saveHistory(initialSlides)
  }, [])

  // ── History ──
  const saveHistory = (newSlides) => {
    setHistory(prev => [...prev.slice(0, historyIndex + 1), JSON.parse(JSON.stringify(newSlides))])
    setHistoryIndex(prev => prev + 1)
  }

  const undo = () => { if (historyIndex > 0) { const i = historyIndex - 1; setHistoryIndex(i); setSlides(JSON.parse(JSON.stringify(history[i]))) } }
  const redo = () => { if (historyIndex < history.length - 1) { const i = historyIndex + 1; setHistoryIndex(i); setSlides(JSON.parse(JSON.stringify(history[i]))) } }

  // ── Slide ops ──
  const addSlideWithLayout = useCallback((layoutType) => {
    const layout = SLIDE_LAYOUTS.find(l => l.id === layoutType)
    if (!layout) return
    const theme = selectedTemplate?.theme || {}
    const newSlide = {
      layout: layout.id,
      background: layout.id === 'section' ? (theme.primary || '#1E3A5F') : (layout.id === 'blank' ? '#FFFFFF' : (theme.lightBg || '#FFFFFF')),
      elements: layout.elements.map(el => {
        const e = { ...el }
        if (e.type === 'text' && layout.id === 'section') {
          e.color = '#FFFFFF'
        }
        return e
      }),
    }
    const newSlides = [...slides]
    newSlides.splice(currentSlideIndex + 1, 0, newSlide)
    setSlides(newSlides)
    setCurrentSlideIndex(prev => prev + 1)
    saveHistory(newSlides)
    setShowAddSlideMenu(false)
  }, [slides, currentSlideIndex, selectedTemplate])

  const deleteSlide = useCallback((index) => {
    if (slides.length <= 1) return
    const newSlides = slides.filter((_, i) => i !== index)
    setSlides(newSlides)
    if (currentSlideIndex >= newSlides.length) setCurrentSlideIndex(newSlides.length - 1)
    saveHistory(newSlides)
  }, [slides, currentSlideIndex])

  const duplicateSlide = useCallback(() => {
    const newSlides = [...slides]
    newSlides.splice(currentSlideIndex + 1, 0, JSON.parse(JSON.stringify(slides[currentSlideIndex])))
    setSlides(newSlides)
    setCurrentSlideIndex(prev => prev + 1)
    saveHistory(newSlides)
  }, [slides, currentSlideIndex])

  // ── Element ops ──
  const updateElement = useCallback((elementIndex, updates) => {
    const newSlides = [...slides]
    newSlides[currentSlideIndex] = {
      ...newSlides[currentSlideIndex],
      elements: newSlides[currentSlideIndex].elements.map((el, i) => i === elementIndex ? { ...el, ...updates } : el),
    }
    setSlides(newSlides)
  }, [slides, currentSlideIndex])

  const deleteElement = useCallback((elementIndex) => {
    const newSlides = [...slides]
    newSlides[currentSlideIndex] = { ...newSlides[currentSlideIndex], elements: newSlides[currentSlideIndex].elements.filter((_, i) => i !== elementIndex) }
    setSlides(newSlides)
    setEditingElement(null)
    saveHistory(newSlides)
  }, [slides, currentSlideIndex])

  // ── AI Generate ──
  const handleAIGenerate = useCallback(() => {
    if (!aiTopic.trim() || aiTopic.trim().length < 2) return
    setAiGenerating(true)
    setTimeout(() => {
      const result = generateAI_PPT(aiTopic.trim())
      if (result) {
        setSelectedTemplate(result.template)
        setSlides(result.slides.map(s => ({ ...s, elements: s.elements.map(el => ({ ...el })) })))
        setCurrentSlideIndex(0)
        setEditingElement(null)
        setHistory([JSON.parse(JSON.stringify(result.slides))])
        setHistoryIndex(0)
        setStep('edit')
      }
      setAiGenerating(false)
      setShowAIModal(false)
    }, 600)
  }, [aiTopic])

  // ── Document to PPT ──
  const handleDocToPPT = useCallback(() => {
    const editorEl = document.querySelector('.ProseMirror')
    if (!editorEl) { alert('请先在"文档编辑"页面编写文档内容，或使用"导入文档"上传文件'); return }
    const html = editorEl.innerHTML
    if (!html || html.length < 20) { alert('文档内容太少，请编写更多内容后再生成PPT'); return }
    const result = documentToPPT(html)
    applyResult(result)
  }, [])

  const applyResult = useCallback((result) => {
    if (result) {
      setSelectedTemplate(result.template)
      setSlides(result.slides.map(s => ({ ...s, elements: s.elements.map(el => ({ ...el })) })))
      setCurrentSlideIndex(0)
      setEditingElement(null)
      setHistory([JSON.parse(JSON.stringify(result.slides))])
      setHistoryIndex(0)
      setStep('edit')
    }
  }, [])

  // ── Import document file (.docx/.txt/.md) ──
  const handleFileImport = useCallback(async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImportingDoc(true)
    try {
      let htmlContent = ''
      const ext = file.name.split('.').pop()?.toLowerCase()

      if (ext === 'docx') {
        const arrayBuffer = await file.arrayBuffer()
        const result = await mammoth.convertToHtml({ arrayBuffer })
        htmlContent = result.value
      } else if (ext === 'txt' || ext === 'md') {
        const text = await new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = (e) => resolve(e.target.result)
          reader.onerror = reject
          reader.readAsText(file)
        })
        if (ext === 'md') {
          htmlContent = '<h1>' + file.name.replace(/\.\w+$/, '') + '</h1>\n' +
            text
              .replace(/^### (.+)$/gm, '<h3>$1</h3>')
              .replace(/^## (.+)$/gm, '<h2>$1</h2>')
              .replace(/^# (.+)$/gm, '<h1>$1</h1>')
              .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
              .replace(/\n\n/g, '</p><p>')
              .replace(/\n/g, '<br/>')
          htmlContent = '<p>' + htmlContent + '</p>'
        } else {
          htmlContent = '<h1>' + file.name.replace(/\.\w+$/, '') + '</h1>\n<p>' +
            text.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>') + '</p>'
        }
      } else {
        alert('不支持的文件格式，请导入 .docx / .txt / .md 文件')
        setImportingDoc(false)
        return
      }

      const result = documentToPPT(htmlContent)
      if (result) {
        result.template.name = file.name.replace(/\.\w+$/, '')
      }
      applyResult(result)
    } catch (err) {
      console.error('文件导入失败:', err)
      alert('文件导入失败: ' + err.message)
    }
    setImportingDoc(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [applyResult])

  // ── Export ──
  const handleExport = useCallback(() => {
    if (!selectedTemplate) return
    exportPPTX(selectedTemplate, slides)
  }, [selectedTemplate, slides])

  const currentSlide = slides[currentSlideIndex]
  const editingEl = editingElement !== null && currentSlide?.elements?.[editingElement]
  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col">
      {/* Step indicator */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button onClick={() => setStep('gallery')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${step === 'gallery' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`}>
            <Grid3X3 size={16} />选择模板
          </button>
          <ChevronRight size={14} className="text-gray-300" />
          <button onClick={() => selectedTemplate && setStep('edit')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${step === 'edit' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`} disabled={!selectedTemplate}>
            <Layout size={16} />编辑幻灯片
          </button>
          <ChevronRight size={14} className="text-gray-300" />
          <button onClick={() => selectedTemplate && setStep('preview')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${step === 'preview' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`} disabled={!selectedTemplate}>
            <Eye size={16} />预览
          </button>
        </div>
        {selectedTemplate && (
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-gray-500">模板：<span className="font-medium text-gray-700">{selectedTemplate.name}</span></span>
            <span className="text-xs text-gray-400">| {slides.length} 页</span>
          </div>
        )}
      </div>

      {/* ── Gallery ── */}
      {step === 'gallery' && (
        <div className="flex-1 overflow-auto">
          <div className="sticky top-0 bg-gray-50 border-b border-gray-200 px-6 py-3 z-10 flex items-center gap-2 flex-wrap">
            <button onClick={() => setSelectedCategory('全部')} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedCategory === '全部' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>全部 ({allTemplates.length})</button>
            {categories.map(cat => (
              <button key={cat.key} onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat.key ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
                {cat.emoji} {cat.name} ({cat.count})
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <input ref={fileInputRef} type="file" accept=".docx,.txt,.md" onChange={handleFileImport} className="hidden" id="ppt-file-import" />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={importingDoc}
                className="flex items-center gap-1.5 px-4 py-2 bg-white border-2 border-dashed border-orange-400 text-orange-600 rounded-lg text-sm font-medium hover:bg-orange-50 transition-all">
                {importingDoc ? <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" /> : <Upload size={16} />}
                {importingDoc ? '导入中...' : '导入文档'}
              </button>
              <button onClick={handleDocToPPT}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg text-sm font-medium hover:from-green-700 hover:to-teal-700 transition-all shadow-lg">
                <FileText size={16} /> 从编辑器生成
              </button>
              <button onClick={() => setShowAIModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg">
                <Sparkles size={16} /> AI 智能生成
              </button>
            </div>
          </div>

          <div className="p-6">
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-20 text-gray-400"><Grid3X3 size={48} className="mx-auto mb-4 opacity-30" /><p>该分类暂无模板</p></div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredTemplates.map(template => (
                  <TemplateCard key={template.id} template={template} selected={selectedTemplate?.id === template.id} onSelect={handleSelectTemplate}
                    onPreview={(t) => { handleSelectTemplate(t); setStep('preview'); }} />
                ))}
              </div>
            )}
          </div>

          {selectedTemplate && (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between shadow-lg z-30">
              <div><h3 className="font-semibold text-gray-900">{selectedTemplate.name}</h3><p className="text-sm text-gray-500">{selectedTemplate.description}</p></div>
              <div className="flex gap-3">
                <button onClick={() => { handleSelectTemplate(selectedTemplate); setStep('preview'); }} className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">预览模板</button>
                <button onClick={() => setStep('edit')} className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-lg">开始编辑</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Edit ── */}
      {step === 'edit' && currentSlide && (
        <div className="flex-1 flex overflow-hidden">
          {/* Left sidebar */}
          <div className="w-48 bg-white border-r border-gray-200 overflow-y-auto p-3 flex flex-col gap-2">
            {slides.map((slide, index) => (
              <SlideThumbnail key={index} slide={slide} index={index} isActive={index === currentSlideIndex}
                onClick={setCurrentSlideIndex} onDelete={deleteSlide} totalSlides={slides.length} />
            ))}
            {/* Add slide with dropdown */}
            <div className="relative" ref={addSlideMenuRef}>
              <button onClick={() => setShowAddSlideMenu(!showAddSlideMenu)}
                className="w-full flex items-center justify-center gap-1 p-2 border-2 border-dashed border-blue-300 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors text-sm font-medium">
                <Plus size={14} />添加幻灯片
              </button>
              {showAddSlideMenu && (
                <div className="absolute left-0 bottom-full mb-1 w-52 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                  <div className="p-2 text-xs text-gray-400 font-medium border-b border-gray-100">选择布局类型</div>
                  <div className="max-h-64 overflow-y-auto">
                    {SLIDE_LAYOUTS.map(layout => (
                      <button key={layout.id} onClick={() => addSlideWithLayout(layout.id)}
                        className="w-full px-3 py-2.5 text-left hover:bg-blue-50 transition-colors flex items-center gap-3">
                        <layout.icon size={16} className="text-blue-500 shrink-0" />
                        <div><div className="text-sm font-medium text-gray-700">{layout.name}</div><div className="text-xs text-gray-400">{layout.desc}</div></div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="text-xs text-gray-400 text-center">共 {slides.length} 页</div>
          </div>

          {/* Center canvas */}
          <div className="flex-1 flex flex-col bg-gray-100">
            <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-2">
              <button onClick={undo} disabled={!canUndo} className={`toolbar-btn ${!canUndo ? 'opacity-30' : ''}`}><Undo2 size={16} /></button>
              <button onClick={redo} disabled={!canRedo} className={`toolbar-btn ${!canRedo ? 'opacity-30' : ''}`}><Redo2 size={16} /></button>
              <div className="w-px h-5 bg-gray-200 mx-1" />
              <div className="flex items-center gap-0.5">
                {SLIDE_LAYOUTS.slice(1, 5).map(l => (
                  <button key={l.id} onClick={() => addSlideWithLayout(l.id)} className="toolbar-btn flex items-center gap-1 text-xs px-2" title={`添加${l.name}`}>
                    <l.icon size={14} /> {l.name}
                  </button>
                ))}
              </div>
              <div className="w-px h-5 bg-gray-200 mx-1" />
              <button onClick={duplicateSlide} className="toolbar-btn flex items-center gap-1 text-sm"><Copy size={16} /> 复制</button>
              <button onClick={() => deleteSlide(currentSlideIndex)} disabled={slides.length <= 1}
                className={`toolbar-btn flex items-center gap-1 text-sm ${slides.length <= 1 ? 'opacity-30' : ''}`}><Trash2 size={16} /> 删除</button>
              <div className="ml-auto flex items-center gap-2">
                <button onClick={() => setStep('preview')} className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">预览</button>
                <button onClick={handleExport} className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-1">
                  <Download size={14} />导出PPTX</button>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
              <div className="slide-canvas w-full max-w-4xl relative"
                style={{ background: currentSlide.background?.startsWith('linear-gradient') ? currentSlide.background : (currentSlide.background || '#FFFFFF') }}>
                {currentSlide.elements.map((el, index) => {
                  const isEditing = editingElement === index
                  return (
                    <div key={index} className={`absolute cursor-pointer group ${isEditing ? 'ring-2 ring-blue-500 z-10' : 'hover:ring-1 hover:ring-blue-300'}`}
                      style={{ left: `${el.x}%`, top: `${el.y}%`, width: `${el.w}%`, height: `${el.h}%`, opacity: el.opacity ?? 1, transform: el.rotation ? `rotate(${el.rotation}deg)` : undefined }}
                      onClick={() => setEditingElement(index)}
                      onDoubleClick={() => { if (el.type === 'text') { const c = prompt('编辑文字：', el.content); if (c !== null) updateElement(index, { content: c }) } }}>
                      {el.type === 'text' && (
                        <div className="w-full h-full flex items-center"
                          style={{ fontSize: `${Math.max(0.5, (el.fontSize || 16) * (el.w > 50 ? 1 : 0.85))}%`, color: el.color, fontWeight: el.bold ? 'bold' : 'normal',
                            fontStyle: el.italic ? 'italic' : 'normal', textDecoration: el.underline ? 'underline' : 'none',
                            textAlign: el.align || 'left', fontFamily: el.fontFamily || 'inherit', letterSpacing: el.letterSpacing ? `${el.letterSpacing}px` : 'normal' }}>
                          <span className="w-full whitespace-pre-wrap" style={{ lineHeight: el.lineHeight || 1.5 }}>{el.content}</span>
                        </div>
                      )}
                      {el.type === 'shape' && (
                        <div className="w-full h-full rounded-lg"
                          style={{ background: el.color, border: el.borderColor ? `${el.borderWidth || 2}px solid ${el.borderColor}` : 'none', boxShadow: el.shadow ? '0 4px 12px rgba(0,0,0,0.15)' : 'none' }} />
                      )}
                      {el.type === 'line' && (
                        <div style={{ width: '100%', height: `${el.h}%`, borderTop: `${el.lineWidth || 2}px ${el.lineStyle || 'solid'} ${el.color}` }} />
                      )}
                      {isEditing && (
                        <div className="absolute -top-10 left-0 bg-white shadow-lg rounded-lg px-2 py-1.5 flex items-center gap-1.5 z-20 border">
                          {el.type === 'text' && (<>
                            <input type="color" value={el.color || '#000000'} onChange={(e) => updateElement(index, { color: e.target.value })} className="w-5 h-5 rounded cursor-pointer" title="颜色" />
                            <input type="number" value={el.fontSize || 16} onChange={(e) => updateElement(index, { fontSize: Number(e.target.value) })} className="w-12 px-1 py-0.5 border rounded text-xs" min="8" max="200" title="字号" />
                            <button onClick={() => updateElement(index, { bold: !el.bold })} className={`px-1.5 py-0.5 rounded text-xs font-bold ${el.bold ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}>B</button>
                            <button onClick={() => updateElement(index, { italic: !el.italic })} className={`px-1.5 py-0.5 rounded text-xs italic ${el.italic ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}>I</button>
                            <button onClick={() => updateElement(index, { underline: !el.underline })} className={`px-1.5 py-0.5 rounded text-xs underline ${el.underline ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}>U</button>
                            <select value={el.align || 'left'} onChange={(e) => updateElement(index, { align: e.target.value })} className="text-xs border rounded px-1 py-0.5">
                              <option value="left">左</option><option value="center">中</option><option value="right">右</option>
                            </select>
                          </>)}
                          {el.type === 'shape' && (<>
                            <input type="color" value={el.color || '#3B82F6'} onChange={(e) => updateElement(index, { color: e.target.value })} className="w-5 h-5 rounded cursor-pointer" title="填充色" />
                            <input type="color" value={el.borderColor || '#000000'} onChange={(e) => updateElement(index, { borderColor: e.target.value })} className="w-5 h-5 rounded cursor-pointer border-2" title="边框色" />
                          </>)}
                          <button onClick={() => deleteElement(index)} className="px-1.5 py-0.5 rounded text-xs text-red-500 hover:bg-red-50"><Trash2 size={14} /></button>
                        </div>
                      )}
                    </div>
                  )
                })}
                <div className="absolute bottom-2 right-3 text-xs text-gray-400">{currentSlideIndex + 1} / {slides.length}</div>
              </div>
            </div>
          </div>

          {/* ── Enhanced Properties Panel ── */}
          <div className="w-72 bg-white border-l border-gray-200 overflow-y-auto flex flex-col">
            {editingEl ? (
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm text-gray-700">
                    {editingEl.type === 'text' ? '📝 文字属性' : editingEl.type === 'shape' ? '🟦 形状属性' : '📏 线条属性'}
                  </h3>
                  <button onClick={() => setEditingElement(null)} className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
                </div>

                {/* Font - text only */}
                {editingEl.type === 'text' && (
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">字体</label>
                    <FontSelector currentFont={FONT_LIST.find(f => f.family === editingEl.fontFamily) || FONT_LIST[0]}
                      onSelect={(font) => updateElement(editingElement, { fontFamily: font.family })} size="sm" />
                  </div>
                )}

                {/* Text content */}
                {editingEl.type === 'text' && (
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">文字内容</label>
                    <textarea value={editingEl.content || ''} onChange={(e) => updateElement(editingElement, { content: e.target.value })}
                      className="w-full px-2 py-1.5 border rounded text-sm resize-none" rows="3" />
                  </div>
                )}

                {/* Font size with slider */}
                {editingEl.type === 'text' && (
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">字号 ({editingEl.fontSize || 16}px)</label>
                    <div className="flex items-center gap-2">
                      <input type="range" value={editingEl.fontSize || 16} min="8" max="120"
                        onChange={(e) => updateElement(editingElement, { fontSize: Number(e.target.value) })}
                        className="flex-1 h-1.5 accent-blue-600" />
                      <input type="number" value={editingEl.fontSize || 16} min="8" max="120"
                        onChange={(e) => updateElement(editingElement, { fontSize: Number(e.target.value) })}
                        className="w-14 px-1.5 py-0.5 border rounded text-xs text-center" />
                    </div>
                  </div>
                )}

                {/* Color picker with presets */}
                <div>
                  <label className="text-xs text-gray-500 font-medium block mb-1">
                    {editingEl.type === 'text' ? '文字颜色' : editingEl.type === 'shape' ? '填充颜色' : '线条颜色'}
                  </label>
                  <div className="flex items-center gap-2 mb-2">
                    <input type="color" value={editingEl.color || '#000000'}
                      onChange={(e) => updateElement(editingElement, { color: e.target.value })}
                      className="w-8 h-8 rounded cursor-pointer border" />
                    <span className="text-xs text-gray-400">{editingEl.color || '#000'}</span>
                  </div>
                  <div className="grid grid-cols-8 gap-1">
                    {PRESET_COLORS.map(c => (
                      <button key={c} onClick={() => updateElement(editingElement, { color: c })}
                        className="w-6 h-6 rounded-full border border-gray-200 hover:scale-110 transition-transform"
                        style={{ background: c }} title={c} />
                    ))}
                  </div>
                </div>

                {/* Text style toggles */}
                {editingEl.type === 'text' && (
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">文字样式</label>
                    <div className="flex gap-1">
                      <button onClick={() => updateElement(editingElement, { bold: !editingEl.bold })}
                        className={`flex-1 py-1.5 rounded text-sm font-bold ${editingEl.bold ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>B</button>
                      <button onClick={() => updateElement(editingElement, { italic: !editingEl.italic })}
                        className={`flex-1 py-1.5 rounded text-sm italic ${editingEl.italic ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>I</button>
                      <button onClick={() => updateElement(editingElement, { underline: !editingEl.underline })}
                        className={`flex-1 py-1.5 rounded text-sm underline ${editingEl.underline ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>U</button>
                    </div>
                  </div>
                )}

                {/* Alignment */}
                {editingEl.type === 'text' && (
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">对齐方式</label>
                    <div className="flex gap-1">
                      {[{ v: 'left', icon: AlignLeft }, { v: 'center', icon: AlignCenter }, { v: 'right', icon: AlignRight }].map(({ v, icon: Icon }) => (
                        <button key={v} onClick={() => updateElement(editingElement, { align: v })}
                          className={`flex-1 py-1.5 rounded flex justify-center ${(editingEl.align || 'left') === v ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                          <Icon size={14} /></button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Line height */}
                {editingEl.type === 'text' && (
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">行高 ({editingEl.lineHeight || 1.5})</label>
                    <input type="range" value={editingEl.lineHeight || 1.5} min="1" max="3" step="0.1"
                      onChange={(e) => updateElement(editingElement, { lineHeight: Number(e.target.value) })}
                      className="w-full h-1.5 accent-blue-600" />
                    <div className="flex justify-between text-xs text-gray-400"><span>紧凑 1.0</span><span>正常</span><span>宽松 3.0</span></div>
                  </div>
                )}

                {/* Letter spacing */}
                {editingEl.type === 'text' && (
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">字间距 ({editingEl.letterSpacing || 0}px)</label>
                    <input type="range" value={editingEl.letterSpacing || 0} min="0" max="20" step="0.5"
                      onChange={(e) => updateElement(editingElement, { letterSpacing: Number(e.target.value) })}
                      className="w-full h-1.5 accent-blue-600" />
                  </div>
                )}

                {/* Opacity */}
                <div>
                  <label className="text-xs text-gray-500 font-medium block mb-1">不透明度 ({(editingEl.opacity ?? 1) * 100}%)</label>
                  <input type="range" value={(editingEl.opacity ?? 1) * 100} min="10" max="100" step="5"
                    onChange={(e) => updateElement(editingElement, { opacity: Number(e.target.value) / 100 })}
                    className="w-full h-1.5 accent-blue-600" />
                </div>

                {/* Shape border */}
                {editingEl.type === 'shape' && (
                  <>
                    <div>
                      <label className="text-xs text-gray-500 font-medium block mb-1">边框颜色</label>
                      <div className="flex items-center gap-2">
                        <input type="color" value={editingEl.borderColor || '#CCCCCC'}
                          onChange={(e) => updateElement(editingElement, { borderColor: e.target.value })}
                          className="w-8 h-8 rounded cursor-pointer border" />
                        <span className="text-xs text-gray-400">{editingEl.borderColor || '无'}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium block mb-1">边框宽度 ({editingEl.borderWidth || 0}px)</label>
                      <input type="range" value={editingEl.borderWidth || 0} min="0" max="10" step="0.5"
                        onChange={(e) => updateElement(editingElement, { borderWidth: Number(e.target.value) })}
                        className="w-full h-1.5 accent-blue-600" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium block mb-1">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={editingEl.shadow || false}
                            onChange={(e) => updateElement(editingElement, { shadow: e.target.checked })}
                            className="accent-blue-600" />
                          显示阴影
                        </label>
                      </label>
                    </div>
                  </>
                )}

                {/* Rotation */}
                <div>
                  <label className="text-xs text-gray-500 font-medium block mb-1">旋转角度 ({editingEl.rotation || 0}°)</label>
                  <input type="range" value={editingEl.rotation || 0} min="-180" max="180" step="1"
                    onChange={(e) => updateElement(editingElement, { rotation: Number(e.target.value) })}
                    className="w-full h-1.5 accent-blue-600" />
                </div>

                {/* Position & Size */}
                <div>
                  <label className="text-xs text-gray-500 font-medium block mb-2">位置与大小</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[{ label: 'X', key: 'x', max: 100 }, { label: 'Y', key: 'y', max: 100 },
                      { label: 'W', key: 'w', max: 100 }, { label: 'H', key: 'h', max: 100 }].map(({ label, key, max }) => (
                      <div key={key}>
                        <label className="text-xs text-gray-400">{label} (%)</label>
                        <input type="number" value={editingEl[key] || 0} min="0" max={max}
                          onChange={(e) => updateElement(editingElement, { [key]: Number(e.target.value) })}
                          className="w-full px-1.5 py-1 border rounded text-xs" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delete */}
                <button onClick={() => deleteElement(editingElement)}
                  className="w-full py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                  删除此元素
                </button>
              </div>
            ) : (
              <div className="p-4 flex-1 flex flex-col items-center justify-center text-center">
                <SlidersHorizontal size={40} className="text-gray-300 mb-3" />
                <p className="text-sm text-gray-400">点击画布中的元素<br/>即可编辑属性</p>
                <div className="mt-4 text-xs text-gray-400 space-y-1">
                  <p>💡 点击元素选中</p>
                  <p>✏️ 双击文字可直接编辑</p>
                  <p>🖱️ 拖动滑块调整参数</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Preview ── */}
      {step === 'preview' && currentSlide && (
        <div className="flex-1 flex flex-col bg-gray-900">
          <div className="bg-gray-800 px-6 py-3 flex items-center justify-between">
            <button onClick={() => setStep(selectedTemplate ? 'edit' : 'gallery')} className="text-gray-300 hover:text-white flex items-center gap-1 text-sm">
              <ChevronLeft size={16} />{selectedTemplate ? '返回编辑' : '返回模板库'}</button>
            <span className="text-gray-400 text-sm">第 {currentSlideIndex + 1} / {slides.length} 页</span>
            <button onClick={handleExport} className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-1">
              <Download size={14} />导出PPTX</button>
          </div>
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="relative w-full max-w-5xl">
              <div className="slide-canvas w-full shadow-2xl"
                style={{ background: currentSlide.background?.startsWith('linear-gradient') ? currentSlide.background : (currentSlide.background || '#FFFFFF') }}>
                {currentSlide.elements.map((el, index) => (
                  <div key={index} className="absolute"
                    style={{ left: `${el.x}%`, top: `${el.y}%`, width: `${el.w}%`, height: `${el.h}%`, opacity: el.opacity ?? 1, transform: el.rotation ? `rotate(${el.rotation}deg)` : undefined }}>
                    {el.type === 'text' && (
                      <div className="w-full h-full flex items-center"
                        style={{ fontSize: `${Math.max(0.5, (el.fontSize || 16) * 1.2)}%`, color: el.color, fontWeight: el.bold ? 'bold' : 'normal', fontStyle: el.italic ? 'italic' : 'normal',
                          textDecoration: el.underline ? 'underline' : 'none', textAlign: el.align || 'left', fontFamily: el.fontFamily || 'inherit',
                          letterSpacing: el.letterSpacing ? `${el.letterSpacing}px` : 'normal' }}>
                        <span className="w-full whitespace-pre-wrap" style={{ lineHeight: el.lineHeight || 1.5 }}>{el.content}</span>
                      </div>
                    )}
                    {el.type === 'shape' && <div className="w-full h-full rounded-lg"
                      style={{ background: el.color, border: el.borderColor ? `${el.borderWidth || 2}px solid ${el.borderColor}` : 'none', boxShadow: el.shadow ? '0 4px 12px rgba(0,0,0,0.15)' : 'none' }} />}
                    {el.type === 'line' && <div style={{ width: '100%', height: `${el.h}%`, borderTop: `${el.lineWidth || 2}px ${el.lineStyle || 'solid'} ${el.color}` }} />}
                  </div>
                ))}
              </div>
              {slides.length > 1 && (<>
                <button onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))} disabled={currentSlideIndex === 0}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-12 h-12 rounded-full flex items-center justify-center ${currentSlideIndex === 0 ? 'text-gray-600 bg-gray-700 cursor-not-allowed' : 'text-white bg-gray-700 hover:bg-gray-600'}`}>
                  <ChevronLeft size={28} /></button>
                <button onClick={() => setCurrentSlideIndex(prev => Math.min(slides.length - 1, prev + 1))} disabled={currentSlideIndex === slides.length - 1}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-12 h-12 rounded-full flex items-center justify-center ${currentSlideIndex === slides.length - 1 ? 'text-gray-600 bg-gray-700 cursor-not-allowed' : 'text-white bg-gray-700 hover:bg-gray-600'}`}>
                  <ChevronRight size={28} /></button>
              </>)}
            </div>
          </div>
          {slides.length > 1 && (
            <div className="bg-gray-800 py-3 flex justify-center gap-2">
              {slides.map((_, i) => (
                <button key={i} onClick={() => setCurrentSlideIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentSlideIndex ? 'bg-blue-500 w-8' : 'bg-gray-600 hover:bg-gray-500'}`} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── AI Generation Modal ── */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setShowAIModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4 animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">AI 智能生成 PPT</h2>
                <p className="text-sm text-gray-500">输入主题，AI 将自动匹配模板并生成完整演示文稿</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">📌 请输入PPT主题</label>
                <input value={aiTopic} onChange={e => setAiTopic(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleAIGenerate() }}
                  placeholder="例如：公司年度总结报告、新产品发布方案、毕业设计答辩..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  autoFocus />
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">🤖 AI 将自动完成：</h4>
                <div className="space-y-1.5 text-sm text-gray-500">
                  <div className="flex items-center gap-2"><Check size={14} className="text-green-500 shrink-0" /> 智能匹配最优模板和配色</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-green-500 shrink-0" /> 自动生成封面、目录、内容、总结页</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-green-500 shrink-0" /> 根据主题类型调整页面结构</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-green-500 shrink-0" /> 生成后可自由编辑和修改</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAIModal(false)}
                className="flex-1 py-2.5 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">取消</button>
              <button onClick={handleAIGenerate} disabled={aiTopic.trim().length < 2 || aiGenerating}
                className="flex-1 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl text-sm font-medium hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg">
                {aiGenerating ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Sparkles size={16} />}
                {aiGenerating ? '生成中...' : '开始生成'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
