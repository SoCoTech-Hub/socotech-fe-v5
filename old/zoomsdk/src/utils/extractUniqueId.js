module.exports = (name) => {
  const uniqueId = name.match(/\[(.*?)\]/gi)
  if (uniqueId === null) return '-'
  return uniqueId[0].replace('[', '').replace(']', '')
}