import { createSlice } from '@reduxjs/toolkit'

const storedCart = localStorage.getItem('shopnest_cart')
  ? JSON.parse(localStorage.getItem('shopnest_cart'))
  : []

const save = (items) => localStorage.setItem('shopnest_cart', JSON.stringify(items))

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: storedCart,
  },
  reducers: {
    addToCart(state, action) {
      const existing = state.items.find((i) => i.id === action.payload.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      save(state.items)
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload)
      save(state.items)
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload
      if (quantity <= 0) {
        state.items = state.items.filter((i) => i.id !== id)
      } else {
        const item = state.items.find((i) => i.id === id)
        if (item) item.quantity = quantity
      }
      save(state.items)
    },
    clearCart(state) {
      state.items = []
      save(state.items)
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
