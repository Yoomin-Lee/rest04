import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { nav, company } from '../data/site'
import ThemeToggle from './ThemeToggle'
import Icon from './Icon'
import { useAuth } from '../context/AuthContext'

// nav 항목의 active 여부 — 자식 경로 포함
function isNavActive(item, pathname) {
  if (pathname.startsWith(item.to.split('/').slice(0, 2).join('/'))) return true
  return item.children?.some(c => pathname.startsWith(c.to)) ?? false
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, profile, signOut } = useAuth()

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setMobileExpanded(null)
  }, [location])

  const isHome = location.pathname === '/'
  const solid = scrolled || !isHome

  return (
    <>
      <header
        className={[
          'sticky top-0 z-50 w-full transition-all duration-300',
          solid ? 'bg-white/95 shadow-sm backdrop-blur-md dark:bg-deep-900/95' : 'bg-deep-950/50 backdrop-blur-sm',
        ].join(' ')}
      >
        <div className="mx-auto flex h-16 max-w-container items-center justify-between px-4 md:px-8 lg:px-16">

          {/* 로고 */}
          <Link to="/" className="flex items-center gap-2">
            <Icon
              name="paw"
              size={24}
              className={solid ? 'text-primary-600 dark:text-primary-400' : 'text-white'}
            />
            <span className={[
              'text-xl font-extrabold tracking-tight transition',
              solid ? 'text-primary-700 dark:text-primary-400' : 'text-white drop-shadow',
            ].join(' ')}>
              {company.name}
            </span>
          </Link>

          {/* 데스크탑 메뉴 */}
          <ul className="hidden items-stretch lg:flex">
            {nav.map(item => {
              const active = isNavActive(item, location.pathname)
              return (
                <li
                  key={item.label}
                  className="relative flex items-center"
                  onMouseEnter={() => setHovered(item.label)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <Link
                    to={item.to}
                    className={[
                      'px-5 py-5 text-[15px] font-bold transition',
                      active
                        ? solid ? 'text-primary-600 dark:text-primary-400' : 'text-white'
                        : solid
                          ? 'text-primary-700 hover:text-primary-500 dark:text-primary-300 dark:hover:text-primary-400'
                          : 'text-white/80 hover:text-white',
                    ].join(' ')}
                  >
                    {item.label}
                  </Link>

                  {/* active 밑줄 */}
                  {active && (
                    <span className={[
                      'absolute bottom-0 left-5 right-5 h-0.5 rounded-full',
                      solid ? 'bg-primary-600 dark:bg-primary-400' : 'bg-white',
                    ].join(' ')} />
                  )}

                  {/* 드롭다운 — 해당 nav 항목 바로 아래 */}
                  {hovered === item.label && (
                    <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-1">
                      <ul className="min-w-[10rem] overflow-hidden rounded-xl border border-neutral-100 bg-white py-1.5 shadow-lg dark:border-deep-700 dark:bg-deep-800">
                        {item.children.map(c => (
                          <li key={c.label}>
                            <Link
                              to={c.to}
                              className="block whitespace-nowrap px-5 py-2.5 text-sm text-neutral-600 transition hover:bg-primary-50 hover:text-primary-600 dark:text-primary-300 dark:hover:bg-primary-900/30 dark:hover:text-primary-400"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>

          {/* 우측: 인증 버튼 + 다크모드 토글 + 햄버거 */}
          <div className="flex items-center gap-3">
            {/* 로그인/로그아웃 (데스크탑) */}
            <div className="hidden lg:flex items-center gap-2">
              {user ? (
                <>
                  <Link
                    to="/board"
                    className={`text-sm font-medium px-3 py-1.5 rounded-lg transition ${solid ? 'text-primary-700 hover:text-primary-500 dark:text-primary-300' : 'text-white/80 hover:text-white'}`}
                  >
                    게시판
                  </Link>
                  <span className={`text-sm ${solid ? 'text-primary-600 dark:text-gray-400' : 'text-white/70'}`}>
                    {profile?.nickname || user.email?.split('@')[0]}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="text-sm px-3 py-1.5 rounded-lg bg-primary-50 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-gray-600 text-primary-700 dark:text-gray-300 transition"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/board"
                    className={`text-sm font-medium px-3 py-1.5 rounded-lg transition ${solid ? 'text-primary-700 hover:text-primary-500 dark:text-primary-300' : 'text-white/80 hover:text-white'}`}
                  >
                    게시판
                  </Link>
                  <Link
                    to="/login"
                    className="text-sm px-3 py-1.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition"
                  >
                    로그인
                  </Link>
                </>
              )}
            </div>
            <ThemeToggle />
            <button
              type="button"
              aria-label="메뉴 열기"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <span className={`h-0.5 w-6 transition ${solid ? 'bg-primary-700 dark:bg-white' : 'bg-white'}`} />
              <span className={`h-0.5 w-6 transition ${solid ? 'bg-primary-700 dark:bg-white' : 'bg-white'}`} />
              <span className={`h-0.5 w-6 transition ${solid ? 'bg-primary-700 dark:bg-white' : 'bg-white'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 패널 */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col overflow-y-auto bg-white dark:bg-deep-900 shadow-2xl">
            {/* 헤더 */}
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-deep-700 px-6 py-5">
              <div className="flex items-center gap-2">
                <Icon name="paw" size={20} className="text-primary-600 dark:text-primary-400" />
                <span className="text-lg font-extrabold text-primary-700 dark:text-primary-400">
                  {company.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <button
                  type="button"
                  aria-label="메뉴 닫기"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 dark:text-primary-300 hover:bg-neutral-100 dark:hover:bg-deep-700"
                  onClick={() => setMobileOpen(false)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 메뉴 목록 */}
            <ul className="flex flex-col p-4">
              {nav.map(item => {
                const active = isNavActive(item, location.pathname)
                return (
                  <li key={item.label} className="border-b border-neutral-100 dark:border-deep-700 last:border-0">
                    <button
                      type="button"
                      className={[
                        'flex w-full items-center justify-between py-4 text-base font-bold transition',
                        active ? 'text-primary-600 dark:text-primary-400' : 'text-neutral-900 dark:text-white',
                      ].join(' ')}
                      onClick={() =>
                        setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                      }
                    >
                      {item.label}
                      <svg
                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        className={`transition-transform ${mobileExpanded === item.label ? 'rotate-180' : ''}`}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                    {mobileExpanded === item.label && (
                      <ul className="mb-3 flex flex-col gap-1 pl-4">
                        {item.children.map(c => (
                          <li key={c.label}>
                            <Link
                              to={c.to}
                              className="block py-2 text-sm text-neutral-500 dark:text-primary-300 hover:text-primary-600 dark:hover:text-primary-400"
                              onClick={() => setMobileOpen(false)}
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>

            {/* 하단 CTA */}
            <div className="mt-auto border-t border-neutral-100 dark:border-deep-700 p-6 space-y-3">
              <Link
                to="/board"
                className="block text-center w-full py-3 rounded-xl border border-primary-600 text-primary-600 dark:text-primary-400 font-semibold text-sm hover:bg-primary-50 dark:hover:bg-primary-900/20 transition"
                onClick={() => setMobileOpen(false)}
              >
                게시판
              </Link>
              {user ? (
                <button
                  onClick={() => { handleSignOut(); setMobileOpen(false) }}
                  className="w-full py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                  로그아웃 ({profile?.nickname || user.email?.split('@')[0]})
                </button>
              ) : (
                <Link
                  to="/login"
                  className="btn-primary w-full justify-center"
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon name="mail" size={16} className="shrink-0" />
                  로그인
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
