import { ArrowRight, Minus, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import { useBag } from '../context/BagContext'
import { getWhatsAppLink } from '../utils/whatsapp'

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clearBag } = useBag()

  if (!items.length) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-12 md:px-8">
        <EmptyState title="Your bag is empty" message="Add your favorite pieces and build your edit for the next order." />
      </div>
    )
  }

  const orderLink = getWhatsAppLink(items, subtotal)

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.42em] text-stone-400">Shopping bag</p>
          <h1 className="mt-3 text-4xl tracking-[-0.06em] text-white md:text-6xl">Your edit</h1>
        </div>
        <button type="button" onClick={clearBag} className="text-xs uppercase tracking-[0.24em] text-stone-300 hover:text-white">
          Clear bag
        </button>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col gap-5 rounded-[2rem] border border-stone-800 bg-stone-950/60 p-4 md:flex-row md:items-center">
              <img src={item.product.images[0]} alt={item.product.name} className="h-36 w-full rounded-[1.4rem] object-cover md:w-32" />

              <div className="flex-1">
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xl font-medium text-white">{item.product.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.24em] text-stone-400">{item.color} / {item.size}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex items-center overflow-hidden rounded-full border border-stone-700">
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex h-10 w-10 items-center justify-center text-stone-200 hover:bg-stone-900">
                      <Minus size={14} />
                    </button>
                    <span className="flex h-10 w-10 items-center justify-center text-sm text-white">{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex h-10 w-10 items-center justify-center text-stone-200 hover:bg-stone-900">
                      <Plus size={14} />
                    </button>
                  </div>

                  <button type="button" onClick={() => removeItem(item.id)} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-300 hover:text-white">
                    <Trash2 size={14} />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="rounded-[2rem] border border-stone-800 bg-stone-950/60 p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-stone-400">Summary</p>
          <div className="mt-6 space-y-4 border-b border-stone-800 pb-6 text-sm text-stone-300">
            <div className="flex items-center justify-between"><span>Items</span><span>{items.length}</span></div>
            <div className="flex items-center justify-between"><span>Shipping</span><span>Calculated later</span></div>
          </div>

          <div className="mt-8 space-y-3">
            <Link to="/shop" className="inline-flex w-full items-center justify-center gap-2 border border-stone-100 bg-stone-100 px-5 py-3 text-xs uppercase tracking-[0.24em] text-stone-900 transition hover:bg-white">
              Continue Shopping
              <ArrowRight size={15} />
            </Link>

            {orderLink ? (
              <a href={orderLink} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 border border-[#2b6d4f] bg-[#2b6d4f] px-5 py-3 text-xs uppercase tracking-[0.24em] text-white transition hover:bg-[#2a845c]">
                Order via WhatsApp
              </a>
            ) : (
              <div className="rounded-2xl border border-stone-700 bg-stone-900/50 p-4 text-sm text-stone-300">
                WhatsApp ordering is currently unavailable. Add a valid phone number in src/data/siteConfig.js to enable it.
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
