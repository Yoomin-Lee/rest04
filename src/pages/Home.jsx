import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { company, heroSlides, stats, features, notices } from '../data/site'
import { videos, videoCategories } from '../data/videos'
import VideoCard from '../components/VideoCard'
import VideoModal from '../components/VideoModal'

// ── 히어로 ────────────────────────────────────────────────
function Hero() {
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(null)

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % heroSlides.length), 6000)
    return () => clearInterval(t)
  }, [])

  const slide = heroSlides[idx]

  return (
    <section className="gradient-hero relative flex min-h-screen items-center overflow-hidden">
      {/* 떠다니는 파우 아이콘들 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="animate-float absolute left-[10%] top-[20%] text-5xl opacity-10">🐾</span>
        <span className="animate-float-d absolute right-[15%] top-[30%] text-4xl opacity-10">🐕</span>
        <span className="animate-float absolute left-[60%] bottom-[25%] text-6xl opacity-10">🐈</span>
        <span className="animate-float-d absolute left-[30%] bottom-[15%] text-3xl opacity-10">🦮</span>
        <span className="animate-float absolute right-[8%] bottom-[40%] text-5xl opacity-10">🐾</span>
        {/* 그라디언트 동그라미 */}
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-primary-400/20 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-support/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-container px-4 md:px-10 lg:px-16">
        <div className="max-w-2xl">
          {/* 슬라이드 인디케이터 레이블 */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-semibold tracking-widest text-white/80 uppercase">
              {slide.label}
            </span>
          </div>

          {/* 메인 카피 */}
          <h1 className="mb-6 whitespace-pre-line text-4xl font-extrabold leading-tight text-white drop-shadow-lg md:text-6xl lg:text-7xl">
            {slide.copy}
          </h1>

          <p className="mb-10 text-lg text-white/75 md:text-xl">{slide.sub}</p>

          {/* CTA 버튼 */}
          <div className="flex flex-wrap gap-4">
            <Link to={slide.ctaTo} className="btn-primary bg-primary-500 hover:bg-primary-400 shadow-lg shadow-primary-900/40">
              {slide.cta} →
            </Link>
            <Link to="/about/greetings" className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-6 py-3 font-bold text-white backdrop-blur-sm transition hover:border-white/80 hover:bg-white/10">
              회사 소개
            </Link>
          </div>
        </div>

        {/* 슬라이드 네비 */}
        <div className="absolute bottom-12 right-4 z-10 flex items-center gap-3 md:right-16">
          <div className="flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`슬라이드 ${i + 1}`}
                className={[
                  'h-1.5 rounded-full transition-all duration-300',
                  i === idx ? 'w-8 bg-white' : 'w-2 bg-white/40',
                ].join(' ')}
              />
            ))}
          </div>
          <button onClick={() => setIdx(i => (i - 1 + heroSlides.length) % heroSlides.length)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white/20">‹</button>
          <button onClick={() => setIdx(i => (i + 1) % heroSlides.length)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white/20">›</button>
        </div>
      </div>

      {/* 아래 스크롤 안내 */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" opacity="0.5">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </section>
  )
}

// ── 통계 스트립 ────────────────────────────────────────────
function Stats() {
  return (
    <section className="border-b border-neutral-100 bg-white dark:border-deep-700 dark:bg-deep-900">
      <div className="mx-auto max-w-container">
        <ul className="grid grid-cols-2 divide-x divide-y divide-neutral-100 dark:divide-deep-700 md:grid-cols-4 md:divide-y-0">
          {stats.map(s => (
            <li key={s.label} className="flex flex-col items-center gap-1 px-6 py-8">
              <span className="text-3xl">{s.icon}</span>
              <span className="text-3xl font-extrabold text-primary-600 dark:text-primary-400 md:text-4xl">
                {s.value}
              </span>
              <span className="text-sm text-neutral-500 dark:text-primary-300">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ── 특징 카드 ──────────────────────────────────────────────
function Features() {
  const colorMap = {
    support:  { bg: 'bg-support-50 dark:bg-support-700/20',  icon: 'text-support-600 dark:text-support-400',  badge: 'bg-support-100 text-support-700 dark:bg-support-900/50 dark:text-support-300' },
    primary:  { bg: 'bg-primary-50 dark:bg-primary-900/20',  icon: 'text-primary-600 dark:text-primary-400',  badge: 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300' },
    lavender: { bg: 'bg-primary-50 dark:bg-primary-900/20',  icon: 'text-primary-500 dark:text-primary-300',  badge: 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300' },
    accent:   { bg: 'bg-accent-50 dark:bg-accent-700/20',   icon: 'text-accent-600 dark:text-accent-400',   badge: 'bg-accent-100 text-accent-700 dark:bg-accent-900/50 dark:text-accent-300' },
  }

  return (
    <section className="gradient-feature py-24">
      <div className="mx-auto max-w-container px-4 md:px-10 lg:px-16">
        <div className="mb-14 text-center">
          <p className="section-label mb-3">Our Programs</p>
          <h2 className="section-title">반려동물의 건강한 삶을 위한<br className="hidden sm:block" /> 전문 교육 콘텐츠</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(f => {
            const c = colorMap[f.color] || colorMap.primary
            return (
              <Link key={f.key} to={f.to} className="group card-base p-6 hover:shadow-primary-200/60 dark:hover:shadow-primary-800/30">
                <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${c.bg} text-3xl transition group-hover:scale-110`}>
                  {f.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-deep dark:text-white">{f.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-neutral-500 dark:text-primary-200/70">
                  {f.desc}
                </p>
                <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${c.badge}`}>
                  강의 보기 →
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── 최신 동영상 (2×3) ─────────────────────────────────────
function LatestVideos() {
  const [activeModal, setActiveModal] = useState(null)

  // 카테고리별 최신 1~2개 영상 혼합해서 6개
  const latest = [
    ...(videos.ai?.slice(0, 2) || []),
    ...(videos.health?.slice(0, 2) || []),
    ...(videos.behavior?.slice(0, 1) || []),
    ...(videos.literacy?.slice(0, 1) || []),
  ].slice(0, 6)

  return (
    <section className="py-24 dark:bg-deep-950">
      <div className="mx-auto max-w-container px-4 md:px-10 lg:px-16">
        {/* 헤더 */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="section-label mb-2">Latest Videos</p>
            <h2 className="section-title">최신 교육 콘텐츠</h2>
          </div>
          <Link to="/videos/ai" className="btn-outline shrink-0 self-start sm:self-auto">
            전체 콘텐츠 보기 →
          </Link>
        </div>

        {/* 카테고리 퀵 탭 */}
        <div className="mb-8 flex flex-wrap gap-2">
          {videoCategories.map(cat => (
            <Link
              key={cat.key}
              to={`/videos/${cat.key}`}
              className="tab-btn tab-btn-inactive"
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </Link>
          ))}
        </div>

        {/* 2×3 그리드 */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map(v => (
            <VideoCard key={v.id} video={v} onPlay={setActiveModal} />
          ))}
        </div>
      </div>

      {activeModal && (
        <VideoModal video={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </section>
  )
}

// ── 회사 소개 배너 ─────────────────────────────────────────
function AboutBanner() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* 배경 그라디언트 */}
      <div className="absolute inset-0 gradient-violet opacity-90" />
      <div className="absolute inset-0">
        <div className="absolute left-[-5%] top-[-10%] h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-container px-4 md:px-10 lg:px-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary-200">
              About PawEdu
            </p>
            <h2 className="mb-4 text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">
              반려동물의 건강한 삶을<br />
              함께 만들어갑니다
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-primary-200 md:text-lg">
              {company.intro[0]}<br />{company.intro[1]}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3">
            <Link to="/about/greetings" className="btn-accent shadow-lg shadow-accent/30 justify-center">
              회사 소개 보기 →
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-6 py-3 font-bold text-white transition hover:bg-white/10">
              📩 문의하기
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── 공지사항 ───────────────────────────────────────────────
function Notices() {
  return (
    <section className="py-20 dark:bg-deep-900">
      <div className="mx-auto max-w-container px-4 md:px-10 lg:px-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-deep dark:text-white md:text-3xl">공지사항</h2>
          <Link to="/notices" className="text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            전체보기 →
          </Link>
        </div>
        <ul className="divide-y divide-neutral-100 dark:divide-deep-700">
          {notices.map(n => (
            <li key={n.id} className="group">
              <Link to="/notices" className="flex items-center justify-between gap-4 py-4 transition hover:text-primary-600 dark:hover:text-primary-400">
                <div className="flex items-center gap-3 min-w-0">
                  {n.isNew && (
                    <span className="shrink-0 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-white">
                      NEW
                    </span>
                  )}
                  <span className="truncate text-base font-medium text-neutral-800 dark:text-primary-100 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                    {n.title}
                  </span>
                </div>
                <span className="shrink-0 text-sm text-neutral-400 dark:text-primary-400/60">{n.date}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ── 메인 익스포트 ─────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <LatestVideos />
      <AboutBanner />
      <Notices />
    </>
  )
}
