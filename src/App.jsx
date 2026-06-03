import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { FileText, Presentation, Home, FileType2 } from 'lucide-react'
import HomePage from './components/HomePage'
import DocumentEditor from './components/DocumentEditor/DocumentEditor'
import PPTMaker from './components/PPTMaker/PPTMaker'
import PDFToWord from './components/PDFToWord/PDFToWord'

function Navbar() {
  const location = useLocation()
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 hover:text-blue-600 transition-colors">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">D</span>
          </div>
          Doc & PPT Studio
        </Link>
        <div className="flex items-center gap-1">
          <Link
            to="/"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === '/' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Home size={18} />
            首页
          </Link>
          <Link
            to="/document"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === '/document' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FileText size={18} />
            文档编辑
          </Link>
          <Link
            to="/ppt"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              location.pathname.startsWith('/ppt') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Presentation size={18} />
            PPT制作
          </Link>
          <Link
            to="/pdf-to-word"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === '/pdf-to-word' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FileType2 size={18} />
            PDF转Word
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/document" element={<DocumentEditor />} />
        <Route path="/ppt" element={<PPTMaker />} />
        <Route path="/pdf-to-word" element={<PDFToWord />} />
      </Routes>
    </div>
  )
}
