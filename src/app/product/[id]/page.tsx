'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import BottomNav from '@/components/BottomNav'
import { Product } from '@/types'
import { getProducts, getCart, saveCart, formatPrice } from '@/lib/storage'

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState(0)

  useEffect(() => {
    const products = getProducts()
    const found = products.find(p => p.id === params.id)
    setProduct(found || null)
  }, [params.id])

  if (!product) {
    return (
      <div className="frame-12">
        <div className="page-content flex items-center justify-center min-h-screen">
          <p className="text-gray-400">Загрузка...</p>
        </div>
        <BottomNav />
      </div>
    )
  }

  const handleAddToCart = () => {
    const cart = getCart()
    for (let i = 0; i < quantity; i++) {
      cart.push(product)
    }
    saveCart(cart)
    alert(`✅ Добавлено ${quantity} × ${product.name}`)
  }

  return (
    <div className="frame-12">
      <div className="page-content">
        <div className="bg-[#2A2A2A] sticky top-0 z-10 px-4 py-3">
          <button
            onClick={() => router.back()}
            className="text-xl text-white hover:opacity-70 transition-opacity"
          >
            ← Назад
          </button>
        </div>

        <div className="px-4 max-w-md mx-auto mt-4">
          <div className="bg-[#2A2A2A] p-2 rounded-2xl">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <Image
                src={product.images[mainImage]}
                alt={product.name}
                fill
                className="object-contain"
                sizes="100vw"
                unoptimized
              />
            </div>
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(idx)}
                  className={`relative w-16 aspect-square rounded-xl overflow-hidden flex-shrink-0
                    ${mainImage === idx ? 'ring-2 ring-primary' : 'ring-1 ring-white/10'}`}
                >
                  <Image src={img} alt="" fill className="object-cover" unoptimized />
                </button>
              ))}
            </div>
          )}

          <div className="mt-4 space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-white">{product.name}</h1>
              <p className="text-gray-400 text-sm">{product.memory}</p>
              <p className="text-2xl font-bold text-primary mt-2">
                {formatPrice(product.price)}
              </p>
            </div>

            <div className="bg-[#2A2A2A] p-4 rounded-2xl">
              <h2 className="font-semibold text-white mb-2">📝 Описание</h2>
              <p className="text-sm text-gray-300">{product.description}</p>
            </div>

            <div className="bg-[#2A2A2A] p-4 rounded-2xl">
              <h2 className="font-semibold text-white mb-3">⚙️ Характеристики</h2>
              <div className="space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm border-b border-white/5 pb-2">
                    <span className="text-gray-400">{key}</span>
                    <span className="text-gray-200">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#2A2A2A] p-4 rounded-2xl flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-xl font-bold text-white transition-colors"
                >
                  −
                </button>
                <span className="text-xl font-semibold min-w-[40px] text-center text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-xl font-bold text-white transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-80 transition-opacity"
              >
                В корзину — {formatPrice(product.price * quantity)}
              </button>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
