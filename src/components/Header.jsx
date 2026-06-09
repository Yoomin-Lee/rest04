import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { nav, company } from '../data/site'
import ThemeToggle from './ThemeToggle'
import Icon from './Icon'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const location = useLocation()

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

  return (
    <>
      <header
        className={[
          'sticky top-0 z-50 w-full transition-all duration-300',
          scrolled || !isHome
            ? 'bg-white/95 shadow-sm backdrop-blur-md dark:bg-deep-900/95'
            : 'bg-transparent',
        ].join(' ')}
        onMouseLeave={() => setHovered(null)}
      >
        <div className="mx-auto flex h-16 max-w-container items-center justify-between px-4 md:px-8 lg:px-16">
          {/* 로고 */}
          <Link to="/" className="flex items-center gap-2">
            <Icon
              name="paw"
              size={24}
              className={scrolled || !isHome ? 'text-primary-600 dark:text-primary-400' : 'text-white'}
            />
            <span
              className={[
                'text-xl font-extrabold tracking-tight transition',
                scrolled || !isHome
                  ? 'text-primary-700 dark:text-primary-400'
                  : 'text-white drop-shadow',
              ].join(' ')}
            >
              {company.name}
            </span>
          </Link>

          {/* 데스크탑 메뉴 */}
          <ul className="hidden items-stretch lg:flex">
            {nav.map(item => (
              <li
                key={item.label}
                className="group flex items-center"
                onMouseEnter={() => setHovered(item.label)}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'px-5 py-5 text-[15px] font-semibold transition',
                      isActive
                        ? 'text-primary-600 dark:text-primary-400'
                        : scrolled || !isHome
                        ? 'text-neutral-700 hover:text-primary-600 dark:text-primary-200 dark:hover:text-primary-400'
                        : 'text-white/90 hover:text-white',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* 우측: 다크모드 토글 + 햄버거 */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              aria-label="메뉴 열기"
              className={[
                'flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden',
              ].join(' ')}
              onClick={() => setMobileOpen(true)}
            >
              <span className={`h-0.5 w-6 transition ${scrolled || !isHome ? 'bg-neutral-800 dark:bg-white' : 'bg-white'}`} />
              <span className={`h-0.5 w-6 transition ${scrolled || !isHome ? 'bg-neutral-800 dark:bg-white' : 'bg-white'}`} />
              <span className={`h-0.5 w-6 transition ${scrolled || !isHome ? 'bg-neutral-800 dark:bg-white' : 'bg-white'}`} />
            </button>
          </div>
        </div>

        {/* 데스크탑 메가 드롭다운 */}
        <div
          className={[
            'hidden overflow-hidden border-b border-neutral-100 dark:border-deep-700 bg-white/98 dark:bg-deep-900/98 backdrop-blur-md transition-all duration-200 lg:block',
            hovered ? 'max-h-48 opacity-100' : 'max-h-0 border-b-0 opacity-0',
          ].join(' ')}
        >
          <div className="mx-auto flex max-w-container justify-end px-16 py-2">
            {nav.map(item => (
              <ul
                key={item.label}
                className="flex w-40 flex-col gap-2 py-5"
                onMouseEnter={() => setHovered(item.label)}
              >
                {hovered === item.label &&
                  item.children.map(c => (
                    <li key={c.label}>
                      <Link
                        to={c.to}
                        className="block text-center text-sm text-neutral-600 dark:text-primary-300 transition hover:font-semibold hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            ))}
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
              {nav.map(item => (
                <li key={item.label} className="border-b border-neutral-100 dark:border-deep-700 last:border-0">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-4 text-base font-bold text-neutral-900 dark:text-white"
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
              ))}
            </ul>

            {/* 하단 CTA */}
            <div className="mt-auto border-t border-neutral-100 dark:border-deep-700 p-6">
              <Link
                to="/contact"
                className="btn-primary w-full justify-center"
                onClick={() => setMobileOpen(false)}
              >
                <Icon name="mail" size={16} className="shrink-0" />
                문의하기
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
