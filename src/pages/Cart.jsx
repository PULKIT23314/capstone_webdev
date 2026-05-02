import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart.js'
import CartItem from '../components/cart/CartItem.jsx'
import CartSummary from '../components/cart/CartSummary.jsx'

export default function Cart() {
  const { items, cartCount } = useCart()

  if (items.length === 0) {
    return (
      <div className="page-container py-16 flex flex-col items-center gap-5 text-center">
        <div className="text-7xl">🛒</div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Your cart is empty</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm">
          You haven't added anything yet. Start browsing and discover great deals!
        </p>
        <Link to="/" className="btn-primary px-8 py-3 text-base">
          🛍️ Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="page-container py-6">
      <h1 className="text-2xl font-extrabold mb-6 text-gray-900 dark:text-white">
        Shopping Cart
        <span className="ml-2 text-base font-normal text-gray-500 dark:text-gray-400">
          ({cartCount} {cartCount === 1 ? 'item' : 'items'})
        </span>
      </h1>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
        {/* Items list */}
        <div className="space-y-4">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <div className="text-right">
            <Link to="/" className="text-amazon-blue hover:underline text-sm font-medium">
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Summary */}
        <CartSummary />
      </div>
    </div>
  )
}
