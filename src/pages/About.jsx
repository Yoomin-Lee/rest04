import { useParams, useNavigate } from 'react-router-dom'
import SubPageLayout from '../components/SubPageLayout'
import Icon from '../components/Icon'

const tabs = [
  { key: 'greetings', label: 'CEO 인사말', icon: 'person' },
  { key: 'vision',    label: '비전/미션',  icon: 'target' },
  { key: 'history',   label: '연혁',       icon: 'calendar' },
]

function Greetings() {
  return (
    <div className="flex flex-col gap-12 md:flex-row">
      <div className="shrink-0 md:w-64">
        <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/40 dark:to-deep-700 md:w-64">
          <Icon name="paw" size={72} className="text-primary-400 opacity-50" />
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
  const pillars = [
    {
      icon: 'hospital',
      iconColor: 'text-support-500',
      bg: 'bg-support-50 dark:bg-support-900/20',
      title: '콘텐츠 전문성',
      desc: '모든 교육 콘텐츠는 현직 수의사와 전문 훈련사가 직접 제작·검토합니다. 상업적 목적의 정보를 배제하고 임상에서 검증된 지식만 전달합니다.',
    },
    {
      icon: 'ai',
      iconColor: 'text-primary-500',
      bg: 'bg-primary-50 dark:bg-primary-900/20',
      title: 'AI 기반 개인화',
      desc: 'AI 기술로 보호자의 반려동물 종·나이·건강 상태에 맞는 맞춤형 학습 경로를 제공합니다. 데이터 기반으로 콘텐츠를 지속 개선합니다.',
    },
    {
      icon: 'users',
      iconColor: 'text-accent',
      bg: 'bg-accent-50 dark:bg-accent-900/20',
      title: '커뮤니티 연결',
      desc: '보호자와 전문가가 소통하는 신뢰 기반 커뮤니티를 구축합니다. 혼자 걱정하지 않아도 되는 환경을 만드는 것이 목표입니다.',
    },
    {
      icon: 'heart',
      iconColor: 'text-red-400',
      bg: 'bg-red-50 dark:bg-red-900/20',
      title: '사회적 가치',
      desc: '기초 건강 정보는 누구나 무료로 접근할 수 있어야 합니다. 유기동물 보호 교육 및 취약계층 반려인 지원 프로그램을 운영합니다.',
    },
  ]

  const values = [
    {
      icon: 'shield',
      iconColor: 'text-primary-500',
      title: '신뢰',
      desc: '모든 콘텐츠는 현직 수의사가 직접 제작·검토합니다. 광고성 정보 없이, 오직 반려동물에게 최선인 지식만 전달합니다.',
    },
    {
      icon: 'bulb',
      iconColor: 'text-accent',
      title: '혁신',
      desc: 'AI 기술을 교육에 접목해 개인화된 학습 경험을 제공합니다. 끊임없는 기술 연구로 더 나은 케어 방법을 탐구합니다.',
    },
    {
      icon: 'heart',
      iconColor: 'text-red-400',
      title: '공감',
      desc: '반려동물을 가족으로 여기는 보호자의 마음을 이해합니다. 걱정되는 순간마다 가장 먼저 찾을 수 있는 플랫폼이 되겠습니다.',
    },
    {
      icon: 'books',
      iconColor: 'text-support-500',
      title: '접근성',
      desc: '교육의 언어적·경제적 장벽을 낮춥니다. 기초 건강 정보는 누구나 무료로, 심화 교육은 합리적인 비용으로 제공합니다.',
    },
  ]

  const goals = [
    { value: '3,000+', label: '수강생 달성', sub: '2026년 목표' },
    { value: '200+',   label: '전문 콘텐츠', sub: '2026년 목표' },
    { value: '50+',    label: '파트너 병원', sub: '2026년 목표' },
    { value: '20%',    label: '예방 비용 절감', sub: '보호자 기여 목표' },
  ]

  return (
    <div className="space-y-14">

      {/* 비전 / 미션 */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-primary-100 bg-primary-50 p-8 dark:border-primary-800 dark:bg-primary-900/30">
          <Icon name="star" size={36} className="mb-4 text-primary-500 dark:text-primary-400" />
          <p className="section-label mb-2">Vision</p>
          <h3 className="mb-4 text-xl font-extrabold text-deep dark:text-white">
            반려동물 헬스케어 교육의<br />새로운 기준을 만듭니다
          </h3>
          <p className="mb-5 text-sm leading-relaxed text-neutral-600 dark:text-primary-200">
            2030년까지, 반려동물을 키우는 모든 가정이 수의학 전문 지식에 쉽게 접근할 수 있는 교육 환경을 만들겠습니다.
            국내 반려동물 보호자 1,000만 명에게 신뢰할 수 있는 헬스케어 정보를 제공하고, 수의사와 보호자 사이의 소통 격차를 해소합니다.
          </p>
          <ul className="space-y-2">
            {['임상 검증 콘텐츠로 정보 신뢰도 확보', 'AI 개인화 교육으로 보호자 역량 강화', '예방 중심 케어 문화 확산'].map(t => (
              <li key={t} className="flex items-start gap-2 text-sm text-primary-700 dark:text-primary-300">
                <Icon name="checkCircle" size={15} className="mt-0.5 shrink-0 text-primary-500" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-support-100 bg-support-50 p-8 dark:border-support-800 dark:bg-support-900/20">
          <Icon name="target" size={36} className="mb-4 text-support-600 dark:text-support-400" />
          <p className="section-label mb-2">Mission</p>
          <h3 className="mb-4 text-xl font-extrabold text-deep dark:text-white">
            보호자가 먼저 알면<br />반려동물이 더 건강해집니다
          </h3>
          <p className="mb-5 text-sm leading-relaxed text-neutral-600 dark:text-primary-200">
            김예진 동물병원의 임상 경험과 AI 기술을 결합하여, 보호자가 반려동물의 건강을 더 능동적으로 관리할 수 있도록 돕겠습니다.
            단순한 정보 전달을 넘어, 보호자의 실천 능력을 키우는 교육을 지향합니다.
          </p>
          <ul className="space-y-2">
            {['수의사 직접 제작 100% 전문 콘텐츠', 'AI 맞춤 학습 경로로 효율적 지식 습득', '예방·행동·영양 전 분야 통합 교육'].map(t => (
              <li key={t} className="flex items-start gap-2 text-sm text-support-700 dark:text-support-300">
                <Icon name="checkCircle" size={15} className="mt-0.5 shrink-0 text-support-500" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 2026 목표 수치 */}
      <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 p-8 text-white">
        <p className="mb-6 text-center text-sm font-bold tracking-widest opacity-80">2026 KEY GOALS</p>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {goals.map(g => (
            <div key={g.label} className="text-center">
              <p className="text-3xl font-extrabold">{g.value}</p>
              <p className="mt-1 text-sm font-semibold">{g.label}</p>
              <p className="mt-0.5 text-xs opacity-60">{g.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 전략 방향 */}
      <div>
        <p className="section-label mb-6">Strategic Pillars</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {pillars.map(p => (
            <div key={p.title} className={`rounded-2xl border border-transparent p-6 ${p.bg}`}>
              <div className="mb-3 flex items-center gap-3">
                <Icon name={p.icon} size={22} className={p.iconColor} />
                <h4 className="font-bold text-deep dark:text-white">{p.title}</h4>
              </div>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-primary-200">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 핵심 가치 */}
      <div>
        <p className="section-label mb-6">Core Values</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(v => (
            <div key={v.title} className="card-base p-6">
              <Icon name={v.icon} size={26} className={`mb-3 ${v.iconColor}`} />
              <h4 className="mb-2 font-bold text-deep dark:text-white">{v.title}</h4>
              <p className="text-sm leading-relaxed text-neutral-500 dark:text-primary-300">{v.desc}</p>
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
      title={current.label}
      icon={current.icon}
    >
      <div className="mb-10 flex flex-wrap gap-2 border-b border-neutral-100 dark:border-deep-700 pb-6">
        {tabs.map(t => (
          <button key={t.key} type="button"
            onClick={() => navigate(`/about/${t.key}`)}
            className={['tab-btn', t.key === tab ? 'tab-btn-active' : 'tab-btn-inactive'].join(' ')}
          >
            <Icon name={t.icon} size={15} className="shrink-0" />
            {t.label}
          </button>
        ))}
      </div>
      {content[tab] || <p className="text-neutral-500">준비 중입니다.</p>}
    </SubPageLayout>
  )
}
