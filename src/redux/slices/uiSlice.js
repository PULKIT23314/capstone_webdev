import { createSlice } from '@reduxjs/toolkit'

const storedDark = localStorage.getItem('shopnest_dark') === 'true'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    darkMode: storedDark,
    toast: null,
  },
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode
      localStorage.setItem('shopnest_dark', String(state.darkMode))
    },
    showToast(state, action) {
      state.toast = action.payload
    },
    clearToast(state) {
      state.toast = null
    },
  },
})

export const { toggleDarkMode, showToast, clearToast } = uiSlice.actions
export default uiSlice.reducer
