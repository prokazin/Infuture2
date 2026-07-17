'use client'

import Link from 'next/link'

const categories = [
  { name: 'iPhone', icon: '📱', count: 12 },
  { name: 'Samsung', icon: '📱', count: 8 },
  { name: 'Macbook', icon: '💻', count: 6 },
  { name: 'iPad', icon: '📱', count: 5 },
  { name: 'Аксессуары', icon: '🎧', count: 15 },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-main)' }}>
      <div className="header sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-5 py-4">
          <Link href="/" className="text-white text-xl hover:opacity-70 transition-opacity">
            ← Назад
          </Link>
          <h1 className="text-2xl font-semibold text-white text-center -mt-6">Категории</h1>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-5 mt-4 pb-24">
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <Link key={category.name} href={`/?filter=${category.name}`}>
              <div className="product-card p-6 text-center hover:scale-[1.02] transition-transform">
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-white">{category.name}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {category.count} товаров
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
