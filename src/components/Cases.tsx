'use client'

import { useEffect, useRef } from 'react'
import { Quote, Star } from 'lucide-react'

const cases = [
  {
    company: '온라인 쇼핑몰 A사',
    industry: '이커머스',
    challenge: '급증하는 CS 문의 처리 어려움',
    result: '응답 시간 80% 단축, 고객 만족도 35% 향상',
    quote: '주문량이 급증하면서 CS 처리가 힘들었는데, 콜통합센터 덕분에 고객 불만이 크게 줄었습니다.',
    rating: 5,
  },
  {
    company: '배달 서비스 B사',
    industry: '푸드테크',
    challenge: '야간/주말 주문 접수 인력 부족',
    result: '24시간 운영으로 주문 접수율 40% 증가',
    quote: '야간과 주말에도 빈틈없이 주문을 받아주니 매출이 눈에 띄게 올랐습니다.',
    rating: 5,
  },
  {
    company: '보험사 C사',
    industry: '금융',
    challenge: '아웃바운드 영업 효율 저하',
    result: '상담 전환율 25% 개선',
    quote: '전문적인 스크립트와 상담원 교육 덕분에 아웃바운드 성과가 크게 좋아졌습니다.',
    rating: 5,
  },
  {
    company: '의료기기 D사',
    industry: '헬스케어',
    challenge: '제품 문의 및 A/S 접수 관리',
    result: 'CS 처리 시간 60% 단축',
    quote: '전문 용어도 잘 숙지하고 있어서 고객들이 매우 만족해합니다.',
    rating: 5,
  },
]

export default function Cases() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="cases" ref={sectionRef} className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <span className="inline-block bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            성공사례
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            고객사와 함께 만든 성과
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            다양한 업종의 고객사와 함께 성공적인 결과를 만들어왔습니다.
          </p>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {cases.map((caseItem, index) => (
            <div
              key={caseItem.company}
              className="animate-on-scroll bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100 hover:border-primary-200 transition-all"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{caseItem.company}</h3>
                  <span className="text-sm text-primary-600 font-medium">{caseItem.industry}</span>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(caseItem.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              {/* Challenge & Result */}
              <div className="space-y-3 mb-4">
                <div>
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">도입 배경</span>
                  <p className="text-gray-700 mt-1">{caseItem.challenge}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">성과</span>
                  <p className="text-primary-600 font-semibold mt-1">{caseItem.result}</p>
                </div>
              </div>

              {/* Quote */}
              <div className="bg-white rounded-xl p-4 relative">
                <Quote className="absolute top-3 left-3 w-5 h-5 text-primary-200" />
                <p className="text-gray-600 text-sm pl-6 italic leading-relaxed">
                  &ldquo;{caseItem.quote}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 animate-on-scroll">
          <p className="text-gray-600 mb-4">우리 회사도 성공사례가 될 수 있습니다</p>
          <button
            onClick={scrollToContact}
            className="bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-all hover:scale-105 shadow-lg"
          >
            무료 상담 신청
          </button>
        </div>
      </div>
    </section>
  )
}
