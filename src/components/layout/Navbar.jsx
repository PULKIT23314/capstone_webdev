import React, { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkMode } from '../../redux/slices/uiSlice.js'
import { logout } from '../../redux/slices/authSlice.js'
import { setSearchQuery, setCategory } from '../../redux/slices/productSlice.js'
import { useCart } from '../../hooks/useCart.js'

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { darkMode } = useSelector((s) => s.ui)
  const { user, isAuthenticated } = useSelector((s) => s.auth)
  const { searchQuery } = useSelector((s) => s.products)
  const { cartCount } = useCart()
  const [localSearch, setLocalSearch] = useState(searchQuery)

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault()
      dispatch(setSearchQuery(localSearch))
      dispatch(setCategory('all'))
      navigate('/')
    },
    [localSearch, dispatch, navigate]
  )

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 shadow-lg">
      {/* Top bar */}
      <div className="bg-amazon text-white">
        <div className="page-container flex items-center gap-3 py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 shrink-0">
            <span className="text-2xl font-extrabold text-amazon-yellow tracking-tight">Shop</span>
            <span className="text-2xl font-extrabold text-white tracking-tight">Nest</span>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 flex max-w-2xl">
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search products…"
              className="flex-1 px-4 py-2 text-gray-900 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-amazon-yellow text-sm"
            />
            <button
              type="submit"
              className="bg-amazon-yellow hover:bg-amazon-orange text-gray-900 px-4 py-2 rounded-r-lg font-semibold transition-colors"
            >
              🔍
            </button>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-1 ml-auto shrink-0">
            {/* Dark mode */}
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className="p-2 rounded-lg hover:bg-amazon-light transition-colors text-lg"
              title="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-xs hidden sm:block">
                  Hello, <span className="font-bold text-amazon-yellow">{user?.name?.split(' ')[0]}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="text-xs bg-amazon-light hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex gap-1">
                <Link
                  to="/login"
                  className="text-xs bg-amazon-light hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-xs bg-amazon-yellow hover:bg-amazon-orange text-gray-900 px-3 py-1.5 rounded-lg font-semibold transition-colors"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Cart */}
            <Link
              to={isAuthenticated ? '/cart' : '/login'}
              className="relative flex items-center gap-1.5 bg-amazon-light hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors"
            >
              <span className="text-xl">🛒</span>
              <span className="text-sm font-semibold hidden sm:block">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amazon-yellow text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Category bar */}
      <CategoryBar />
    </header>
  )
}

function CategoryBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { categories, selectedCategory } = useSelector((s) => s.products)

  const handleCategory = (cat) => {
    dispatch(setCategory(cat))
    navigate('/')
  }

  return (
    <div className="bg-amazon-light text-white overflow-x-auto">
      <div className="page-container flex items-center gap-1 py-1.5">
        {categories.slice(0, 8).map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className={`px-3 py-1 rounded text-sm whitespace-nowrap transition-all font-medium ${
              selectedCategory === cat
                ? 'bg-amazon-yellow text-gray-900'
                : 'hover:bg-gray-600 text-gray-200'
            }`}
          >
            {cat === 'all' ? '✦ All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}
