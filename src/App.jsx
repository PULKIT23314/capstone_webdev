import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AppRoutes from './routes/AppRoutes.jsx'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import LoadingSpinner from './components/common/LoadingSpinner.jsx'
import Toast from './components/common/Toast.jsx'

export default function App() {
  const { darkMode } = useSelector((s) => s.ui)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <AppRoutes />
          </Suspense>
        </main>
        <Footer />
        <Toast />
      </div>
    </BrowserRouter>
  )
}
