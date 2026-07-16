'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="glass sticky top-0 z-50 px-4 py-3 mx-2 mt-2">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl"
        >
          ☰
        </button>
        
        <div className="flex items-center gap-2">
          <span className="text-2xl text-primary">∞</span>
          <span className="text-xl font-bold text-white">Infuture</span>
        </div>

        <Link href="/cart" className="text-2xl relative">
          🛒
        </Link>
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 glass mt-2 p-4 rounded-xl">
          <Link href="/profile" className="block py-2 hover:bg-white/10 rounded-lg px-3">
            👤 Профиль
          </Link>
          <Link href="/cart" className="block py-2 hover:bg-white/10 rounded-lg px-3">
            🛒 Корзина
          </Link>
        </div>
      )}
    </div>
  )
}
