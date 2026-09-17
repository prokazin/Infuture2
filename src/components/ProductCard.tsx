'use client'

import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { formatPrice } from '@/lib/storage'

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

  return (
    <Link href={`/product/${product.id}`}>
      <div className="product-card-figma cursor-pointer">
        <div className="product-image">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={110}
            height={150}
            className="object-contain"
          />
        </div>

        <div className="line-4"></div>

        <div className="frame-122">
          <div className="i-phone-17-pro-max">{product.name}</div>
          <div className="_256-gb">{product.memory}</div>
          <div className="_117-000">{formatPrice(product.price)}</div>
          <div className="rectangle-995" onClick={handleAdd}>
            <span className="btn-cart-text">
              {added ? '✓' : 'в корзину'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
