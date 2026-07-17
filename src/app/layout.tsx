import type { Metadata } from 'next'
import './globals.css'  // ← ВАЖНО: правильный путь

export const metadata: Metadata = {
  title: 'Infuture - Tech Store',
  description: 'Premium tech store',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#181818',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
