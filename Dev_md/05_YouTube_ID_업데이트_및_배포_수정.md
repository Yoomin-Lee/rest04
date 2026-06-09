# 05. YouTube Video ID 실제 영상 교체 & 배포 방식 수정

작업일: 2026-06-09  
커밋: `cd22d90`, `816a3c1`, 이후 커밋

---

## 목표
1. `videos.js`의 플레이스홀더 `videoId: 'REPLACE_VIDEO_ID'`를 실제 YouTube 영상 ID로 교체
2. GitHub Actions `deploy.yml` 인식 불가 문제를 해결하여 사이트 정상 배포

---

## 문제 진단

### 누락된 소스 파일
이전 커밋에서 아래 파일들이 git에 포함되지 않아 GitHub Actions 빌드가 불가능한 상태였음:

| 누락 파일 | 이유 |
|-----------|------|
| `src/components/ThemeToggle.jsx` | git add 누락 |
| `src/components/VideoCard.jsx` | git add 누락 |
| `src/components/VideoModal.jsx` | git add 누락 |
| `src/context/ThemeContext.jsx` | 디렉토리째 누락 |
| `src/data/videos.js` | git add 누락 |
| `src/pages/Contact.jsx` | git add 누락 |
| `src/pages/Videos.jsx` | git add 누락 |
| `public/favicon.svg` | git add 누락 |

→ 커밋 `cd22d90`에서 전체 소스 파일 일괄 커밋

### GitHub Actions 미인식 + 배포 방식 변경
- 기존: `deploy.yml`을 통한 GitHub Actions 배포
- 문제: GitHub이 `deploy.yml`을 workflow로 등록하지 않음 (원인 불명)
- 해결: `gh-pages` npm 패키지를 이용해 로컬에서 직접 `dist/`를 `gh-pages` 브랜치에 push
- `package.json`에 `"deploy": "npm run build && gh-pages -d dist"` 스크립트 추가
- GitHub Pages Source를 `gh-pages` 브랜치로 전환

### 이후 배포 방법
```bash
npm run deploy   # 빌드 → gh-pages 브랜치에 자동 배포
```

---

## YouTube Video ID 교체

### 검색 방식
WebSearch + WebFetch로 실제 YouTube 영상 URL을 탐색하여 Video ID 검증

### 카테고리별 교체 현황

**AI 교육 (8개)**
| 영상 제목 | Video ID |
|-----------|----------|
| 펫테크로 반려동물 관리하는 법 / KBS | `ac5Y4gUbAJA` |
| 반려동물 건강 AI로 살핀다 — 펫테크 열풍 | `cNYpcMbYp3A` |
| 사진 한 장으로 AI가 반려동물 돌본다 / KBS | `bT1uW30Pobw` |
| AI가 반려견 엑스레이 판독 / 한국경제TV | `ZGutF46EGf8` |
| AI로 반려동물 헬스케어 / YTN | `OD2oseD6Kk8` |
| AI 기반 헬스케어 스타트업 라이펫 | `38rpYGa1ztw` |
| 인공지능 기반 반려동물 건강관리 / YTN 사이언스 | `1FyY1kGcL9k` |
| 반려동물 건강도 AI 전성시대 / YTN | `9P5xIAJoklQ` |

**AI 리터러시 (8개)**
| 영상 제목 | Video ID |
|-----------|----------|
| 초보자를 위한 ChatGPT 사용법 완전정복 | `siNs7LMCfNk` |
| AI 리터러시 교육 자료 보급 / 서울시교육청TV | `DbYCcDMA8rQ` |
| AI 리터러시 교육 1부 — 미래역량강화 | `VOCeRGyp-Fs` |
| AI 리터러시 제대로 이해해보기 | `eEU2t8ey3qQ` |
| AI·디지털 리터러시 핵심 정리 | `wer80akPBb0` |
| 디지털 리터러시 교육이 필요한 이유 | `-_kw3IhLnE8` |
| 인생이 바뀌는 ChatGPT 활용법 — AI 학개론 | `v6pDubPbpqQ` |
| 대기업 임직원이 선택한 ChatGPT 강의 | `6tH8jHIfGTk` |

**반려동물 건강 (8개)**
| 영상 제목 | Video ID |
|-----------|----------|
| 고양이 예방접종 총정리 / 솔동물의료센터 | `W_-oHT2A39s` |
| 반려견 예방접종 필수 백신 / 설채현 수의사 | `4rWnaIsNW1M` |
| 고양이 예방접종 시기 가이드 / 멍냥백과 | `tf9Cq5-P26U` |
| 강아지·고양이 예방접종 한 영상 완전 정리 | `thgCRS0wpGI` |
| 어린 강아지 vs 성견 영양 비교 | `tTK10puJSnM` |
| 강아지 건강검진 꿀팁 / 수의사 | `QcYGEU_IGmw` |
| 반려동물 건강검진 핵심 가이드 | `yqAHbEPY4cc` |
| CES 2022 반려동물 AI 건강관리 / YTN | `N37lM7BU_Lo` |

**행동 교정 (8개)**
| 영상 제목 | Video ID |
|-----------|----------|
| 분리불안 훈련이 고쳐지지 않는 이유 | `nYQXtFJordI` |
| 분리불안 훈련·예방 꿀팁 대공개 | `F6_9LD2kAsU` |
| 분리불안 교육 — 참게 하면 안 된다 | `hk1Vl4u3KYU` |
| 요구성 짖음·분리불안 교육법 | `nY9Gy8Z-eec` |
| 행동 교정 훈련사 꿀팁 / YTN 라이프 | `wkRHfIfjOcg` |
| 강 훈련사 분리불안 훈련 / KBS 개는 훌륭하다 | `7XZuHbLcpxc` |
| 강아지 짖음 훈련 효과적으로 하는 방법 | `SGJUin3jSuw` |
| 고양이 행동의 4가지 기본 원칙 | `pi83g4zaMRM` |

---

## 검증
- `npm run build` 성공 (54 modules)
- `npm run deploy` 성공 → `gh-pages` 브랜치 push 완료
- GitHub Pages `status: built` 확인
- 배포 URL: https://yoomin-lee.github.io/rest04/
