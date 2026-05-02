import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-5 text-center px-4 py-16">
      <div className="text-8xl">🗺️</div>
      <h1 className="text-6xl font-extrabold text-amazon-yellow">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Page Not Found</h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        <button onClick={() => navigate(-1)} className="btn-secondary px-6 py-2.5">
          ← Go Back
        </button>
        <Link to="/" className="btn-primary px-6 py-2.5">
          🏠 Go Home
        </Link>
      </div>
    </div>
  )
}
