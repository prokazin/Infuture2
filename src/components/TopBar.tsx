'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="glass sticky top-0 z-50 px-4 py-3 mx-2 mt-2">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl hover:scale-110 transition-transform"
        >
          ☰
        </button>
        
        <div className="flex items-center gap-2">
          <span className="text-2xl text-primary">∞</span>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Infuture
          </span>
        </div>

        <Link href="/cart" className="text-2xl hover:scale-110 transition-transform relative">
          🛒
        </Link>
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 glass mt-2 p-4 rounded-xl max-w-md mx-auto">
          <Link href="/profile" className="block py-2 hover:bg-white/10 rounded-lg px-3 transition-colors">
            👤 Профиль
          </Link>
          <Link href="/cart" className="block py-2 hover:bg-white/10 rounded-lg px-3 transition-colors">
            🛒 Корзина
          </Link>
          <Link href="/admin" className="block py-2 hover:bg-white/10 rounded-lg px-3 transition-colors">
            ⚙️ Админ панель
          </Link>
          <hr className="border-white/10 my-2" />
          <button className="block w-full text-left py-2 hover:bg-white/10 rounded-lg px-3 transition-colors text-red-400">
            🚪 Выйти
          </button>
        </div>
      )}
    </div>
  )
}
