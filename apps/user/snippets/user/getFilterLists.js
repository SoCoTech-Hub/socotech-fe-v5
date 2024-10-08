const getFilterLists = async ({ initialQualifications }) => {
  let subjectArr = []
  initialQualifications.map((x) => {
    x.subjects.map((x) => {
      subjectArr.push(x)
    })
  })
  let degreeArr = []
  initialQualifications.map((x, index) => {
    if (x.degree) {
      degreeArr.push({
        id: index,
        name: x.degree,
      })
    }
  })
  return {
    subjects: [
      ...new Map(subjectArr.map((item) => [item["name"], item])).values(),
    ],
    degrees: [
      ...new Map(degreeArr.map((item) => [item["name"], item])).values(),
    ],
  }
}
export default getFilterLists
