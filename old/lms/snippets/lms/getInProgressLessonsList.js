import getInProgresses from "@/snippets/gql/getInProgresses"

const getInProgressLessonsList = async ({ userId }) => {
  if (userId) {
    let result = await getInProgresses({
      userId,
    })
    return result.progresses
  }

  return null
}
export default getInProgressLessonsList
