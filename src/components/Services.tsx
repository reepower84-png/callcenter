'use client'

import { useEffect, useRef } from 'react'
import { PhoneIncoming, PhoneOutgoing, Clock, Shield, HeadphonesIcon, BarChart3 } from 'lucide-react'

const services = [
  {
    icon: PhoneIncoming,
    title: '인바운드 서비스',
    description: '고객 문의, 주문 접수, A/S 상담 등 들어오는 모든 전화를 전문 상담원이 응대합니다.',
    features: ['고객 문의 응대', '주문/예약 접수', 'CS 상담 대행'],
  },
  {
    icon: PhoneOutgoing,
    title: '아웃바운드 서비스',
    description: '텔레마케팅, 고객 만족도 조사, 안내 전화 등 발신 업무를 대행합니다.',
    features: ['텔레마케팅', '해피콜 서비스', '만족도 조사'],
  },
  {
    icon: Clock,
    title: '24시간 운영',
    description: '업종 특성에 맞춰 주간/야간/24시간 등 유연한 운영 시간을 제공합니다.',
    features: ['주간/야간 선택', '24시간 운영', '주말/공휴일 대응'],
  },
  {
    icon: Shield,
    title: '데이터 보안',
    description: '고객 정보를 안전하게 관리하며, 보안 교육을 이수한 상담원이 업무를 수행합니다.',
    features: ['개인정보 보호', '보안 교육 이수', '암호화 관리'],
  },
  {
    icon: HeadphonesIcon,
    title: '전문 상담원',
    description: '업종별 전문 교육을 이수한 상담원이 고객사의 브랜드를 대표합니다.',
    features: ['업종별 전문 교육', '스크립트 맞춤 제작', '품질 모니터링'],
  },
  {
    icon: BarChart3,
    title: '리포트 제공',
    description: '일별/주별/월별 상담 현황 리포트를 제공하여 데이터 기반 의사결정을 지원합니다.',
    features: ['실시간 대시보드', '통계 리포트', '녹취 제공'],
  },
]

export default function Services() {
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
    <section id="services" ref={sectionRef} className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <span className="inline-block bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            서비스 안내
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            콜통합센터가 제공하는 서비스
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            인바운드부터 아웃바운드까지, 전화 업무의 모든 것을 책임집니다.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="animate-on-scroll bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors">
                <service.icon className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 animate-on-scroll">
          <button
            onClick={scrollToContact}
            className="bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-all hover:scale-105 shadow-lg"
          >
            서비스 문의하기
          </button>
        </div>
      </div>
    </section>
  )
}
