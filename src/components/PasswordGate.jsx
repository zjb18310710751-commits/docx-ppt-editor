import { useState, useEffect } from 'react'
import { Lock, KeyRound } from 'lucide-react'

const AUTH_KEY = 'doc_ppt_studio_auth'
const SITE_PASSWORD = 'My-Drop-Site'

export default function PasswordGate({ children }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user was previously authenticated
    const stored = localStorage.getItem(AUTH_KEY)
    if (stored === btoa(SITE_PASSWORD)) {
      setAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === SITE_PASSWORD) {
      localStorage.setItem(AUTH_KEY, btoa(SITE_PASSWORD))
      setAuthenticated(true)
      setError(false)
    } else {
      setError(true)
      setPassword('')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="w-full max-w-md mx-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Lock size={28} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Doc & PPT Studio</h1>
              <p className="text-blue-200 text-sm mt-2">请输入密码以访问网站</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <KeyRound size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false) }}
                  placeholder="请输入访问密码"
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
              {error && (
                <p className="text-red-400 text-sm text-center">密码错误，请重试</p>
              )}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                验证访问
              </button>
            </form>

            <p className="text-gray-500 text-xs text-center mt-6">
              此网站受密码保护 · Doc & PPT Studio
            </p>
          </div>
        </div>
      </div>
    )
  }

  return children
}
