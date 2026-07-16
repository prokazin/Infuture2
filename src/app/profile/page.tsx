'use client'

import { useState, useEffect } from 'react'

interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<TelegramUser | null>(null)
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    // Получаем данные из Telegram
    if (typeof window !== 'undefined' && (window as any).Telegram) {
      const webApp = (window as any).Telegram.WebApp
      webApp.ready()
      const userData = webApp.initDataUnsafe?.user
      if (userData) {
        setUser(userData)
      }
    } else {
      // Демо данные
      setUser({
        id: 123456789,
        first_name: 'Демо',
        last_name: 'Пользователь',
        username: 'demouser',
        photo_url: 'https://ui-avatars.com/api/?name=Demo+User&background=8B5CF6&color=fff'
      })
    }

    // Пример заказов
    setOrders([
      { id: '1', date: '2024-01-15', total: 1299, items: 2, status: 'Доставлен' },
      { id: '2', date: '2024-01-10', total: 249, items: 1, status: 'В обработке' },
    ])
  }, [])

  return (
    <div className="min-h-screen pb-24">
      <div className="glass sticky top-0 z-10 px-4 py-3 mx-2 mt-2">
        <h1 className="text-xl font-bold text-center">👤 Профиль</h1>
      </div>

      <div className="px-4 max-w-7xl mx-auto mt-4">
        {/* Информация о пользователе */}
        <div className="glass p-6 flex items-center gap-4">
          {user?.photo_url ? (
            <img
              src={user.photo_url}
              alt={user.first_name}
              className="w-16 h-16 rounded-full"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary/30 flex items-center justify-center text-3xl">
              {user?.first_name?.[0] || '👤'}
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold">
              {user?.first_name} {user?.last_name}
            </h2>
            <p className="text-sm text-gray-400">@{user?.username || 'user'}</p>
            <p className="text-xs text-gray-500">ID: {user?.id}</p>
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="glass p-4 text-center">
            <p className="text-2xl font-bold text-primary">{orders.length}</p>
            <p className="text-sm text-gray-400">Заказов</p>
          </div>
          <div className="glass p-4 text-center">
            <p className="text-2xl font-bold text-primary">
              {orders.reduce((sum, o) => sum + o.items, 0)}
            </p>
            <p className="text-sm text-gray-400">Товаров</p>
          </div>
        </div>

        {/* История заказов */}
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-3">📦 История заказов</h3>
          {orders.map((order) => (
            <div key={order.id} className="glass p-4 mb-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Заказ #{order.id}</p>
                  <p className="text-xs text-gray-400">{order.date}</p>
                  <p className="text-xs text-gray-400">{order.items} товаров</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">${order.total}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full
                    ${order.status === 'Доставлен' 
                      ? 'bg-green-500/20 text-green-500' 
                      : 'bg-yellow-500/20 text-yellow-500'}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
