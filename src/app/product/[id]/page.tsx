'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Product } from '@/types'

const STORAGE_PREFIX = 'infuture_'

const getStorage = (key: string) => {
  if (typeof window === 'undefined') return null
  const data = localStorage.getItem(`${STORAGE_PREFIX}${key}`)
  return data ? JSON.parse(data) : null
}

const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 17 pro max',
    category: 'iPhone',
    memory: '256 gb',
    price: 117000,
    images: ['https://picsum.photos/seed/iphone17/800/800', 'https://picsum.photos/seed/iphone17/2/800/800'],
    description: 'Флагманский iPhone с передовыми технологиями и улучшенной камерой.',
    specifications: {
      'Экран': '6.9" Super Retina XDR',
      'Процессор': 'A19 Pro',
      'Камера': '48MP Main + 12MP Ultra Wide',
      'Батарея': 'До 30ч'
    },
    inStock: true
  },
  {
    id: '2',
    name: 'iPhone 17 pro max',
    category: 'iPhone',
    memory: '256 gb',
    price: 117000,
    images: ['https://picsum.photos/seed/iphone17pro/800/800', 'https://picsum.photos/seed/iphone17pro/2/800/800'],
    description: 'Мощный iPhone с улучшенной камерой и производительностью.',
    specifications: {
      'Экран': '6.9" Super Retina XDR',
      'Процессор': 'A19 Pro',
      'Камера': '48MP Main + 12MP Ultra Wide',
      'Батарея': 'До 30ч'
    },
    inStock: true
  },
  {
    id: '3',
    name: 'iPhone 17 pro max',
    category: 'iPhone',
    memory: '256 gb',
    price: 117000,
    images: ['https://picsum.photos/seed/iphone17max/800/800', 'https://picsum.photos/seed/iphone17max/2/800/800'],
    description: 'Профессиональный iPhone для творчества и работы.',
    specifications: {
      'Экран': '6.9" Super Retina XDR',
      'Процессор': 'A19 Pro',
      'Камера': '48MP Main + 12MP Ultra Wide',
      'Батарея': 'До 30ч'
    },
    inStock: true
  },
  {
    id: '4',
    name: 'Samsung S26',
    category: 'Samsung',
    memory: '256 gb',
    price: 117000,
    images: ['https://picsum.photos/seed/samsungs26/800/800', 'https://picsum.photos/seed/samsungs26/2/800/800'],
    description: 'Флагманский Samsung с ИИ функциями и улучшенной камерой.',
    specifications: {
      'Экран': '6.8" Dynamic AMOLED',
      'Процессор': 'Snapdragon 8 Gen 4',
      'Камера': '200MP Quad',
      'Батарея': '5000mAh'
    },
    inStock: true
  }
]

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState(0)

  useEffect(() => {
    const saved = getStorage('products')
    let products = defaultProducts
    if (saved && saved.length > 0) {
      products = saved
    }
    
    const found = products.find(p => p.id === params.id)
    setProduct(found || null)
  }, [params.id])

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-400" style={{ fontFamily: 'Gotham Pro, sans-serif' }}>Загрузка...</p>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem(`${STORAGE_PREFIX}cart`) || '[]')
    for (let i = 0; i < quantity; i++) {
      cart.push(product)
    }
    localStorage.setItem(`${STORAGE_PREFIX}cart`, JSON.stringify(cart))
    alert(`✅ Добавлено ${quantity} × ${product.name}`)
  }

  return (
    <div className="min-h-screen pb-24 bg-background">
      <div className="bg-[#2A2A2A] sticky top-0 z-10 px-4 py-3">
        <button onClick={() => router.back()} className="text-xl text-white hover:opacity-70 transition-opacity">
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
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Gotham Pro, sans-serif' }}>
              {product.name}
            </h1>
            <p className="text-gray-400 text-sm" style={{ fontFamily: 'Gotham Pro, sans-serif' }}>
              {product.memory}
            </p>
            <p className="text-2xl font-bold text-primary mt-2" style={{ fontFamily: 'Gotham Pro, sans-serif' }}>
              {formatPrice(product.price)}₽
            </p>
          </div>

          <div className="bg-[#2A2A2A] p-4 rounded-2xl">
            <h2 className="font-semibold text-white mb-2" style={{ fontFamily: 'Gotham Pro, sans-serif' }}>
              📝 Описание
            </h2>
            <p className="text-sm text-gray-300" style={{ fontFamily: 'Gotham Pro, sans-serif' }}>
              {product.description}
            </p>
          </div>

          <div className="bg-[#2A2A2A] p-4 rounded-2xl">
            <h2 className="font-semibold text-white mb-3" style={{ fontFamily: 'Gotham Pro, sans-serif' }}>
              ⚙️ Характеристики
            </h2>
            <div className="space-y-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm border-b border-white/5 pb-2">
                  <span className="text-gray-400" style={{ fontFamily: 'Gotham Pro, sans-serif' }}>{key}</span>
                  <span className="text-gray-200" style={{ fontFamily: 'Gotham Pro, sans-serif' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#2A2A2A] p-4 rounded-2xl flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-xl font-bold text-white transition-colors"
                style={{ fontFamily: 'Gotham Pro, sans-serif' }}
              >
                −
              </button>
              <span className="text-xl font-semibold min-w-[40px] text-center text-white" style={{ fontFamily: 'Gotham Pro, sans-serif' }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-xl font-bold text-white transition-colors"
                style={{ fontFamily: 'Gotham Pro, sans-serif' }}
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-80 transition-opacity"
              style={{ fontFamily: 'Gotham Pro, sans-serif' }}
            >
              В корзину — {formatPrice(product.price * quantity)}₽
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
