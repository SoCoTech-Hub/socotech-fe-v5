export const getShortMonth = ({ fullDate }) => {
  const theDate = new Date(fullDate)
  const monthRange = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  return monthRange[theDate.getMonth()]
}
