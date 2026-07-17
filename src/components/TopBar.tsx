'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header sticky top-0 z-50">
      <div className="max-w-xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Кнопка меню */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 -ml-2 text-2xl text-white hover:opacity-70 transition-opacity"
        >
          <i className="fas fa-bars"></i>
        </button>
        
        {/* Логотип */}
        <h1 className="text-2xl font-semibold tracking-tighter text-white">
          Infuture
        </h1>

        {/* Корзина */}
        <Link href="/cart" className="relative">
          <i className="fas fa-shopping-cart text-2xl text-white hover:opacity-70 transition-opacity"></i>
        </Link>
      </div>

      {/* Выпадающее меню */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#1F2937] p-4 border-b border-[#334155]">
          <Link href="/profile" className="block py-2 hover:bg-white/10 rounded-lg px-3 text-white">
            <i className="fas fa-user mr-2"></i> Профиль
          </Link>
          <Link href="/cart" className="block py-2 hover:bg-white/10 rounded-lg px-3 text-white">
            <i className="fas fa-shopping-cart mr-2"></i> Корзина
          </Link>
          <Link href="/admin" className="block py-2 hover:bg-white/10 rounded-lg px-3 text-white">
            <i className="fas fa-cog mr-2"></i> Админ панель
          </Link>
          <hr className="border-[#334155] my-2" />
          <button className="block w-full text-left py-2 hover:bg-white/10 rounded-lg px-3 text-red-400">
            <i className="fas fa-sign-out-alt mr-2"></i> Выйти
          </button>
        </div>
      )}
    </header>
  )
}
