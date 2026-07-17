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

const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    category: 'iPhone',
    memory: '256GB',
    price: 1299,
    images: ['https://picsum.photos/seed/iphone15/400/400'],
    description: 'Флагманский iPhone с титановым корпусом',
    specifications: { 'Экран': '6.7"', 'Процессор': 'A17 Pro' },
    inStock: true
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24',
    category: 'Samsung',
    memory: '256GB',
    price: 999,
    images: ['https://picsum.photos/seed/samsung24/400/400'],
    description: 'Мощный Android смартфон',
    specifications: { 'Экран': '6.8"', 'Процессор': 'Snapdragon 8 Gen 3' },
    inStock: true
  },
  {
    id: '3',
    name: 'MacBook Pro 16"',
    category: 'MacBook',
    memory: '1TB',
    price: 2499,
    images: ['https://picsum.photos/seed/macbook16/400/400'],
    description: 'Мощный ноутбук для профессионалов',
    specifications: { 'Экран': '16.2"', 'Процессор': 'M3 Pro' },
    inStock: true
  },
  {
    id: '4',
    name: 'iPad Pro 12.9"',
    category: 'iPad',
    memory: '256GB',
    price: 1099,
    images: ['https://picsum.photos/seed/ipadpro/400/400'],
    description: 'Профессиональный планшет',
    specifications: { 'Экран': '12.9"', 'Процессор': 'M2' },
    inStock: true
  },
  {
    id: '5',
    name: 'AirPods Pro 2',
    category: 'Аксессуары',
    memory: 'N/A',
    price: 249,
    images: ['https://picsum.photos/seed/airpods/400/400'],
    description: 'Беспроводные наушники',
    specifications: { 'Батарея': '6ч', 'Шумоподавление': 'Да' },
    inStock: true
  },
  {
    id: '6',
    name: 'iPhone 15',
    category: 'iPhone',
    memory: '128GB',
    price: 799,
    images: ['https://picsum.photos/seed/iphone15/400/400'],
    description: 'Стильный iPhone с Dynamic Island',
    specifications: { 'Экран': '6.1"', 'Процессор': 'A16 Bionic' },
    inStock: true
  }
]

const filters = ['Все', 'iPhone', 'Samsung', 'MacBook', 'iPad', 'Аксессуары']

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
    <div className="min-h-screen">
      <TopBar />
      
      <div className="px-4 py-3 overflow-x-auto">
        <div className="flex gap-2 min-w-max max-w-md mx-auto">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap
                ${activeFilter === filter 
                  ? 'filter-active' 
                  : 'bg-card text-gray-400 hover:text-white'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 max-w-md mx-auto pb-4">
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
