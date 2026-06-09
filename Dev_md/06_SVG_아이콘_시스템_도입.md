# 06. AI 이모지 제거 → 전용 SVG 아이콘 시스템 도입

작업일: 2026-06-09

---

## 목표

기존 3D 이모지/스톡 일러스트 스타일의 아이콘을 제거하고,
Apple Health·Toss·당근 수준의 미니멀 라인 아이콘 시스템으로 교체.

---

## 배경

사이트 전반에 사용된 이모지(🐾🤖📖🎯🏥👥🎬⭐ 등)가
AI가 자동 생성한 콘텐츠처럼 보여 전문 의료·헬스케어 서비스의
신뢰감을 저해하고 있었음.

---

## 변경 내용

### 신규 파일: `src/components/Icon.jsx`

- `stroke="currentColor"` 기반 SVG 라인 아이콘 라이브러리
- `strokeWidth="1.75"`, `strokeLinecap="round"` — Lucide/Feather 스타일
- 단일 `<Icon name="..." size={24} className="..." />` API
- 총 30개 아이콘 구현

| 아이콘명 | 용도 |
|----------|------|
| paw | 로고, 히어로 장식, 헬스케어 특징 |
| ai | AI 교육 카테고리, 강사·파트너 |
| book | AI 리터러시 카테고리 |
| target | 행동 교정 카테고리, 비전/미션 |
| hospital | 동물병원 파트너 유형 |
| users | 수강생 통계 |
| person | 전문 강사 통계, 강사 소개, CEO 탭 |
| graduation | 교육 기관 파트너 유형 |
| film | 콘텐츠 플레이스홀더 |
| video | 강의 콘텐츠 통계 |
| play | 영상 모달 |
| mail | CTA 버튼, 문의하기 |
| chat | 고객 문의 탭 |
| phone | 연락처 |
| pin | 주소 |
| moon / sun | 다크모드 토글 |
| checkCircle | 문의 전송 성공 |
| lock | 개인정보처리방침 |
| clipboard | 이용약관 |
| calendar | 연혁 탭 |
| star | 비전, 평점 |
| bulb | 혁신 가치 |
| heart | 공감 가치 |
| books | 접근성 가치 |
| shield | 신뢰 가치 |
| link | 파트너십 |
| pill | 예방의학 강사 |
| mobile | 모바일 앱 통계 |
| box | 반려동물 브랜드 파트너 |
| youtube / instagram / write | 소셜 링크 |

### 수정 파일 (18개)

- **데이터**: `site.js` (stats, features 아이콘), `videos.js` (카테고리 icon 필드)
- **공통 컴포넌트**: `SubPageLayout.jsx` (`icon` prop 추가), `Header.jsx`, `Footer.jsx`, `ThemeToggle.jsx`, `VideoCard.jsx`, `VideoModal.jsx`
- **페이지**: `Home.jsx`, `About.jsx`, `Instructors.jsx`, `Partnership.jsx`, `Contact.jsx`, `Videos.jsx`, `Privacy.jsx`, `Terms.jsx`, `SimplePage.jsx`

### 주요 디자인 결정

- 히어로 섹션의 부유 이모지(🐾🐕🐈🦮) → 동일 위치에 `<Icon name="paw"/>` SVG로 교체
- `SubPageLayout` 페이지 제목에 인라인 SVG 아이콘 삽입 (`icon` prop)
- 각 아이콘에 context 맞는 컬러 클래스 적용 (`text-primary-500`, `text-support-500`, `text-accent`, etc.)
- 다크모드 토글 내부 이모지 → `stroke="currentColor"` SVG로 교체

---

## 검증

- `npm run build` 성공 (55 modules, 237 kB JS, 42 kB CSS)
- 이모지 잔존 여부: 미디어 관련 외부 참조 없음

---

## 배포

- `npm run deploy --dotfiles` → gh-pages 브랜치 push 완료
