'use client'

import { useState, useEffect } from 'react'
import TopBar from '@/components/TopBar'
import BottomNav from '@/components/BottomNav'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types'

// Дефолтные товары
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
  // ... остальные товары
]

const filters = ['Все', 'iPhone', 'Samsung', 'MacBook', 'iPad', 'Аксессуары']

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('Все')
  const [cart, setCart] = useState<Product[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  // Загрузка товаров
  useEffect(() => {
    const saved = localStorage.getItem('products')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.length > 0) {
          setProducts(parsed)
          return
        }
      } catch (e) {
        console.error('Error loading products:', e)
      }
    }
    // Если нет сохраненных, используем дефолтные
    setProducts(defaultProducts)
    localStorage.setItem('products', JSON.stringify(defaultProducts))
  }, [])

  // Фильтрация товаров
  useEffect(() => {
    if (activeFilter === 'Все') {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter(p => p.category === activeFilter))
    }
  }, [activeFilter, products])

  // Загрузка корзины
  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) setCart(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
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

      <div className="px-4 max-w-md mx-auto">
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
