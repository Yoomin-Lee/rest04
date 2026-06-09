// PawEdu SVG Icon System
// stroke="currentColor" strokeWidth="1.75" — Apple Health / Toss 스타일 라인 아이콘
export default function Icon({ name, size = 24, className = '' }) {
  const p = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.75',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': 'true',
  }

  switch (name) {

    // ── 브랜드 ──────────────────────────────────────────────────
    case 'paw':
      return (
        <svg {...p}>
          <ellipse cx="6" cy="8.5" rx="1.75" ry="2.25" />
          <ellipse cx="10.5" cy="6.5" rx="1.75" ry="2.25" />
          <ellipse cx="15" cy="6.5" rx="1.75" ry="2.25" />
          <ellipse cx="19" cy="8.5" rx="1.75" ry="2.25" />
          <ellipse cx="12.5" cy="15.5" rx="7.5" ry="5.5" />
        </svg>
      )

    // ── 카테고리 / 특징 ──────────────────────────────────────────
    case 'ai':
      return (
        <svg {...p}>
          <rect x="5" y="5" width="14" height="14" rx="2.5" />
          <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
          <path d="M9.5 5V3M12 5V3M14.5 5V3" />
          <path d="M9.5 21v-2M12 21v-2M14.5 21v-2" />
          <path d="M5 9.5H3M5 12H3M5 14.5H3" />
          <path d="M21 9.5h-2M21 12h-2M21 14.5h-2" />
        </svg>
      )

    case 'book':
      return (
        <svg {...p}>
          <path d="M12 6C10 4.5 7 4 4 5v14c3-1 6-.5 8 1" />
          <path d="M12 6c2-1.5 5-2 8-1v14c-2-1-5-1.5-8 1" />
          <path d="M12 6v14" />
        </svg>
      )

    case 'target':
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      )

    case 'hospital':
      return (
        <svg {...p}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M12 8v8M8.5 12h7" />
        </svg>
      )

    // ── 사람 ─────────────────────────────────────────────────────
    case 'users':
      return (
        <svg {...p}>
          <circle cx="8" cy="8" r="3.5" />
          <path d="M2 20.5c0-3.3 2.7-6 6-6s6 2.7 6 6" />
          <circle cx="17" cy="8" r="3" />
          <path d="M17 14.5c2.5.4 4.5 2.5 5 6" />
        </svg>
      )

    case 'person':
      return (
        <svg {...p}>
          <circle cx="12" cy="7" r="4.5" />
          <path d="M4.5 21a7.5 7.5 0 0115 0" />
        </svg>
      )

    case 'graduation':
      return (
        <svg {...p}>
          <path d="M22 10l-10-6L2 10l10 6 10-6z" />
          <path d="M6 12.5v4.5c0 2.5 2.5 4.5 6 4.5s6-2 6-4.5v-4.5" />
          <path d="M22 10v5" />
          <circle cx="22" cy="15.5" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      )

    // ── 미디어 ────────────────────────────────────────────────────
    case 'film':
      return (
        <svg {...p}>
          <rect x="2" y="4" width="20" height="16" rx="2.5" />
          <path d="M7 4v16M17 4v16M2 9h5M17 9h5M2 15h5M17 15h5" />
        </svg>
      )

    case 'video':
      return (
        <svg {...p}>
          <rect x="2" y="5" width="14" height="14" rx="2.5" />
          <path d="M16 8.5l6-3.5v14l-6-3.5" />
        </svg>
      )

    case 'play':
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M10 8.5l6 3.5-6 3.5V8.5z" fill="currentColor" stroke="none" />
        </svg>
      )

    // ── 커뮤니케이션 ──────────────────────────────────────────────
    case 'mail':
      return (
        <svg {...p}>
          <rect x="2" y="4" width="20" height="16" rx="2.5" />
          <path d="M2 7l10 8 10-8" />
        </svg>
      )

    case 'chat':
      return (
        <svg {...p}>
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          <path d="M8 10h8M8 13.5h5" />
        </svg>
      )

    case 'phone':
      return (
        <svg {...p}>
          <path d="M5 4h4l1.5 4.5-2.5 1.5a11.5 11.5 0 005.5 5.5l1.5-2.5 4.5 1.5V18a2 2 0 01-2 2A17 17 0 013 6a2 2 0 012-2z" />
        </svg>
      )

    // ── 위치 ─────────────────────────────────────────────────────
    case 'pin':
      return (
        <svg {...p}>
          <path d="M12 2a7 7 0 017 7c0 5.5-7 13-7 13S5 14.5 5 9a7 7 0 017-7z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      )

    // ── 테마 토글 ─────────────────────────────────────────────────
    case 'moon':
      return (
        <svg {...p}>
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )

    case 'sun':
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2.5M12 19.5V22M4.22 4.22l1.77 1.77M18.01 18.01l1.77 1.77M2 12h2.5M19.5 12H22M4.22 19.78l1.77-1.77M18.01 5.99l1.77-1.77" />
        </svg>
      )

    case 'checkCircle':
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M7.5 12l3 3 6-6" />
        </svg>
      )

    // ── 법적 / 보안 ───────────────────────────────────────────────
    case 'lock':
      return (
        <svg {...p}>
          <rect x="3" y="10" width="18" height="12" rx="2.5" />
          <path d="M7 10V7a5 5 0 0110 0v3" />
          <circle cx="12" cy="16.5" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      )

    case 'clipboard':
      return (
        <svg {...p}>
          <rect x="5" y="4" width="14" height="17" rx="2" />
          <rect x="9" y="2" width="6" height="5" rx="1.5" />
          <path d="M9 11h6M9 15h4" />
        </svg>
      )

    case 'calendar':
      return (
        <svg {...p}>
          <rect x="3" y="4" width="18" height="17" rx="2.5" />
          <path d="M3 9h18M8 2v4M16 2v4" />
          <circle cx="8.5" cy="14" r="1" fill="currentColor" stroke="none" />
          <circle cx="12" cy="14" r="1" fill="currentColor" stroke="none" />
          <circle cx="15.5" cy="14" r="1" fill="currentColor" stroke="none" />
          <circle cx="8.5" cy="18" r="1" fill="currentColor" stroke="none" />
          <circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" />
        </svg>
      )

    case 'shield':
      return (
        <svg {...p}>
          <path d="M12 2.5L4 6v5.5c0 5.4 3.5 10.5 8 12 4.5-1.5 8-6.6 8-12V6L12 2.5z" />
          <path d="M8.5 12l2.5 2.5 4.5-5" />
        </svg>
      )

    // ── 가치 / 추상 ───────────────────────────────────────────────
    case 'star':
      return (
        <svg {...p}>
          <path d="M12 2l2.9 6.26L22 9.27l-5 5.14 1.18 7.27L12 18.27l-6.18 3.41L7 14.41 2 9.27l7.1-1.01z" />
        </svg>
      )

    case 'bulb':
      return (
        <svg {...p}>
          <path d="M9 18h6M10 22h4M12 2a7 7 0 017 7c0 3-1.5 5.5-4 7H9C6.5 14.5 5 12 5 9a7 7 0 017-7z" />
        </svg>
      )

    case 'heart':
      return (
        <svg {...p}>
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      )

    case 'books':
      return (
        <svg {...p}>
          <rect x="2" y="5" width="4" height="14" rx="0.5" />
          <rect x="8" y="3" width="5" height="18" rx="0.5" />
          <path d="M15.5 5.5l3.5 1-2.5 13-3.5-1z" />
        </svg>
      )

    case 'link':
      return (
        <svg {...p}>
          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
        </svg>
      )

    // ── 기타 ─────────────────────────────────────────────────────
    case 'pill':
      return (
        <svg {...p}>
          <rect x="2" y="9" width="20" height="6" rx="3" />
          <path d="M12 9v6" />
        </svg>
      )

    case 'mobile':
      return (
        <svg {...p}>
          <rect x="5" y="2" width="14" height="20" rx="3.5" />
          <path d="M10 6h4" />
          <circle cx="12" cy="18.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      )

    case 'box':
      return (
        <svg {...p}>
          <path d="M21 8L12 3 3 8l9 5 9-5z" />
          <path d="M3 8v8l9 5 9-5V8" />
          <path d="M12 13v8" />
        </svg>
      )

    // ── 소셜 ─────────────────────────────────────────────────────
    case 'youtube':
      return (
        <svg {...p}>
          <rect x="1.5" y="5" width="21" height="14" rx="3.5" />
          <path d="M9.5 9l6 3-6 3V9z" fill="currentColor" stroke="none" />
        </svg>
      )

    case 'instagram':
      return (
        <svg {...p}>
          <rect x="2" y="2" width="20" height="20" rx="5.5" />
          <circle cx="12" cy="12" r="4.5" />
          <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" stroke="none" />
        </svg>
      )

    case 'write':
      return (
        <svg {...p}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      )

    default:
      return null
  }
}
