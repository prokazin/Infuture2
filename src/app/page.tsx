'use client'

import { useState, useEffect } from 'react'
import TopBar from '@/components/TopBar'
import FilterBar from '@/components/FilterBar'
import BottomNav from '@/components/BottomNav'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types'

const STORAGE_PREFIX = 'infuture_'

const getStorage = (key: string) => {
  if (typeof window === 'undefined') return null
  const data = localStorage.getItem(`${STORAGE_PREFIX}${key}`)
  return data ? JSON.parse(data) : null
}

const setStorage = (key: string, value: any) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value))
}

// Товары по умолчанию
const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 17 Pro Max',
    category: 'iPhone',
    memory: '256 GB • Оранжевый',
    price: 117000,
    images: ['https://picsum.photos/id/1015/400/400'],
    description: 'Флагманский iPhone с передовыми технологиями',
    specifications: { 'Экран': '6.9"', 'Процессор': 'A19 Pro', 'Камера': '48MP' },
    inStock: true
  },
  {
    id: '2',
    name: 'iPhone 17 Pro Max',
    category: 'iPhone',
    memory: '256 GB • Белый',
    price: 117000,
    images: ['https://picsum.photos/id/201/400/400'],
    description: 'Мощный iPhone с улучшенной камерой',
    specifications: { 'Экран': '6.9"', 'Процессор': 'A19 Pro', 'Камера': '48MP' },
    inStock: true
  },
  {
    id: '3',
    name: 'Samsung S26',
    category: 'Samsung',
    memory: '256 GB • Черный',
    price: 117000,
    images: ['https://picsum.photos/id/401/400/400'],
    description: 'Флагманский Samsung с ИИ функциями',
    specifications: { 'Экран': '6.8"', 'Процессор': 'Snapdragon 8 Gen 4', 'Камера': '200MP' },
    inStock: true
  },
  {
    id: '4',
    name: 'MacBook Pro 16"',
    category: 'Macbook',
    memory: '512 GB • Серый',
    price: 249900,
    images: ['https://picsum.photos/id/501/400/400'],
    description: 'Мощный ноутбук для профессионалов',
    specifications: { 'Экран': '16.2"', 'Процессор': 'M3 Pro', 'RAM': '36GB' },
    inStock: true
  }
]

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('Все')
  const [cart, setCart] = useState<Product[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  useEffect(() => {
    const saved = getStorage('products')
    if (saved && saved.length > 0) {
      setProducts(saved)
    } else {
      setProducts(defaultProducts)
      setStorage('products', defaultProducts)
    }
  }, [])

  useEffect(() => {
    if (activeFilter === 'Все') {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter(p => p.category === activeFilter))
    }
  }, [activeFilter, products])

  useEffect(() => {
    const saved = getStorage('cart')
    if (saved) setCart(saved)
  }, [])

  useEffect(() => {
    setStorage('cart', cart)
  }, [cart])

  const addToCart = (product: Product) => {
    setCart([...cart, product])
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-main)' }}>
      <TopBar />
      <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      
      {/* Логотип */}
      <div className="flex justify-center my-8">
        <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl">
          <span className="text-5xl font-black text-white tracking-tighter">∞</span>
        </div>
      </div>

      <h2 className="text-3xl font-semibold text-center mb-8 text-white">Каталог</h2>

      {/* Сетка товаров */}
      <div className="max-w-xl mx-auto px-5 pb-24">
        <div className="grid grid-cols-2 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
