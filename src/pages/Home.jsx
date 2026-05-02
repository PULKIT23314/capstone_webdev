import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, getCategories } from '../redux/slices/productSlice.js'
import { useFilteredProducts } from '../hooks/useFilteredProducts.js'
import ProductGrid from '../components/product/ProductGrid.jsx'
import ProductFilters from '../components/product/ProductFilters.jsx'
import Pagination from '../components/common/Pagination.jsx'
import LoadingSpinner from '../components/common/LoadingSpinner.jsx'
import ErrorMessage from '../components/common/ErrorMessage.jsx'

export default function Home() {
  const dispatch = useDispatch()
  const { status, error, searchQuery, selectedCategory } = useSelector((s) => s.products)
  const { paginated, totalPages, totalCount } = useFilteredProducts()

  useEffect(() => {
    dispatch(getProducts())
    dispatch(getCategories())
  }, [dispatch])

  const retry = () => dispatch(getProducts())

  return (
    <div className="page-container py-6">
      {/* Hero */}
      <div className="rounded-2xl bg-gradient-to-r from-amazon to-amazon-light text-white p-8 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-amazon-yellow text-sm font-semibold uppercase tracking-widest mb-2">Welcome to</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">
            Shop<span className="text-amazon-yellow">Nest</span>
          </h1>
          <p className="text-gray-300 max-w-md">
            Discover millions of products at unbeatable prices. Fast shipping, easy returns.
          </p>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-8xl opacity-10 select-none hidden sm:block">
          🛍️
        </div>
      </div>

      {/* Active filters */}
      {(searchQuery || selectedCategory !== 'all') && (
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          <span className="text-sm text-gray-500 dark:text-gray-400">Active filters:</span>
          {searchQuery && (
            <span className="badge bg-amazon-yellow/20 text-amazon-light dark:text-amazon-yellow border border-amazon-yellow/30">
              🔍 "{searchQuery}"
            </span>
          )}
          {selectedCategory !== 'all' && (
            <span className="badge bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              📂 {selectedCategory}
            </span>
          )}
        </div>
      )}

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="hidden lg:block w-56 shrink-0">
          <ProductFilters totalCount={totalCount} />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {status === 'loading' && <LoadingSpinner fullScreen />}
          {status === 'failed' && <ErrorMessage message={error} onRetry={retry} />}
          {status === 'succeeded' && (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  {searchQuery ? `Results for "${searchQuery}"` : selectedCategory !== 'all' ? selectedCategory : 'All Products'}
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">{totalCount} items</span>
              </div>
              <ProductGrid products={paginated} />
              <Pagination totalPages={totalPages} />
            </>
          )}
        </div>
      </div>

      {/* Mobile filters */}
      <div className="lg:hidden mt-6">
        <details className="card p-4">
          <summary className="font-semibold cursor-pointer select-none">⚙️ Filters & Sort</summary>
          <div className="mt-4">
            <ProductFilters totalCount={totalCount} />
          </div>
        </details>
      </div>
    </div>
  )
}
