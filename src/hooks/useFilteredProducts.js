import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export function useFilteredProducts() {
  const { items, searchQuery, selectedCategory, sortBy, priceRange, currentPage, itemsPerPage } =
    useSelector((s) => s.products)

  const filtered = useMemo(() => {
    let res = [...items]

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      res = res.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }

    if (selectedCategory && selectedCategory !== 'all') {
      res = res.filter((p) => p.category === selectedCategory)
    }

    res = res.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    switch (sortBy) {
      case 'price-asc':
        res.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        res.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        res.sort((a, b) => b.rating.rate - a.rating.rate)
        break
      case 'name':
        res.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }

    return res
  }, [items, searchQuery, selectedCategory, sortBy, priceRange])

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return { filtered, paginated, totalPages, totalCount: filtered.length }
}
