import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Infuture',
  description: 'Tech Store',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
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
