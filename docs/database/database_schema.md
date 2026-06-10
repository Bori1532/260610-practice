# Database Schema

본 문서는 프로젝트에 사용되는 주요 DB 테이블과 컬럼을 정리합니다.

## profiles (회원 프로필)
- id: uuid PK (auth.users.id 참조)
- username: text — 닉네임
- full_name: text — 실명
- phone: text — 연락처 (회원정보 수정 시 입력)
- zipcode: text — 우편번호 (회원정보 수정 시 입력)
- address1: text — 기본 주소 (회원정보 수정 시 입력)
- address2: text — 상세 주소 (회원정보 수정 시 입력)
- role: text — `user` / `admin`
- created_at: timestamptz — 가입일

## product_categories (제품 카테고리)
- id: bigint PK — 자동 증가
- name: text — 카테고리명
- sort_order: int — 정렬 순서
- created_at: timestamptz

## products (제품)
- id: bigint PK — 자동 증가
- category_id: bigint FK — product_categories 참조
- name: text — 제품명
- description: text — 제품 설명
- image_url: text — 대표 이미지 URL
- is_active: boolean — 노출 여부
- sort_order: int — 정렬
- created_at: timestamptz

## board_categories (게시판 카테고리)
- id: bigint PK — 자동 증가
- name: text — 카테고리명
- sort_order: int

## posts (게시글)
- id: uuid PK — 자동 생성
- category_id: bigint FK — board_categories 참조
- title: text — 제목
- content: text — 내용
- author_id: uuid FK — auth.users 참조
- view_count: int — 조회수
- like_count: int — 좋아요 수 (post_likes 트리거로 자동 갱신, default 0)
- created_at: timestamptz
- updated_at: timestamptz

## post_likes (게시글 좋아요)
- post_id: uuid PK (복합) FK — posts 참조, cascade delete
- user_id: uuid PK (복합) FK — auth.users 참조, cascade delete
- created_at: timestamptz
- 제약: (post_id, user_id) 복합 PK로 중복 좋아요 방지
- RLS: select 전체 허용 / insert·delete 본인만

## comments (댓글)
- id: bigint PK — 자동 증가
- post_id: uuid FK — posts 참조
- author_id: uuid FK — auth.users 참조
- content: text — 댓글 내용
- created_at: timestamptz

## inquiries (온라인문의)
- id: bigint PK — 자동 증가
- name: text — 문의자 이름
- email: text — 이메일
- phone: text — 연락처
- title: text — 문의 제목
- content: text — 문의 내용
- status: text — `pending` / `answered`
- answer: text — 관리자 답변
- author_id: uuid FK — auth.users 참조 (nullable)
- created_at: timestamptz
- answered_at: timestamptz

## 예시 SQL
```sql
create table posts (
  id uuid primary key default gen_random_uuid(),
  category_id bigint,
  title text not null,
  content text not null,
  author_id uuid references auth.users(id) on delete cascade,
  view_count int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz
);
```

## 권장 사항
- RLS(Row Level Security)를 활성화하고 테이블별 정책 설정 권장
- `author_id` 삽입 시 `auth.uid()` 또는 클라이언트에서 전달된 유효한 user id 사용
- 스키마 변경 시 마이그레이션 스크립트로 관리
