'use client'

import { useState, useEffect } from 'react'
import { Lock, RefreshCw, Trash2, Phone, User, MessageSquare, Calendar, LogOut } from 'lucide-react'

interface Contact {
  id: number
  name: string
  phone: string
  message: string
  status: '대기중' | '연락완료' | '상담완료'
  created_at: string
}

const statusColors: Record<string, string> = {
  '대기중': 'bg-yellow-100 text-yellow-800',
  '연락완료': 'bg-blue-100 text-blue-800',
  '상담완료': 'bg-green-100 text-green-800',
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/contacts', {
        headers: {
          'x-admin-password': password,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setContacts(data.contacts)
        setIsAuthenticated(true)
        localStorage.setItem('adminPassword', password)
      } else {
        setError('비밀번호가 올바르지 않습니다.')
      }
    } catch {
      setError('서버 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchContacts = async () => {
    setIsLoading(true)
    try {
      const storedPassword = localStorage.getItem('adminPassword')
      const response = await fetch('/api/admin/contacts', {
        headers: {
          'x-admin-password': storedPassword || password,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setContacts(data.contacts)
      } else {
        setIsAuthenticated(false)
        localStorage.removeItem('adminPassword')
      }
    } catch {
      setError('데이터를 불러오는데 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const updateStatus = async (id: number, status: Contact['status']) => {
    const storedPassword = localStorage.getItem('adminPassword')
    try {
      const response = await fetch('/api/admin/contacts', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': storedPassword || password,
        },
        body: JSON.stringify({ id, status }),
      })

      if (response.ok) {
        setContacts((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status } : c))
        )
      }
    } catch {
      setError('상태 업데이트에 실패했습니다.')
    }
  }

  const deleteContactItem = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    const storedPassword = localStorage.getItem('adminPassword')
    try {
      const response = await fetch(`/api/admin/contacts?id=${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-password': storedPassword || password,
        },
      })

      if (response.ok) {
        setContacts((prev) => prev.filter((c) => c.id !== id))
      }
    } catch {
      setError('삭제에 실패했습니다.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword('')
    localStorage.removeItem('adminPassword')
  }

  useEffect(() => {
    const storedPassword = localStorage.getItem('adminPassword')
    if (storedPassword) {
      setPassword(storedPassword)
      setIsAuthenticated(true)
      fetchContacts()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">관리자 로그인</h1>
            <p className="text-gray-600 mt-2">콜통합센터 어드민</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="비밀번호를 입력하세요"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-all disabled:opacity-50"
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-primary-600" />
              <h1 className="text-xl font-bold text-gray-900">콜통합센터 관리자</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={fetchContacts}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                새로고침
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">대기중</div>
            <div className="text-2xl font-bold text-yellow-600">
              {contacts.filter((c) => c.status === '대기중').length}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">연락완료</div>
            <div className="text-2xl font-bold text-blue-600">
              {contacts.filter((c) => c.status === '연락완료').length}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">상담완료</div>
            <div className="text-2xl font-bold text-green-600">
              {contacts.filter((c) => c.status === '상담완료').length}
            </div>
          </div>
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Contact List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">문의 목록</h2>
          </div>

          {contacts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              접수된 문의가 없습니다.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {contacts.map((contact) => (
                <div key={contact.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[contact.status] || 'bg-gray-100 text-gray-800'}`}>
                          {contact.status}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {new Date(contact.created_at).toLocaleString('ko-KR')}
                        </span>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-gray-700">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{contact.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{contact.phone}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-gray-600">
                        <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5" />
                        <p className="text-sm leading-relaxed">{contact.message}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={contact.status}
                        onChange={(e) => updateStatus(contact.id, e.target.value as Contact['status'])}
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="대기중">대기중</option>
                        <option value="연락완료">연락완료</option>
                        <option value="상담완료">상담완료</option>
                      </select>
                      <button
                        onClick={() => deleteContactItem(contact.id)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        title="삭제"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
