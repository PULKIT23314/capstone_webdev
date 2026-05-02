import React, { memo } from 'react'
import { useCart } from '../../hooks/useCart.js'
import { formatPrice, truncate } from '../../utils/formatters.js'

const CartItem = memo(function CartItem({ item }) {
  const { remove, update } = useCart()

  return (
    <div className="card p-4 flex gap-4 items-start">
      <img
        src={item.image}
        alt={item.title}
        className="w-24 h-24 object-contain bg-white rounded-lg border border-gray-200 dark:border-gray-700 p-2 shrink-0"
        onError={(e) => { e.target.src = 'https://via.placeholder.com/100x100?text=No+Image' }}
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 leading-snug mb-1">
          {truncate(item.title, 80)}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 capitalize">{item.category}</p>

        <div className="flex flex-wrap items-center gap-3">
          {/* Qty */}
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            <button
              onClick={() => update(item.id, item.quantity - 1)}
              className="px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-bold transition-colors"
            >
              −
            </button>
            <span className="px-4 py-1.5 text-sm font-semibold border-x border-gray-300 dark:border-gray-600 min-w-[2.5rem] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => update(item.id, item.quantity + 1)}
              className="px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-bold transition-colors"
            >
              +
            </button>
          </div>

          <button
            onClick={() => remove(item.id)}
            className="text-xs text-red-500 hover:text-red-700 font-semibold hover:underline transition-colors"
          >
            🗑 Remove
          </button>
        </div>
      </div>

      <div className="text-right shrink-0">
        <p className="text-lg font-bold text-gray-900 dark:text-white">
          {formatPrice(item.price * item.quantity)}
        </p>
        {item.quantity > 1 && (
          <p className="text-xs text-gray-400">{formatPrice(item.price)} each</p>
        )}
      </div>
    </div>
  )
})

export default CartItem
