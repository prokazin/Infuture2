'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Product {
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

// Начальные товары
const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    category: 'iPhone',
    memory: '256GB',
    price: 1299,
    images: ['https://picsum.photos/seed/iphone15/400/400'],
    description: 'Флагманский iPhone с титановым корпусом, чипом A17 Pro и профессиональной камерой.',
    specifications: {
      'Экран': '6.7" Super Retina XDR',
      'Процессор': 'A17 Pro',
      'Камера': '48MP Main',
      'Батарея': 'До 29ч'
    },
    inStock: true
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24',
    category: 'Samsung',
    memory: '256GB',
    price: 999,
    images: ['https://picsum.photos/seed/samsung24/400/400'],
    description: 'Мощный Android смартфон с ИИ функциями и улучшенной камерой.',
    specifications: {
      'Экран': '6.8" Dynamic AMOLED',
      'Процессор': 'Snapdragon 8 Gen 3',
      'Камера': '200MP Quad',
      'Батарея': '5000mAh'
    },
    inStock: true
  },
  {
    id: '3',
    name: 'MacBook Pro 16"',
    category: 'MacBook',
    memory: '1TB',
    price: 2499,
    images: ['https://picsum.photos/seed/macbook16/400/400'],
    description: 'Мощный ноутбук для профессионалов с чипом M3 Pro.',
    specifications: {
      'Экран': '16.2" Liquid Retina XDR',
      'Процессор': 'M3 Pro',
      'RAM': '36GB',
      'Батарея': 'До 22ч'
    },
    inStock: true
  },
  {
    id: '4',
    name: 'iPad Pro 12.9"',
    category: 'iPad',
    memory: '256GB',
    price: 1099,
    images: ['https://picsum.photos/seed/ipadpro/400/400'],
    description: 'Профессиональный планшет с чипом M2 и поддержкой Apple Pencil.',
    specifications: {
      'Экран': '12.9" Liquid Retina XDR',
      'Процессор': 'M2',
      'Камера': '12MP Wide',
      'Батарея': 'До 10ч'
    },
    inStock: true
  },
  {
    id: '5',
    name: 'AirPods Pro 2',
    category: 'Аксессуары',
    memory: 'N/A',
    price: 249,
    images: ['https://picsum.photos/seed/airpods/400/400'],
    description: 'Беспроводные наушники с активным шумоподавлением.',
    specifications: {
      'Батарея': '6ч',
      'Шумоподавление': 'Да',
      'Водозащита': 'IPX4'
    },
    inStock: true
  },
  {
    id: '6',
    name: 'iPhone 15',
    category: 'iPhone',
    memory: '128GB',
    price: 799,
    images: ['https://picsum.photos/seed/iphone15/400/400'],
    description: 'Стильный iPhone с Dynamic Island и чипом A16 Bionic.',
    specifications: {
      'Экран': '6.1" Super Retina XDR',
      'Процессор': 'A16 Bionic',
      'Камера': '48MP Main',
      'Батарея': 'До 26ч'
    },
    inStock: true
  }
]

