import { Link } from 'react-router-dom'
import { FileText, Presentation, Sparkles, Wand2, Palette, Download, FileType2, Upload } from 'lucide-react'

const features = [
  { icon: FileText, title: '富文本编辑', desc: '强大的文档编辑器，支持标题、列表、表格、图片、代码块、丰富字体等50+格式', color: 'from-blue-500 to-cyan-500' },
  { icon: Presentation, title: '60套PPT模板', desc: '13大类别60套精美模板，涵盖商务、教育、科技、创意、医疗等全场景', color: 'from-purple-500 to-pink-500' },
  { icon: FileType2, title: 'PDF转Word', desc: '免费在线转换，浏览器本地处理，文件不上传服务器，安全可靠', color: 'from-rose-500 to-red-500' },
  { icon: Upload, title: '文档导入', desc: '支持导入.docx/.txt/.md文档，无缝编辑和格式转换', color: 'from-teal-500 to-cyan-500' },
  { icon: Palette, title: '丰富字体', desc: '50+中英文字体选择，涵盖宋/黑/楷/仿、衬线/无衬线/等宽/手写各种风格', color: 'from-orange-500 to-red-500' },
  { icon: Download, title: '多格式导出', desc: '支持导出为标准PPTX和Word(docx)格式，兼容Microsoft Office', color: 'from-indigo-500 to-violet-500' },
]

const templateCategories = [
  { name: '商务', emoji: '🏢', count: '5套', desc: '专业商务演示、季度报告、企业介绍' },
  { name: '教育', emoji: '📚', count: '5套', desc: '课件模板、学术报告、培训材料' },
  { name: '营销', emoji: '📢', count: '5套', desc: '产品发布、营销策划、品牌推广' },
  { name: '科技', emoji: '💻', count: '5套', desc: '技术分享、产品路演、科技峰会' },
  { name: '创意', emoji: '🎨', count: '5套', desc: '创意提案、设计展示、头脑风暴' },
  { name: '极简', emoji: '✨', count: '5套', desc: '简约风格、优雅排版、重点突出' },
  { name: '医疗', emoji: '🏥', count: '5套', desc: '医学报告、健康讲座、研究展示' },
  { name: '金融', emoji: '💰', count: '5套', desc: '投资报告、财务分析、商业计划' },
  { name: '科学研究', emoji: '🔬', count: '4套', desc: '科研汇报、实验报告、学术答辩' },
  { name: '自然环保', emoji: '🌿', count: '4套', desc: '环保主题、海洋保护、气候行动' },
  { name: '文化艺术', emoji: '🎵', count: '4套', desc: '国风文化、艺术展览、音乐演出' },
  { name: '竞赛答辩', emoji: '🏆', count: '4套', desc: '创业大赛、挑战杯、奖学金答辩' },
  { name: '互联网', emoji: '📱', count: '4套', desc: '产品设计、SaaS产品、UX评审' },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            文档编辑与PPT制作
            <span className="block text-blue-200 text-2xl md:text-3xl font-normal mt-3">一站式在线创作平台</span>
          </h1>
          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
            强大的富文本文档编辑器 + 60套精美PPT模板 + 免费PDF转Word，让你的创意完美呈现。完全免费，无需安装，打开即用。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/document"
              className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl"
            >
              <FileText size={24} />
              开始编辑文档
            </Link>
            <Link
              to="/ppt"
              className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-500/30 transition-colors"
            >
              <Presentation size={24} />
              制作PPT演示
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">强大功能，专业体验</h2>
        <p className="text-gray-500 text-center mb-12">六大核心功能，满足你所有的文档与演示需求</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
                <Icon size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Template Categories Preview */}
      <section className="bg-white py-20 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">13大类 · 60套精美模板</h2>
          <p className="text-gray-500 text-center mb-12">覆盖商务、教育、科技、创意等所有主流场景</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {templateCategories.map(({ name, emoji, count, desc }) => (
              <Link
                key={name}
                to="/ppt"
                className="group bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-3">{emoji}</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {name} <span className="text-xs text-gray-400 font-normal ml-1">({count})</span>
                </h3>
                <p className="text-xs text-gray-500 mt-1">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">准备好开始创作了吗？</h2>
        <p className="text-gray-500 mb-8">无需下载安装，直接在浏览器中编辑文档和制作精美PPT</p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/document"
            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            开始编辑文档
          </Link>
          <Link
            to="/ppt"
            className="px-8 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors shadow-lg"
          >
            浏览PPT模板
          </Link>
        </div>
      </section>

      {/* Network Access Info */}
      <section className="bg-gray-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-lg font-semibold mb-2">🌐 多设备访问</h3>
          <p className="text-gray-400 text-sm mb-3">
            该网站已在局域网中开放，同一网络下的其他设备可通过以下地址访问：
          </p>
          <div className="inline-flex items-center gap-3 bg-gray-800 rounded-lg px-6 py-3">
            <code className="text-green-400 text-lg font-mono" id="network-url">
              http://{typeof window !== 'undefined' ? window.location.hostname : 'localhost'}:5173
            </code>
            <button
              onClick={() => {
                const url = `http://${window.location.hostname}:5173`
                navigator.clipboard?.writeText(url)
              }}
              className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded transition-colors"
            >
              复制地址
            </button>
          </div>
          <p className="text-gray-500 text-xs mt-3">
            手机、平板、其他电脑均可通过浏览器访问，无需安装任何应用
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-400">
        Doc & PPT Studio — 免费在线文档编辑与PPT制作平台
      </footer>
    </div>
  )
}
