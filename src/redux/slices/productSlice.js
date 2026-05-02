import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchProducts, fetchProductById, fetchCategories } from '../../services/api.js'

export const getProducts = createAsyncThunk('products/getAll', async (_, { rejectWithValue }) => {
  try {
    return await fetchProducts()
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const getProductById = createAsyncThunk('products/getById', async (id, { rejectWithValue }) => {
  try {
    return await fetchProductById(id)
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const getCategories = createAsyncThunk('products/getCategories', async (_, { rejectWithValue }) => {
  try {
    return await fetchCategories()
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    currentProduct: null,
    categories: [],
    status: 'idle',
    detailStatus: 'idle',
    error: null,
    searchQuery: '',
    selectedCategory: 'all',
    sortBy: 'default',
    priceRange: [0, 1000],
    currentPage: 1,
    itemsPerPage: 8,
  },
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload
      state.currentPage = 1
    },
    setCategory(state, action) {
      state.selectedCategory = action.payload
      state.currentPage = 1
    },
    setSortBy(state, action) {
      state.sortBy = action.payload
      state.currentPage = 1
    },
    setPriceRange(state, action) {
      state.priceRange = action.payload
      state.currentPage = 1
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    clearCurrentProduct(state) {
      state.currentProduct = null
      state.detailStatus = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(getProductById.pending, (state) => {
        state.detailStatus = 'loading'
        state.error = null
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.detailStatus = 'succeeded'
        state.currentProduct = action.payload
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.detailStatus = 'failed'
        state.error = action.payload
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = ['all', ...action.payload]
      })
  },
})

export const {
  setSearchQuery,
  setCategory,
  setSortBy,
  setPriceRange,
  setCurrentPage,
  clearCurrentProduct,
} = productSlice.actions

export default productSlice.reducer
