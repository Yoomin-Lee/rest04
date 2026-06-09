import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { videoCategories, videos } from '../data/videos'
import VideoCard from '../components/VideoCard'
import VideoModal from '../components/VideoModal'

const VIDEOS_PER_PAGE = 6 // 2열 × 3행

export default function Videos() {
  const { category = 'ai' } = useParams()
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [activeModal, setActiveModal] = useState(null)

  // 카테고리 변경 시 페이지 초기화
  useEffect(() => { setPage(1) }, [category])

  const currentCat = videoCategories.find(c => c.key === category) || videoCategories[0]
  const allVideos = videos[category] || []
  const totalPages = Math.ceil(allVideos.length / VIDEOS_PER_PAGE)
  const pageVideos = allVideos.slice((page - 1) * VIDEOS_PER_PAGE, page * VIDEOS_PER_PAGE)

  return (
    <>
      {/* 서브 헤더 */}
      <section className="gradient-hero py-20">
        <div className="mx-auto max-w-container px-4 md:px-10 lg:px-16">
          <div className="flex items-center gap-2 mb-4 text-sm text-white/60">
            <Link to="/" className="hover:text-white transition">홈</Link>
            <span>›</span>
            <span className="text-white">교육 콘텐츠</span>
          </div>
          <div className="flex items-end gap-4">
            <span className="text-5xl">{currentCat.emoji}</span>
            <div>
              <h1 className="text-3xl font-extrabold text-white md:text-4xl">{currentCat.label}</h1>
              <p className="mt-1 text-white/70">{currentCat.desc}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 dark:bg-deep-950 min-h-[60vh]">
        <div className="mx-auto max-w-container px-4 md:px-10 lg:px-16">

          {/* 카테고리 탭 */}
          <div className="mb-10 flex flex-wrap gap-2">
            {videoCategories.map(cat => (
              <button
                key={cat.key}
                type="button"
                onClick={() => navigate(`/videos/${cat.key}`)}
                className={[
                  'tab-btn',
                  cat.key === category ? 'tab-btn-active' : 'tab-btn-inactive',
                ].join(' ')}
              >
                <span>{cat.emoji}</span>
                {cat.label}
                <span className="ml-1 rounded-full bg-black/10 px-2 py-0.5 text-xs">
                  {(videos[cat.key] || []).length}
                </span>
              </button>
            ))}
          </div>

          {/* 페이지 정보 */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-neutral-500 dark:text-primary-300">
              총 <strong className="text-primary-600 dark:text-primary-400">{allVideos.length}개</strong> 강의 ·
              {' '}{page}/{totalPages} 페이지
            </p>
          </div>

          {/* 2×3 동영상 그리드 */}
          {pageVideos.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pageVideos.map(v => (
                <VideoCard key={v.id} video={v} onPlay={setActiveModal} />
              ))}
              {/* 빈 자리 채우기 (6개 미만일 때) */}
              {pageVideos.length < VIDEOS_PER_PAGE &&
                Array.from({ length: VIDEOS_PER_PAGE - pageVideos.length }).map((_, i) => (
                  <div key={`empty-${i}`} className="hidden lg:block" />
                ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="mb-4 text-6xl opacity-30">🎬</span>
              <p className="text-lg font-semibold text-neutral-400 dark:text-primary-400">
                콘텐츠 준비 중입니다
              </p>
              <p className="mt-2 text-sm text-neutral-400 dark:text-primary-400/60">
                곧 새로운 강의를 만나보세요!
              </p>
            </div>
          )}

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <nav className="mt-12 flex items-center justify-center gap-2" aria-label="페이지 네비게이션">
              <button
                type="button"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 dark:border-deep-600 text-neutral-600 dark:text-primary-300 transition hover:border-primary-500 hover:text-primary-600 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="이전 페이지"
              >
                ‹
              </button>

              {Array.from({ length: totalPages }).map((_, i) => {
                const p = i + 1
                const isActive = p === page
                const show = p === 1 || p === totalPages || Math.abs(p - page) <= 1
                if (!show) {
                  if (p === 2 || p === totalPages - 1) {
                    return <span key={p} className="text-neutral-400 dark:text-primary-400/50 px-1">…</span>
                  }
                  return null
                }
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPage(p)}
                    className={[
                      'flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition',
                      isActive
                        ? 'bg-primary-600 text-white shadow-md shadow-primary-400/30'
                        : 'border border-neutral-200 dark:border-deep-600 text-neutral-600 dark:text-primary-300 hover:border-primary-500 hover:text-primary-600',
                    ].join(' ')}
                    aria-label={`${p}페이지`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {p}
                  </button>
                )
              })}

              <button
                type="button"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 dark:border-deep-600 text-neutral-600 dark:text-primary-300 transition hover:border-primary-500 hover:text-primary-600 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="다음 페이지"
              >
                ›
              </button>
            </nav>
          )}
        </div>
      </section>

      {/* 동영상 모달 */}
      {activeModal && (
        <VideoModal video={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </>
  )
}
