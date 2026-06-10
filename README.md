# 마이컴퍼니 홈페이지

React + Vite 기반의 샘플 웹사이트로, 현재 다음 기능들이 구현되어 있습니다.

## 구현 스택
- React 19 + Vite
- Tailwind CSS
- React Router DOM v7
- Supabase 클라이언트 (`src/supabase.js`)

## 구현된 페이지
- `/` : 홈 페이지 (헤더 + 오렌지 히어로 + 로그인 카드)
- `/login` : 로그인 페이지
- `/auth/register` : 회원가입 페이지
- `/board` : 게시판
- `/commercial`, `/construction`, `/equipment`, `/finance`, `/products`, `/company` : 섹션 페이지

## 게시판 기능
- 게시글 목록
- 새 글 작성 폼
- 좋아요 버튼
- 댓글 목록 및 댓글 작성

## 네비게이션
- 데스크탑 상단 메뉴
- 모바일 햄버거 버튼 → 드로워 메뉴

## 실행 방법
1. 패키지 설치
   ```bash
   npm install
   ```
2. 환경 변수 설정
   - `.env.example`를 참고하여 `.env` 파일 생성
   - `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` 값 설정
3. 개발 서버 실행
   ```bash
   npm run dev
   ```

## 주요 파일
- `src/App.jsx`
- `src/components/Navbar.jsx`
- `src/pages/HomePage.jsx`
- `src/pages/BoardPage.jsx`
- `src/pages/SectionPage.jsx`
- `src/pages/auth/LoginPage.jsx`
- `src/pages/auth/RegisterPage.jsx`
- `src/supabase.js`
