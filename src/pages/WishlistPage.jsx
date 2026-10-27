import { HeartOff } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { products } from '../data/products'
import ProductGrid from '../components/ProductGrid'
import EmptyState from '../components/EmptyState'

export default function WishlistPage() {
  const { items, toggleItem } = useWishlist()
  const savedProducts = products.filter((product) => items.includes(product.id))

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.42em] text-stone-400">Wishlist</p>
          <h1 className="mt-3 text-4xl tracking-[-0.06em] text-white md:text-6xl">Saved pieces</h1>
        </div>
        {savedProducts.length > 0 && (
          <span className="rounded-full border border-stone-700 px-3 py-2 text-xs uppercase tracking-[0.22em] text-stone-300">
            {savedProducts.length} items
          </span>
        )}
      </div>

      {savedProducts.length ? (
        <ProductGrid products={savedProducts} />
      ) : (
        <EmptyState
          title="Your wishlist is empty"
          message="Save your favorite fits and keep them close for your next drop."
          actionLabel="Browse the latest"
          actionHref="/shop"
        />
      )}
    </div>
  )
}
