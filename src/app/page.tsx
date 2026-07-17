'use client'

import { useState, useEffect } from 'react'
import TopBar from '@/components/TopBar'
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

// Товары из дизайна
const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 17 pro max',
    category: 'iPhone',
    memory: '256 gb',
    price: 117000,
    images: ['https://picsum.photos/seed/iphone17/400/400'],
    description: 'Флагманский iPhone с передовыми технологиями',
    specifications: { 'Экран': '6.9"', 'Процессор': 'A19 Pro', 'Камера': '48MP' },
    inStock: true
  },
  {
    id: '2',
    name: 'iPhone 17 pro max',
    category: 'iPhone',
    memory: '256 gb',
    price: 117000,
    images: ['https://picsum.photos/seed/iphone17pro/400/400'],
    description: 'Мощный iPhone с улучшенной камерой',
    specifications: { 'Экран': '6.9"', 'Процессор': 'A19 Pro', 'Камера': '48MP' },
    inStock: true
  },
  {
    id: '3',
    name: 'iPhone 17 pro max',
    category: 'iPhone',
    memory: '256 gb',
    price: 117000,
    images: ['https://picsum.photos/seed/iphone17max/400/400'],
    description: 'Профессиональный iPhone для творчества',
    specifications: { 'Экран': '6.9"', 'Процессор': 'A19 Pro', 'Камера': '48MP' },
    inStock: true
  },
  {
    id: '4',
    name: 'Samsung S26',
    category: 'Samsung',
    memory: '256 gb',
    price: 117000,
    images: ['https://picsum.photos/seed/samsungs26/400/400'],
    description: 'Флагманский Samsung с ИИ функциями',
    specifications: { 'Экран': '6.8"', 'Процессор': 'Snapdragon 8 Gen 4', 'Камера': '200MP' },
    inStock: true
  }
]

const filters = ['Все', 'iPhone', 'Samsung', 'Macbook']

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
    <div className="min-h-screen bg-background">
      <TopBar />
      
      {/* Фильтры - горизонтальный скролл */}
      <div className="px-4 py-3 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap
                ${activeFilter === filter 
                  ? 'bg-primary text-white' 
                  : 'bg-[#2A2A2A] text-gray-400 hover:text-white'
                }`}
              style={{ fontFamily: 'Gotham Pro, sans-serif' }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Заголовок Каталог */}
      <div className="px-4 py-2">
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Gotham Pro, sans-serif' }}>
          Каталог
        </h1>
      </div>

      {/* Сетка товаров 2 колонки */}
      <div className="px-4 pb-24">
        <div className="grid grid-cols-2 gap-3">
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
