import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-amazon text-gray-300 mt-12">
      <div className="page-container py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {[
            { title: 'Get to Know Us', links: ['About Us', 'Careers', 'Press Releases', 'Blog'] },
            { title: 'Make Money With Us', links: ['Sell products', 'Become Affiliate', 'Advertise', 'Self-Publish'] },
            { title: 'Payment Products', links: ['ShopNest Pay', 'Gift Cards', 'Reload Balance', 'Currency Converter'] },
            { title: 'Let Us Help You', links: ['Your Account', 'Your Orders', 'Shipping Rates', 'Returns & Refunds'] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold mb-3 text-sm">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <span className="text-xs hover:text-white cursor-pointer transition-colors">{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <Link to="/" className="text-xl font-extrabold">
            <span className="text-amazon-yellow">Shop</span>
            <span className="text-white">Nest</span>
          </Link>
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} ShopNest, Inc. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-gray-500">
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span className="hover:text-white cursor-pointer">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
