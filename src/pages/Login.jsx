import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { signInWithEmail, signInWithKakao } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await signInWithEmail(form.email, form.password)
    setLoading(false)
    if (error) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.')
    } else {
      navigate(from, { replace: true })
    }
  }

  async function handleKakao() {
    const { error } = await signInWithKakao()
    if (error) setError('카카오 로그인 중 오류가 발생했습니다.')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">로그인</h1>

        {/* 카카오 로그인 */}
        <button
          onClick={handleKakao}
          className="w-full flex items-center justify-center gap-3 bg-[#FEE500] hover:bg-[#e6ce00] text-gray-900 font-semibold py-3 rounded-xl mb-6 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M10 2C5.582 2 2 4.895 2 8.455c0 2.22 1.38 4.175 3.47 5.32L4.6 17.14a.25.25 0 0 0 .38.27l4.12-2.73c.29.04.59.06.9.06 4.418 0 8-2.895 8-6.455C18 4.895 14.418 2 10 2Z" fill="#191919"/>
          </svg>
          카카오로 로그인
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600" />
          <span className="text-sm text-gray-400">또는</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">이메일</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">비밀번호</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          계정이 없으신가요?{' '}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">회원가입</Link>
        </p>
      </div>
    </div>
  )
}
