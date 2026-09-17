'use client'

import Link from 'next/link'
import BottomNav from '@/components/BottomNav'

const categories = [
  { name: 'iPhone', count: 12 },
  { name: 'Samsung', count: 8 },
  { name: 'Macbook', count: 6 },
  { name: 'iPad', count: 5 },
  { name: 'Аксессуары', count: 15 },
]

export default function CategoriesPage() {
  return (
    <div className="frame-12">
      <div className="page-content">
        <div className="bg-[#2A2A2A] sticky top-0 z-10 px-4 py-3">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <Link href="/" className="text-xl text-white hover:opacity-70 transition-opacity">←</Link>
            <h1 className="text-xl font-bold text-white">📂 Категории</h1>
            <div className="w-8"></div>
          </div>
        </div>

        <div className="px-4 max-w-md mx-auto mt-4">
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <Link key={category.name} href={`/?filter=${category.name}`}>
                <div className="bg-[#2A2A2A] p-6 rounded-2xl text-center hover:scale-[1.02] transition-transform">
                  <h3 className="font-semibold text-white">{category.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {category.count} товаров
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
