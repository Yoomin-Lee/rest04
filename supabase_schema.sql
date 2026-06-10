-- ============================================================
-- PawEdu 게시판 스키마 (Supabase SQL Editor에서 실행)
-- 테이블 접두어: pawedu_  (CatsCare 테이블과 충돌 방지)
-- ============================================================

-- 1. 사용자 프로필 테이블 (auth.users 확장)
create table if not exists public.pawedu_profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  nickname text,
  avatar_url text,
  created_at timestamptz default now()
);

alter table public.pawedu_profiles enable row level security;

create policy "pawedu_profiles_select" on public.pawedu_profiles
  for select using (true);

create policy "pawedu_profiles_update" on public.pawedu_profiles
  for update using (auth.uid() = id);

-- 신규 가입 시 자동으로 pawedu_profiles 생성
create or replace function public.pawedu_handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.pawedu_profiles (id, email, nickname, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists pawedu_on_auth_user_created on auth.users;
create trigger pawedu_on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.pawedu_handle_new_user();


-- 2. 게시글 테이블
create table if not exists public.pawedu_posts (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete set null,
  title text not null,
  content text not null,
  views integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.pawedu_posts enable row level security;

create policy "pawedu_posts_select" on public.pawedu_posts
  for select using (true);

create policy "pawedu_posts_insert" on public.pawedu_posts
  for insert with check (auth.uid() is not null);

create policy "pawedu_posts_update" on public.pawedu_posts
  for update using (auth.uid() = user_id);

create policy "pawedu_posts_delete" on public.pawedu_posts
  for delete using (auth.uid() = user_id);

-- 조회수 업데이트 함수
create or replace function public.pawedu_increment_post_views(post_id bigint)
returns void language plpgsql security definer as $$
begin
  update public.pawedu_posts set views = views + 1 where id = post_id;
end;
$$;


-- 3. 댓글 테이블
create table if not exists public.pawedu_comments (
  id bigserial primary key,
  post_id bigint references public.pawedu_posts(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete set null,
  content text not null,
  created_at timestamptz default now()
);

alter table public.pawedu_comments enable row level security;

create policy "pawedu_comments_select" on public.pawedu_comments
  for select using (true);

create policy "pawedu_comments_insert" on public.pawedu_comments
  for insert with check (auth.uid() is not null);

create policy "pawedu_comments_delete" on public.pawedu_comments
  for delete using (auth.uid() = user_id);


-- 4. 첨부파일 테이블
create table if not exists public.pawedu_post_files (
  id bigserial primary key,
  post_id bigint references public.pawedu_posts(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete set null,
  file_name text not null,
  file_path text not null,
  file_size bigint,
  mime_type text,
  created_at timestamptz default now()
);

alter table public.pawedu_post_files enable row level security;

create policy "pawedu_post_files_select" on public.pawedu_post_files
  for select using (true);

create policy "pawedu_post_files_insert" on public.pawedu_post_files
  for insert with check (auth.uid() is not null);

create policy "pawedu_post_files_delete" on public.pawedu_post_files
  for delete using (auth.uid() = user_id);


-- ============================================================
-- Storage 버킷 (pawedu-files)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('pawedu-files', 'pawedu-files', true)
on conflict (id) do nothing;

create policy "pawedu_storage_select" on storage.objects
  for select using (bucket_id = 'pawedu-files');

create policy "pawedu_storage_insert" on storage.objects
  for insert with check (bucket_id = 'pawedu-files' and auth.uid() is not null);

create policy "pawedu_storage_delete" on storage.objects
  for delete using (bucket_id = 'pawedu-files' and auth.uid()::text = (storage.foldername(name))[1]);
