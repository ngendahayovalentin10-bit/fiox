import { ArrowRight, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import ScrollReveal from '../components/ScrollReveal'
import LuxuryHero from '../components/LuxuryHero'
import ParticleScroll from '../components/ParticleScroll'
import {
  GiantFooter,
  GrainOverlay,
  MarqueeStrip,
  PiecesRail,
  WordStatement,
} from '../components/FioxExtras'
import { categories } from '../data/categories'
import { collections } from '../data/collections'
import { products } from '../data/products'

export default function HomePage() {
  const featuredProducts = products.filter((product) => product.featured).slice(0, 3)
  const latestCollection = collections[0]

  return (
    <div className="pb-16">
      <GrainOverlay />

      <LuxuryHero />

      <MarqueeStrip />

      <ParticleScroll />

      <PiecesRail />

      <WordStatement />

      <ScrollReveal className="mx-auto max-w-7xl px-6 py-20 md:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.38em] text-stone-400">Featured</p>
            <h2 className="mt-3 text-3xl tracking-[-0.06em] text-white md:text-5xl">Featured Products</h2>
          </div>
          <Link to="/shop" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.26em] text-stone-300 hover:text-white">
            View all
            <ChevronRight size={14} />
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-7xl px-6 py-10 md:px-8">
        <div className="grid gap-6 rounded-[2.25rem] border border-stone-800 bg-stone-950/60 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8">
          <div className="overflow-hidden rounded-[1.5rem]">
            <img src={latestCollection.coverImage} alt={latestCollection.name} className="h-full min-h-[330px] w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.42em] text-stone-400">Latest Collection</p>
            <h3 className="mt-4 text-3xl tracking-[-0.06em] text-white md:text-5xl">{latestCollection.name}</h3>
            <p className="mt-5 max-w-md text-base text-stone-300">{latestCollection.description}</p>
            <Link to={`/collections/${latestCollection.slug}`} className="mt-8 inline-flex w-fit items-center gap-2 border border-stone-100 bg-stone-100 px-5 py-3 text-xs uppercase tracking-[0.24em] text-stone-900 transition hover:bg-white">
              Explore drop
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-7xl px-6 py-20 md:px-8">
        <div className="rounded-[2.5rem] border border-stone-800 bg-[#111111] px-6 py-10 md:px-10 md:py-14">
          <p className="text-xs uppercase tracking-[0.4em] text-stone-400">Brand Statement</p>
          <h2 className="mt-4 max-w-4xl text-3xl tracking-[-0.06em] text-white md:text-5xl">
            Clothing that speaks without saying a word.
          </h2>
          <p className="mt-6 max-w-3xl text-base text-stone-300 md:text-lg">
            FIOX is built around individuality, confidence, and self-expression. We design clothes that feel deliberate, comfortable, and unmistakably yours.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-7xl px-6 py-10 md:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.38em] text-stone-400">Shop by category</p>
            <h2 className="mt-3 text-3xl tracking-[-0.06em] text-white md:text-5xl">Built for every angle</h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {categories
            .filter((category) => category.id !== 'all')
            .map((category) => {
              const productImage = products.find(
                (product) => product.categoryKey === category.id,
              )?.images[0]

              return (
                <Link
                  to={`/shop?category=${category.id}`}
                  key={category.id}
                  className="group relative isolate flex min-h-72 items-end overflow-hidden rounded-[2rem] border border-stone-800 bg-stone-950 transition hover:border-stone-500"
                >
                  {productImage && (
                    <img
                      src={productImage}
                      alt={category.label}
                      loading="lazy"
                      className="absolute inset-0 -z-20 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/45 to-black/5 transition duration-300 group-hover:from-black/90" />
                  <div className="w-full p-6 md:p-7">
                    <p className="text-xs uppercase tracking-[0.36em] text-stone-300">
                      {category.label}
                    </p>
                    <p className="mt-3 max-w-sm text-2xl font-medium tracking-[-0.06em] text-white">
                      {category.description}
                    </p>
                    <span className="mt-5 inline-flex border-b border-white/60 pb-1 text-[10px] uppercase tracking-[0.28em] text-white">
                      Explore {category.label}
                    </span>
                  </div>
                </Link>
              )
            })}
        </div>
      </ScrollReveal>

      <GiantFooter />
    </div>
  )
}
