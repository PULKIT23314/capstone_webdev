import React from 'react'

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4 text-center px-4">
      <div className="text-6xl">😕</div>
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Something went wrong</h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm">{message || 'Unable to load data. Please try again.'}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary mt-2">
          Try Again
        </button>
      )}
    </div>
  )
}
