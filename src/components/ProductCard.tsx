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
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '') + 'р'
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div className="product-card cursor-pointer">
        {/* Изображение - как в Figma */}
        <div className="product-image relative">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={144}
            height={199}
            className="object-contain"
          />
        </div>
        
        {/* Информация о товаре - как в Figma */}
        <div className="product-info">
          <div className="product-name">{product.name}</div>
          <div className="product-memory">{product.memory}</div>
          <div className="product-price">{formatPrice(product.price)}</div>
          <button
            onClick={handleAdd}
            className="btn-cart-figma"
          >
            {added ? '✓' : 'в корзину'}
          </button>
        </div>
      </div>
    </Link>
  )
}
