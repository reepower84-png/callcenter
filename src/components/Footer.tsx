'use client'

import { MapPin, Building2 } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Image
                src="/ChatGPT_Image_2026년_1월_11일_오후_09_05_04_가로-removebg-preview.png"
                alt="콜통합센터"
                width={150}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              전화 업무를 맡기는 순간, 사업이 가벼워집니다.
              <br />
              인바운드·아웃바운드 위탁 전문 콜센터
            </p>
          </div>

          {/* Business Info */}
          <div className="space-y-3 text-sm text-gray-400">
            <div className="flex items-start gap-3">
              <Building2 className="w-4 h-4 mt-0.5 text-gray-500" />
              <div>
                <p>상호: 제이코리아 | 대표: 이주영</p>
                <p>사업자등록번호: 278-30-01540</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-0.5 text-gray-500" />
              <p>인천광역시 계양구 오조산로57번길 15, 7층 7106호</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>&copy; {currentYear} 콜통합센터. All rights reserved.</p>
            <p>Powered by 제이코리아</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
