import { Heart, Minus, Plus, ShieldCheck, ShoppingBag, Sparkles, Truck, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import SizeGuideModal from '../components/SizeGuideModal'
import { useBag } from '../context/BagContext'
import { useWishlist } from '../context/WishlistContext'
import { products, productsBySlug } from '../data/products'
import { getWhatsAppLink } from '../utils/whatsapp'

const accordionItems = [
  { title: 'Description', content: 'A premium piece made to feel effortless, elevated, and wearable across everyday moments.' },
  { title: 'Materials & Care', content: 'Crafted with premium cotton, brushed fleece, and carefully selected finishes. Machine wash cold and air dry for best results.' },
  { title: 'Size & Fit', content: 'Our silhouettes are intentionally relaxed for a modern, confident fit. Refer to the size guide for precise measurements.' },
  { title: 'Shipping', content: 'Sample placeholder policy: shipping timing and service details will be updated once logistics are confirmed.' },
  { title: 'Returns', content: 'Sample placeholder policy: return instructions will be confirmed once the final policy is set by the brand.' },
]

export default function ProductDetailPage() {
  const { slug } = useParams()
  const product = productsBySlug[slug]
  const { addItem } = useBag()
  const { isSaved, toggleItem } = useWishlist()
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '')
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '')
  const [quantity, setQuantity] = useState(1)
  const [showSizeGuide, setShowSizeGuide] = useState(false)

  const availableStock = useMemo(() => {
    if (!product) return 0
    return product.stock?.[selectedColor]?.[selectedSize] ?? 0
  }, [product, selectedColor, selectedSize])

  const relatedProducts = useMemo(
    () => products.filter((item) => item.id !== product?.id && item.category === product?.category).slice(0, 4),
    [product],
  )

  if (!product) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-20 text-center md:px-8">
        <p className="text-xs uppercase tracking-[0.42em] text-stone-400">Product not found</p>
        <h1 className="mt-4 text-4xl tracking-[-0.06em] text-white md:text-6xl">This item is not available.</h1>
        <Link to="/shop" className="mt-8 inline-flex items-center border border-stone-100 bg-stone-100 px-5 py-3 text-xs uppercase tracking-[0.24em] text-stone-900">
          Back to shop
        </Link>
      </div>
    )
  }

  const handleAddToBag = () => {
    if (!selectedColor || !selectedSize) return
    addItem(product, selectedColor, selectedSize, quantity)
  }

  const handleQuantityChange = (nextQty) => {
    const safeQty = Math.max(1, Math.min(nextQty, availableStock || 1))
    setQuantity(safeQty)
  }

  const total = product.price * quantity
  const whatsAppLink = getWhatsAppLink([{ product, color: selectedColor, size: selectedSize, quantity }], total)
  const isFavorite = isSaved(product.id)

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
      <div className="mb-8">
        <Link to="/shop" className="text-xs uppercase tracking-[0.28em] text-stone-300 hover:text-white">
          Back to shop
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-[2rem] border border-stone-800 bg-stone-950/60">
            <img src={product.images[0]} alt={product.name} className="h-[620px] w-full object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.images.map((image, index) => (
              <button key={image} type="button" className={`overflow-hidden rounded-[1.2rem] border ${index === 0 ? 'border-stone-100' : 'border-stone-800'}`}>
                <img src={image} alt={`${product.name} view ${index + 1}`} className="h-28 w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-7">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.34em] text-stone-400">{product.category}</p>
            <h1 className="text-4xl tracking-[-0.06em] text-white md:text-5xl">{product.name}</h1>
            <div className="flex items-center gap-3 text-sm text-stone-300">
              <span>{product.material}</span>
            </div>
          </div>

          <p className="text-base text-stone-300">{product.description}</p>

          <div className="space-y-5">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.22em] text-stone-400">Color</p>
                <span className="text-xs uppercase tracking-[0.18em] text-stone-500">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${
                      selectedColor === color ? 'border-stone-200 bg-stone-100 text-stone-900' : 'border-stone-700 bg-transparent text-stone-200'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.22em] text-stone-400">Size</p>
                <button type="button" onClick={() => setShowSizeGuide(true)} className="text-xs uppercase tracking-[0.18em] text-stone-300 hover:text-white">
                  Size guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`flex h-11 w-11 items-center justify-center rounded-full border text-xs uppercase tracking-[0.18em] transition ${
                      selectedSize === size ? 'border-stone-200 bg-stone-100 text-stone-900' : 'border-stone-700 bg-transparent text-stone-200'
                    } ${
                      (product.stock?.[selectedColor]?.[size] ?? 0) === 0 ? 'cursor-not-allowed opacity-40' : ''
                    }`}
                    disabled={(product.stock?.[selectedColor]?.[size] ?? 0) === 0}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center overflow-hidden rounded-full border border-stone-700">
                <button type="button" onClick={() => handleQuantityChange(quantity - 1)} className="flex h-12 w-12 items-center justify-center text-stone-200 hover:bg-stone-900">
                  <Minus size={16} />
                </button>
                <span className="flex h-12 w-14 items-center justify-center text-sm text-white">{quantity}</span>
                <button type="button" onClick={() => handleQuantityChange(quantity + 1)} className="flex h-12 w-12 items-center justify-center text-stone-200 hover:bg-stone-900">
                  <Plus size={16} />
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-400">
                {availableStock > 0 ? (
                  <>
                    <Sparkles size={14} />
                    {availableStock} left
                  </>
                ) : (
                  <>
                    <X size={14} />
                    sold out
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={handleAddToBag} className="inline-flex flex-1 items-center justify-center gap-2 border border-stone-100 bg-stone-100 px-5 py-3 text-xs uppercase tracking-[0.24em] text-stone-900 transition hover:bg-white">
                <ShoppingBag size={15} />
                Add to Bag
              </button>
              <button type="button" onClick={() => toggleItem(product.id)} className="inline-flex items-center justify-center border border-stone-700 bg-transparent px-4 py-3 text-stone-100 transition hover:bg-stone-900">
                <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
            </div>

            {whatsAppLink ? (
              <a href={whatsAppLink} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 border border-[#2b6d4f] bg-[#2b6d4f] px-5 py-3 text-xs uppercase tracking-[0.24em] text-white transition hover:bg-[#2a845c]">
                <Truck size={15} />
                Order via WhatsApp
              </a>
            ) : (
              <div className="rounded-2xl border border-stone-700 bg-stone-900/50 p-4 text-sm text-stone-300">
                WhatsApp ordering is not available yet. Add a valid business number in src/data/siteConfig.js to enable it.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-16 space-y-4">
        {accordionItems.map((item) => (
          <details key={item.title} className="group rounded-[1.4rem] border border-stone-800 bg-stone-950/60 p-5">
            <summary className="cursor-pointer list-none text-left text-base font-medium text-white">
              <div className="flex items-center justify-between">
                <span>{item.title}</span>
                <span className="text-stone-400 transition group-open:rotate-45">+</span>
              </div>
            </summary>
            <p className="mt-4 max-w-3xl text-sm text-stone-300">{item.content}</p>
          </details>
        ))}
      </div>

      <div className="mt-16">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.38em] text-stone-400">Related products</p>
          <ShieldCheck size={16} className="text-stone-400" />
        </div>
        <ProductGrid products={relatedProducts} />
      </div>

      <SizeGuideModal open={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
    </div>
  )
}
