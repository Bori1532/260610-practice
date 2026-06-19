import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../../supabase'

export default function LoginSuccessPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null)
    })
  }, [])

  useEffect(() => {
    if (countdown === 0) {
      navigate('/')
      return
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50">
      <div className="w-full max-w-md text-center">
        <div className="bg-white border border-gray-200 rounded-2xl p-10 shadow-sm">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-green-100">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">로그인 완료</h1>

          {user && (
            <p className="text-gray-500 text-sm mb-1">
              <span className="font-medium text-purple-600">{user.email}</span>
            </p>
          )}

          <p className="text-gray-500 text-sm mb-8">환영합니다! 성공적으로 로그인되었습니다.</p>

          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              홈으로 이동
            </Link>
            <Link
              to="/board"
              className="w-full py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-lg transition-colors"
            >
              게시판 보기
            </Link>
          </div>

          <p className="mt-6 text-xs text-gray-400">
            {countdown}초 후 홈으로 자동 이동합니다
          </p>
        </div>
      </div>
    </div>
  )
}
