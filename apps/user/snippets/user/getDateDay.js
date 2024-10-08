export const getDateDay = ({ fullDate }) => {
  const theDate = new Date(fullDate).toString()
  const dateArray = theDate.split(" ")

  return dateArray[2]
}
