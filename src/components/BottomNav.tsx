'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNav() {
  const pathname = usePathname()
  
  const isActive = (path: string) => pathname === path

  return (
    <nav className="glass-nav fixed bottom-0 left-0 right-0 px-4 py-2 z-50">
      <div className="flex justify-around items-center">
        <Link href="/" className="flex flex-col items-center">
          <div className={`text-2xl ${isActive('/') ? 'text-primary' : 'text-gray-400'}`}>
            🏪
          </div>
          <span className={`text-xs ${isActive('/') ? 'text-white' : 'text-gray-400'}`}>
            Магазин
          </span>
        </Link>

        <Link href="/cart" className="flex flex-col items-center">
          <div className={`text-2xl ${isActive('/cart') ? 'text-primary' : 'text-gray-400'}`}>
            🛒
          </div>
          <span className={`text-xs ${isActive('/cart') ? 'text-white' : 'text-gray-400'}`}>
            Корзина
          </span>
        </Link>

        <div className="relative -mt-6">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold text-white">∞</span>
          </div>
        </div>

        <Link href="/profile" className="flex flex-col items-center">
          <div className={`text-2xl ${isActive('/profile') ? 'text-primary' : 'text-gray-400'}`}>
            👤
          </div>
          <span className={`text-xs ${isActive('/profile') ? 'text-white' : 'text-gray-400'}`}>
            Профиль
          </span>
        </Link>

        <button className="flex flex-col items-center text-gray-400">
          <span className="text-2xl">☰</span>
          <span className="text-xs">Меню</span>
        </button>
      </div>
    </nav>
  )
}
