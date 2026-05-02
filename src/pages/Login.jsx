import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearAuthError } from '../redux/slices/authSlice.js'
import { showToast } from '../redux/slices/uiSlice.js'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, error } = useSelector((s) => s.auth)
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) navigate('/')
    return () => dispatch(clearAuthError())
  }, [isAuthenticated, navigate, dispatch])

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    if (error) dispatch(clearAuthError())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 400))
    dispatch(login(form))
    setLoading(false)
    if (!error) {
      dispatch(showToast({ message: 'Welcome back! 👋', type: 'success' }))
    }
  }

  const demoLogin = () => {
    setForm({ email: 'demo@shopnest.com', password: 'demo1234' })
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-extrabold">
            <span className="text-amazon-yellow">Shop</span>
            <span className="text-gray-900 dark:text-white">Nest</span>
          </Link>
          <h2 className="mt-4 text-xl font-bold text-gray-800 dark:text-gray-200">Sign in to your account</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Don't have an account?{' '}
            <Link to="/register" className="text-amazon-blue hover:underline font-semibold">
              Create one
            </Link>
          </p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg p-3 text-sm flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="input-field"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-base disabled:opacity-60"
            >
              {loading ? 'Signing in…' : '🔓 Sign In'}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={demoLogin}
              className="w-full btn-secondary py-2.5 text-sm"
            >
              🧪 Fill Demo Credentials
            </button>
            <p className="text-xs text-center text-gray-400 mt-2">
              First register, then sign in with those credentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
