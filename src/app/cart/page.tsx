'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import BottomNav from '@/components/BottomNav'
import { Product } from '@/types'
import { getCart, saveCart, getProducts, formatPrice } from '@/lib/storage'

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([])
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  const loadCart = () => {
    const items = getCart()
    setCart(items)

    const q: Record<string, number> = {}
    items.forEach((item) => {
      q[item.id] = (q[item.id] || 0) + 1
    })
    setQuantities(q)
  }

  useEffect(() => {
    loadCart()
    window.addEventListener('infuture_cart_updated', loadCart)
    return () => window.removeEventListener('infuture_cart_updated', loadCart)
  }, [])

  const updateQuantity = (id: string, delta: number) => {
    const newQ = { ...quantities }
    newQ[id] = Math.max(0, (newQ[id] || 0) + delta)

    const products = getProducts()

    if (newQ[id] === 0) {
      delete newQ[id]
    }

    const newCart: Product[] = []
    Object.entries(newQ).forEach(([itemId, count]) => {
      const product = products.find(p => p.id === itemId) || cart.find(p => p.id === itemId)
      if (product) {
        for (let i = 0; i < count; i++) {
          newCart.push(product)
        }
      }
    })

    setCart(newCart)
    setQuantities(newQ)
    saveCart(newCart)
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0)
  const uniqueItems = Object.keys(quantities).length

  if (cart.length === 0) {
    return (
      <div className="frame-12">
        <div className="page-content flex flex-col items-center justify-center min-h-screen px-4">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-semibold text-white mb-2">Корзина пуста</h2>
          <p className="text-gray-400 text-center mb-6">Добавьте товары в корзину</p>
          <Link href="/" className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-80 transition-opacity">
            В магазин
          </Link>
        </div>
        <BottomNav />
      </div>
    )
  }

  const uniqueCart = Array.from(new Map(cart.map(item => [item.id, item])).values())

  return (
    <div className="frame-12">
      <div className="page-content">
        <div className="bg-[#2A2A2A] sticky top-0 z-10 px-4 py-3">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <Link href="/" className="text-xl text-white hover:opacity-70 transition-opacity">←</Link>
            <h1 className="text-xl font-bold text-white">🛒 Корзина</h1>
            <span className="text-sm text-gray-400">{uniqueItems} товаров</span>
          </div>
        </div>

        <div className="px-4 max-w-md mx-auto mt-4">
          {uniqueCart.map((item) => (
            <div key={item.id} className="bg-[#2A2A2A] p-3 rounded-2xl mb-3 flex items-center gap-3">
              <div className="relative w-20 aspect-square rounded-xl overflow-hidden flex-shrink-0 bg-background">
                <Image src={item.images[0]} alt={item.name} fill className="object-contain" sizes="80px" unoptimized />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-white truncate">{item.name}</h3>
                <p className="text-xs text-gray-400">{item.memory}</p>
                <p className="text-primary font-bold text-sm">{formatPrice(item.price)}</p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-sm font-bold text-white transition-colors"
                  >
                    −
                  </button>
                  <span className="text-sm font-semibold min-w-[24px] text-center text-white">
                    {quantities[item.id] || 0}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-sm font-bold text-white transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-[#2A2A2A] p-4 rounded-2xl mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Товаров: {uniqueItems}</span>
              <span className="text-white">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-sm mb-3">
              <span className="text-gray-400">Доставка</span>
              <span className="text-green-500">Бесплатно</span>
            </div>
            <div className="border-t border-white/10 pt-3 mb-4">
              <div className="flex justify-between font-bold text-lg">
                <span className="text-white">Итого</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
            </div>
            <button
              onClick={() => {
                alert(`✅ Заказ оформлен!\nСумма: ${formatPrice(total)}\nСпасибо за покупку!`)
                saveCart([])
                setCart([])
                setQuantities({})
              }}
              className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-80 transition-opacity"
            >
              Оформить заказ
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
