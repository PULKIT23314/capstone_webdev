import React from 'react'

export default function LoadingSpinner({ fullScreen = false, size = 'md' }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' }

  const spinner = (
    <div className={`${sizes[size]} border-4 border-gray-200 dark:border-gray-700 border-t-amazon-yellow rounded-full animate-spin`} />
  )

  if (fullScreen) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        {spinner}
        <p className="text-gray-500 dark:text-gray-400 text-sm">Loading…</p>
      </div>
    )
  }

  return spinner
}
