import { Link } from 'react-router-dom'
import SubPageLayout from '../components/SubPageLayout'

const partnerTypes = [
  { icon: '🏥', title: '동물병원 & 수의원', desc: '동물 의료 전문 기관과 함께 검증된 수의학 교육 콘텐츠를 공동 제작합니다.' },
  { icon: '🤖', title: 'AI & 펫테크 기업', desc: '최신 AI 기술과 펫테크 솔루션을 교육 콘텐츠에 결합하여 시너지를 만듭니다.' },
  { icon: '🎓', title: '교육 기관', desc: '수의학 및 동물 관련 교육 기관과 체계적인 커리큘럼을 공동 개발합니다.' },
  { icon: '📦', title: '반려동물 브랜드', desc: '제품 교육 및 올바른 사용법을 전문 콘텐츠로 제작하여 브랜드 가치를 높입니다.' },
]

const stats = [
  { icon: '👥', value: '1,200+', label: '수강생 네트워크' },
  { icon: '🎬', value: '100+',   label: '교육 콘텐츠' },
  { icon: '⭐', value: '4.9',    label: '평균 만족도' },
  { icon: '📱', value: 'iOS·AOS', label: '모바일 앱 제공' },
]

const steps = [
  { step: '01', title: '문의 접수', desc: '아래 제휴 문의 폼으로 파트너십 방향과 기관 정보를 보내주세요.' },
  { step: '02', title: '사전 미팅', desc: '영업일 3일 이내 담당자가 연락하여 구체적인 협력 방향을 논의합니다.' },
  { step: '03', title: '계약 체결', desc: '양측 협의 후 파트너십 계약을 체결하고 공식 파트너로 등록됩니다.' },
  { step: '04', title: '콘텐츠 협력', desc: '공동 기획, 제작, 프로모션 등 다양한 형태로 협력을 시작합니다.' },
]

export default function Partnership() {
  return (
    <SubPageLayout
      breadcrumb={[{ label: '강사 소개', to: '/instructors' }, { label: '파트너십' }]}
      title="🤝 파트너십"
    >
      {/* 소개 */}
      <div className="mb-14 text-center">
        <p className="section-label mb-3">Partnership</p>
        <h2 className="section-title mb-4">함께 성장하는 파트너</h2>
        <p className="section-desc mx-auto max-w-2xl">
          PawEdu는 반려동물 헬스케어 교육 생태계를 함께 만들어갈 파트너를 찾고 있습니다.
          다양한 분야의 전문 기관과 협력하여 더 나은 교육 환경을 만들어 가겠습니다.
        </p>
      </div>

      {/* 수치 */}
      <div className="mb-14 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map(s => (
          <div key={s.label} className="card-base p-6 text-center">
            <span className="mb-2 block text-3xl">{s.icon}</span>
            <p className="text-2xl font-extrabold text-primary-600 dark:text-primary-400">{s.value}</p>
            <p className="text-sm text-neutral-500 dark:text-primary-300">{s.label}</p>
          </div>
        ))}
      </div>

      {/* 파트너 유형 */}
      <div className="mb-14">
        <p className="section-label mb-6">파트너 유형</p>
        <div className="grid gap-6 sm:grid-cols-2">
          {partnerTypes.map(p => (
            <div key={p.title} className="card-base flex gap-5 p-6">
              <span className="shrink-0 text-4xl">{p.icon}</span>
              <div>
                <h3 className="mb-2 font-bold text-deep dark:text-white">{p.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-500 dark:text-primary-300">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 진행 절차 */}
      <div className="mb-14">
        <p className="section-label mb-6">파트너십 진행 절차</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(s => (
            <div key={s.step} className="card-base p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white font-extrabold shadow-lg shadow-primary-600/30">
                {s.step}
              </div>
              <h4 className="mb-2 font-bold text-deep dark:text-white">{s.title}</h4>
              <p className="text-sm leading-relaxed text-neutral-500 dark:text-primary-300">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 p-10 text-center text-white">
        <h3 className="mb-3 text-2xl font-extrabold">지금 바로 문의하세요</h3>
        <p className="mb-6 text-primary-200">
          협력에 관심 있으신 기관 및 기업은 아래 버튼을 통해 제휴 문의를 남겨주세요.
        </p>
        <Link to="/contact/partnership" className="btn-accent shadow-lg shadow-accent/30">
          📩 제휴 문의하기 →
        </Link>
      </div>
    </SubPageLayout>
  )
}
