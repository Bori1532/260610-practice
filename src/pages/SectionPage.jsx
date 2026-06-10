import { Link } from 'react-router-dom'

export default function SectionPage({ title }) {
  return (
    <main className="min-h-screen pt-24 bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-20">
        <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-lg">
          <h1 className="text-3xl font-semibold text-slate-950">{title}</h1>
          <p className="mt-4 text-slate-600 leading-7">
            현재 서비스 준비 중입니다. 홈페이지 메인에서 다른 메뉴를 선택하거나 로그인 후 이용해 주세요.
          </p>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center rounded-full bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-purple-700 transition"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
