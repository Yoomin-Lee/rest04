import { Link } from 'react-router-dom'
import { company } from '../data/site'

export default function Footer() {
  return (
    <footer className="bg-deep-950 dark:bg-black text-white">
      {/* 상단 소개 */}
      <div className="mx-auto max-w-container px-4 py-16 md:px-10 lg:px-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* 브랜드 + 소개 */}
          <div className="max-w-sm">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl">🐾</span>
              <span className="text-xl font-extrabold tracking-tight text-primary-400">
                {company.name}
              </span>
            </div>
            {company.intro.map((p, i) => (
              <p key={i} className="mb-2 text-sm leading-relaxed text-white/50 last:mb-0">
                {p}
              </p>
            ))}
          </div>

          {/* 컬러 팔레트 표시 */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
              Color Palette
            </p>
            <div className="flex gap-2">
              {[
                { color: '#7c3aed', label: 'Violet' },
                { color: '#a78bfa', label: 'Lavender' },
                { color: '#f59e0b', label: 'Amber' },
                { color: '#10b981', label: 'Emerald' },
                { color: '#1e1b4b', label: 'Deep' },
              ].map(p => (
                <div key={p.label} className="flex flex-col items-center gap-1">
                  <div
                    className="h-8 w-8 rounded-full border-2 border-white/20 shadow"
                    style={{ background: p.color }}
                    title={p.color}
                  />
                  <span className="text-[10px] text-white/40">{p.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SNS */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
              Follow Us
            </p>
            <div className="flex flex-col gap-2">
              {company.sns.map(s => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 transition hover:text-primary-400"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs">
                    {s.icon === 'yt' ? '▶' : s.icon === 'ig' ? '📷' : '✍'}
                  </span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 하단 정보 바 */}
      <div className="border-t border-white/10 px-4 py-6 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-container flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          {/* 주소 */}
          <div className="text-xs text-white/30">
            {company.offices.map(o => (
              <p key={o.label}>
                {o.label} · {o.address} · Tel. {o.tel}
              </p>
            ))}
          </div>

          {/* 정책 링크 */}
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {company.footerLinks.map(l => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className={[
                    'text-xs transition',
                    l.strong
                      ? 'font-bold text-white/70 hover:text-white'
                      : 'text-white/30 hover:text-white/60',
                  ].join(' ')}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 카피라이트 */}
        <div className="mx-auto mt-4 max-w-container">
          <p className="text-xs text-white/20">{company.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
