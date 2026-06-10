import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export default function BoardDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [post, setPost] = useState(null)
  const [files, setFiles] = useState([])
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchPost()
    fetchFiles()
    fetchComments()
    supabase.rpc('pawedu_increment_post_views', { post_id: Number(id) })
  }, [id])

  async function fetchPost() {
    const { data } = await supabase
      .from('pawedu_posts')
      .select('*, pawedu_profiles(nickname, avatar_url)')
      .eq('id', id)
      .single()
    setPost(data)
    setLoading(false)
  }

  async function fetchFiles() {
    const { data } = await supabase
      .from('pawedu_post_files')
      .select('*')
      .eq('post_id', id)
    setFiles(data || [])
  }

  async function fetchComments() {
    const { data } = await supabase
      .from('pawedu_comments')
      .select('*, pawedu_profiles(nickname, avatar_url)')
      .eq('post_id', id)
      .order('created_at', { ascending: true })
    setComments(data || [])
  }

  async function handleDelete() {
    if (!confirm('게시글을 삭제하시겠습니까?')) return
    // 첨부파일 Storage에서도 삭제
    for (const f of files) {
      await supabase.storage.from('pawedu-files').remove([f.file_path])
    }
    await supabase.from('pawedu_posts').delete().eq('id', id)
    navigate('/board')
  }

  async function handleCommentSubmit(e) {
    e.preventDefault()
    if (!commentText.trim()) return
    setSubmitting(true)
    await supabase.from('pawedu_comments').insert({ post_id: Number(id), user_id: user.id, content: commentText.trim() })
    setCommentText('')
    await fetchComments()
    setSubmitting(false)
  }

  async function handleCommentDelete(commentId) {
    if (!confirm('댓글을 삭제하시겠습니까?')) return
    await supabase.from('pawedu_comments').delete().eq('id', commentId)
    await fetchComments()
  }

  function formatBytes(bytes) {
    if (!bytes) return ''
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  }

  if (loading) return <div className="text-center py-20 text-gray-400">불러오는 중...</div>
  if (!post) return <div className="text-center py-20 text-gray-400">게시글을 찾을 수 없습니다.</div>

  const isAuthor = user?.id === post.user_id

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* 목록으로 */}
      <Link to="/board" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 mb-6">
        ← 목록으로
      </Link>

      {/* 게시글 헤더 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{post.title}</h1>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-3">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              {post.pawedu_profiles?.nickname || '알 수 없음'}
            </span>
            <span>{new Date(post.created_at).toLocaleString('ko-KR')}</span>
            <span>조회 {post.views}</span>
          </div>
          {isAuthor && (
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/board/${id}/edit`)}
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700 font-medium"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 본문 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mb-4">
        <div
          className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed"
        >
          {post.content}
        </div>
      </div>

      {/* 첨부파일 */}
      {files.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mb-4">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">첨부파일</h3>
          <ul className="space-y-2">
            {files.map(f => {
              const { data } = supabase.storage.from('pawedu-files').getPublicUrl(f.file_path)
              return (
                <li key={f.id}>
                  <a
                    href={data.publicUrl}
                    target="_blank"
                    rel="noreferrer"
                    download={f.file_name}
                    className="flex items-center gap-2 text-blue-600 hover:underline text-sm"
                  >
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {f.file_name}
                    {f.file_size && <span className="text-gray-400">({formatBytes(f.file_size)})</span>}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {/* 댓글 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
        <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">
          댓글 <span className="text-blue-500">{comments.length}</span>
        </h3>

        <ul className="space-y-4 mb-6">
          {comments.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-4">첫 댓글을 작성해보세요.</p>
          )}
          {comments.map(c => (
            <li key={c.id} className="flex gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {c.pawedu_profiles?.nickname || '알 수 없음'}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      {new Date(c.created_at).toLocaleString('ko-KR')}
                    </span>
                    {user?.id === c.user_id && (
                      <button
                        onClick={() => handleCommentDelete(c.id)}
                        className="text-xs text-red-400 hover:text-red-600"
                      >
                        삭제
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{c.content}</p>
              </div>
            </li>
          ))}
        </ul>

        {user ? (
          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <textarea
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              rows={2}
              placeholder="댓글을 입력하세요"
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 rounded-xl text-sm font-semibold transition-colors self-stretch"
            >
              등록
            </button>
          </form>
        ) : (
          <p className="text-sm text-gray-400 text-center">
            <Link to="/login" className="text-blue-500 hover:underline">로그인</Link>하면 댓글을 작성할 수 있습니다.
          </p>
        )}
      </div>
    </div>
  )
}
