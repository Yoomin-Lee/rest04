import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

const MAX_FILE_SIZE = 10 * 1024 * 1024

export default function BoardEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [form, setForm] = useState({ title: '', content: '' })
  const [existingFiles, setExistingFiles] = useState([])
  const [newFiles, setNewFiles] = useState([])
  const [deleteFileIds, setDeleteFileIds] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchPost()
    fetchFiles()
  }, [id])

  async function fetchPost() {
    const { data } = await supabase.from('posts').select('*').eq('id', id).single()
    if (!data || data.user_id !== user?.id) {
      navigate('/board')
      return
    }
    setForm({ title: data.title, content: data.content })
    setLoading(false)
  }

  async function fetchFiles() {
    const { data } = await supabase.from('post_files').select('*').eq('post_id', id)
    setExistingFiles(data || [])
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
    setNewFiles(prev => [...prev, ...valid])
    e.target.value = ''
  }

  function toggleDeleteFile(fileId) {
    setDeleteFileIds(prev =>
      prev.includes(fileId) ? prev.filter(i => i !== fileId) : [...prev, fileId]
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.title.trim() || !form.content.trim()) {
      setError('제목과 내용을 입력해주세요.')
      return
    }

    setSaving(true)
    try {
      await supabase
        .from('posts')
        .update({ title: form.title.trim(), content: form.content.trim(), updated_at: new Date().toISOString() })
        .eq('id', id)

      // 삭제할 파일 처리
      for (const fileId of deleteFileIds) {
        const f = existingFiles.find(f => f.id === fileId)
        if (f) {
          await supabase.storage.from('post-files').remove([f.file_path])
          await supabase.from('post_files').delete().eq('id', fileId)
        }
      }

      // 새 파일 업로드
      for (const file of newFiles) {
        const filePath = `${user.id}/${id}/${Date.now()}_${file.name}`
        const { error: uploadError } = await supabase.storage.from('post-files').upload(filePath, file)
        if (!uploadError) {
          await supabase.from('post_files').insert({
            post_id: Number(id),
            user_id: user.id,
            file_name: file.name,
            file_path: filePath,
            file_size: file.size,
            mime_type: file.type,
          })
        }
      }

      navigate(`/board/${id}`)
    } catch {
      setError('저장 중 오류가 발생했습니다.')
    } finally {
      setSaving(false)
    }
  }

  function formatBytes(bytes) {
    if (!bytes) return ''
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  }

  if (loading) return <div className="text-center py-20 text-gray-400">불러오는 중...</div>

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link to={`/board/${id}`} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 mb-6">
        ← 돌아가기
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">글 수정</h1>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">제목</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          />
        </div>

        {/* 기존 첨부파일 */}
        {existingFiles.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">기존 첨부파일</label>
            <ul className="space-y-2">
              {existingFiles.map(f => (
                <li key={f.id} className="flex items-center gap-2 text-sm">
                  <span className={`flex-1 truncate ${deleteFileIds.includes(f.id) ? 'line-through text-gray-400' : 'text-gray-600 dark:text-gray-400'}`}>
                    {f.file_name} {f.file_size && <span className="text-gray-400">({formatBytes(f.file_size)})</span>}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleDeleteFile(f.id)}
                    className={`text-xs px-2 py-1 rounded ${deleteFileIds.includes(f.id) ? 'bg-gray-200 text-gray-600' : 'bg-red-100 text-red-600 hover:bg-red-200'}`}
                  >
                    {deleteFileIds.includes(f.id) ? '취소' : '삭제'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 새 파일 첨부 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            파일 추가 <span className="text-gray-400 font-normal">(최대 10MB)</span>
          </label>
          <label className="inline-flex items-center gap-2 cursor-pointer bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl text-sm transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            파일 선택
            <input type="file" multiple onChange={handleFileChange} className="hidden" />
          </label>
          {newFiles.length > 0 && (
            <ul className="mt-2 space-y-1">
              {newFiles.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex-1 truncate">{f.name}</span>
                  <span className="text-gray-400">{formatBytes(f.size)}</span>
                  <button type="button" onClick={() => setNewFiles(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600">✕</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {saving ? '저장 중...' : '수정 완료'}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/board/${id}`)}
            className="px-6 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 rounded-xl transition-colors"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  )
}
