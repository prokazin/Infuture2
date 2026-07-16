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

  const handleAdd = () => {
    onAddToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1000)
  }

  return (
    <div className="glass overflow-hidden card-hover">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square bg-background">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </div>
      </Link>
      
      <div className="p-3 space-y-2">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-sm truncate hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-400">{product.memory}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">${product.price}</span>
          <button
            onClick={handleAdd}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all
              ${added ? 'bg-green-500' : 'btn-primary'} text-white`}
          >
            {added ? '✓' : 'В корзину'}
          </button>
        </div>
      </div>
    </div>
  )
}
