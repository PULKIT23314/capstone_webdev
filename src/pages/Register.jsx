import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register, clearAuthError } from '../redux/slices/authSlice.js'
import { showToast } from '../redux/slices/uiSlice.js'

export default function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, error } = useSelector((s) => s.auth)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [localError, setLocalError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) navigate('/')
    return () => dispatch(clearAuthError())
  }, [isAuthenticated, navigate, dispatch])

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setLocalError('')
    if (error) dispatch(clearAuthError())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) {
      setLocalError('Passwords do not match.')
      return
    }
    if (form.password.length < 6) {
      setLocalError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 400))
    dispatch(register({ name: form.name, email: form.email, password: form.password }))
    setLoading(false)
    dispatch(showToast({ message: 'Account created! Welcome to ShopNest 🎉', type: 'success' }))
  }

  const displayError = localError || error

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-extrabold">
            <span className="text-amazon-yellow">Shop</span>
            <span className="text-gray-900 dark:text-white">Nest</span>
          </Link>
          <h2 className="mt-4 text-xl font-bold text-gray-800 dark:text-gray-200">Create your account</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Already have an account?{' '}
            <Link to="/login" className="text-amazon-blue hover:underline font-semibold">
              Sign in
            </Link>
          </p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {displayError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg p-3 text-sm flex items-center gap-2">
                <span>⚠️</span> {displayError}
              </div>
            )}

            {[
              { label: 'Full Name', name: 'name', type: 'text', placeholder: 'John Doe', autoComplete: 'name' },
              { label: 'Email address', name: 'email', type: 'email', placeholder: 'you@example.com', autoComplete: 'email' },
              { label: 'Password', name: 'password', type: 'password', placeholder: 'Min 6 characters', autoComplete: 'new-password' },
              { label: 'Confirm Password', name: 'confirm', type: 'password', placeholder: 'Re-enter password', autoComplete: 'new-password' },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  {f.label}
                </label>
                <input
                  type={f.type}
                  name={f.name}
                  value={form[f.name]}
                  onChange={handleChange}
                  required
                  autoComplete={f.autoComplete}
                  placeholder={f.placeholder}
                  className="input-field"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-base disabled:opacity-60"
            >
              {loading ? 'Creating account…' : '✨ Create Account'}
            </button>
          </form>

          <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-5">
            By creating an account, you agree to our{' '}
            <span className="underline cursor-pointer">Terms of Service</span> and{' '}
            <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  )
}
