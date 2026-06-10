# 10. Google 로그인 추가 및 카카오 로그인 트러블슈팅

작업일: 2026-06-10

---

## 목표
1. Google OAuth 로그인 추가
2. 카카오 로그인 KOE205 오류 원인 분석 및 해결 시도

---

## Google 로그인 구현

### Google Cloud Console 설정
- APIs & Services → Credentials → OAuth 2.0 Client ID (Web application) 생성
- Authorized redirect URI 등록: `https://kbjxjogmnwurxbxnpfsz.supabase.co/auth/v1/callback`

### Supabase 설정 (Management API)
```bash
PATCH https://api.supabase.com/v1/projects/{ref}/config/auth
{
  "external_google_enabled": true,
  "external_google_client_id": "...",
  "external_google_secret": "..."
}
```
Redirect URL 허용 목록에 `https://yoomin-lee.github.io/rest04/` 추가

### 코드 변경
- `AuthContext.jsx` — `signInWithGoogle()` 함수 추가
- `Login.jsx` — 구글 로그인 버튼 추가

---

## 카카오 로그인 트러블슈팅

### 근본 원인
Supabase Kakao 프로바이더는 서버 측에서 `account_email + profile_image + profile_nickname` 스코프를 **강제로 추가**하며, 클라이언트에서 제거 불가능.

Kakao는 `account_email` 스코프 요청 시 앱에 **개인정보 처리방침 URL**이 없으면 KOE205로 차단.

### 시도한 내용
| 시도 | 결과 |
|------|------|
| Kakao 앱 비즈앱 전환 | KOE205 지속 |
| 동의항목 (닉네임·이메일) 설정 | KOE205 지속 |
| 클라이언트 scopes 제한 | Supabase 서버가 account_email 강제 추가 — 효과 없음 |
| rest04 전용 Kakao 앱 생성 | KOE205 지속 (이메일 권한 없음) |
| CatsCare 비즈앱으로 전환 | account_email 권한 있으나 개인정보처리방침 URL 미등록으로 KOE205 |

### 결론
Supabase 내장 Kakao 프로바이더 사용 시 `account_email` 스코프 제거 불가 → Kakao 앱에 개인정보처리방침 URL 등록이 필수.

### 해결 예정 (다음 작업)
`https://yoomin-lee.github.io/rest04/#/privacy` 를 CatsCare Kakao 앱 동의항목에 개인정보처리방침 URL로 등록

---

## 현재 로그인 상태

| 방식 | 상태 |
|------|------|
| 이메일/비밀번호 | ✅ 정상 |
| Google | ✅ 정상 |
| 카카오 | ⏳ 내일 개인정보처리방침 URL 등록 후 완료 예정 |

---

## 배포
```bash
npm run deploy
```
배포 URL: https://yoomin-lee.github.io/rest04/
