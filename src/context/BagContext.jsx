import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { formatRwf } from '../utils/whatsapp'

const BagContext = createContext(null)
const STORAGE_KEY = 'fiox-bag'

function getStockForVariant(product, color, size) {
  return product?.stock?.[color]?.[size] ?? 0
}

export function BagProvider({ children }) {
  const [items, setItems] = useState(() => {
    if (typeof window === 'undefined') {
      return []
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }
  }, [items])

  const addItem = (product, color, size, quantity = 1) => {
    setItems((current) => {
      const key = `${product.id}-${color}-${size}`
      const existing = current.find((item) => item.id === key)
      const stock = getStockForVariant(product, color, size)
      const safeQuantity = Math.min(Math.max(quantity, 1), stock || 1)

      if (existing) {
        const nextQuantity = Math.min(existing.quantity + safeQuantity, stock || existing.quantity)
        return current.map((item) =>
          item.id === key ? { ...item, quantity: nextQuantity } : item,
        )
      }

      return [...current, { id: key, productId: product.id, product, color, size, quantity: safeQuantity }]
    })
  }

  const updateQuantity = (id, quantity) => {
    setItems((current) =>
      current
        .map((item) => {
          if (item.id !== id) return item

          const maxStock = getStockForVariant(item.product, item.color, item.size)
          const next = Math.max(1, Math.min(quantity, maxStock || 1))
          return { ...item, quantity: next }
        })
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (id) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  const clearBag = () => setItems([])

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items],
  )

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      subtotal,
      itemCount,
      addItem,
      updateQuantity,
      removeItem,
      clearBag,
      formattedSubtotal: formatRwf(subtotal),
    }),
    [items, subtotal, itemCount],
  )

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>
}

export function useBag() {
  return useContext(BagContext)
}
