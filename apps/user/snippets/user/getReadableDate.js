export default function getReadableDate(fullDate) {
    const date = new Date(fullDate).toDateString()
    const time = new Date(fullDate).toTimeString()
    const dateArray = date.split(" ")
    const timeArray = time.split(" ")
    const hoursmin = timeArray.flat().toString().split(':')
    return dateArray[0] + ',' + " " + dateArray[2] + " " + dateArray[1] + " " + hoursmin[0] + ":" + hoursmin[1]
}