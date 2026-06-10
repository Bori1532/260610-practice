import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const slides = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1400&q=80',
    title: '상용차 금융 솔루션',
    description: '합리적인 상용차 금융으로 고객의 비즈니스 성장을 지원합니다.',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80',
    title: '건설기계 전문 지원',
    description: '건설기계 구매부터 운영 자금까지 맞춤형 금융 상품을 제공합니다.',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1400&q=80',
    title: '기업 금융 통합 관리',
    description: '기업의 자금 흐름을 최적화하는 금융 서비스를 한 곳에서 확인하세요.',
  },
]

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="relative h-[72vh] w-full overflow-hidden text-white">
      <div className="absolute inset-0 flex h-full transition-transform duration-700" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
        {slides.map((slide) => (
          <section key={slide.id} className="relative h-full min-w-full overflow-hidden">
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute left-6 top-8 z-10 flex w-full max-w-3xl flex-col gap-5 px-6 text-white sm:left-10 sm:top-10 md:px-10">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/90 sm:text-sm">
                Hyundai Commercial
              </div>
              <div className="space-y-4">
                <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
                  {slide.description}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-full bg-[#f26704] px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-600"
                >
                  로그인하기
                </Link>
                <Link
                  to="/auth/register"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  회원가입하기
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-10 z-20 flex justify-center gap-3 px-6">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setActiveSlide(index)}
            className={`h-2.5 w-10 rounded-full transition-all ${
              activeSlide === index ? 'bg-white' : 'bg-white/40'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </main>
  )
}
