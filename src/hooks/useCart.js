import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../redux/slices/cartSlice.js'
import { showToast } from '../redux/slices/uiSlice.js'

export function useCart() {
  const dispatch = useDispatch()
  const { items } = useSelector((s) => s.cart)

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const cartTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const add = (product) => {
    dispatch(addToCart(product))
    dispatch(showToast({ message: `"${product.title.slice(0, 30)}..." added to cart!`, type: 'success' }))
  }

  const remove = (id) => {
    dispatch(removeFromCart(id))
    dispatch(showToast({ message: 'Item removed from cart.', type: 'info' }))
  }

  const update = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }))
  }

  const clear = () => {
    dispatch(clearCart())
  }

  const isInCart = (id) => items.some((i) => i.id === id)

  return { items, cartCount, cartTotal, add, remove, update, clear, isInCart }
}
