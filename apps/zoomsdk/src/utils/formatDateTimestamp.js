module.exports = (timestamp) => {
  if (!timestamp) return '-'
  return new Date(timestamp).toLocaleString('en-US', { timeZone: 'UTC' })
}