import { createSlice } from '@reduxjs/toolkit'

const storedUser = localStorage.getItem('shopnest_user')
  ? JSON.parse(localStorage.getItem('shopnest_user'))
  : null

const storedUsers = localStorage.getItem('shopnest_users')
  ? JSON.parse(localStorage.getItem('shopnest_users'))
  : []

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: storedUser,
    users: storedUsers,
    isAuthenticated: !!storedUser,
    error: null,
  },
  reducers: {
    register(state, action) {
      const { name, email, password } = action.payload
      const exists = state.users.find((u) => u.email === email)
      if (exists) {
        state.error = 'Email already registered.'
        return
      }
      const newUser = { id: Date.now(), name, email, password }
      state.users.push(newUser)
      localStorage.setItem('shopnest_users', JSON.stringify(state.users))
      state.user = { id: newUser.id, name, email }
      state.isAuthenticated = true
      state.error = null
      localStorage.setItem('shopnest_user', JSON.stringify(state.user))
    },
    login(state, action) {
      const { email, password } = action.payload
      const found = state.users.find((u) => u.email === email && u.password === password)
      if (!found) {
        state.error = 'Invalid email or password.'
        return
      }
      state.user = { id: found.id, name: found.name, email: found.email }
      state.isAuthenticated = true
      state.error = null
      localStorage.setItem('shopnest_user', JSON.stringify(state.user))
    },
    logout(state) {
      state.user = null
      state.isAuthenticated = false
      state.error = null
      localStorage.removeItem('shopnest_user')
    },
    clearAuthError(state) {
      state.error = null
    },
  },
})

export const { register, login, logout, clearAuthError } = authSlice.actions
export default authSlice.reducer
