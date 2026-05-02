import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useCart } from '../../hooks/useCart.js'
import { showToast } from '../../redux/slices/uiSlice.js'
import { formatPrice } from '../../utils/formatters.js'

const PROMO_CODES = { SAVE10: 0.1, NEST20: 0.2, SHOP5: 0.05 }

export default function CartSummary() {
  const { cartTotal, clear } = useCart()
  const dispatch = useDispatch()
  const [promo, setPromo] = useState('')
  const [discount, setDiscount] = useState(0)
  const [promoApplied, setPromoApplied] = useState('')

  const shipping = cartTotal >= 50 ? 0 : 4.99
  const tax = cartTotal * 0.08
  const discountAmt = cartTotal * discount
  const total = cartTotal - discountAmt + shipping + tax

  const applyPromo = () => {
    const rate = PROMO_CODES[promo.toUpperCase()]
    if (rate) {
      setDiscount(rate)
      setPromoApplied(promo.toUpperCase())
      dispatch(showToast({ message: `Promo applied! ${rate * 100}% off 🎉`, type: 'success' }))
    } else {
      dispatch(showToast({ message: 'Invalid promo code.', type: 'error' }))
    }
  }

  const handleCheckout = () => {
    dispatch(showToast({ message: '🎉 Order placed successfully! Thank you.', type: 'success' }))
    clear()
  }

  return (
    <div className="card p-6 sticky top-36 space-y-4">
      <h2 className="text-lg font-bold border-b border-gray-200 dark:border-gray-700 pb-3">
        Order Summary
      </h2>

      <div className="space-y-2 text-sm">
        <Row label="Subtotal" value={formatPrice(cartTotal)} />
        {discount > 0 && (
          <Row label={`Promo (${promoApplied})`} value={`-${formatPrice(discountAmt)}`} green />
        )}
        <Row label="Shipping" value={shipping === 0 ? 'FREE ✓' : formatPrice(shipping)} green={shipping === 0} />
        <Row label="Tax (8%)" value={formatPrice(tax)} />
        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between font-bold text-base">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      {shipping > 0 && (
        <p className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2">
          🚚 Add <span className="font-bold text-green-600">{formatPrice(50 - cartTotal)}</span> more for free shipping!
        </p>
      )}

      {/* Promo */}
      {!promoApplied && (
        <div>
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Promo Code</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              placeholder="Try: SAVE10"
              className="input-field text-sm flex-1"
              onKeyDown={(e) => e.key === 'Enter' && applyPromo()}
            />
            <button onClick={applyPromo} className="btn-secondary text-sm px-3">
              Apply
            </button>
          </div>
        </div>
      )}

      <button onClick={handleCheckout} className="btn-primary w-full py-3 text-base">
        🔒 Place Order
      </button>

      <div className="flex justify-center gap-3 text-gray-400 text-xs">
        <span>💳 Visa</span>
        <span>💳 Mastercard</span>
        <span>📱 PayPal</span>
      </div>
    </div>
  )
}

function Row({ label, value, green }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600 dark:text-gray-400">{label}</span>
      <span className={green ? 'text-green-600 dark:text-green-400 font-semibold' : 'font-medium'}>{value}</span>
    </div>
  )
}
