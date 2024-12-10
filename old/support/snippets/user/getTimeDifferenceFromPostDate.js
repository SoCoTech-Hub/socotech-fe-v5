export const getTimeDifferenceFromPostDate = (dateCreated) => {
  let currentDate = new Date()
  let createdDate = new Date(dateCreated)
  let differenceInSeconds = Math.round(
    (currentDate.getTime() - createdDate.getTime()) / 1000
  )
  let timeAgo = ""
  switch (true) {
    case differenceInSeconds < 60:
      timeAgo = "Posted less than a min ago"
      break
    case differenceInSeconds >= 60 && differenceInSeconds < 120:
      timeAgo = `Posted ${Math.floor((differenceInSeconds /= 60))} min ago`
      break
    case differenceInSeconds >= 120 && differenceInSeconds < 3600:
      timeAgo = `Posted ${Math.floor((differenceInSeconds /= 60))} mins ago`
      break
    case differenceInSeconds >= 3600 && differenceInSeconds < 7200:
      timeAgo = `Posted ${Math.floor((differenceInSeconds /= 3600))} hour ago`
      break
    case differenceInSeconds >= 7200 && differenceInSeconds < 86400:
      timeAgo = `Posted ${Math.floor((differenceInSeconds /= 3600))} hours ago`
      break
    case differenceInSeconds >= 86400 && differenceInSeconds < 172800:
      timeAgo = `Posted Yesterday`
      break
    default:
      timeAgo = createdDate.toString().slice(0, 16)
  }
  return timeAgo
}
