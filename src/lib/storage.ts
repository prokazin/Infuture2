import { Product } from '@/types'

const PREFIX = 'infuture_'

export const KEYS = {
  products: `${PREFIX}products`,
  cart: `${PREFIX}cart`,
  orders: `${PREFIX}orders`,
}

export const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 17 pro max',
    category: 'iPhone',
    memory: '256 gb',
    price: 117000,
    images: ['/img/white.png'],
    description: 'Флагманский iPhone',
    specifications: { 'Экран': '6.9"', 'Процессор': 'A19 Pro' },
    inStock: true,
  },
  {
    id: '2',
    name: 'iPhone 17 pro max',
    category: 'iPhone',
    memory: '256 gb',
    price: 117000,
    images: ['/img/gray.png'],
    description: 'Мощный iPhone',
    specifications: { 'Экран': '6.9"', 'Процессор': 'A19 Pro' },
    inStock: true,
  },
  {
    id: '3',
    name: 'iPhone 17 pro max',
    category: 'iPhone',
    memory: '256 gb',
    price: 117000,
    images: ['/img/orange.png'],
    description: 'Профессиональный iPhone',
    specifications: { 'Экран': '6.9"', 'Процессор': 'A19 Pro' },
    inStock: true,
  },
  {
    id: '4',
    name: 'Samsung S26',
    category: 'Samsung',
    memory: '256 gb',
    price: 117000,
    images: ['/img/samsung.png'],
    description: 'Флагманский Samsung',
    specifications: { 'Экран': '6.8"', 'Процессор': 'Snapdragon 8 Gen 4' },
    inStock: true,
  },
]

export function getProducts(): Product[] {
  if (typeof window === 'undefined') return []
  const saved = localStorage.getItem(KEYS.products)
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    } catch {}
  }
  localStorage.setItem(KEYS.products, JSON.stringify(defaultProducts))
  return defaultProducts
}

export function saveProducts(products: Product[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEYS.products, JSON.stringify(products))
  window.dispatchEvent(new Event('infuture_products_updated'))
}

export function getCart(): Product[] {
  if (typeof window === 'undefined') return []
  const saved = localStorage.getItem(KEYS.cart)
  if (!saved) return []
  try {
    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveCart(cart: Product[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEYS.cart, JSON.stringify(cart))
  window.dispatchEvent(new Event('infuture_cart_updated'))
}

export function formatPrice(price: number): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'р'
}
