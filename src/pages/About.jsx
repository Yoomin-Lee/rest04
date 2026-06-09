import { useParams, useNavigate } from 'react-router-dom'
import SubPageLayout from '../components/SubPageLayout'

const tabs = [
  { key: 'greetings', label: 'CEO 인사말', emoji: '👋' },
  { key: 'vision',    label: '비전/미션',  emoji: '🎯' },
  { key: 'history',   label: '연혁',       emoji: '📅' },
]

function Greetings() {
  return (
    <div className="flex flex-col gap-12 md:flex-row">
      <div className="shrink-0 md:w-64">
        <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/40 dark:to-deep-700 md:w-64">
          <span className="text-7xl opacity-60">🐾</span>
        </div>
        <div className="mt-4 text-center">
          <p className="text-lg font-bold text-deep dark:text-white">김예진</p>
          <p className="text-sm text-primary-600 dark:text-primary-400">원장 / 수의사</p>
        </div>
      </div>
      <div className="flex-1">
        <p className="section-label mb-3">CEO Message</p>
        <h2 className="mb-6 text-2xl font-extrabold text-deep dark:text-white md:text-3xl">
          반려동물과 보호자가 함께<br />더 건강하고 행복한 삶을
        </h2>
        <div className="space-y-4 text-base leading-relaxed text-neutral-600 dark:text-primary-200">
          <p>안녕하세요, 김예진 동물병원 원장 김예진입니다.</p>
          <p>
            수의사로서 오랜 임상 경험을 쌓으면서, 진료실 밖에서도 반려동물을 더 잘 이해하고
            돌볼 수 있는 보호자들이 필요하다는 것을 절감했습니다.
            <em className="font-semibold text-primary-600 dark:text-primary-400"> "보호자가 먼저 알면, 반려동물이 더 건강해진다."</em>
          </p>
          <p>
            그 믿음 하나로 PawEdu를 시작했습니다. 김예진 동물병원의 수의사와 전문가들이
            직접 참여하여 만든 교육 콘텐츠는 현장에서 검증된 지식을 바탕으로 합니다.
            AI 기술을 접목해 누구나 쉽고 효과적으로 배울 수 있도록 설계했습니다.
          </p>
          <p>
            우리의 목표는 단 하나입니다. 반려동물과 보호자 모두가 더 건강하고 행복한 삶을
            누릴 수 있도록 돕는 것입니다.
          </p>
          <p className="font-semibold text-deep dark:text-white">
            김예진 동물병원이 만든 PawEdu와 함께 더 스마트한 반려동물 케어를 시작해보세요.
          </p>
        </div>
        <div className="mt-8 border-t border-neutral-100 dark:border-deep-700 pt-6">
          <p className="text-sm text-neutral-400">김예진 동물병원 원장</p>
          <p className="mt-1 text-xl font-bold text-deep dark:text-white" style={{ fontFamily: 'serif' }}>김예진</p>
        </div>
      </div>
    </div>
  )
}

