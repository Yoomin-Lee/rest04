// YouTube 동영상 카드 — 썸네일 클릭 시 onPlay 콜백 실행
export default function VideoCard({ video, onPlay }) {
  const thumb =
    video.videoId && video.videoId !== 'REPLACE_VIDEO_ID'
      ? `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`
      : null

  return (
    <div className="group card-base overflow-hidden">
      {/* 썸네일 */}
      <button
        type="button"
        aria-label={`${video.title} 재생`}
        className="relative block w-full overflow-hidden"
        style={{ aspectRatio: '16/9' }}
        onClick={() => onPlay && onPlay(video)}
      >
        {thumb ? (
          <img
            src={thumb}
            alt={video.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-800 to-deep">
            <span className="text-4xl">🎬</span>
          </div>
        )}
        {/* 재생 버튼 오버레이 */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition duration-200 group-hover:opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-600/90 shadow-lg backdrop-blur-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {/* 재생시간 */}
        {video.duration && (
          <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs font-medium text-white">
            {video.duration}
          </span>
        )}
      </button>

      {/* 정보 */}
      <div className="p-4">
        {/* 강사 + 날짜 */}
        <div className="mb-2 flex items-center justify-between gap-2">
          {video.instructor && (
            <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">
              {video.instructor}
            </span>
          )}
          {video.date && (
            <span className="text-xs text-neutral-400 dark:text-primary-300/60">
              {video.date}
            </span>
          )}
        </div>

        {/* 제목 */}
        <h3
          className="mb-2 line-clamp-2 cursor-pointer text-base font-bold leading-snug text-deep dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition"
          onClick={() => onPlay && onPlay(video)}
        >
          {video.title}
        </h3>

        {/* 설명 */}
        {video.desc && (
          <p className="line-clamp-2 text-sm leading-relaxed text-neutral-500 dark:text-primary-200/70">
            {video.desc}
          </p>
        )}

        {/* 태그 */}
        {video.tags && video.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {video.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="rounded-full bg-primary-50 px-2 py-0.5 text-[11px] font-medium text-primary-700 dark:bg-primary-900/40 dark:text-primary-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
