import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const WishlistContext = createContext(null)
const STORAGE_KEY = 'fiox-wishlist'

export function WishlistProvider({ children }) {
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

  const toggleItem = (productId) => {
    setItems((current) => {
      if (current.includes(productId)) {
        return current.filter((item) => item !== productId)
      }

      return [...current, productId]
    })
  }

  const isSaved = (productId) => items.includes(productId)

  const clearWishlist = () => setItems([])

  const value = useMemo(
    () => ({
      items,
      toggleItem,
      isSaved,
      clearWishlist,
      count: items.length,
    }),
    [items],
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  return useContext(WishlistContext)
}
