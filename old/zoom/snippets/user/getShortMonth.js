export const getShortMonth = ({ fullDate }) => {
  const theDate = new Date(`${fullDate}`)
  const monthRange = [
    { id: 1, month: "Jan" },
    { id: 2, month: "Feb" },
    { id: 3, month: "Mar" },
    { id: 4, month: "Apr" },
    { id: 5, month: "May" },
    { id: 6, month: "Jun" },
    { id: 7, month: "Jul" },
    { id: 8, month: "Aug" },
    { id: 9, month: "Sep" },
    { id: 10, month: "Oct" },
    { id: 11, month: "Nov" },
    { id: 12, month: "Dec" },
  ]
  return monthRange[
    monthRange.findIndex((month) => month.id === theDate.getMonth())
  ].month
}
