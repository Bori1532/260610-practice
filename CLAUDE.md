# CLAUDE.md

Repository guidance and merged spec + design for the project.

## 프로젝트 개요
- 프로젝트명: 마이컴퍼니 홈페이지
- 기술 스택: React 18 + Vite, Tailwind CSS, Supabase (Auth + PostgreSQL)
- 라우터: React Router v6

## 주요 명령어
- `npm run dev` — 개발 서버
- `npm run build` — 빌드
- `npm run preview` — 빌드 미리보기
- `npm run lint` — 린트 검사
- `npm run lint:fix` — 린트 자동 수정

## 환경 변수
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 아키텍처 요약
- `src/`에 React 앱 소스
- `supabase.js` 싱글톤 클라이언트
- `context/AuthContext.jsx`로 인증 전역 관리

## 라우팅 구조 (요약)
- `/` : BoardListPage
- `/login` : LoginPage
- `/register` : RegisterPage
- `/posts/:id` : BoardDetailPage
- `/posts/new` : BoardWritePage (로그인 필요)
- `/posts/:id/edit` : BoardWritePage (작성자 권한)

## 데이터 패턴
- Supabase에서 `from('posts')` 등으로 CRUD
- 훅(`hooks/usePosts.js`)으로 분리

## Supabase 초기화 예시
```js
import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

## 보안 및 주의사항
- RLS 활성화 및 정책 설정 필요
- `author_id`는 auth users id 사용

## 사양 (Spec) — 요약된 가져오기
### 핵심 기능
- 회원제: 가입, 로그인, 마이페이지, 관리자 회원 관리
- 제품소개: 제품 목록/상세, 관리자 CRUD
- 게시판: 목록, 상세, 작성/수정/삭제, 댓글
- 온라인문의: 문의 작성, 관리자 답변

### 회원 역할 및 라우팅
- 역할: `user`, `admin`
- 라우트 예: `/mypage`, `/admin/users`

### 게시판 상세
- 카테고리: 공지사항, 자유게시판
- 라우트: `/board`, `/board/:id`, `/board/new`, `/board/:id/edit`

### 제품 라우팅
- `/products`, `/products/:id`, `/admin/products`

### 문의 라우팅
- `/inquiry`, `/inquiry/my`, `/admin/inquiries`

## DB 테이블 요약 (가져오기)
- `profiles`: id, username, full_name, phone, role, created_at
- `product_categories`: id, name, sort_order, created_at
- `products`: id, category_id, name, description, image_url, is_active, sort_order, created_at
- `board_categories`: id, name, sort_order
- `posts`: id, category_id, title, content, author_id, view_count, created_at, updated_at
- `comments`: id, post_id, author_id, content, created_at
- `inquiries`: id, name, email, phone, title, content, status, answer, author_id, created_at, answered_at

## 디자인(Design) — 가져오기
- 디자인 파일 위치: `docs/design/`
- 목적: UI 흐름, 컴포넌트 목록, 화면별 레이아웃

### 권장 컴포넌트
- `Navbar`, `Footer`
- `PostCard`, `ProductCard`
- `ProtectedRoute`

### 레이아웃 가이드라인
- 반응형: 모바일 우선, Tailwind 유틸리티 사용
- 공통 간격: 16px 기반 레이아웃

## 문서 포함: `docs/spec` 내용 (중요 발췌)
- 상세 요구사항은 `docs/spec/spec_detail.md`에 저장
- 원본 요약은 `docs/spec/spec_original.md`

## 문서 포함: `docs/design` 내용 (중요 발췌)
- 디자인 초안은 `docs/design/design.md`

## 개발 체크리스트
- [ ] RLS 정책 구성
- [ ] 인증 흐름 테스트
- [ ] 게시판 CRUD 테스트
- [ ] 제품 CRUD (관리자 권한) 테스트
- [ ] 문의 및 답변 워크플로 테스트

## 예시 SQL (posts 테이블)
```sql
create table posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  author_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);
```

## 파일 및 경로 참조
- `src/supabase.js` — 클라이언트
- `src/context/AuthContext.jsx` — 인증 구독
- `src/pages/` — 라우트별 페이지

## 유지 보수 안내
- 문서 변경 시 `docs/spec`와 `docs/design`을 우선 업데이트
- 스키마 변경은 마이그레이션 스크립트로 관리

## 연락처
- 리포지토리 유지관리자: 팀 내부 연락처 참조

## 변경 기록 (간단)
- v1: 초기 문서 병합

### 추가된 상세 스펙 (원문 발췌)
- 회원제, 제품, 게시판, 문의에 대한 상세 요구사항은 `docs/spec/spec_detail.md` 참조

## 디자인 초안 (원문 발췌)
- 기본 컴포넌트 목록과 반응형 가이드 포함

## 작업 제안
- `docs/spec/spec_detail.md`를 우선 기반으로 구현 시작
- 디자인 확정 후 컴포넌트화 진행

## 라이선스
- 프로젝트 내 사용 규칙에 따름

## 비고
- 문서는 주기적으로 리뷰하고 업데이트하세요

End of CLAUDE.md
