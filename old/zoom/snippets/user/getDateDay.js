export const getDateDay = ({ fullDate }) => {
  const theDate = new Date(`${fullDate}`)

  return theDate.getDay()
}
