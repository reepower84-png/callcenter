import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '콜통합센터 | 인바운드·아웃바운드 위탁 전문 콜센터',
  description: '전화 업무를 맡기는 순간, 사업이 가벼워집니다. 인바운드와 아웃바운드를 모두 운영하는 위탁 전문 콜센터 서비스',
  keywords: '콜센터, 인바운드, 아웃바운드, 콜센터 위탁, 콜센터 대행, 전화 상담, 고객 상담',
  openGraph: {
    title: '콜통합센터 | 인바운드·아웃바운드 위탁 전문 콜센터',
    description: '전화 업무를 맡기는 순간, 사업이 가벼워집니다.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
