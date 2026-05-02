import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory, setSortBy, setPriceRange, setSearchQuery } from '../../redux/slices/productSlice.js'
import { formatCategory } from '../../utils/formatters.js'

const ProductFilters = memo(function ProductFilters({ totalCount }) {
  const dispatch = useDispatch()
  const { categories, selectedCategory, sortBy, priceRange } = useSelector((s) => s.products)

  const resetAll = () => {
    dispatch(setCategory('all'))
    dispatch(setSortBy('default'))
    dispatch(setPriceRange([0, 1000]))
    dispatch(setSearchQuery(''))
  }

  return (
    <aside className="card p-5 h-fit sticky top-36 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-base">Filters</h2>
        <button
          onClick={resetAll}
          className="text-xs text-amazon-blue hover:underline font-medium"
        >
          Reset all
        </button>
      </div>

      {/* Category */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
          Category
        </h3>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => dispatch(setCategory(cat))}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all font-medium ${
                selectedCategory === cat
                  ? 'bg-amazon-yellow text-gray-900'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {cat === 'all' ? '✦ All Categories' : formatCategory(cat)}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
          Sort By
        </h3>
        <select
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          className="input-field text-sm"
        >
          <option value="default">Featured</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating">Top Rated</option>
          <option value="name">Name A–Z</option>
        </select>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
          Max Price: <span className="text-amazon-yellow font-bold">${priceRange[1]}</span>
        </h3>
        <input
          type="range"
          min={0}
          max={1000}
          step={10}
          value={priceRange[1]}
          onChange={(e) => dispatch(setPriceRange([0, Number(e.target.value)]))}
          className="w-full accent-amazon-yellow"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>$0</span>
          <span>$1000</span>
        </div>
      </div>

      {/* Results count */}
      <div className="text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
        Showing <span className="font-bold text-gray-800 dark:text-gray-200">{totalCount}</span> results
      </div>
    </aside>
  )
})

export default ProductFilters
