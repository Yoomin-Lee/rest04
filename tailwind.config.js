/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Color 1: 바이올렛 (주컬러)
        primary: {
          50:  '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        // Color 2: 앰버 (포인트 컬러)
        accent: {
          DEFAULT: '#f59e0b',
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        // Color 3: 에메랄드 (보조 컬러)
        support: {
          DEFAULT: '#10b981',
          50:  '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        // Color 4: 딥 인디고 (다크 배경)
        deep: {
          DEFAULT: '#1e1b4b',
          50:  '#eef2ff',
          100: '#e0e7ff',
          700: '#1e1b4b',
          800: '#161330',
          900: '#0e0c1f',
          950: '#080711',
        },
        // 하위호환 브랜드 컬러
        brand: {
          DEFAULT: '#7c3aed',
          deep: '#1e1b4b',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        container: '1400px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float:       'float 4s ease-in-out infinite',
        'float-d':   'float 4s ease-in-out 2s infinite',
        'fade-up':   'fadeUp 0.6s ease forwards',
        shimmer:     'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
}
