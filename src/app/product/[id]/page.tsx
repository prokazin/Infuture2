'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'

// Дефолтные товары (те же, что и в page.tsx)
const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    category: 'iPhone',
    memory: '256GB',
    price: 1299,
    images: ['https://picsum.photos/seed/iphone15/800/800', 'https://picsum.photos/seed/iphone15/2/800/800'],
    description: 'Флагманский iPhone с титановым корпусом, чипом A17 Pro и профессиональной камерой.',
    specifications: {
      'Экран': '6.7" Super Retina XDR',
      'Процессор': 'A17 Pro',
      'Камера': '48MP Main',
      'Батарея': 'До 29ч'
    },
    inStock: true
  },
  // ... остальные товары
]

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState(0)

  useEffect(() => {
    // Загружаем товары из localStorage
    const saved = localStorage.getItem('products')
    let products = defaultProducts
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.length > 0) {
          products = parsed
        }
      } catch (e) {
        console.error('Error loading products:', e)
      }
    }
    
    const found = products.find(p => p.id === params.id)
    setProduct(found || null)
  }, [params.id])

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-400">Загрузка...</p>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    for (let i = 0; i < quantity; i++) {
      cart.push(product)
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    alert(`✅ Добавлено ${quantity} × ${product.name}`)
  }

  return (
    <div className="min-h-screen pb-24">
      <div className="glass sticky top-0 z-10 px-4 py-3 mx-2 mt-2">
        <button onClick={() => router.back()} className="text-xl hover:scale-110 transition-transform">
          ← Назад
        </button>
      </div>

      <div className="px-4 max-w-md mx-auto mt-4">
        <div className="glass p-2 rounded-2xl">
          <div className="relative aspect-square rounded-xl overflow-hidden">
            <Image
              src={product.images[mainImage]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="100vw"
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
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="mt-4 space-y-4">
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-gray-400 text-sm">{product.memory}</p>
            <p className="text-2xl font-bold text-primary mt-2">${product.price}</p>
          </div>

          <div className="glass p-4">
            <h2 className="font-semibold mb-2">📝 Описание</h2>
            <p className="text-sm text-gray-300">{product.description}</p>
          </div>

          <div className="glass p-4">
            <h2 className="font-semibold mb-3">⚙️ Характеристики</h2>
            <div className="space-y-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm border-b border-white/5 pb-2">
                  <span className="text-gray-400">{key}</span>
                  <span className="text-gray-200">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass p-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-xl font-bold transition-colors"
              >
                −
              </button>
              <span className="text-xl font-semibold min-w-[40px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-xl font-bold transition-colors"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 rounded-xl btn-primary font-semibold"
            >
              В корзину — ${(product.price * quantity).toFixed(0)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
