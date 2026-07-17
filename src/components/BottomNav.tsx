'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNav() {
  const pathname = usePathname()
  
  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-[#1A1A1A] fixed bottom-0 left-0 right-0 px-4 py-2 z-50 border-t border-white/5">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <Link href="/" className="flex flex-col items-center gap-0.5">
          <span className={`text-2xl ${isActive('/') ? 'text-primary' : 'text-gray-500'}`}>
            🏪
          </span>
          <span className={`text-[10px] ${isActive('/') ? 'text-white' : 'text-gray-500'}`} style={{ fontFamily: 'Gotham Pro, sans-serif' }}>
            Магазин
          </span>
        </Link>

        <Link href="/cart" className="flex flex-col items-center gap-0.5">
          <span className={`text-2xl ${isActive('/cart') ? 'text-primary' : 'text-gray-500'}`}>
            🛒
          </span>
          <span className={`text-[10px] ${isActive('/cart') ? 'text-white' : 'text-gray-500'}`} style={{ fontFamily: 'Gotham Pro, sans-serif' }}>
            Корзина
          </span>
        </Link>

        <div className="relative -mt-6">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="text-2xl font-bold text-white">∞</span>
          </div>
        </div>

        <Link href="/profile" className="flex flex-col items-center gap-0.5">
          <span className={`text-2xl ${isActive('/profile') ? 'text-primary' : 'text-gray-500'}`}>
            👤
          </span>
          <span className={`text-[10px] ${isActive('/profile') ? 'text-white' : 'text-gray-500'}`} style={{ fontFamily: 'Gotham Pro, sans-serif' }}>
            Профиль
          </span>
        </Link>

        <div className="flex flex-col items-center gap-0.5">
          <span className="text-2xl text-gray-500">☰</span>
          <span className="text-[10px] text-gray-500" style={{ fontFamily: 'Gotham Pro, sans-serif' }}>
            Меню
          </span>
        </div>
      </div>
    </nav>
  )
}
