const sumTimeSpent = (element) => {
  let valueAdded = 0
  let count = 0
  for (let i = 0; i < element.length; i++) {
    count = parseInt(element[i].time)
    valueAdded += count
  }
  return valueAdded
}
export default sumTimeSpent
