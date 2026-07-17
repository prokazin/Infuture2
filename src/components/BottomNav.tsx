'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNav() {
  const pathname = usePathname()
  
  const isActive = (path: string) => pathname === path

  return (
    <nav className="bottom-nav fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-around py-3">
          <Link href="/" className="flex flex-col items-center gap-0.5">
            <i className={`fas fa-store text-2xl ${isActive('/') ? 'text-violet-400' : 'text-gray-400'}`}></i>
            <span className={`text-xs mt-1 ${isActive('/') ? 'text-violet-400' : 'text-gray-400'}`}>
              Магазин
            </span>
          </Link>

          <Link href="/categories" className="flex flex-col items-center gap-0.5">
            <i className={`fas fa-th-large text-2xl ${isActive('/categories') ? 'text-violet-400' : 'text-gray-400'}`}></i>
            <span className={`text-xs mt-1 ${isActive('/categories') ? 'text-violet-400' : 'text-gray-400'}`}>
              Категории
            </span>
          </Link>

          <Link href="/" className="flex flex-col items-center gap-0.5">
            <i className="fas fa-infinity text-3xl text-violet-400"></i>
            <span className="text-xs text-violet-400 mt-1">Infuture</span>
          </Link>

          <Link href="/cart" className="flex flex-col items-center gap-0.5">
            <i className={`fas fa-shopping-cart text-2xl ${isActive('/cart') ? 'text-violet-400' : 'text-gray-400'}`}></i>
            <span className={`text-xs mt-1 ${isActive('/cart') ? 'text-violet-400' : 'text-gray-400'}`}>
              Корзина
            </span>
          </Link>

          <Link href="/profile" className="flex flex-col items-center gap-0.5">
            <i className={`fas fa-user text-2xl ${isActive('/profile') ? 'text-violet-400' : 'text-gray-400'}`}></i>
            <span className={`text-xs mt-1 ${isActive('/profile') ? 'text-violet-400' : 'text-gray-400'}`}>
              Профиль
            </span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
