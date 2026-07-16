export interface Product {
  id: string
  name: string
  category: string
  memory: string
  price: number
  images: string[]
  description: string
  specifications: Record<string, string>
  inStock: boolean
}
