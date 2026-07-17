'use client'

import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface Props {
  product: Product
  onAddToCart: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart }: Props) {
  const [added, setAdded] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onAddToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1000)
  }

  // Форматирование цены
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-[#2A2A2A] rounded-2xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]">
        <div className="relative aspect-square bg-background">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </div>
        
        <div className="p-3 space-y-1">
          <h3 className="font-semibold text-sm text-white truncate" style={{ fontFamily: 'Gotham Pro, sans-serif' }}>
            {product.name}
          </h3>
          <p className="text-xs text-gray-400" style={{ fontFamily: 'Gotham Pro, sans-serif' }}>
            {product.memory}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-base font-bold text-primary" style={{ fontFamily: 'Gotham Pro, sans-serif' }}>
              {formatPrice(product.price)}₽
            </span>
            <button
              onClick={handleAdd}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all
                ${added ? 'bg-green-500' : 'bg-primary'} text-white hover:opacity-80`}
              style={{ fontFamily: 'Gotham Pro, sans-serif' }}
            >
              {added ? '✓' : 'в корзину'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
