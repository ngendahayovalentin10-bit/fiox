import { Filter, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FilterSidebar from '../components/FilterSidebar'
import MobileFilterDrawer from '../components/MobileFilterDrawer'
import ProductGrid from '../components/ProductGrid'
import EmptyState from '../components/EmptyState'
import { categories } from '../data/categories'
import { products } from '../data/products'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'low', label: 'Price Low to High' },
  { value: 'high', label: 'Price High to Low' },
]

export default function ShopPage() {
  const [searchParams] = useSearchParams()
  const requestedCategory = searchParams.get('category')
  const initialCategory = categories.some((category) => category.id === requestedCategory)
    ? requestedCategory
    : 'all'
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [priceRange, setPriceRange] = useState(70000)
  const [sortValue, setSortValue] = useState('featured')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const colorOptions = useMemo(
    () => [...new Set(products.flatMap((product) => product.colors))],
    [],
  )

  const filteredProducts = useMemo(() => {
    const matches = products.filter((product) => {
      const categoryMatch = selectedCategory === 'all' || product.categoryKey === selectedCategory
      const sizeMatch =
        selectedSizes.length === 0 ||
        selectedSizes.some((size) => product.sizes.includes(size))
      const colorMatch =
        selectedColors.length === 0 || selectedColors.some((color) => product.colors.includes(color))
      const priceMatch = product.price <= priceRange

      return categoryMatch && sizeMatch && colorMatch && priceMatch
    })

    const sorted = [...matches]
    if (sortValue === 'newest') {
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else if (sortValue === 'low') {
      sorted.sort((a, b) => a.price - b.price)
    } else if (sortValue === 'high') {
      sorted.sort((a, b) => b.price - a.price)
    } else {
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured))
    }

    return sorted
  }, [selectedCategory, selectedColors, selectedSizes, priceRange, sortValue])

  const clearFilters = () => {
    setSelectedCategory('all')
    setSelectedSizes([])
    setSelectedColors([])
    setPriceRange(70000)
    setSortValue('featured')
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
      <div className="mb-10 space-y-3">
        <p className="text-xs uppercase tracking-[0.42em] text-stone-400">Shop</p>
        <h1 className="text-4xl tracking-[-0.06em] text-white md:text-6xl">FIND YOUR FIT.</h1>
        <p className="max-w-2xl text-base text-stone-300 md:text-lg">
          Discover everyday essentials and statement pieces designed for confidence, comfort, and individuality.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setShowMobileFilters(true)} className="inline-flex items-center gap-2 border border-stone-700 px-3 py-2 text-xs uppercase tracking-[0.2em] text-stone-200 lg:hidden">
            <SlidersHorizontal size={15} />
            Filters
          </button>
          <p className="text-sm text-stone-300">{filteredProducts.length} items</p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <label className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-stone-400">
            <Filter size={14} />
            Sort
          </label>
          <select
            value={sortValue}
            onChange={(event) => setSortValue(event.target.value)}
            className="rounded-full border border-stone-700 bg-stone-950 px-4 py-2 text-sm text-stone-100 outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        <FilterSidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSizes={selectedSizes}
          setSelectedSizes={setSelectedSizes}
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          colorOptions={colorOptions}
          clearFilters={clearFilters}
          productCount={filteredProducts.length}
        />

        <div className="flex-1">
          {filteredProducts.length ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <EmptyState title="No results found" message="Try widening your filters or refreshing your selections to explore more pieces." actionLabel="Clear filters" />
          )}
        </div>
      </div>

      <MobileFilterDrawer
        open={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSizes={selectedSizes}
        setSelectedSizes={setSelectedSizes}
        selectedColors={selectedColors}
        setSelectedColors={setSelectedColors}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        colorOptions={colorOptions}
        clearFilters={clearFilters}
        productCount={filteredProducts.length}
      />
    </div>
  )
}
