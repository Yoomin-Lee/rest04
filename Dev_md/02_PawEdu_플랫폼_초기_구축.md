# 02. PawEdu 반려동물 헬스케어 교육 플랫폼 초기 구축

작업일: 2026-06-08 ~ 2026-06-09  
커밋: `bf355b3`

---

## 목표
반려동물 스마트 헬스케어 온라인 교육 플랫폼 **PawEdu**를 React + Vite + Tailwind CSS로 구축한다.  
사이트 정보는 `src/data/site.js` 단일 파일에서 관리하여 템플릿 재사용성을 확보한다.

---

## 기술 스택
| 항목 | 선택 | 이유 |
|------|------|------|
| 프레임워크 | React 18 + Vite 5 | 빠른 HMR, 경량 번들 |
| 스타일 | Tailwind CSS 3 | 유틸리티 기반, 빠른 UI 구성 |
| 라우팅 | React Router 6 (HashRouter) | GitHub Pages 정적 배포 호환 |
| 배포 | GitHub Pages + GitHub Actions | 무료 정적 호스팅 |
| 폰트 | Pretendard (CDN) | 한국어 최적화 가독성 |

---

## 컬러 시스템
| 토큰 | 색상 | 용도 |
|------|------|------|
| `primary` | Violet (#7c3aed) | 주 브랜드 컬러 |
| `accent` | Amber (#f59e0b) | 포인트·CTA |
| `support` | Emerald (#10b981) | 보조 강조 |
| `deep` | Indigo (#1e1b4b) | 다크 배경·텍스트 |

다크모드: `ThemeContext` + `localStorage('pawedu-theme')` + `prefers-color-scheme` 자동 감지

---

## 구현 범위

### 공통 컴포넌트
| 컴포넌트 | 기능 |
|----------|------|
| `Header` | 데스크탑 메가드롭다운 + 모바일 슬라이드 패널 + 다크모드 토글 + 스크롤 투명→불투명 전환 |
| `Footer` | 브랜드·소개·SNS·컬러팔레트·하단 정책링크·카피라이트 |
| `SubPageLayout` | 서브 페이지 공통 헤더(그라디언트 배경 + 빵부스러기) |
| `ThemeToggle` | 슬라이드 토글 버튼, 아이콘(☀️/🌙) |
| `ScrollToTop` | 라우트 변경 시 자동 스크롤 초기화 |
| `ScrollToTopButton` | 400px 이상 스크롤 시 우하단 플로팅 버튼 |
| `Placeholder` | 이미지 자리표시자(라벨·비율·사선패턴) |
| `VideoCard` | YouTube 썸네일·제목·강사·태그 카드 |
| `VideoModal` | YouTube embed 모달 (ESC·외부클릭 닫기, placeholder 처리) |

### 페이지
| 라우트 | 컴포넌트 | 주요 기능 |
|--------|----------|-----------|
| `/` | `Home` | 히어로 슬라이더(자동 6s·수동 이동·인디케이터) / 통계 스트립 / 특징 카드 4개 / 최신 영상 2×3 그리드 / 회사 소개 배너 / 공지사항 |
| `/videos/:category` | `Videos` | 카테고리 탭(4개) + 페이지네이션(6개씩) + 영상 모달 |
| `/about/:tab` | `About` | CEO 인사말 / 비전·미션 / 연혁 탭 전환 |
| `/contact/:type` | `Contact` | 연락처 카드 + 고객·제휴 문의 폼(전송 완료 피드백) |

### 데이터 파일
- **`src/data/site.js`**: 회사정보·GNB·히어로슬라이드·통계·특징카드·강사·공지 전체 관리
- **`src/data/videos.js`**: 4개 카테고리 × 8개 = 32개 영상 메타데이터 (videoId는 `REPLACE_VIDEO_ID` placeholder)

---

## 라우트 구조
```
/                    → Home
/videos              → redirect → /videos/ai
/videos/:category    → Videos (ai | literacy | health | behavior)
/about               → redirect → /about/greetings
/about/:tab          → About (greetings | vision | history)
/contact             → Contact
/contact/:type       → Contact (general | partnership)
/instructors         → SimplePage (미구현)
/partnership         → SimplePage (미구현)
/privacy             → SimplePage (미구현)
/terms               → SimplePage (미구현)
```

---

## 검증
- `npm run build` 성공 (54 modules, ~8s)
- `npm run dev` 부팅 및 전 라우트 HTTP 200 확인
- 다크모드 전환 정상 동작
- 모바일(320px) ~ 데스크탑(1400px) 반응형 확인

---

## 배포
- `.github/workflows/deploy.yml`: `main` 브랜치 push 시 빌드 → GitHub Pages 자동 배포
- 배포 URL: https://yoomin-lee.github.io/rest04/
- GitHub 저장소 Settings → Pages → Source를 **GitHub Actions**로 전환 필요 (최초 1회)

---

## TODO (후속)
- `/instructors`, `/partnership`, `/privacy`, `/terms` 페이지 구현
- `videos.js` 실제 YouTube videoId 교체
