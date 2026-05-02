import axios from 'axios'

const BASE_URL = 'https://fakestoreapi.com'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.message ||
      err.message ||
      'Something went wrong. Please try again.'
    return Promise.reject(new Error(message))
  }
)

export const fetchProducts = async () => {
  const { data } = await api.get('/products')
  return data
}

export const fetchProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`)
  return data
}

export const fetchCategories = async () => {
  const { data } = await api.get('/products/categories')
  return data
}

export const fetchProductsByCategory = async (category) => {
  const { data } = await api.get(`/products/category/${category}`)
  return data
}

export default api