export default function AdminPage() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [password, setPassword] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Форма добавления товара
  const [formData, setFormData] = useState({
    name: '',
    category: 'iPhone',
    memory: '',
    price: '',
    image: 'https://picsum.photos/seed/new/400/400',
    description: '',
    specs: ''
  })

  // Загрузка товаров при монтировании
  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = () => {
    const saved = localStorage.getItem('products')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.length > 0) {
          setProducts(parsed)
          return
        }
      } catch (e) {
        console.error('Error loading products:', e)
      }
    }
    // Если нет сохраненных, используем дефолтные
    setProducts(defaultProducts)
    localStorage.setItem('products', JSON.stringify(defaultProducts))
  }

  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts)
    localStorage.setItem('products', JSON.stringify(updatedProducts))
    // Обновляем также в sessionStorage для синхронизации
    sessionStorage.setItem('products', JSON.stringify(updatedProducts))
  }

  // Проверка пароля
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'admin123') {
      setIsAdmin(true)
      setPassword('')
    } else {
      alert('❌ Неверный пароль! Попробуйте еще раз.')
    }
  }

  // Добавление товара
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.price) {
      alert('⚠️ Заполните название и цену!')
      return
    }

    const specs: Record<string, string> = {}
    if (formData.specs) {
      formData.specs.split('\n').forEach(line => {
        const [key, value] = line.split(':').map(s => s.trim())
        if (key && value) {
          specs[key] = value
        }
      })
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      memory: formData.memory || 'N/A',
      price: Number(formData.price),
      images: [formData.image || 'https://picsum.photos/seed/new/400/400'],
      description: formData.description || 'Описание товара',
      specifications: Object.keys(specs).length > 0 ? specs : { 'Характеристика': 'Стандартная' },
      inStock: true
    }

    const updated = [...products, newProduct]
    saveProducts(updated)
    setShowForm(false)
    setFormData({
      name: '',
      category: 'iPhone',
      memory: '',
      price: '',
      image: 'https://picsum.photos/seed/new/400/400',
      description: '',
      specs: ''
    })
    alert('✅ Товар успешно добавлен!')
  }

  // Редактирование товара
  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      category: product.category,
      memory: product.memory,
      price: product.price.toString(),
      image: product.images[0] || '',
      description: product.description,
      specs: Object.entries(product.specifications)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n')
    })
    setShowForm(true)
  }

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!editingProduct) return

    const specs: Record<string, string> = {}
    if (formData.specs) {
      formData.specs.split('\n').forEach(line => {
        const [key, value] = line.split(':').map(s => s.trim())
        if (key && value) {
          specs[key] = value
        }
      })
    }

    const updatedProduct: Product = {
      ...editingProduct,
      name: formData.name,
      category: formData.category,
      memory: formData.memory || 'N/A',
      price: Number(formData.price),
      images: [formData.image || 'https://picsum.photos/seed/new/400/400'],
      description: formData.description || 'Описание товара',
      specifications: Object.keys(specs).length > 0 ? specs : { 'Характеристика': 'Стандартная' }
    }

    const updated = products.map(p => 
      p.id === editingProduct.id ? updatedProduct : p
    )
    saveProducts(updated)
    setShowForm(false)
    setEditingProduct(null)
    setFormData({
      name: '',
      category: 'iPhone',
      memory: '',
      price: '',
      image: 'https://picsum.photos/seed/new/400/400',
      description: '',
      specs: ''
    })
    alert('✅ Товар обновлен!')
  }

  // Удаление товара
  const handleDelete = (id: string) => {
    if (confirm('🗑️ Вы уверены, что хотите удалить этот товар?')) {
      const updated = products.filter(p => p.id !== id)
      saveProducts(updated)
      alert('✅ Товар удален')
    }
  }

  // Фильтрация товаров
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Если не админ - показываем форму входа
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="glass p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🔐</div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Админ панель
            </h1>
            <p className="text-sm text-gray-400 mt-1">Введите пароль для доступа</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-background border border-white/10 text-white placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              autoFocus
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl btn-primary font-semibold text-lg"
            >
              Войти
            </button>
          </form>
          <p className="text-xs text-gray-500 text-center mt-4">
            🔑 Пароль по умолчанию: <span className="text-primary">admin123</span>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Верхняя панель */}
      <div className="glass sticky top-0 z-10 px-4 py-3 mx-2 mt-2">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <button 
            onClick={() => router.back()} 
            className="text-xl hover:scale-110 transition-transform"
          >
            ←
          </button>
          <h1 className="text-xl font-bold">⚙️ Админ панель</h1>
          <button 
            onClick={() => {
              if (confirm('Выйти из админ-панели?')) {
                setIsAdmin(false)
              }
            }}
            className="text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            Выйти
          </button>
        </div>
      </div>

      <div className="px-4 max-w-6xl mx-auto mt-4">
        {/* Статистика */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="glass p-3 text-center">
            <p className="text-2xl font-bold text-primary">{products.length}</p>
            <p className="text-xs text-gray-400">Всего товаров</p>
          </div>
          <div className="glass p-3 text-center">
            <p className="text-2xl font-bold text-green-400">
              {products.filter(p => p.inStock).length}
            </p>
            <p className="text-xs text-gray-400">В наличии</p>
          </div>
          <div className="glass p-3 text-center">
            <p className="text-2xl font-bold text-yellow-400">
              {new Set(products.map(p => p.category)).size}
            </p>
            <p className="text-xs text-gray-400">Категорий</p>
          </div>
        </div>

        {/* Поиск и кнопка добавления */}
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="🔍 Поиск товаров..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl bg-background border border-white/10 text-white placeholder-gray-400 focus:border-primary focus:outline-none"
          />
          <button
            onClick={() => {
              setShowForm(!showForm)
              if (showForm) {
                setEditingProduct(null)
                setFormData({
                  name: '',
                  category: 'iPhone',
                  memory: '',
                  price: '',
                  image: 'https://picsum.photos/seed/new/400/400',
                  description: '',
                  specs: ''
                })
              }
            }}
            className={`px-4 py-2 rounded-xl font-semibold transition-colors whitespace-nowrap
              ${showForm ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/80'} text-white`}
          >
            {showForm ? '✕ Закрыть' : '➕ Добавить'}
          </button>
        </div>

        {/* Форма добавления/редактирования */}
        {showForm && (
          <div className="glass p-4 mb-4">
            <h2 className="font-semibold text-lg mb-3">
              {editingProduct ? '✏️ Редактировать товар' : '➕ Добавить товар'}
            </h2>
            <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-400 block mb-1">Название *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl bg-background border border-white/10 text-white focus:border-primary focus:outline-none"
                    required
                    placeholder="iPhone 15 Pro Max"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 block mb-1">Категория</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl bg-background border border-white/10 text-white focus:border-primary focus:outline-none"
                  >
                    <option>iPhone</option>
                    <option>Samsung</option>
                    <option>MacBook</option>
                    <option>iPad</option>
                    <option>Аксессуары</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-400 block mb-1">Память</label>
                  <input
                    type="text"
                    value={formData.memory}
                    onChange={(e) => setFormData({...formData, memory: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl bg-background border border-white/10 text-white focus:border-primary focus:outline-none"
                    placeholder="256GB"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 block mb-1">Цена ($) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl bg-background border border-white/10 text-white focus:border-primary focus:outline-none"
                    required
                    placeholder="1299"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-1">URL фото</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl bg-background border border-white/10 text-white focus:border-primary focus:outline-none"
                  placeholder="https://picsum.photos/seed/.../400/400"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-1">Описание</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl bg-background border border-white/10 text-white focus:border-primary focus:outline-none"
                  rows={2}
                  placeholder="Краткое описание товара"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-1">
                  Характеристики (каждая с новой строки в формате: Ключ: Значение)
                </label>
                <textarea
                  value={formData.specs}
                  onChange={(e) => setFormData({...formData, specs: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl bg-background border border-white/10 text-white focus:border-primary focus:outline-none"
                  rows={3}
                  placeholder="Экран: 6.7&quot;&#10;Процессор: A17 Pro&#10;Камера: 48MP"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl btn-primary font-semibold"
              >
                {editingProduct ? '💾 Сохранить изменения' : '✅ Добавить товар'}
              </button>
            </form>
          </div>
        )}

        {/* Список товаров */}
        <div className="space-y-2">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-lg">📦 Все товары</h2>
            <span className="text-sm text-gray-400">{filteredProducts.length} шт.</span>
          </div>

          {filteredProducts.length === 0 && (
            <div className="glass p-8 text-center">
              <p className="text-gray-400">Товары не найдены</p>
            </div>
          )}

          {filteredProducts.map((product) => (
            <div key={product.id} className="glass p-3 flex items-center gap-3 hover:bg-white/5 transition-colors">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-background">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{product.name}</p>
                <p className="text-xs text-gray-400">
                  {product.category} • {product.memory} • ${product.price}
                </p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${product.inStock ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                  {product.inStock ? 'В наличии' : 'Нет в наличии'}
                </span>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => {
                    const updated = products.map(p =>
                      p.id === product.id ? { ...p, inStock: !p.inStock } : p
                    )
                    saveProducts(updated)
                  }}
                  className={`px-2 py-1 rounded-lg text-xs transition-colors
                    ${product.inStock ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'}`}
                >
                  {product.inStock ? '📦' : '📦'}
                </button>
                <button
                  onClick={() => handleEdit(product)}
                  className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400 text-xs hover:bg-blue-500/30 transition-colors"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 text-xs hover:bg-red-500/30 transition-colors"
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
