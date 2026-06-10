-- ============================================================
-- PawEdu 게시판 스키마 (Supabase SQL Editor에서 실행)
-- ============================================================

-- 1. 사용자 프로필 테이블 (auth.users 확장)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  nickname text,
  avatar_url text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "누구나 프로필 조회 가능" on public.profiles
  for select using (true);

create policy "본인 프로필만 수정 가능" on public.profiles
  for update using (auth.uid() = id);

-- 신규 가입 시 자동으로 profiles 생성
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, nickname, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. 게시글 테이블
create table if not exists public.posts (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete set null,
  title text not null,
  content text not null,
  views integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.posts enable row level security;

create policy "누구나 게시글 조회 가능" on public.posts
  for select using (true);

create policy "로그인 사용자만 게시글 작성 가능" on public.posts
  for insert with check (auth.uid() is not null);

create policy "작성자만 수정 가능" on public.posts
  for update using (auth.uid() = user_id);

create policy "작성자만 삭제 가능" on public.posts
  for delete using (auth.uid() = user_id);

-- 조회수 업데이트 함수
create or replace function public.increment_post_views(post_id bigint)
returns void language plpgsql security definer as $$
begin
  update public.posts set views = views + 1 where id = post_id;
end;
$$;


-- 3. 댓글 테이블
create table if not exists public.comments (
  id bigserial primary key,
  post_id bigint references public.posts(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete set null,
  content text not null,
  created_at timestamptz default now()
);

alter table public.comments enable row level security;

create policy "누구나 댓글 조회 가능" on public.comments
  for select using (true);

create policy "로그인 사용자만 댓글 작성 가능" on public.comments
  for insert with check (auth.uid() is not null);

create policy "작성자만 댓글 삭제 가능" on public.comments
  for delete using (auth.uid() = user_id);


-- 4. 첨부파일 테이블
create table if not exists public.post_files (
  id bigserial primary key,
  post_id bigint references public.posts(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete set null,
  file_name text not null,
  file_path text not null,
  file_size bigint,
  mime_type text,
  created_at timestamptz default now()
);

alter table public.post_files enable row level security;

create policy "누구나 첨부파일 조회 가능" on public.post_files
  for select using (true);

create policy "로그인 사용자만 파일 추가 가능" on public.post_files
  for insert with check (auth.uid() is not null);

create policy "작성자만 파일 삭제 가능" on public.post_files
  for delete using (auth.uid() = user_id);


-- ============================================================
-- Storage 버킷 (Supabase Storage에서 수동으로 'post-files' 버킷 생성 후
-- 아래 정책을 SQL Editor에서 실행)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('post-files', 'post-files', true)
on conflict (id) do nothing;

create policy "누구나 파일 조회 가능" on storage.objects
  for select using (bucket_id = 'post-files');

create policy "로그인 사용자만 파일 업로드 가능" on storage.objects
  for insert with check (bucket_id = 'post-files' and auth.uid() is not null);

create policy "업로더만 파일 삭제 가능" on storage.objects
  for delete using (bucket_id = 'post-files' and auth.uid()::text = (storage.foldername(name))[1]);
