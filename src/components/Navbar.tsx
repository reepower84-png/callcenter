'use client'

import { useState, useEffect } from 'react'
import { Menu, X, FileText } from 'lucide-react'
import Image from 'next/image'

const PROPOSAL_URL = 'https://drive.google.com/file/d/1FGpJjks9asLnWIAS6wd7be0ARZDssLNM/view?usp=drive_link'

const navItems = [
  { name: '홈', href: '#hero' },
  { name: '서비스', href: '#services' },
  { name: '성공사례', href: '#cases' },
  { name: '문의하기', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const sections = navItems.map(item => item.href.replace('#', ''))
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('#hero')}
            className="flex items-center cursor-pointer"
          >
            <Image
              src="/logo.png"
              alt="콜통합센터"
              width={150}
              height={40}
              className={`h-10 w-auto ${isScrolled ? '' : 'brightness-0 invert'}`}
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`relative px-1 py-2 text-sm font-medium transition-colors ${
                  isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white/90 hover:text-white'
                } ${activeSection === item.href.replace('#', '') ? (isScrolled ? 'text-primary-600' : 'text-white') : ''}`}
              >
                {item.name}
                {activeSection === item.href.replace('#', '') && (
                  <span className={`absolute bottom-0 left-0 right-0 h-0.5 ${isScrolled ? 'bg-primary-600' : 'bg-white'}`} />
                )}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('#contact')}
              className="bg-primary-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              무료 상담
            </button>
            <a
              href={PROPOSAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 border-2 border-primary-600 text-primary-600 px-5 py-2 rounded-lg font-medium hover:bg-primary-50 transition-colors"
            >
              <FileText className="w-4 h-4" />
              제안서
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="메뉴 열기"
          >
            {isOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border-t shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium ${
                  activeSection === item.href.replace('#', '') ? 'bg-primary-50 text-primary-600' : ''
                }`}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('#contact')}
              className="w-full bg-primary-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors mt-2"
            >
              무료 상담 신청
            </button>
            <a
              href={PROPOSAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full border-2 border-primary-600 text-primary-600 px-4 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
            >
              <FileText className="w-4 h-4" />
              제안서 보기
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
