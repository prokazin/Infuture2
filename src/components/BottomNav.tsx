'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function BottomNav() {
  const pathname = usePathname()
  
  const isActive = (path: string) => pathname === path

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
      <div className="max-w-[396px] mx-auto h-[84px] bg-[#1C1C1C] rounded-[60px] flex items-center justify-between px-2 relative shadow-2xl">
        
        {/* Магазин */}
        <Link href="/" className="flex flex-col items-center justify-center w-[75px] h-[75px] rounded-full transition-all hover:scale-105 active:scale-95">
          <div className="flex flex-col items-center gap-0.5">
            <i className={`fas fa-store text-xl ${isActive('/') ? 'text-[#A369D0]' : 'text-[#F8F8F8]'}`}></i>
            <span className={`text-[10px] font-medium ${isActive('/') ? 'text-[#A369D0]' : 'text-[#F8F8F8]'}`}>
              Магазин
            </span>
          </div>
        </Link>

        {/* Корзина */}
        <Link href="/cart" className="flex flex-col items-center justify-center w-[75px] h-[75px] rounded-full transition-all hover:scale-105 active:scale-95">
          <div className="flex flex-col items-center gap-0.5">
            <i className={`fas fa-shopping-cart text-xl ${isActive('/cart') ? 'text-[#A369D0]' : 'text-[#F8F8F8]'}`}></i>
            <span className={`text-[10px] font-medium ${isActive('/cart') ? 'text-[#A369D0]' : 'text-[#F8F8F8]'}`}>
              Корзина
            </span>
          </div>
        </Link>

        {/* Центральный логотип */}
        <div className="absolute left-1/2 -translate-x-1/2 -mt-8">
          <div className="w-[75px] h-[75px] rounded-full flex items-center justify-center shadow-lg shadow-[#A369D0]/30"
               style={{
                 background: 'radial-gradient(ellipse 50% 50% at 50% 50%, #A369D0 0%, #53366A 100%)'
               }}>
            <Image 
              src="/logo.PNG" 
              alt="Infuture" 
              width={38} 
              height={33}
              className="object-contain"
            />
          </div>
        </div>

        {/* Категории */}
        <Link href="/categories" className="flex flex-col items-center justify-center w-[75px] h-[75px] rounded-full transition-all hover:scale-105 active:scale-95">
          <div className="flex flex-col items-center gap-0.5">
            <i className={`fas fa-th-large text-xl ${isActive('/categories') ? 'text-[#A369D0]' : 'text-[#F8F8F8]'}`}></i>
            <span className={`text-[10px] font-medium ${isActive('/categories') ? 'text-[#A369D0]' : 'text-[#F8F8F8]'}`}>
              Категории
            </span>
          </div>
        </Link>

        {/* Профиль */}
        <Link href="/profile" className="flex flex-col items-center justify-center w-[75px] h-[75px] rounded-full transition-all hover:scale-105 active:scale-95">
          <div className="flex flex-col items-center gap-0.5">
            <i className={`fas fa-user text-xl ${isActive('/profile') ? 'text-[#A369D0]' : 'text-[#F8F8F8]'}`}></i>
            <span className={`text-[10px] font-medium ${isActive('/profile') ? 'text-[#A369D0]' : 'text-[#F8F8F8]'}`}>
              Профиль
            </span>
          </div>
        </Link>

      </div>
    </nav>
  )
}
