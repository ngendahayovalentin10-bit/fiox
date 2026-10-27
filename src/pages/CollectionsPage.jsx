import CollectionCard from '../components/CollectionCard'
import ScrollReveal from '../components/ScrollReveal'
import { collections } from '../data/collections'
import { products } from '../data/products'

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
      <div className="mb-12 max-w-3xl space-y-4">
        <p className="text-xs uppercase tracking-[0.42em] text-stone-400">Collections</p>
        <h1 className="text-4xl tracking-[-0.06em] text-white md:text-6xl">DESIGNED TO STAND APART.</h1>
        <p className="text-base text-stone-300 md:text-lg">
          Explore the world of FIOX. Distinctive pieces, considered details, and collections made to define your own style.
        </p>
      </div>

      <div className="space-y-10">
        {collections.map((collection, index) => (
          <ScrollReveal key={collection.id} delay={index * 0.08}>
            <CollectionCard
              collection={collection}
              index={index}
              productCount={products.filter((product) =>
                product.collectionIds.includes(collection.id),
              ).length}
            />
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
