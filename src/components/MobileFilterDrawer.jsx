import { X } from 'lucide-react'
import { categories } from '../data/categories'

const allSizes = ['XS', 'S', 'M', 'L', 'XL']

export default function MobileFilterDrawer({
  open,
  onClose,
  selectedCategory,
  setSelectedCategory,
  selectedSizes,
  setSelectedSizes,
  selectedColors,
  setSelectedColors,
  priceRange,
  setPriceRange,
  colorOptions,
  clearFilters,
  productCount,
}) {
  if (!open) return null

  const toggleSize = (size) => {
    setSelectedSizes((current) =>
      current.includes(size) ? current.filter((item) => item !== size) : [...current, size],
    )
  }

  const toggleColor = (color) => {
    setSelectedColors((current) =>
      current.includes(color) ? current.filter((item) => item !== color) : [...current, color],
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm lg:hidden">
      <div className="ml-auto flex h-full w-full max-w-sm flex-col bg-[#0d0d0d] p-5 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.35em] text-stone-400">Filters</p>
          <button type="button" onClick={onClose} className="rounded-full border border-stone-700 p-2 text-stone-200">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-6 overflow-y-auto pb-6">
          <div>
            <h3 className="mb-3 text-sm uppercase tracking-[0.24em] text-stone-400">Category</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category.id)
                    onClose()
                  }}
                  className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition ${
                    selectedCategory === category.id ? 'border-stone-200 bg-stone-100 text-stone-900' : 'border-stone-800 bg-transparent text-stone-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm uppercase tracking-[0.24em] text-stone-400">Size</h3>
            <div className="flex flex-wrap gap-2">
              {allSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border text-xs uppercase tracking-[0.18em] transition ${
                    selectedSizes.includes(size) ? 'border-stone-200 bg-stone-100 text-stone-900' : 'border-stone-700 bg-transparent text-stone-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm uppercase tracking-[0.24em] text-stone-400">Color</h3>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => toggleColor(color)}
                  className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.18em] transition ${
                    selectedColors.includes(color) ? 'border-stone-200 bg-stone-100 text-stone-900' : 'border-stone-700 bg-transparent text-stone-200'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm uppercase tracking-[0.24em] text-stone-400">Budget</h3>
            </div>
            <input
              type="range"
              min="5000"
              max="70000"
              step="1000"
              value={priceRange}
              onChange={(event) => setPriceRange(Number(event.target.value))}
              className="w-full accent-stone-200"
            />
          </div>

          <div className="flex items-center justify-between pt-3">
            <span className="text-xs uppercase tracking-[0.2em] text-stone-400">{productCount} results</span>
            <button type="button" onClick={clearFilters} className="text-xs uppercase tracking-[0.2em] text-stone-200">
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
