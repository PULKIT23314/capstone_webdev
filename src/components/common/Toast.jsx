import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearToast } from '../../redux/slices/uiSlice.js'

const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' }
const colors = {
  success: 'bg-green-600',
  error: 'bg-red-600',
  info: 'bg-blue-600',
  warning: 'bg-yellow-500',
}

export default function Toast() {
  const dispatch = useDispatch()
  const { toast } = useSelector((s) => s.ui)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => dispatch(clearToast()), 3000)
    return () => clearTimeout(t)
  }, [toast, dispatch])

  if (!toast) return null

  return (
    <div
      className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-xl text-white shadow-2xl max-w-sm text-sm font-medium
        ${colors[toast.type] || colors.info} animate-[slideUp_0.3s_ease]`}
      style={{ animation: 'slideUp 0.3s ease' }}
    >
      <span className="text-base">{icons[toast.type]}</span>
      <span>{toast.message}</span>
      <button
        onClick={() => dispatch(clearToast())}
        className="ml-2 text-white/70 hover:text-white transition-colors"
      >
        ✕
      </button>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
