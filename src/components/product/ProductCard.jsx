import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../hooks/useCart.js'
import { formatPrice, truncate } from '../../utils/formatters.js'

const StarRating = memo(({ rate, count }) => {
  const full = Math.floor(rate)
  const half = rate % 1 >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  return (
    <div className="flex items-center gap-1">
      <span className="text-amazon-yellow text-sm">
        {'★'.repeat(full)}{half ? '⯨' : ''}{'☆'.repeat(empty)}
      </span>
      <span className="text-xs text-gray-500 dark:text-gray-400">({count})</span>
    </div>
  )
})

const ProductCard = memo(function ProductCard({ product }) {
  const navigate = useNavigate()
  const { add, isInCart } = useCart()
  const inCart = isInCart(product.id)

  return (
    <div className="card hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col group cursor-pointer">
      {/* Image */}
      <div
        className="relative bg-white rounded-t-xl p-4 h-52 flex items-center justify-center overflow-hidden"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300?text=No+Image' }}
        />
        <span className="absolute top-2 left-2 badge bg-amazon-yellow text-gray-900">
          {product.category}
        </span>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3
          className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1 leading-snug hover:text-amazon-blue cursor-pointer transition-colors"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          {truncate(product.title, 60)}
        </h3>

        <StarRating rate={product.rating.rate} count={product.rating.count} />

        <div className="mt-auto pt-3 flex items-center justify-between gap-2">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={() => add(product)}
            className={`text-xs font-semibold px-3 py-2 rounded-lg transition-all ${
              inCart
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border border-green-300 dark:border-green-700'
                : 'btn-primary'
            }`}
          >
            {inCart ? '✓ Added' : '🛒 Add'}
          </button>
        </div>
      </div>
    </div>
  )
})

export default ProductCard
