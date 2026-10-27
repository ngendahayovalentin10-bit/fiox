import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CollectionCard({ collection, index, productCount }) {
  const isReversed = index % 2 === 1

  return (
    <article className={`grid items-center gap-6 md:grid-cols-2 ${isReversed ? 'md:[&>*:first-child]:order-2' : ''}`}>
      <div className="overflow-hidden rounded-[2rem] border border-stone-800/80 bg-stone-900">
        <img src={collection.coverImage} alt={collection.name} className="h-[430px] w-full object-cover transition duration-700 hover:scale-105" />
      </div>

      <div className="space-y-6 px-2 py-4 md:px-8">
        <p className="text-xs uppercase tracking-[0.42em] text-stone-400">{collection.season}</p>
        <h3 className="text-3xl font-medium tracking-[-0.06em] text-white md:text-5xl">{collection.name}</h3>
        <p className="max-w-lg text-base text-stone-300">{collection.description}</p>
        <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
          {productCount} {productCount === 1 ? 'piece' : 'pieces'}
        </p>

        <div className="flex items-center gap-4">
          <Link
            to={`/collections/${collection.slug}`}
            className="inline-flex items-center gap-2 border border-stone-700 bg-stone-100 px-5 py-3 text-xs uppercase tracking-[0.24em] text-stone-900 transition hover:bg-white"
          >
            View Collection
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  )
}
