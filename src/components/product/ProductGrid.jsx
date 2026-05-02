import React, { memo } from 'react'
import ProductCard from './ProductCard.jsx'

const ProductGrid = memo(function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-20 gap-3 text-center">
        <span className="text-5xl">🔍</span>
        <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">No products found</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
})

export default ProductGrid
