import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import SectionPage from './pages/SectionPage'
import BoardPage from './pages/BoardPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import LoginSuccessPage from './pages/auth/LoginSuccessPage'

function NotFoundPage() {
  return (
    <div className="min-h-screen pt-20 px-4 bg-slate-50 flex items-center justify-center">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-bold text-slate-950 mb-4">페이지를 찾을 수 없습니다</h1>
        <p className="text-slate-600 mb-6">요청하신 페이지가 없거나 이동한 주소가 잘못되었습니다.</p>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-[#f26704] px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition"
        >
          홈으로 돌아가기
        </a>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/commercial" element={<SectionPage title="상용차 구입" />} />
        <Route path="/construction" element={<SectionPage title="건설기계 구입" />} />
        <Route path="/equipment" element={<SectionPage title="설비 구입" />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/finance" element={<SectionPage title="기업금융" />} />
        <Route path="/products" element={<SectionPage title="내 상품 관리" />} />
        <Route path="/company" element={<SectionPage title="회사소개" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/success" element={<LoginSuccessPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
