import { useState, useCallback, useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Highlight from '@tiptap/extension-highlight'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Code,
  Heading1, Heading2, Heading3, List, ListOrdered, Quote,
  Undo2, Redo2, Link2, ImageIcon, Table2, Highlighter,
  AlignLeft, AlignCenter, AlignRight, Download, FileDown, Eye,
  Upload, FileText
} from 'lucide-react'
import { toPng } from 'html-to-image'
import PptxGenJS from 'pptxgenjs'
import mammoth from 'mammoth'
import FontSelector from '../common/FontSelector'
import { FONT_LIST } from '../../utils/fonts'

const ToolbarButton = ({ onClick, active, title, children, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`toolbar-btn ${active ? 'active' : ''} ${disabled ? 'opacity-30 cursor-not-allowed' : ''}`}
    type="button"
  >
    {children}
  </button>
)

const ToolbarDivider = () => <div className="w-px h-6 bg-gray-200 mx-1" />

export default function DocumentEditor() {
  const [wordCount, setWordCount] = useState(0)
  const [showPreview, setShowPreview] = useState(false)
  const [currentFont, setCurrentFont] = useState(FONT_LIST[0])
  const [importing, setImporting] = useState(false)
  const fileInputRef = useRef(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Link.configure({ openOnClick: false }),
      Image.configure({ allowBase64: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Highlight.configure({ multicolor: true }),
      TextStyle,
      Color,
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none outline-none min-h-[600px] p-8',
      },
    },
    onUpdate: ({ editor }) => {
      setWordCount(editor.storage.characterCount?.characters?.() || editor.getText().length)
    },
    onSelectionUpdate: ({ editor }) => {
      // Detect current font from selection
      const attrs = editor.getAttributes('textStyle')
      if (attrs?.fontFamily) {
        const font = FONT_LIST.find(f => f.family === attrs.fontFamily)
        if (font) setCurrentFont(font)
      } else {
        setCurrentFont(FONT_LIST[0])
      }
    },
    content: `
      <h1>欢迎使用 Doc & PPT Studio</h1>
      <p>这是一款功能强大的在线文档编辑器，支持丰富的文本格式和排版功能。</p>
      <h2>主要功能</h2>
      <ul>
        <li><strong>标题样式</strong> — 支持 H1、H2、H3 三级标题</li>
        <li><strong>文字格式</strong> — 粗体、斜体、下划线、删除线、高亮、颜色</li>
        <li><strong>丰富字体</strong> — 50+ 中英文字体可选</li>
        <li><strong>段落排版</strong> — 左对齐、居中、右对齐</li>
        <li><strong>文件导入</strong> — 支持导入 .docx / .txt / .md 文件</li>
        <li><strong>列表</strong> — 有序列表和无序列表</li>
        <li><strong>引用块</strong> — 优雅的引用样式</li>
        <li><strong>代码块</strong> — 支持代码高亮显示</li>
        <li><strong>表格</strong> — 插入和编辑表格</li>
        <li><strong>图片</strong> — 插入网络图片</li>
        <li><strong>链接</strong> — 添加超链接</li>
      </ul>
      <h2>使用提示</h2>
      <p>选中文字后可以设置字体和格式。编辑完成后可以导出为 PDF 或 PPTX 文件。</p>
      <blockquote>
        <p>好的文档是思想的最佳载体。精心排版能让你的内容更有说服力。</p>
      </blockquote>
    `,
  })

  // Font change handler
  const handleFontChange = useCallback((font) => {
    setCurrentFont(font)
    if (editor) {
      editor.chain().focus().setTextStyle({ fontFamily: font.family }).run()
    }
  }, [editor])

  // Import file
  const handleFileImport = useCallback(async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImporting(true)
    try {
      let content = ''
      const ext = file.name.split('.').pop()?.toLowerCase()

      if (ext === 'docx') {
        const arrayBuffer = await file.arrayBuffer()
        const result = await mammoth.convertToHtml({ arrayBuffer })
        content = result.value
        if (result.messages?.length) {
          console.warn('Mammoth conversion messages:', result.messages)
        }
      } else if (ext === 'txt' || ext === 'md') {
        content = await new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = (e) => resolve(e.target.result)
          reader.onerror = reject
          reader.readAsText(file)
        })
        if (ext === 'md') {
          // Simple markdown to HTML conversion
          content = content
            .replace(/^### (.+)$/gm, '<h3>$1</h3>')
            .replace(/^## (.+)$/gm, '<h2>$1</h2>')
            .replace(/^# (.+)$/gm, '<h1>$1</h1>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/^- (.+)$/gm, '<li>$1</li>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br/>')
          content = '<p>' + content + '</p>'
        } else {
          content = '<p>' + content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>') + '</p>'
        }
      } else {
        alert('不支持的文件格式，请导入 .docx / .txt / .md 文件')
        setImporting(false)
        return
      }

      editor?.chain().focus().insertContent(content).run()
    } catch (err) {
      console.error('文件导入失败:', err)
      alert('文件导入失败: ' + err.message)
    }
    setImporting(false)
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [editor])

  const addLink = useCallback(() => {
    const url = window.prompt('请输入链接地址：', 'https://')
    if (url) {
      editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }
  }, [editor])

  const addImage = useCallback(() => {
    const url = window.prompt('请输入图片地址：', 'https://')
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const addTable = useCallback(() => {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }, [editor])

  const exportPDF = useCallback(async () => {
    const element = document.querySelector('.ProseMirror')
    if (!element) return
    try {
      toPng(element, { quality: 1, pixelRatio: 2 }).then(dataUrl => {
        const link = document.createElement('a')
        link.download = 'document.pdf'
        link.href = dataUrl
        link.click()
      })
    } catch (e) {
      alert('导出失败，请重试')
    }
  }, [])

  const exportPPTX = useCallback(() => {
    const pres = new PptxGenJS()
    const text = editor?.getText() || ''
    const paragraphs = text.split('\n').filter(p => p.trim())

    pres.layout = 'LAYOUT_WIDE'
    pres.author = 'Doc & PPT Studio'
    pres.title = '文档导出'

    const titleSlide = pres.addSlide()
    titleSlide.background = { fill: '#1E40AF' }
    titleSlide.addText('文档导出', { x: 1, y: 1.5, w: 8, h: 2, fontSize: 40, color: 'FFFFFF', bold: true, align: 'center' })
    titleSlide.addText(new Date().toLocaleDateString('zh-CN'), { x: 1, y: 3.5, w: 8, h: 1, fontSize: 18, color: '93C5FD', align: 'center' })

    for (let i = 0; i < paragraphs.length; i += 5) {
      const slide = pres.addSlide()
      slide.background = { fill: 'FFFFFF' }
      const chunk = paragraphs.slice(i, i + 5)
      slide.addText(chunk.map((p, idx) => ({
        text: p + (idx < chunk.length - 1 ? '\n\n' : ''),
        options: { fontSize: 16, color: '1F2937', breakType: 'none' }
      })), { x: 1, y: 0.8, w: 8, h: 4.4, valign: 'top' })
    }

    pres.writeFile({ fileName: 'document.pptx' })
  }, [editor])

  if (!editor) return null

  return (
    <div className="max-w-screen-2xl mx-auto h-[calc(100vh-3.5rem)] flex flex-col">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-1 flex-wrap sticky top-14 z-40">
        <div className="flex items-center gap-0.5">
          <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="撤销 (Ctrl+Z)">
            <Undo2 size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="重做 (Ctrl+Y)">
            <Redo2 size={18} />
          </ToolbarButton>
        </div>
        <ToolbarDivider />

        {/* Font Selector */}
        <FontSelector currentFont={currentFont} onSelect={handleFontChange} size="sm" />

        <ToolbarDivider />
        <div className="flex items-center gap-0.5">
          <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="粗体 (Ctrl+B)">
            <Bold size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="斜体 (Ctrl+I)">
            <Italic size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="下划线 (Ctrl+U)">
            <UnderlineIcon size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="删除线">
            <Strikethrough size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} title="行内代码">
            <Code size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive('highlight')} title="高亮">
            <Highlighter size={18} />
          </ToolbarButton>
        </div>
        <ToolbarDivider />
        <div className="flex items-center gap-0.5">
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="一级标题">
            <Heading1 size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="二级标题">
            <Heading2 size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="三级标题">
            <Heading3 size={18} />
          </ToolbarButton>
        </div>
        <ToolbarDivider />
        <div className="flex items-center gap-0.5">
          <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="左对齐">
            <AlignLeft size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="居中">
            <AlignCenter size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="右对齐">
            <AlignRight size={18} />
          </ToolbarButton>
        </div>
        <ToolbarDivider />
        <div className="flex items-center gap-0.5">
          <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="无序列表">
            <List size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="有序列表">
            <ListOrdered size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="引用">
            <Quote size={18} />
          </ToolbarButton>
        </div>
        <ToolbarDivider />
        <div className="flex items-center gap-0.5">
          <ToolbarButton onClick={addLink} active={editor.isActive('link')} title="插入链接">
            <Link2 size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={addImage} title="插入图片">
            <ImageIcon size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={addTable} title="插入表格">
            <Table2 size={18} />
          </ToolbarButton>
        </div>
        <ToolbarDivider />

        {/* File Import */}
        <div className="flex items-center gap-0.5">
          <input
            ref={fileInputRef}
            type="file"
            accept=".docx,.txt,.md"
            onChange={handleFileImport}
            className="hidden"
            id="file-import"
          />
          <ToolbarButton
            onClick={() => fileInputRef.current?.click()}
            title="导入文档 (.docx/.txt/.md)"
            disabled={importing}
          >
            {importing ? (
              <div className="w-[18px] h-[18px] border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Upload size={18} />
            )}
          </ToolbarButton>
        </div>

        <ToolbarDivider />
        <div className="flex items-center gap-0.5 ml-auto">
          <ToolbarButton onClick={() => setShowPreview(!showPreview)} active={showPreview} title="预览">
            <Eye size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={exportPDF} title="导出PDF">
            <FileDown size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={exportPPTX} title="导出PPTX">
            <Download size={18} />
          </ToolbarButton>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-1 text-xs text-gray-400 flex items-center gap-4">
        <span>{wordCount} 字符</span>
        <span className="text-gray-300">|</span>
        <span>当前字体: {currentFont?.name || '默认'}</span>
        <span className="text-gray-300">|</span>
        <span>支持导入 .docx / .txt / .md 文件</span>
      </div>

      {/* Editor Area */}
      <div className="flex-1 overflow-auto bg-gray-100 flex justify-center">
        <div className={`bg-white shadow-sm my-4 ${showPreview ? 'max-w-3xl' : 'max-w-4xl'} w-full mx-4 rounded-lg transition-all`}>
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  )
}
