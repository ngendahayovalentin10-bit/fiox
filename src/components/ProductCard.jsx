import { Heart, ShoppingBag, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'

function isSoldOut(product) {
  return Object.values(product.stock || {}).every((sizes) =>
    Object.values(sizes).every((stock) => stock === 0),
  )
}

export default function ProductCard({ product }) {
  const { isSaved, toggleItem } = useWishlist()
  const isFavorite = isSaved(product.id)
  const soldOut = isSoldOut(product)

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-stone-800/80 bg-stone-950/60 shadow-[0_18px_60px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-stone-600">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-[400px] w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </Link>

        <button
          type="button"
          aria-label={isFavorite ? 'Remove from wishlist' : 'Save to wishlist'}
          onClick={() => toggleItem(product.id)}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-stone-700 bg-black/35 text-white backdrop-blur-sm transition hover:bg-white hover:text-stone-900"
        >
          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>

        {(product.featured || product.newArrival) && (
          <div className="absolute left-4 top-4 flex gap-2">
            {product.newArrival && (
              <span className="rounded-full border border-stone-300/40 bg-stone-100 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-stone-900">
                New
              </span>
            )}
            {product.featured && (
              <span className="rounded-full border border-stone-300/40 bg-transparent px-2 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-stone-100">
                Featured
              </span>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4 p-5">
        <div>
          <Link to={`/product/${product.slug}`} className="block text-lg font-medium text-white hover:text-stone-200">
            {product.name}
          </Link>
          <p className="mt-1 text-xs uppercase tracking-[0.24em] text-stone-400">{product.category}</p>
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-400">
            {soldOut ? <Sparkles size={14} /> : <ShoppingBag size={14} />}
            {soldOut ? 'Sold out' : 'Ready to ship'}
          </div>

          <Link
            to={`/product/${product.slug}`}
            className="inline-flex items-center border border-stone-700 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-stone-100 transition hover:border-stone-500 hover:bg-stone-100 hover:text-stone-900"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  )
}
