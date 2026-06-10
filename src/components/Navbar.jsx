import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: '상용차 구입', to: '/commercial' },
  { label: '건설기계 구입', to: '/construction' },
  { label: '설비 구입', to: '/equipment' },
  { label: '게시판', to: '/board' },
  { label: '기업금융', to: '/finance' },
  { label: '내 상품 관리', to: '/products' },
  { label: '회사소개', to: '/company' },
]

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()

  // 페이지 변경 시 드로워 닫기
  useEffect(() => {
    setDrawerOpen(false)
  }, [location.pathname])

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
          <Link to="/" className="flex items-center gap-3 text-sm md:text-base font-semibold tracking-tight text-gray-900">
            <span className="inline-flex rounded-full bg-[#f26704] px-3 py-2 text-white">Engineer of Growth</span>
            <span className="hidden sm:inline text-[#f26704]">Hyundai Commercial</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm text-slate-600">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors ${
                  isActive(link.to)
                    ? 'text-[#f26704] font-semibold'
                    : 'hover:text-slate-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="md:hidden h-11 w-11 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-slate-700 shadow-sm transition hover:bg-gray-50"
              aria-label="메뉴 열기"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="h-16" />

      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-200">
          <Link
            to="/"
            className="text-base font-semibold text-slate-950"
            onClick={() => setDrawerOpen(false)}
          >
            메뉴
          </Link>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="p-2 rounded-lg text-slate-500 hover:bg-gray-100 transition-colors"
            aria-label="메뉴 닫기"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setDrawerOpen(false)}
              className={`block px-5 py-3.5 text-sm font-medium transition-colors ${
                isActive(link.to)
                  ? 'text-[#f26704] bg-[#fff0eb]'
                  : 'text-slate-700 hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="px-5 py-5 border-t border-gray-200 flex flex-col gap-3">
          <Link
            to="/login"
            onClick={() => setDrawerOpen(false)}
            className="w-full rounded-xl border border-gray-300 bg-white py-3 text-center text-sm font-medium text-slate-700 hover:bg-gray-50 transition"
          >
            로그인
          </Link>
          <Link
            to="/auth/register"
            onClick={() => setDrawerOpen(false)}
            className="w-full rounded-xl bg-[#f26704] py-3 text-center text-sm font-semibold text-white hover:bg-orange-600 transition"
          >
            회원가입
          </Link>
        </div>
      </aside>
    </>
  )
}
