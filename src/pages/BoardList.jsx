import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

const PAGE_SIZE = 10

export default function BoardList() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [page, search])

  async function fetchPosts() {
    setLoading(true)
    const from = (page - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    let query = supabase
      .from('posts')
      .select('id, title, created_at, views, user_id, profiles(nickname)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)

    if (search) {
      query = query.ilike('title', `%${search}%`)
    }

    const { data, count } = await query
    setPosts(data || [])
    setTotal(count || 0)
    setLoading(false)
  }

  function handleSearch(e) {
    e.preventDefault()
    setPage(1)
    setSearch(searchInput)
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">게시판</h1>
        {user && (
          <button
            onClick={() => navigate('/board/write')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors"
          >
            글 쓰기
          </button>
        )}
      </div>

      {/* 검색 */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          placeholder="제목 검색"
          className="flex-1 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <button
          type="submit"
          className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          검색
        </button>
      </form>

      {/* 테이블 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
            <tr>
              <th className="px-4 py-3 text-left w-12">번호</th>
              <th className="px-4 py-3 text-left">제목</th>
              <th className="px-4 py-3 text-left w-28">작성자</th>
              <th className="px-4 py-3 text-left w-28">날짜</th>
              <th className="px-4 py-3 text-right w-16">조회</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-gray-400">불러오는 중...</td>
              </tr>
            ) : posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-gray-400">게시글이 없습니다.</td>
              </tr>
            ) : posts.map((post, idx) => (
              <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-4 py-3 text-gray-400">{total - (page - 1) * PAGE_SIZE - idx}</td>
                <td className="px-4 py-3">
                  <Link
                    to={`/board/${post.id}`}
                    className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                  >
                    {post.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                  {post.profiles?.nickname || '알 수 없음'}
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                  {new Date(post.created_at).toLocaleDateString('ko-KR')}
                </td>
                <td className="px-4 py-3 text-right text-gray-400">{post.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-1 mt-6">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30"
          >
            이전
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                p === page
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30"
          >
            다음
          </button>
        </div>
      )}
    </div>
  )
}