function Vision() {
  const visions = [
    { icon: '🌟', title: '비전', desc: '모든 반려동물이 최고의 헬스케어 교육 혜택을 받을 수 있는 세상을 만듭니다.', color: 'bg-primary-50 dark:bg-primary-900/30 border-primary-100 dark:border-primary-800' },
    { icon: '🎯', title: '미션', desc: 'AI와 전문 수의학 지식을 결합한 접근 가능한 교육으로 반려동물 보호자의 역량을 강화합니다.', color: 'bg-support-50 dark:bg-support-900/20 border-support-100 dark:border-support-800' },
  ]
  const values = [
    { icon: '🤝', title: '신뢰', desc: '검증된 전문가의 지식만을 제공합니다' },
    { icon: '💡', title: '혁신', desc: 'AI 기술로 더 나은 교육 경험을 만듭니다' },
    { icon: '❤️', title: '공감', desc: '반려동물과 보호자 모두를 위해 설계합니다' },
    { icon: '📚', title: '접근성', desc: '누구나 쉽게 배울 수 있는 콘텐츠를 만듭니다' },
  ]

  return (
    <div className="space-y-12">
      <div className="grid gap-6 md:grid-cols-2">
        {visions.map(v => (
          <div key={v.title} className={`rounded-2xl border p-8 ${v.color}`}>
            <span className="mb-4 block text-4xl">{v.icon}</span>
            <h3 className="mb-3 text-xl font-bold text-deep dark:text-white">{v.title}</h3>
            <p className="text-base leading-relaxed text-neutral-600 dark:text-primary-200">{v.desc}</p>
          </div>
        ))}
      </div>
      <div>
        <p className="section-label mb-6">Core Values</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(v => (
            <div key={v.title} className="card-base p-6 text-center">
              <span className="mb-3 block text-3xl">{v.icon}</span>
              <h4 className="mb-2 font-bold text-deep dark:text-white">{v.title}</h4>
              <p className="text-sm text-neutral-500 dark:text-primary-300">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function History() {
  const events = [
    { year: '2026', month: '05', title: 'AI 리터러시 교육 시리즈 런칭', desc: '반려동물 AI 도구 리터러시 전문 교육과정 개설' },
    { year: '2026', month: '04', title: '모바일 앱 출시 (iOS / Android)', desc: '어디서든 편리하게 접근할 수 있는 모바일 앱 공식 출시' },
    { year: '2026', month: '02', title: '수강생 1,000명 돌파', desc: '베타 출시 6개월 만에 수강생 1,000명 달성' },
    { year: '2025', month: '10', title: '행동 교정 전문 과정 오픈', desc: '박민지 전문 훈련사와 함께하는 행동교정 마스터 클래스' },
    { year: '2025', month: '07', title: 'PawEdu 베타 서비스 시작', desc: '수의사·AI 전문가 협업 교육 플랫폼 정식 베타 오픈' },
    { year: '2025', month: '03', title: 'PawEdu 법인 설립', desc: '반려동물 헬스케어 전문 교육 회사 PawEdu 설립' },
  ]

  return (
    <div>
      <p className="section-label mb-8">Company History</p>
      <div className="space-y-6">
        {events.map((e, i) => (
          <div key={i} className="flex gap-5 items-start">
            <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-full bg-primary-600 text-white shadow-lg shadow-primary-600/30">
              <span className="text-[10px] font-semibold opacity-80">{e.year}</span>
              <span className="text-xs font-bold">{e.month}</span>
            </div>
            <div className="card-base flex-1 p-5">
              <p className="mb-1 text-xs font-semibold text-primary-600 dark:text-primary-400">{e.year}.{e.month}</p>
              <h4 className="mb-1 font-bold text-deep dark:text-white">{e.title}</h4>
              <p className="text-sm text-neutral-500 dark:text-primary-300">{e.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function About() {
  const { tab = 'greetings' } = useParams()
  const navigate = useNavigate()
  const current = tabs.find(t => t.key === tab) || tabs[0]
  const content = { greetings: <Greetings />, vision: <Vision />, history: <History /> }

  return (
    <SubPageLayout
      breadcrumb={[{ label: '회사소개' }]}
      title={`${current.emoji} ${current.label}`}
    >
      <div className="mb-10 flex flex-wrap gap-2 border-b border-neutral-100 dark:border-deep-700 pb-6">
        {tabs.map(t => (
          <button key={t.key} type="button"
            onClick={() => navigate(`/about/${t.key}`)}
            className={['tab-btn', t.key === tab ? 'tab-btn-active' : 'tab-btn-inactive'].join(' ')}
          >
            {t.emoji} {t.label}
          </button>
        ))}
      </div>
      {content[tab] || <p className="text-neutral-500">준비 중입니다.</p>}
    </SubPageLayout>
  )
}
