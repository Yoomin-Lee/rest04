import { Link } from 'react-router-dom'

export default function SubPageLayout({ breadcrumb = [], title, children }) {
  return (
    <div className="min-h-screen dark:bg-deep-950">
      {/* 서브 헤더 */}
      <div className="gradient-hero py-16">
        <div className="mx-auto max-w-container px-4 md:px-10 lg:px-16">
          {/* 빵부스러기 */}
          <nav className="mb-4 flex items-center gap-2 text-sm text-white/60">
            <Link to="/" className="hover:text-white transition">홈</Link>
            {breadcrumb.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                <span>›</span>
                {b.to ? (
                  <Link to={b.to} className="hover:text-white transition">{b.label}</Link>
                ) : (
                  <span className="text-white">{b.label}</span>
                )}
              </span>
            ))}
          </nav>
          <h1 className="text-3xl font-extrabold text-white md:text-4xl">{title}</h1>
        </div>
      </div>

      {/* 본문 */}
      <div className="mx-auto max-w-container px-4 py-12 md:px-10 lg:px-16 md:py-16">
        {children}
      </div>
    </div>
  )
}
