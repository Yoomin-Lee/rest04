import { useEffect } from 'react'
import Icon from './Icon'

// YouTube 영상 모달 — 외부 클릭 또는 ESC로 닫기
export default function VideoModal({ video, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const isPlaceholder = !video.videoId || video.videoId === 'REPLACE_VIDEO_ID'

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl"
        onClick={e => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          type="button"
          aria-label="닫기"
          onClick={onClose}
          className="absolute -top-10 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/40"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {/* 영상 정보 */}
        <div className="mb-3 px-1">
          <h3 className="text-base font-bold text-white md:text-lg">{video.title}</h3>
          {video.instructor && (
            <p className="mt-1 text-sm text-primary-300">{video.instructor} · {video.date}</p>
          )}
        </div>

        {/* YouTube embed */}
        <div className="yt-embed-wrap overflow-hidden rounded-xl shadow-2xl">
          {isPlaceholder ? (
            <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-4 bg-deep text-white">
              <Icon name="film" size={48} className="text-white/30" />
              <p className="text-center text-sm opacity-70">
                videos.js에서 실제 YouTube 영상 ID로 교체하세요
              </p>
              <code className="rounded bg-white/10 px-3 py-1 text-xs">videoId: 'YOUTUBE_VIDEO_ID'</code>
            </div>
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        {/* 설명 */}
        {video.desc && (
          <p className="mt-3 px-1 text-sm leading-relaxed text-white/70">{video.desc}</p>
        )}
      </div>
    </div>
  )
}
