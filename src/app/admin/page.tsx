'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Product } from '@/types'
import {
  getProducts,
  saveProducts,
  formatPrice,
} from '@/lib/storage'

const ADMIN_SECRET = 'infuture_admin_2024'

export default function AdminPage() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [secretKey, setSecretKey] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    category: 'iPhone',
    memory: '',
    price: '',
    image: '',
    description: '',
    specs: ''
  })

  const loadProducts = () => {
    setProducts(getProducts())
  }

  useEffect(() => {
    loadProducts()
    window.addEventListener('infuture_products_updated', loadProducts)
    return () => window.removeEventListener('infuture_products_updated', loadProducts)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (secretKey === ADMIN_SECRET) {
      setIsAdmin(true)
      setSecretKey('')
    } else {
      alert('❌ Неверный секретный ключ!')
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result as string })
    }
    reader.readAsDataURL(file)
  }

  const parseSpecs = (str: string): Record<string, string> => {
    const specs: Record<string, string> = {}
    if (str) {
      str.split('\n').forEach(line => {
        const [key, value] = line.split(':').map(s => s.trim())
        if (key && value) specs[key] = value
      })
    }
    return Object.keys(specs).length > 0 ? specs : { 'Характеристика': 'Стандартная' }
  }

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.price) {
      alert('⚠️ Заполните название и цену!')
      return
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      memory: formData.memory || 'N/A',
      price: Number(formData.price),
      images: [formData.image || '/img/белый.png'],
      description: formData.description || 'Описание товара',
      specifications: parseSpecs(formData.specs),
      inStock: true
    }

    saveProducts([...products, newProduct])
    setShowForm(false)
    resetForm()
    alert('✅ Товар добавлен!')
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      category: product.category,
      memory: product.memory,
      price: product.price.toString(),
      image: product.images[0] || '',
      description: product.description,
      specs: Object.entries(product.specifications).map(([k, v]) => `${k}: ${v}`).join('\n')
    })
    setShowForm(true)
  }

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProduct) return

    const updatedProduct: Product = {
      ...editingProduct,
      name: formData.name,
      category: formData.category,
      memory: formData.memory || 'N/A',
      price: Number(formData.price),
      images: [formData.image || '/img/белый.png'],
      description: formData.description || 'Описание товара',
      specifications: parseSpecs(formData.specs),
    }

    saveProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p))
    setShowForm(false)
    setEditingProduct(null)
    resetForm()
    alert('✅ Товар обновлен!')
  }

  const handleDelete = (id: string) => {
    if (confirm('🗑️ Удалить товар?')) {
      saveProducts(products.filter(p => p.id !== id))
    }
  }

  const toggleStock = (id: string) => {
    saveProducts(products.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p))
  }

  const resetForm = () => {
    setFormData({
      name: '', category: 'iPhone', memory: '', price: '',
      image: '', description: '', specs: ''
    })
  }

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="glass p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🔐</div>
            <h1 className="text-2xl font-bold text-primary">Админ панель</h1>
            <p className="text-sm text-gray-400 mt-1">Введите секретный ключ</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Секретный ключ"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-background border border-white/10 text-white focus:border-primary focus:outline-none"
              autoFocus
            />
            <button type="submit" className="w-full py-3 rounded-xl bg-primary text-white font-semibold">
              Войти
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24 bg-background">
      <div className="bg-[#2A2A2A] sticky top-0 z-10 px-4 py-3">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <button onClick={() => router.push('/')} className="text-xl text-white">←</button>
          <h1 className="text-xl font-bold text-white">⚙️ Админ панель</h1>
          <button onClick={() => setIsAdmin(false)} className="text-sm text-red-400">Выйти</button>
        </div>
      </div>

      <div className="px-4 max-w-6xl mx-auto mt-4">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-[#2A2A2A] p-3 text-center rounded-2xl">
            <p className="text-2xl font-bold text-primary">{products.length}</p>
            <p className="text-xs text-gray-400">Всего</p>
          </div>
          <div className="bg-[#2A2A2A] p-3 text-center rounded-2xl">
            <p className="text-2xl font-bold text-green-400">{products.filter(p => p.inStock).length}</p>
            <p className="text-xs text-gray-400">В наличии</p>
          </div>
          <div className="bg-[#2A2A2A] p-3 text-center rounded-2xl">
            <p className="text-2xl font-bold text-yellow-400">{new Set(products.map(p => p.category)).size}</p>
            <p className="text-xs text-gray-400">Категорий</p>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="🔍 Поиск..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl bg-[#2A2A2A] border border-white/10 text-white"
          />
          <button
            onClick={() => { setShowForm(!showForm); if (showForm) { setEditingProduct(null); resetForm() } }}
            className={`px-4 py-2 rounded-xl font-semibold text-white ${showForm ? 'bg-red-500' : 'bg-primary'}`}
          >
            {showForm ? '✕' : '➕ Добавить'}
          </button>
        </div>

        {showForm && (
          <div className="bg-[#2A2A2A] p-4 rounded-2xl mb-4">
            <h2 className="font-semibold text-lg mb-3 text-white">
              {editingProduct ? '✏️ Редактировать' : '➕ Добавить товар'}
            </h2>
            <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Название *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="px-4 py-2 rounded-xl bg-background border border-white/10 text-white"
                  required
                />
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="px-4 py-2 rounded-xl bg-background border border-white/10 text-white"
                >
                  <option>iPhone</option>
                  <option>Samsung</option>
                  <option>Macbook</option>
                  <option>iPad</option>
                  <option>Аксессуары</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Память (256 gb)"
                  value={formData.memory}
                  onChange={(e) => setFormData({ ...formData, memory: e.target.value })}
                  className="px-4 py-2 rounded-xl bg-background border border-white/10 text-white"
                />
                <input
                  type="number"
                  placeholder="Цена (₽) *"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="px-4 py-2 rounded-xl bg-background border border-white/10 text-white"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-1">Фото</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="flex-1 px-4 py-2 rounded-xl bg-background border border-white/10 text-white"
                    placeholder="URL или загрузите"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-blue-500 text-white whitespace-nowrap"
                  >
                    📁
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </div>
                {formData.image && (
                  <div className="mt-2 relative w-20 h-20 rounded-lg overflow-hidden bg-background">
                    <Image src={formData.image} alt="Preview" fill className="object-contain" unoptimized />
                  </div>
                )}
              </div>

              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-background border border-white/10 text-white"
                rows={2}
                placeholder="Описание"
              />

              <textarea
                value={formData.specs}
                onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-background border border-white/10 text-white"
                rows={3}
                placeholder="Характеристики (Ключ: Значение, с новой строки)"
              />

              <button type="submit" className="w-full py-3 rounded-xl bg-primary text-white font-semibold">
                {editingProduct ? '💾 Сохранить' : '✅ Добавить'}
              </button>
            </form>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-lg text-white">📦 Все товары</h2>
            <span className="text-sm text-gray-400">{filteredProducts.length} шт.</span>
          </div>

          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-[#2A2A2A] p-3 rounded-2xl flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-background">
                <Image src={product.images[0]} alt={product.name} fill className="object-contain" sizes="48px" unoptimized />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate text-white">{product.name}</p>
                <p className="text-xs text-gray-400">{product.category} • {product.memory} • {formatPrice(product.price)}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${product.inStock ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                  {product.inStock ? 'В наличии' : 'Нет'}
                </span>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => toggleStock(product.id)} className="px-2 py-1 rounded-lg bg-yellow-500/20 text-yellow-400 text-xs">📦</button>
                <button onClick={() => handleEdit(product)} className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400 text-xs">✏️</button>
                <button onClick={() => handleDelete(product.id)} className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 text-xs">🗑</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
