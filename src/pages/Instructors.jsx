import { Link } from 'react-router-dom'
import SubPageLayout from '../components/SubPageLayout'
import { instructors } from '../data/site'

const meta = {
  '김수연': { icon: '🏥', bg: 'bg-support-50 dark:bg-support-900/20', badge: 'bg-support-100 text-support-700 dark:bg-support-900/40 dark:text-support-300', field: '수의학' },
  '이준혁': { icon: '🤖', bg: 'bg-primary-50 dark:bg-primary-900/20', badge: 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300', field: 'AI·펫테크' },
  '박민지': { icon: '🎯', bg: 'bg-accent-50 dark:bg-accent-900/20', badge: 'bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-300', field: '행동 교정' },
  '최동현': { icon: '💊', bg: 'bg-support-50 dark:bg-support-900/20', badge: 'bg-support-100 text-support-700 dark:bg-support-900/40 dark:text-support-300', field: '예방의학' },
}

export default function Instructors() {
  return (
    <SubPageLayout
      breadcrumb={[{ label: '강사 소개' }]}
      title="👨‍🏫 강사 소개"
    >
      <div className="mb-14 text-center">
        <p className="section-label mb-3">Our Experts</p>
        <h2 className="section-title mb-4">전문가와 함께하는 반려동물 교육</h2>
        <p className="section-desc mx-auto max-w-2xl">
          PawEdu의 강사진은 수의학, AI 기술, 동물 행동 분야의 전문가로 구성되어 있습니다.
          검증된 전문 지식과 현장 경험을 바탕으로 최고 수준의 교육을 제공합니다.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {instructors.map(inst => {
          const m = meta[inst.name] || { icon: '👤', bg: 'bg-neutral-100 dark:bg-deep-800', badge: 'bg-neutral-100 text-neutral-600', field: '전문가' }
          return (
            <div key={inst.name} className="card-base overflow-hidden">
              <div className={`flex h-44 items-center justify-center ${m.bg}`}>
                <span className="text-7xl opacity-50">{m.icon}</span>
              </div>
              <div className="p-6 text-center">
                <span className={`mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${m.badge}`}>
                  {m.field}
                </span>
                <h3 className="mb-1 text-xl font-extrabold text-deep dark:text-white">{inst.name}</h3>
                <p className="mb-1 text-sm font-semibold text-primary-600 dark:text-primary-400">{inst.title}</p>
                <p className="mb-5 text-sm text-neutral-500 dark:text-primary-300">{inst.spec}</p>
                <div className="flex justify-center gap-6 border-t border-neutral-100 dark:border-deep-700 pt-5">
                  <div className="text-center">
                    <p className="text-2xl font-extrabold text-primary-600 dark:text-primary-400">{inst.lectures}</p>
                    <p className="text-xs text-neutral-400 dark:text-primary-400/60">강의 수</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-extrabold text-accent">{inst.rating}</p>
                    <p className="text-xs text-neutral-400 dark:text-primary-400/60">⭐ 평점</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-16 rounded-2xl bg-gradient-to-r from-primary-50 to-support-50 dark:from-primary-900/20 dark:to-support-900/20 p-10 text-center">
        <p className="section-label mb-3">Join Us</p>
        <h3 className="mb-3 text-2xl font-extrabold text-deep dark:text-white">전문가이신가요?</h3>
        <p className="mb-6 text-neutral-600 dark:text-primary-200">
          PawEdu와 함께 반려동물 보호자들에게 전문 지식을 나눠주세요.
        </p>
        <Link to="/partnership" className="btn-primary">
          강사·파트너십 문의 →
        </Link>
      </div>
    </SubPageLayout>
  )
}
