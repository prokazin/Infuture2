'use client'

import { useEffect, useState } from 'react'

interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
}

export function useTelegram() {
  const [user, setUser] = useState<TelegramUser | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Telegram) {
      const webApp = (window as any).Telegram.WebApp
      webApp.ready()
      
      const userData = webApp.initDataUnsafe?.user
      if (userData) {
        setUser(userData)
      }
      setIsReady(true)
    } else {
      // Демо данные для разработки вне Telegram
      setUser({
        id: 123456789,
        first_name: 'Демо',
        last_name: 'Пользователь',
        username: 'demouser',
        photo_url: 'https://ui-avatars.com/api/?name=Demo+User&background=8B5CF6&color=fff'
      })
      setIsReady(true)
    }
  }, [])

  return { user, isReady }
}
