'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function BottomNav() {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  return (
    <div className="bottom-nav-figma">
      {/* Магазин */}
      <Link href="/" className="flex flex-col items-center">
        <div className="w-[38px] h-[34px] flex items-center justify-center">
          <svg width="38" height="34" viewBox="0 0 38 34" fill="none">
            <path d="M4.53125 4.16667C3.94097 4.16667 3.44583 3.96736 3.04583 3.56875C2.64722 3.16875 2.44792 2.67361 2.44792 2.08333C2.44792 1.49306 2.64722 0.997917 3.04583 0.597917C3.44583 0.199306 3.94097 0 4.53125 0H33.6979C34.2882 0 34.7826 0.199306 35.1812 0.597917C35.5812 0.997917 35.7812 1.49306 35.7812 2.08333C35.7812 2.67361 35.5812 3.16875 35.1812 3.56875C34.7826 3.96736 34.2882 4.16667 33.6979 4.16667H4.53125ZM4.53125 33.3333C3.94097 33.3333 3.44583 33.1333 3.04583 32.7333C2.64722 32.3347 2.44792 31.8403 2.44792 31.25V20.8333H2.08333C1.42361 20.8333 0.885417 20.5813 0.46875 20.0771C0.0520834 19.5743 -0.0868056 18.9931 0.0520833 18.3333L2.13542 7.91667C2.23958 7.43056 2.48264 7.03125 2.86458 6.71875C3.24653 6.40625 3.68055 6.25 4.16667 6.25H34.0625C34.5486 6.25 34.9826 6.40625 35.3646 6.71875C35.7465 7.03125 35.9896 7.43056 36.0937 7.91667L38.1771 18.3333C38.316 18.9931 38.1771 19.5743 37.7604 20.0771C37.3437 20.5813 36.8055 20.8333 36.1458 20.8333H35.7812V31.25C35.7812 31.8403 35.5812 32.3347 35.1812 32.7333C34.7826 33.1333 34.2882 33.3333 33.6979 33.3333C33.1076 33.3333 32.6132 33.1333 32.2146 32.7333C31.8146 32.3347 31.6146 31.8403 31.6146 31.25V20.8333H23.2812V31.25C23.2812 31.8403 23.0819 32.3347 22.6833 32.7333C22.2833 33.1333 21.7882 33.3333 21.1979 33.3333H4.53125ZM6.61458 29.1667H19.1146V20.8333H6.61458V29.1667Z" 
              fill={isActive('/') ? '#A369D0' : 'white'}/>
          </svg>
        </div>
        <span className="text-[10px] text-white font-medium mt-0.5">Магазин</span>
      </Link>

      {/* Корзина */}
      <Link href="/cart" className="flex flex-col items-center">
        <div className="w-[24px] h-[26px] flex items-center justify-center">
          <svg width="24" height="26" viewBox="0 0 24 26" fill="none">
            <path d="M17.75 4.73333V2.36667H8.28333V4.73333M7.1 18.9333C5.79833 18.9333 4.73333 19.9983 4.73333 21.3C4.73333 22.6017 5.79833 23.6667 7.1 23.6667C8.40167 23.6667 9.46667 22.6017 9.46667 21.3C9.46667 19.9983 8.40167 18.9333 7.1 18.9333ZM18.9333 18.9333C17.6317 18.9333 16.5667 19.9983 16.5667 21.3C16.5667 22.6017 17.6317 23.6667 18.9333 23.6667C20.235 23.6667 21.3 22.6017 21.3 21.3C21.3 19.9983 20.235 18.9333 18.9333 18.9333ZM7.33667 15.1467V15.0283L8.40167 13.0167H17.1583C17.9867 13.0167 18.815 12.5433 19.17 11.8333L23.785 3.55L21.7733 2.36667L17.1583 10.65H8.875L3.905 0H0V2.36667H2.36667L6.62667 11.36L4.97 14.2C4.85167 14.555 4.73333 14.91 4.73333 15.3833C4.73333 16.685 5.79833 17.75 7.1 17.75H21.3V15.3833H7.57333C7.455 15.3833 7.33667 15.265 7.33667 15.1467Z" 
              fill={isActive('/cart') ? '#A369D0' : 'white'}/>
          </svg>
        </div>
        <span className="text-[10px] text-white font-medium mt-0.5">Корзина</span>
      </Link>

      {/* Логотип по центру */}
      <div className="flex flex-col items-center">
        <div className="w-[51px] h-[33px] flex items-center justify-center">
          <Image src="/logo.png" alt="Infuture" width={51} height={33} className="object-contain" />
        </div>
        <span className="text-[10px] text-white font-medium mt-0.5">Infuture</span>
      </div>

      {/* Категории */}
      <Link href="/categories" className="flex flex-col items-center">
        <div className="w-[24px] h-[24px] flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="1.5" y="1.5" width="8" height="8" rx="2" stroke={isActive('/categories') ? '#A369D0' : 'white'} strokeWidth="3"/>
            <rect x="14.5" y="1.5" width="8" height="8" rx="2" stroke={isActive('/categories') ? '#A369D0' : 'white'} strokeWidth="3"/>
            <rect x="1.5" y="14.5" width="8" height="8" rx="2" stroke={isActive('/categories') ? '#A369D0' : 'white'} strokeWidth="3"/>
            <rect x="14.5" y="14.5" width="8" height="8" rx="2" stroke={isActive('/categories') ? '#A369D0' : 'white'} strokeWidth="3"/>
          </svg>
        </div>
        <span className="text-[10px] text-white font-medium mt-0.5">Категории</span>
      </Link>

      {/* Профиль */}
      <Link href="/profile" className="flex flex-col items-center">
        <div className="w-[24px] h-[24px] flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="9" r="5.5" stroke={isActive('/profile') ? '#A369D0' : 'white'} strokeWidth="3"/>
            <path d="M3 23C3 18.0294 7.02944 14 12 14C16.9706 14 21 18.0294 21 23" stroke={isActive('/profile') ? '#A369D0' : 'white'} strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </div>
        <span className="text-[10px] text-white font-medium mt-0.5">Профиль</span>
      </Link>
    </div>
  )
}
