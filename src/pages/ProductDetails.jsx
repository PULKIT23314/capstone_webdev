import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductById, clearCurrentProduct, getProducts } from '../redux/slices/productSlice.js'
import { useCart } from '../hooks/useCart.js'
import { formatPrice, formatCategory } from '../utils/formatters.js'
import LoadingSpinner from '../components/common/LoadingSpinner.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'
import ProductCard from '../components/product/ProductCard.jsx'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentProduct, detailStatus, error, items } = useSelector((s) => s.products)
  const { add, isInCart } = useCart()
  const [qty, setQty] = useState(1)

  useEffect(() => {
    dispatch(getProductById(id))
    if (items.length === 0) dispatch(getProducts())
    return () => dispatch(clearCurrentProduct())
  }, [id, dispatch])

  if (detailStatus === 'loading') return <LoadingSpinner fullScreen />
  if (detailStatus === 'failed') return <ErrorMessage message={error} onRetry={() => dispatch(getProductById(id))} />
  if (!currentProduct) return null

  const related = items
    .filter((p) => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 4)

  const stars = currentProduct.rating.rate
  const fullStars = Math.floor(stars)

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) add(currentProduct)
  }

  return (
    <div className="page-container py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6 flex-wrap">
        <Link to="/" className="hover:text-amazon-blue transition-colors">Home</Link>
        <span>›</span>
        <button onClick={() => navigate('/?cat=' + currentProduct.category)} className="hover:text-amazon-blue transition-colors capitalize">
          {currentProduct.category}
        </button>
        <span>›</span>
        <span className="text-gray-800 dark:text-gray-200 font-medium truncate max-w-xs">
          {currentProduct.title}
        </span>
      </nav>

      {/* Main detail */}
      <div className="card p-6 grid md:grid-cols-2 gap-10 mb-10">
        {/* Image */}
        <div className="bg-white dark:bg-gray-700 rounded-xl p-8 flex items-center justify-center aspect-square">
          <img
            src={currentProduct.image}
            alt={currentProduct.title}
            className="max-h-80 object-contain w-full hover:scale-105 transition-transform duration-300"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=No+Image' }}
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          <span className="badge bg-amazon-yellow/20 text-amazon-light dark:text-amazon-yellow border border-amazon-yellow/30 w-fit">
            {formatCategory(currentProduct.category)}
          </span>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
            {currentProduct.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={`text-xl ${i < fullStars ? 'text-amazon-yellow' : 'text-gray-300'}`}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm font-semibold">{currentProduct.rating.rate}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">({currentProduct.rating.count} reviews)</span>
          </div>

          {/* Price */}
          <div className="border-y border-gray-200 dark:border-gray-700 py-4">
            <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
              {formatPrice(currentProduct.price)}
            </p>
            <p className="text-sm text-green-600 dark:text-green-400 font-semibold mt-1">✓ In Stock</p>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {currentProduct.description}
          </p>

          {/* Qty + Add */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 font-bold transition-colors"
              >
                −
              </button>
              <span className="px-5 py-2.5 font-semibold border-x border-gray-300 dark:border-gray-600">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => Math.min(10, q + 1))}
                className="px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 font-bold transition-colors"
              >
                +
              </button>
            </div>
            <button onClick={handleAdd} className="btn-primary flex-1 py-2.5">
              {isInCart(currentProduct.id) ? '✓ Add More to Cart' : '🛒 Add to Cart'}
            </button>
          </div>

          {/* Trust */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            {[
              { icon: '🚚', text: 'Free Shipping over $50' },
              { icon: '🔄', text: '30-day Returns' },
              { icon: '🔒', text: 'Secure Checkout' },
            ].map((t) => (
              <div key={t.text} className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-lg">{t.icon}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-5 text-gray-900 dark:text-white">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}
