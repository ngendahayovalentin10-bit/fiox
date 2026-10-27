import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import { collectionLookup } from '../data/collections'
import { products } from '../data/products'

export default function CollectionDetailPage() {
  const { slug } = useParams()
  const collection = collectionLookup[slug]

  if (!collection) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center md:px-8">
        <p className="text-xs uppercase tracking-[0.42em] text-stone-400">Collection not found</p>
        <h1 className="mt-4 text-4xl tracking-[-0.06em] text-white md:text-6xl">This edit has moved.</h1>
        <Link to="/collections" className="mt-8 inline-flex items-center gap-2 border border-stone-100 bg-stone-100 px-5 py-3 text-xs uppercase tracking-[0.22em] text-stone-900">
          <ArrowLeft size={15} />
          Back to collections
        </Link>
      </div>
    )
  }

  const relatedProducts = products.filter((product) => product.collectionIds.includes(collection.id))

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
      <div className="mb-8">
        <Link to="/collections" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-stone-300 hover:text-white">
          <ArrowLeft size={15} />
          All collections
        </Link>
      </div>

      <div className="overflow-hidden rounded-[2.25rem] border border-stone-800 bg-stone-950/60">
        <img src={collection.coverImage} alt={collection.name} className="h-[420px] w-full object-cover md:h-[560px]" />
      </div>

      <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.42em] text-stone-400">{collection.season}</p>
          <h1 className="mt-3 text-4xl tracking-[-0.06em] text-white md:text-6xl">{collection.name}</h1>
        </div>
        <p className="max-w-2xl text-base text-stone-300">{collection.description}</p>
      </div>

      <div className="mt-12">
        <p className="mb-6 text-xs uppercase tracking-[0.36em] text-stone-400">Selected pieces</p>
        {relatedProducts.length ? (
          <ProductGrid products={relatedProducts} />
        ) : (
          <div className="rounded-[2rem] border border-stone-800 bg-stone-950/60 p-8 text-center text-stone-300">
            This collection does not have any products yet.
          </div>
        )}
      </div>
    </div>
  )
}
