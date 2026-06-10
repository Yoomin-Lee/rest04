import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export default function BoardWrite() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', content: '' })
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  if (!user) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="mb-4">로그인이 필요합니다.</p>
        <Link to="/login" className="text-blue-600 hover:underline">로그인하기</Link>
      </div>
    )
  }

  function handleFileChange(e) {
    const selected = Array.from(e.target.files)
    const valid = selected.filter(f => {
      if (f.size > MAX_FILE_SIZE) {
        setError(`${f.name}: 파일 크기는 10MB 이하여야 합니다.`)
        return false
      }
      return true
    })
    setFiles(prev => [...prev, ...valid])
    e.target.value = ''
  }

  function removeFile(index) {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.title.trim() || !form.content.trim()) {
      setError('제목과 내용을 입력해주세요.')
      return
    }

    setUploading(true)
    try {
      // 게시글 저장
      const { data: post, error: postError } = await supabase
        .from('posts')
        .insert({ title: form.title.trim(), content: form.content.trim(), user_id: user.id })
        .select()
        .single()

      if (postError) throw postError

      // 파일 업로드
      for (const file of files) {
        const filePath = `${user.id}/${post.id}/${Date.now()}_${file.name}`
        const { error: uploadError } = await supabase.storage
          .from('post-files')
          .upload(filePath, file)

        if (!uploadError) {
          await supabase.from('post_files').insert({
            post_id: post.id,
            user_id: user.id,
            file_name: file.name,
            file_path: filePath,
            file_size: file.size,
            mime_type: file.type,
          })
        }
      }

      navigate(`/board/${post.id}`)
    } catch (err) {
      setError('게시글 저장 중 오류가 발생했습니다.')
    } finally {
      setUploading(false)
    }
  }

  function formatBytes(bytes) {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link to="/board" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 mb-6">
        ← 목록으로
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">글 쓰기</h1>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">제목</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="제목을 입력하세요"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">내용</label>
          <textarea
            required
            rows={12}
            value={form.content}
            onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            placeholder="내용을 입력하세요"
          />
        </div>

        {/* 파일 첨부 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            파일 첨부 <span className="text-gray-400 font-normal">(최대 10MB)</span>
          </label>
          <label className="inline-flex items-center gap-2 cursor-pointer bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl text-sm transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            파일 선택
            <input type="file" multiple onChange={handleFileChange} className="hidden" />
          </label>

          {files.length > 0 && (
            <ul className="mt-3 space-y-2">
              {files.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="flex-1 truncate">{f.name}</span>
                  <span className="text-gray-400 shrink-0">{formatBytes(f.size)}</span>
                  <button type="button" onClick={() => removeFile(i)} className="text-red-400 hover:text-red-600 shrink-0">✕</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={uploading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {uploading ? '저장 중...' : '등록'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/board')}
            className="px-6 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 rounded-xl transition-colors"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  )
}
