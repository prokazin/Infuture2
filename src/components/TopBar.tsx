'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="bg-[#2A2A2A] sticky top-0 z-50 px-4 py-3">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl text-white hover:opacity-70 transition-opacity"
        >
          ☰
        </button>
        
        <div className="flex items-center gap-2">
          <span className="text-2xl text-primary">∞</span>
          <span className="text-xl font-bold text-white" style={{ fontFamily: 'Gotham Pro, sans-serif' }}>
            Infuture
          </span>
        </div>

        <Link href="/cart" className="text-2xl text-white hover:opacity-70 transition-opacity relative">
          🛒
        </Link>
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#2A2A2A] mt-2 p-4 rounded-2xl mx-2">
          <Link href="/profile" className="block py-2 hover:bg-white/10 rounded-lg px-3 transition-colors text-white" style={{ fontFamily: 'Gotham Pro, sans-serif' }}>
            👤 Профиль
          </Link>
          <Link href="/cart" className="block py-2 hover:bg-white/10 rounded-lg px-3 transition-colors text-white" style={{ fontFamily: 'Gotham Pro, sans-serif' }}>
            🛒 Корзина
          </Link>
          <hr className="border-white/10 my-2" />
          <button className="block w-full text-left py-2 hover:bg-white/10 rounded-lg px-3 transition-colors text-red-400" style={{ fontFamily: 'Gotham Pro, sans-serif' }}>
            🚪 Выйти
          </button>
        </div>
      )}
    </div>
  )
}
