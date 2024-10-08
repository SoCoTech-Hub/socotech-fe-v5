module.exports = (minutes) => {
  let h = Math.floor(minutes / 60)
  let m = minutes % 60
  h = h !== 0 ? `${h}h` : ''
  m = m !== 0 ? `${m}min` : ''
  m = h !== '' ? ` ${m}` : m
  return `${h}${m}`
}