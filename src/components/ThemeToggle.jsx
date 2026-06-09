import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      onClick={toggle}
      className={[
        'relative flex h-8 w-14 items-center rounded-full transition-colors duration-300',
        isDark ? 'bg-primary-600' : 'bg-neutral-200',
        className,
      ].join(' ')}
    >
      <span
        className={[
          'absolute flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm transition-all duration-300',
          isDark ? 'left-[calc(100%-1.75rem)]' : 'left-1',
        ].join(' ')}
        style={{ fontSize: '13px' }}
      >
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  )
}
