import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollToTopButton from './components/ScrollToTopButton'

import Home from './pages/Home'
import Videos from './pages/Videos'
import About from './pages/About'
import Contact from './pages/Contact'
import Instructors from './pages/Instructors'
import Partnership from './pages/Partnership'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import SimplePage from './pages/SimplePage'

export default function App() {
  return (
    <div className="min-w-[320px]">
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* 교육 콘텐츠 */}
          <Route path="/videos" element={<Navigate to="/videos/ai" replace />} />
          <Route path="/videos/:category" element={<Videos />} />

          {/* 회사소개 */}
          <Route path="/about" element={<Navigate to="/about/greetings" replace />} />
          <Route path="/about/:tab" element={<About />} />

          {/* 문의하기 */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact/:type" element={<Contact />} />

          {/* 강사·파트너십 */}
          <Route path="/instructors" element={<Instructors />} />
          <Route path="/partnership" element={<Partnership />} />

          {/* 정책 */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          <Route path="*" element={<SimplePage title="페이지를 찾을 수 없습니다" />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}
