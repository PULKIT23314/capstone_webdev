export const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)

export const formatCategory = (cat) =>
  cat
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

export const truncate = (str, n = 60) =>
  str.length > n ? str.slice(0, n) + '…' : str

export const renderStars = (rate) => {
  const full = Math.floor(rate)
  const half = rate % 1 >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty)
}
