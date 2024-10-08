const countInProgress = (element) => {
  let valueAdded = 0
  let count = 0
  for (let i = 0; i < element.length; i++) {
    count = element[i].isComplete ? 0 : 1
    valueAdded += count
  }
  return valueAdded
}
export default countInProgress
