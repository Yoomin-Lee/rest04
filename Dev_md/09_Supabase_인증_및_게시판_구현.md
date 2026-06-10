# 09. Supabase 연동 — 로그인(카카오·이메일) & 게시판 구현

작업일: 2026-06-10  
브랜치: main

---

## 목표
1. Supabase Auth 연동 — 카카오 OAuth + 이메일/비밀번호 로그인·회원가입
2. 게시판 (공지/자유) — 글 목록·상세·작성·수정·삭제 + 댓글 + 파일 첨부
3. Header에 인증 상태 반영 (로그인/로그아웃 버튼)

---

## 기술 스택 추가
| 라이브러리 | 버전 | 용도 |
|-----------|------|------|
| `@supabase/supabase-js` | ^2.x | DB·Auth·Storage 클라이언트 |

---

## 파일 구조 변경

```
src/
├── lib/
│   └── supabase.js          # Supabase 클라이언트 초기화
├── context/
│   ├── ThemeContext.jsx      # (기존)
│   └── AuthContext.jsx       # 신규 — 인증 상태 전역 관리
└── pages/
    ├── Login.jsx             # 카카오 OAuth + 이메일 로그인
    ├── Register.jsx          # 이메일 회원가입
    ├── BoardList.jsx         # 게시판 목록 (페이지네이션·검색)
    ├── BoardDetail.jsx       # 게시글 상세 + 댓글
    ├── BoardWrite.jsx        # 글 작성 + 파일 첨부
    └── BoardEdit.jsx         # 글 수정 + 파일 관리
```

환경변수 파일 (`.env`):
```
VITE_SUPABASE_URL=https://kbjxjogmnwurxbxnpfsz.supabase.co
VITE_SUPABASE_ANON_KEY=<anon key>
```

---

## Supabase DB 스키마 (`supabase_schema.sql`)

### 테이블 설계

| 테이블 | 주요 컬럼 | 설명 |
|--------|-----------|------|
| `profiles` | id(uuid), email, nickname, avatar_url | auth.users 확장, 신규 가입 시 트리거로 자동 생성 |
| `posts` | id, user_id, title, content, views, created_at, updated_at | 게시글 |
| `comments` | id, post_id, user_id, content, created_at | 댓글 |
| `post_files` | id, post_id, user_id, file_name, file_path, file_size, mime_type | 첨부파일 메타데이터 |

### RLS 정책 요약
- **조회**: 누구나 가능
- **작성**: 로그인 사용자(`auth.uid() is not null`)만 가능
- **수정/삭제**: 본인(`auth.uid() = user_id`)만 가능

### Storage
- 버킷명: `post-files` (public)
- 업로드 경로: `{user_id}/{post_id}/{timestamp}_{filename}`
- 최대 파일 크기: 10MB (클라이언트 검증)

### 조회수 증가 함수
```sql
create or replace function public.increment_post_views(post_id bigint)
returns void language plpgsql security definer as $$
begin
  update public.posts set views = views + 1 where id = post_id;
end;
$$;
```

---

## AuthContext 설계

```
AuthProvider (main.jsx에서 ThemeProvider 하위에 주입)
  ├── user         — Supabase auth.User 객체
  ├── profile      — profiles 테이블 row
  ├── loading      — 초기 세션 확인 중 여부
  ├── signInWithEmail(email, password)
  ├── signUpWithEmail(email, password, nickname)
  ├── signInWithKakao()   — OAuth, redirectTo: /rest04/
  └── signOut()
```

`onAuthStateChange` 구독으로 탭 간 세션 동기화.

---

## 카카오 OAuth 설정

| 항목 | 값 |
|------|-----|
| Kakao REST API Key (Client ID) | 발급된 키 |
| Supabase Redirect URI | `https://kbjxjogmnwurxbxnpfsz.supabase.co/auth/v1/callback` |
| 카카오 플랫폼 Web URL | `https://kbjxjogmnwurxbxnpfsz.supabase.co` |

---

## 라우트 추가 (`App.jsx`)

| 경로 | 컴포넌트 | 접근 |
|------|----------|------|
| `/login` | Login | 누구나 |
| `/register` | Register | 누구나 |
| `/board` | BoardList | 누구나 |
| `/board/write` | BoardWrite | 로그인 필요 (컴포넌트 내 검사) |
| `/board/:id` | BoardDetail | 누구나 |
| `/board/:id/edit` | BoardEdit | 작성자만 (컴포넌트 내 검사) |

---

## 주요 구현 사항

### 게시판 목록 (BoardList)
- 페이지당 10개, `range()` 기반 서버사이드 페이지네이션
- 제목 `ilike` 검색
- `profiles` join으로 작성자 닉네임 표시

### 게시글 상세 (BoardDetail)
- 페이지 진입 시 `increment_post_views` RPC 호출로 조회수 증가
- 첨부파일: Storage `getPublicUrl`로 직접 다운로드 링크 제공
- 댓글: 실시간 새로고침 (submit/delete 후 re-fetch)
- 수정/삭제 버튼은 작성자(`user.id === post.user_id`)에게만 노출

### 파일 첨부
- 업로드: Storage → 성공 시 `post_files` 테이블에 메타데이터 insert
- 삭제: `post_files` 레코드 삭제 + Storage 파일 동시 제거

### Header 인증 버튼
- 데스크탑: 게시판 링크 + 로그인/로그아웃 버튼 (프로필 닉네임 표시)
- 모바일 패널 하단: 게시판 링크 + 로그인/로그아웃 버튼

---

## 배포
```bash
npm run deploy   # 빌드 → gh-pages 브랜치 push
```

배포 URL: https://yoomin-lee.github.io/rest04/
