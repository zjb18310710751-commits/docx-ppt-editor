import { useState, useCallback, useRef, useEffect } from 'react'
import { Upload, Download, FileText, Trash2, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react'
import { Document, Packer, Paragraph, TextRun } from 'docx'
import { saveAs } from 'file-saver'

let pdfjsLib = null

async function loadPdfJs() {
  if (pdfjsLib) return pdfjsLib
  // Load from CDN dynamically to avoid top-level await build issues
  const script = document.createElement('script')
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.mjs'
  script.type = 'module'
  document.head.appendChild(script)
  await new Promise((resolve, reject) => {
    script.onload = resolve
    script.onerror = reject
  })
  // pdfjsLib is set on window
  pdfjsLib = window.pdfjsLib
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs'
  return pdfjsLib
}

export default function PDFToWord() {
  const [file, setFile] = useState(null)
  const [converting, setConverting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState(null) // { type: 'success'|'error', message: string, data?: any }
  const [extractedPages, setExtractedPages] = useState([])
  const dropRef = useRef(null)

  const handleFileSelect = useCallback((selectedFile) => {
    if (!selectedFile) return
    if (selectedFile.type !== 'application/pdf' && !selectedFile.name.toLowerCase().endsWith('.pdf')) {
      setResult({ type: 'error', message: '请选择 PDF 文件' })
      return
    }
    if (selectedFile.size > 50 * 1024 * 1024) {
      setResult({ type: 'error', message: '文件大小不能超过 50MB' })
      return
    }
    setFile(selectedFile)
    setResult(null)
    setExtractedPages([])
    setProgress(0)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    dropRef.current?.classList.remove('border-blue-500', 'bg-blue-50')
    const f = e.dataTransfer.files[0]
    handleFileSelect(f)
  }, [handleFileSelect])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    dropRef.current?.classList.add('border-blue-500', 'bg-blue-50')
  }, [])

  const handleDragLeave = useCallback(() => {
    dropRef.current?.classList.remove('border-blue-500', 'bg-blue-50')
  }, [])

  const convertPDF = useCallback(async () => {
    if (!file) return
    setConverting(true)
    setProgress(0)
    setResult(null)

    try {
      const lib = await loadPdfJs()
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await lib.getDocument({ data: arrayBuffer }).promise
      const totalPages = pdf.numPages
      const pages = []

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()
        const pageText = textContent.items
          .map(item => item.str)
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim()

        pages.push({
          pageNumber: i,
          text: pageText,
          itemCount: textContent.items.length,
        })

        setProgress(Math.round((i / totalPages) * 100))
      }

      setExtractedPages(pages)

      // Generate .docx — 仅输出原文内容，不添加任何额外信息
      const doc = new Document({
        sections: [{
          properties: {},
          children: pages.map(p =>
            new Paragraph({
              children: [
                new TextRun({
                  text: p.text || '',
                  size: 22,
                }),
              ],
              spacing: { after: 120 },
            })
          ),
        }],
      })

      const blob = await Packer.toBlob(doc)
      setResult({ type: 'success', message: `转换完成！`, blob })
    } catch (err) {
      console.error('PDF转换失败:', err)
      setResult({ type: 'error', message: '转换失败: ' + err.message })
    }
    setConverting(false)
  }, [file])

  const downloadWord = useCallback(() => {
    if (!result?.blob) return
    const fileName = file.name.replace(/\.pdf$/i, '') + '.docx'
    saveAs(result.blob, fileName)
  }, [result, file])

  const reset = () => {
    setFile(null)
    setResult(null)
    setExtractedPages([])
    setProgress(0)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">免费 PDF 转 Word</h1>
        <p className="text-gray-500">
          上传 PDF 文件，一键转换为可编辑的 Word 文档 (.docx)
        </p>
        <p className="text-xs text-gray-400 mt-1">
          完全免费 · 无需注册 · 文件不会上传到服务器 · 在浏览器本地完成转换
        </p>
      </div>

      {!file && (
        <div
          ref={dropRef}
          className="border-2 border-dashed border-gray-300 rounded-2xl p-16 text-center hover:border-blue-400 transition-colors cursor-pointer"
          onClick={() => document.getElementById('pdf-file-input')?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            id="pdf-file-input"
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileSelect(e.target.files[0])}
            className="hidden"
          />
          <Upload size={56} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">点击或拖拽 PDF 文件到此处</h3>
          <p className="text-gray-400 text-sm">支持最大 50MB 的 PDF 文件</p>
        </div>
      )}

      {file && (
        <div className="space-y-4">
          {/* File info */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <FileText size={24} className="text-red-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{file.name}</p>
              <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <button onClick={reset} className="text-gray-400 hover:text-red-500 transition-colors">
              <Trash2 size={20} />
            </button>
          </div>

          {/* Convert button */}
          {!converting && !result && (
            <button
              onClick={convertPDF}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <RefreshCw size={22} />
              开始转换
            </button>
          )}

          {/* Progress */}
          {converting && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-gray-700 font-medium">正在转换中... {progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">
                正在提取文字内容...
              </p>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className={`rounded-xl border p-6 ${
              result.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                {result.type === 'success' ? (
                  <CheckCircle size={24} className="text-green-600" />
                ) : (
                  <AlertCircle size={24} className="text-red-600" />
                )}
                <span className={`font-medium ${result.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                  {result.message}
                </span>
              </div>

              {result.type === 'success' && (
                <div className="flex gap-3">
                  <button
                    onClick={downloadWord}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-lg"
                  >
                    <Download size={20} />
                    下载 Word 文件 (.docx)
                  </button>
                  <button
                    onClick={reset}
                    className="px-6 py-3 border border-gray-300 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    转换其他文件
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Page preview */}
          {extractedPages.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                <h3 className="font-medium text-gray-700">提取的文字预览</h3>
              </div>
              <div className="max-h-96 overflow-y-auto p-4">
                <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {extractedPages.map(p => p.text).join('\n\n') || '(无可提取的文字内容)'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Features */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <CheckCircle size={20} className="text-blue-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">完全免费</h4>
          <p className="text-sm text-gray-500">无需付费，无使用次数限制</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Upload size={20} className="text-green-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">隐私安全</h4>
          <p className="text-sm text-gray-500">文件在浏览器本地处理，不上传服务器</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <FileText size={20} className="text-purple-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">保持格式</h4>
          <p className="text-sm text-gray-500">尽力保留原始排版和文字结构</p>
        </div>
      </div>
    </div>
  )
}
