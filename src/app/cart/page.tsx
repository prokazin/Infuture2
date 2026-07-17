'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'

const STORAGE_PREFIX = 'infuture_'

const getStorage = (key: string) => {
  if (typeof window === 'undefined') return null
  const data = localStorage.getItem(`${STORAGE_PREFIX}${key}`)
  return data ? JSON.parse(data) : null
}

const setStorage = (key: string, value: any) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value))
}

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([])
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  useEffect(() => {
    const saved = getStorage('cart')
    if (saved) {
      const items = saved
      setCart(items)
      
      const q: Record<string, number> = {}
      items.forEach((item: Product) => {
        q[item.id] = (q[item.id] || 0) + 1
      })
      setQuantities(q)
    }
  }, [])

  const updateQuantity = (id: string, delta: number) => {
    const newQ = { ...quantities }
    newQ[id] = Math.max(0, (newQ[id] || 0) + delta)
    
    if (newQ[id] === 0) {
      delete newQ[id]
      setCart(cart.filter(item => item.id !== id))
    } else {
      const newCart: Product[] = []
      Object.entries(newQ).forEach(([itemId, count]) => {
        const product = cart.find(p => p.id === itemId)
        if (product) {
          for (let i = 0; i < count; i++) {
            newCart.push(product)
          }
        }
      })
      setCart(newCart)
    }
    
    setQuantities(newQ)
    setStorage('cart', Object.entries(newQ).flatMap(([id, count]) => {
      const product = cart.find(p => p.id === id)
      return product ? Array(count).fill(product) : []
    }))
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0)
  const uniqueItems = Object.keys(quantities).length

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-semibold mb-2">Корзина пуста</h2>
        <p className="text-gray-400 text-center mb-6">Добавьте товары в корзину</p>
        <Link href="/" className="px-6 py-3 rounded-xl btn-primary">
          В магазин
        </Link>
      </div>
    )
  }

  const uniqueCart = Array.from(new Map(cart.map(item => [item.id, item])).values())

  return (
    <div className="min-h-screen pb-24">
      <div className="glass sticky top-0 z-10 px-4 py-3 mx-2 mt-2">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Link href="/" className="text-xl hover:scale-110 transition-transform">←</Link>
          <h1 className="text-xl font-bold">🛒 Корзина</h1>
          <span className="text-sm text-gray-400">{uniqueItems} товаров</span>
        </div>
      </div>

      <div className="px-4 max-w-md mx-auto mt-4">
        {uniqueCart.map((item) => (
          <div key={item.id} className="glass p-3 mb-3 flex items-center gap-3">
            <div className="relative w-20 aspect-square rounded-xl overflow-hidden flex-shrink-0">
              <Image src={item.images[0]} alt={item.name} fill className="object-cover" sizes="80px" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">{item.name}</h3>
              <p className="text-xs text-gray-400">{item.memory}</p>
              <p className="text-primary font-bold text-sm">${item.price}</p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-sm font-bold transition-colors"
                >
                  −
                </button>
                <span className="text-sm font-semibold min-w-[24px] text-center">
                  {quantities[item.id] || 0}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-sm font-bold transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="glass p-4 mt-4 sticky bottom-20">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Товаров: {uniqueItems}</span>
            <span>${total.toFixed(0)}</span>
          </div>
          <div className="flex justify-between text-sm mb-3">
            <span className="text-gray-400">Доставка</span>
            <span className="text-green-500">Бесплатно</span>
          </div>
          <div className="border-t border-white/10 pt-3 mb-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Итого</span>
              <span className="text-primary">${total.toFixed(0)}</span>
            </div>
          </div>
          <button
            onClick={() => {
              alert(`✅ Заказ оформлен!\nСумма: $${total.toFixed(0)}\nСпасибо за покупку!`)
              setStorage('cart', [])
              setCart([])
              setQuantities({})
            }}
            className="w-full py-3 rounded-xl btn-primary font-semibold"
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  )
}
