const countIsComplete = (element) => {
  let valueAdded = 0
  let count = 0
  for (let i = 0; i < element.length; i++) {
    count = element[i].isComplete ? 1 : 0
    valueAdded += count
  }
  return valueAdded
}
export default countIsComplete
