# 마이컴퍼니 상세 요구사항 명세서

## 프로젝트 개요
- **프로젝트명**: 마이컴퍼니 홈페이지
- **기술 스택**: React 18 + Vite, Tailwind CSS, Supabase (Auth + PostgreSQL)
- **라우터**: React Router v6

## 현재 구현 상태
- 홈 페이지 `/` : 오렌지 히어로 섹션과 로그인 카드 디자인 구현
- 로그인 `/login`, 회원가입 `/auth/register` 페이지 구현
- 게시판 `/board` : 게시글 작성, 댓글 작성, 좋아요 기능 구현
- 모바일 햄버거 버튼 → 드로워 메뉴 구현
- 기타 메뉴 페이지 `/commercial`, `/construction`, `/equipment`, `/finance`, `/products`, `/company`는 섹션 페이지로 연결

---

## 1. 회원제

### 기능 목록
| 기능 | 설명 | 접근 권한 |
|------|------|-----------|
| 회원가입 | 이메일/비밀번호로 가입 | 비회원 |
| 로그인 | 이메일/비밀번호 로그인 | 비회원 |
| 로그아웃 | 세션 종료 | 회원 |
| 마이페이지 | 프로필 조회/수정 | 회원 |
| 회원 관리 | 회원 목록 조회 및 권한 변경 | 관리자 |

### 회원 역할
- `user`: 일반 회원 (기본값)
- `admin`: 관리자 (제품, 게시판 카테고리, 문의 답변 관리)

### 라우팅
| 경로 | 페이지 | 보호 |
|------|--------|------|
| `/login` | 로그인 | 공개 |
| `/register` | 회원가입 | 공개 |
| `/mypage` | 마이페이지 | 로그인 필요 |
| `/admin/users` | 회원 관리 | 관리자 |

---

## 2. 제품소개

### 기능 목록
| 기능 | 설명 | 접근 권한 |
|------|------|-----------|
| 제품 목록 | 카테고리별 제품 목록 조회 | 전체 공개 |
| 제품 상세 | 제품 상세 정보 조회 | 전체 공개 |
| 제품 등록/수정/삭제 | 제품 CRUD | 관리자 |
| 카테고리 관리 | 제품 카테고리 CRUD | 관리자 |

### 라우팅
| 경로 | 페이지 | 보호 |
|------|--------|------|
| `/products` | 제품 목록 | 공개 |
| `/products/:id` | 제품 상세 | 공개 |
| `/admin/products` | 제품 관리 | 관리자 |
| `/admin/products/new` | 제품 등록 | 관리자 |
| `/admin/products/:id/edit` | 제품 수정 | 관리자 |

---

## 3. 게시판

### 기능 목록
| 기능 | 설명 | 접근 권한 |
|------|------|-----------|
| 게시글 목록 | 카테고리별 목록 + 페이지네이션 | 전체 공개 |
| 게시글 상세 | 본문 + 댓글 목록 | 전체 공개 |
| 게시글 작성 | 제목/내용 작성 | 로그인 |
| 게시글 수정/삭제 | 본인 글만 | 작성자/관리자 |
| 댓글 작성/삭제 | 댓글 CRUD | 로그인 |
| 조회수 | 상세 진입 시 자동 증가 | - |

### 게시판 카테고리 (초기값)
- 공지사항 (관리자만 작성)
- 자유게시판

### 라우팅
| 경로 | 페이지 | 보호 |
|------|--------|------|
| `/board` | 게시글 목록 | 공개 |
| `/board/:id` | 게시글 상세 | 공개 |
| `/board/new` | 게시글 작성 | 로그인 |
| `/board/:id/edit` | 게시글 수정 | 작성자 |

---

## 4. 온라인문의

### 기능 목록
| 기능 | 설명 | 접근 권한 |
|------|------|-----------|
| 문의 작성 | 이름/이메일/연락처/제목/내용 | 전체 공개 |
| 내 문의 목록 | 본인 문의 내역 조회 | 로그인 |
| 문의 목록 | 전체 문의 목록 | 관리자 |
| 문의 답변 | 답변 작성 및 상태 변경 | 관리자 |

### 문의 상태
- `pending`: 답변 대기
- `answered`: 답변 완료

### 라우팅
| 경로 | 페이지 | 보호 |
|------|--------|------|
| `/inquiry` | 문의 작성 | 공개 |
| `/inquiry/my` | 내 문의 목록 | 로그인 |
| `/admin/inquiries` | 문의 관리 | 관리자 |

---

## DB 테이블 설계

### profiles (회원 프로필)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid PK | auth.users.id 참조 |
| username | text | 닉네임 |
| full_name | text | 실명 |
| phone | text | 연락처 |
| role | text | user / admin |
| created_at | timestamptz | 가입일 |

### product_categories (제품 카테고리)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | bigint PK | 자동 증가 |
| name | text | 카테고리명 |
| sort_order | int | 정렬 순서 |
| created_at | timestamptz | 생성일 |

### products (제품)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | bigint PK | 자동 증가 |
| category_id | bigint FK | product_categories 참조 |
| name | text | 제품명 |
| description | text | 제품 설명 |
| image_url | text | 대표 이미지 URL |
| is_active | boolean | 노출 여부 |
| sort_order | int | 정렬 순서 |
| created_at | timestamptz | 등록일 |

### board_categories (게시판 카테고리)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | bigint PK | 자동 증가 |
| name | text | 카테고리명 |
| sort_order | int | 정렬 순서 |

### posts (게시글)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid PK | 자동 생성 |
| category_id | bigint FK | board_categories 참조 |
| title | text | 제목 |
| content | text | 내용 |
| author_id | uuid FK | auth.users 참조 |
| view_count | int | 조회수 |
| created_at | timestamptz | 작성일 |
| updated_at | timestamptz | 수정일 |

### comments (댓글)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | bigint PK | 자동 증가 |
| post_id | uuid FK | posts 참조 |
| author_id | uuid FK | auth.users 참조 |
| content | text | 댓글 내용 |
| created_at | timestamptz | 작성일 |

### inquiries (온라인문의)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | bigint PK | 자동 증가 |
| name | text | 문의자 이름 |
| email | text | 이메일 |
| phone | text | 연락처 |
| title | text | 문의 제목 |
| content | text | 문의 내용 |
| status | text | pending / answered |
| answer | text | 답변 내용 |
| author_id | uuid FK | auth.users 참조 (nullable) |
| created_at | timestamptz | 문의일 |
| answered_at | timestamptz | 답변일 |
