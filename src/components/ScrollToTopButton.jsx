import { useEffect, useState } from 'react'

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      aria-label="맨위로 가기"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg shadow-primary-600/40 transition hover:bg-primary-700 hover:-translate-y-1 active:scale-95"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="m6 15 6-6 6 6" />
      </svg>
    </button>
  )
}
