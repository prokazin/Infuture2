'use client'

import { useState, useEffect } from 'react'
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

const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 17 pro max',
    category: 'iPhone',
    memory: '256 gb',
    price: 117000,
    images: ['/img/белый.png'],
    description: 'Флагманский iPhone',
    specifications: { 'Экран': '6.9"', 'Процессор': 'A19 Pro' },
    inStock: true
  },
  {
    id: '2',
    name: 'iPhone 17 pro max',
    category: 'iPhone',
    memory: '256 gb',
    price: 117000,
    images: ['/img/серый.png'],
    description: 'Мощный iPhone',
    specifications: { 'Экран': '6.9"', 'Процессор': 'A19 Pro' },
    inStock: true
  },
  {
    id: '3',
    name: 'iPhone 17 pro max',
    category: 'iPhone',
    memory: '256 gb',
    price: 117000,
    images: ['/img/оранжевый.png'],
    description: 'Профессиональный iPhone',
    specifications: { 'Экран': '6.9"', 'Процессор': 'A19 Pro' },
    inStock: true
  },
  {
    id: '4',
    name: 'Samsung S26',
    category: 'Samsung',
    memory: '256 gb',
    price: 117000,
    images: ['/img/самсунг.png'],
    description: 'Флагманский Samsung',
    specifications: { 'Экран': '6.8"', 'Процессор': 'Snapdragon 8 Gen 4' },
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
    <div className="frame-12">
      <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      <div className="grid grid-cols-2 gap-4 justify-items-center px-4 pb-24 pt-4">
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={addToCart}
          />
        ))}
      </div>

      <BottomNav />
    </div>
  )
}
