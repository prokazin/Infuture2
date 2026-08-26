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

  // Определяем имя файла изображения из Figma
  const getImagePath = (product: Product) => {
    const imageMap: Record<string, string> = {
      'iPhone 17 pro max': '/img/iphone-1.png',
      'Samsung S26': '/img/samsung-s26.png',
    }
    return imageMap[product.name] || product.images[0]
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div className="product-card-figma cursor-pointer">
        {/* Изображение товара - orig-3-no-bg-preview-carve-photos-1 */}
        <div className="absolute top-[-16px] left-1/2 -translate-x-1/2 w-[144px] h-[199px]">
          <Image
            src={getImagePath(product)}
            alt={product.name}
            width={144}
            height={199}
            className="object-contain"
          />
        </div>

        {/* Разделительная линия - line-4 */}
        <div className="line-4"></div>

        {/* Информация о товаре - frame-122 */}
        <div className="frame-122">
          <div className="i-phone-17-pro-max">{product.name}</div>
          <div className="_256-gb">{product.memory}</div>
          <div className="_117-000">{formatPrice(product.price)}</div>
          <div 
            className="rectangle-995"
            onClick={handleAdd}
          >
            <span className="btn-cart-text">
              {added ? '✓' : 'в корзину'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
