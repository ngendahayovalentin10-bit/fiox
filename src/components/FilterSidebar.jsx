import { categories } from '../data/categories'

const allSizes = ['XS', 'S', 'M', 'L', 'XL']

export default function FilterSidebar({
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
    <aside className="hidden w-full max-w-[300px] shrink-0 space-y-8 rounded-[2rem] border border-stone-800 bg-stone-950/60 p-6 lg:block">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.35em] text-stone-500">Filters</p>
        <button type="button" onClick={clearFilters} className="text-xs uppercase tracking-[0.2em] text-stone-300 hover:text-white">
          Clear
        </button>
      </div>

      <div>
        <h3 className="mb-4 text-sm uppercase tracking-[0.24em] text-stone-400">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
              className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition ${
                selectedCategory === category.id
                  ? 'border-stone-200 bg-stone-100 text-stone-900'
                  : 'border-stone-800 bg-transparent text-stone-200 hover:border-stone-600'
              }`}
            >
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-sm uppercase tracking-[0.24em] text-stone-400">Size</h3>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => toggleSize(size)}
              className={`flex h-10 w-10 items-center justify-center rounded-full border text-xs uppercase tracking-[0.18em] transition ${
                selectedSizes.includes(size)
                  ? 'border-stone-200 bg-stone-100 text-stone-900'
                  : 'border-stone-700 bg-transparent text-stone-200 hover:border-stone-500'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-sm uppercase tracking-[0.24em] text-stone-400">Color</h3>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => toggleColor(color)}
              className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.18em] transition ${
                selectedColors.includes(color)
                  ? 'border-stone-200 bg-stone-100 text-stone-900'
                  : 'border-stone-700 bg-transparent text-stone-200 hover:border-stone-500'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
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

      <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-4 text-xs uppercase tracking-[0.2em] text-stone-400">
        {productCount} products
      </div>
    </aside>
  )
}
