const getTimeFormat = async (min) => {
  let h = Math.floor(min / 60)
  let m = min % 60
  h = h < 10 ? "0" + h : h
  m = m < 10 ? "0" + m : m
  return `${h} h ${Math.round(m)} min`
}
export default getTimeFormat
