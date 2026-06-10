-- ============================================================
-- post_likes 좋아요 기능
-- ============================================================

-- 1. posts 테이블에 like_count 캐시 컬럼 추가
alter table posts add column like_count int not null default 0;

-- 2. post_likes 테이블 생성
create table post_likes (
  post_id    uuid        not null references posts(id) on delete cascade,
  user_id    uuid        not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

-- 3. like_count 자동 갱신 트리거 함수
create or replace function update_post_like_count()
returns trigger
language plpgsql
security definer
as $$
begin
  if TG_OP = 'INSERT' then
    update posts set like_count = like_count + 1 where id = NEW.post_id;
  elsif TG_OP = 'DELETE' then
    update posts set like_count = greatest(like_count - 1, 0) where id = OLD.post_id;
  end if;
  return null;
end;
$$;

create trigger trg_post_like_count
after insert or delete on post_likes
for each row execute function update_post_like_count();

-- 4. RLS 활성화 및 정책 설정
alter table post_likes enable row level security;

-- 누구나 조회 가능 (좋아요 수 표시, 내가 눌렀는지 확인)
create policy "post_likes_select"
  on post_likes for select
  using (true);

-- 로그인한 본인만 좋아요 추가 (비로그인 명시 차단)
create policy "post_likes_insert"
  on post_likes for insert
  with check (auth.uid() is not null and auth.uid() = user_id);

-- 본인만 좋아요 취소 (비로그인 명시 차단)
create policy "post_likes_delete"
  on post_likes for delete
  using (auth.uid() is not null and auth.uid() = user_id);
