import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage } from '../../redux/slices/productSlice.js'

export default function Pagination({ totalPages }) {
  const dispatch = useDispatch()
  const { currentPage } = useSelector((s) => s.products)

  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const visible = pages.filter(
    (p) => p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)
  )

  return (
    <div className="flex items-center justify-center gap-1 mt-10 flex-wrap">
      <button
        disabled={currentPage === 1}
        onClick={() => dispatch(setCurrentPage(currentPage - 1))}
        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        ← Prev
      </button>

      {visible.map((p, idx) => {
        const prev = visible[idx - 1]
        return (
          <React.Fragment key={p}>
            {prev && p - prev > 1 && (
              <span className="px-2 text-gray-400">…</span>
            )}
            <button
              onClick={() => dispatch(setCurrentPage(p))}
              className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all ${
                currentPage === p
                  ? 'bg-amazon-yellow text-gray-900 shadow-sm'
                  : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {p}
            </button>
          </React.Fragment>
        )
      })}

      <button
        disabled={currentPage === totalPages}
        onClick={() => dispatch(setCurrentPage(currentPage + 1))}
        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next →
      </button>
    </div>
  )
}
