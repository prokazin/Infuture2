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

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div className="product-card cursor-pointer">
        {/* Изображение */}
        <div className="bg-gray-900 aspect-square flex items-center justify-center p-8 relative">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </div>
        
        {/* Информация */}
        <div className="p-5">
          <h3 className="font-semibold text-white">{product.name}</h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {product.memory}
          </p>
          <div className="flex items-end justify-between mt-4">
            <span className="price text-white">{formatPrice(product.price)} ₽</span>
            <button
              onClick={handleAdd}
              className={`btn-cart ${added ? 'bg-green-500 hover:bg-green-600' : ''}`}
            >
              {added ? '✓' : 'В корзину'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
