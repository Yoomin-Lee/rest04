// ============================================================
// PawEdu — 반려동물 스마트 헬스케어 교육 플랫폼
// 사이트 전역 데이터 — 이 파일만 수정하면 대부분의 내용이 반영됩니다
// ============================================================

export const company = {
  name: 'PawEdu',
  nameKo: '포에듀',
  fullName: '김예진 동물병원',
  tagline: '반려동물과 함께하는 스마트 헬스케어 교육',
  taglineSub: '김예진 동물병원이 직접 운영하는 반려동물 전문 교육 플랫폼',
  copyright: '© 2026 김예진 동물병원. All rights reserved.',
  intro: [
    '김예진 동물병원이 직접 만들고 운영하는 반려동물 헬스케어 전문 교육 플랫폼입니다.',
    'AI 기술과 수의학 전문 지식을 결합하여, 반려동물 보호자가 더 나은 돌봄을 실천할 수 있도록 돕습니다.',
  ],
  offices: [
    {
      label: '본원',
      address: '서울특별시 강남구 테헤란로 123 김예진빌딩 1F',
      tel: '02-000-0000',
      fax: '02-000-0001',
      email: 'info@pawedu.kr',
    },
  ],
  sns: [
    { label: 'YouTube', url: 'https://youtube.com/@pawedu', icon: 'yt' },
    { label: 'Instagram', url: 'https://instagram.com/pawedu', icon: 'ig' },
    { label: 'Blog', url: 'https://blog.naver.com/pawedu', icon: 'blog' },
  ],
  footerLinks: [
    { label: '개인정보처리방침', to: '/privacy', strong: true },
    { label: '이용약관', to: '/terms' },
    { label: '문의하기', to: '/contact' },
  ],
}

// 상단 GNB
export const nav = [
  {
    label: '회사소개',
    to: '/about',
    children: [
      { label: 'CEO 인사말', to: '/about/greetings' },
      { label: '비전/미션', to: '/about/vision' },
      { label: '연혁', to: '/about/history' },
    ],
  },
  {
    label: '교육 콘텐츠',
    to: '/videos/ai',
    children: [
      { label: 'AI 교육', to: '/videos/ai' },
      { label: 'AI 리터러시', to: '/videos/literacy' },
      { label: '반려동물 건강', to: '/videos/health' },
      { label: '행동 교정', to: '/videos/behavior' },
    ],
  },
  {
    label: '강사 소개',
    to: '/instructors',
    children: [
      { label: '전문가 소개', to: '/instructors' },
      { label: '파트너십', to: '/partnership' },
    ],
  },
  {
    label: '문의하기',
    to: '/contact',
    children: [
      { label: '고객 문의', to: '/contact' },
      { label: '제휴 문의', to: '/contact/partnership' },
    ],
  },
]

// 메인 히어로 슬라이드
export const heroSlides = [
  {
    label: 'AI로 더 스마트하게',
    copy: 'AI와 함께하는\n반려동물 헬스케어',
    sub: '전문가가 만든 동영상 콘텐츠로 반려동물의 건강을 지켜주세요',
    cta: '교육 콘텐츠 보기',
    ctaTo: '/videos/ai',
  },
  {
    label: '전문 수의사와 함께',
    copy: '건강한 반려동물,\n행복한 보호자',
    sub: '수의사와 AI 전문가가 함께 만든 체계적인 온라인 교육',
    cta: '무료로 시작하기',
    ctaTo: '/videos/health',
  },
]

// 메인 통계
export const stats = [
  { value: '1,200+', label: '수강생', icon: '👥' },
  { value: '100+',   label: '강의 콘텐츠', icon: '🎬' },
  { value: '8+',     label: '전문 강사', icon: '👨‍🏫' },
  { value: '4.9',    label: '평균 평점', icon: '⭐' },
]

// 메인 특징 카드
export const features = [
  {
    key: 'health',
    icon: '🐾',
    title: '반려동물 헬스케어',
    desc: '수의사와 전문가가 직접 제작한 건강관리 콘텐츠로 소중한 반려동물을 더욱 건강하게 돌보세요.',
    color: 'support',
    to: '/videos/health',
  },
  {
    key: 'ai',
    icon: '🤖',
    title: 'AI 활용 교육',
    desc: '최신 AI 기술을 활용한 반려동물 건강 모니터링과 스마트 케어 방법을 체계적으로 배울 수 있습니다.',
    color: 'primary',
    to: '/videos/ai',
  },
  {
    key: 'literacy',
    icon: '📖',
    title: 'AI 리터러시',
    desc: 'AI를 올바르게 이해하고 반려동물 케어에 스마트하게 활용하는 방법을 전문가가 안내합니다.',
    color: 'lavender',
    to: '/videos/literacy',
  },
  {
    key: 'behavior',
    icon: '🎯',
    title: '행동 교정',
    desc: '전문 훈련사와 함께하는 체계적인 행동 교정 프로그램으로 더 행복한 반려동물 생활을 만드세요.',
    color: 'accent',
    to: '/videos/behavior',
  },
]

// 강사 소개
export const instructors = [
  {
    name: '김수연',
    title: '수의학 박사',
    spec: '반려동물 내과 & 영양 전문',
    lectures: 28,
    rating: 4.9,
  },
  {
    name: '이준혁',
    title: 'AI 연구원',
    spec: '펫테크 & AI 헬스케어',
    lectures: 22,
    rating: 4.8,
  },
  {
    name: '박민지',
    title: '동물 행동 전문가',
    spec: '반려동물 행동교정 & 훈련',
    lectures: 30,
    rating: 5.0,
  },
  {
    name: '최동현',
    title: '수의사',
    spec: '피부과 & 예방의학',
    lectures: 20,
    rating: 4.9,
  },
]

// 공지사항
export const notices = [
  { id: 5, title: '2026 여름 특강 — "AI와 반려동물 건강관리" 오픈', date: '2026.06.01', isNew: true },
  { id: 4, title: '행동교정 마스터 클래스 신규 콘텐츠 업데이트 안내', date: '2026.05.20', isNew: true },
  { id: 3, title: 'PawEdu 앱 출시 안내 (iOS / Android)', date: '2026.05.10' },
  { id: 2, title: '수의사 Q&A 라이브 세션 참여 안내', date: '2026.04.28' },
  { id: 1, title: 'PawEdu 베타 서비스 오픈 기념 이벤트', date: '2026.04.01' },
]
