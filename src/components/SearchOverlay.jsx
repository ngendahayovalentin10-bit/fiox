import { Search, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!open) {
      setQuery('')
    }
  }, [open])

  const results = useMemo(() => {
    if (!query.trim()) {
      return products.slice(0, 6)
    }

    const lower = query.toLowerCase()
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lower) ||
        product.category.toLowerCase().includes(lower),
    )
  }, [query])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-10 md:px-0">
        <div className="flex items-center gap-3 rounded-full border border-stone-700 bg-stone-950/90 px-4 py-3 text-white">
          <Search size={18} className="text-stone-300" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search FIOX essentials"
            className="w-full bg-transparent text-base text-white outline-none placeholder:text-stone-500"
          />
          <button type="button" onClick={onClose} className="rounded-full border border-stone-700 p-2 hover:bg-stone-800">
            <X size={16} />
          </button>
        </div>

        <div className="mt-6 space-y-3 overflow-hidden rounded-[2rem] border border-stone-800 bg-stone-950/90 p-4">
          {results.length ? (
            results.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.slug}`}
                onClick={onClose}
                className="flex items-center gap-4 rounded-2xl border border-stone-800 px-3 py-3 transition hover:border-stone-600 hover:bg-stone-900"
              >
                <img src={product.images[0]} alt={product.name} className="h-16 w-16 rounded-xl object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{product.name}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-400">{product.category}</p>
                </div>
                <span className="text-[10px] uppercase tracking-[0.24em] text-stone-400">Open</span>
              </Link>
            ))
          ) : (
            <div className="py-10 text-center text-sm text-stone-300">No products match your search.</div>
          )}
        </div>
      </div>
    </div>
  )
}
