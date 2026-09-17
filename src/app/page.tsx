'use client'

import { useState, useEffect } from 'react'
import FilterBar from '@/components/FilterBar'
import BottomNav from '@/components/BottomNav'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types'
import {
  getProducts,
  getCart,
  saveCart,
} from '@/lib/storage'

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('Все')
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  const loadProducts = () => {
    setProducts(getProducts())
  }

  useEffect(() => {
    loadProducts()
    window.addEventListener('infuture_products_updated', loadProducts)
    return () => window.removeEventListener('infuture_products_updated', loadProducts)
  }, [])

  useEffect(() => {
    if (activeFilter === 'Все') {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter(p => p.category === activeFilter))
    }
  }, [activeFilter, products])

  const addToCart = (product: Product) => {
    const cart = getCart()
    cart.push(product)
    saveCart(cart)
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
