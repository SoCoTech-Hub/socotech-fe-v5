import getGQLRequest from "@/snippets/getGQLRequest"

const getSubjectName = async ({ subjectId }) => {
  let { subjects } = await getGQLRequest({
    endpoint: `subjects`,
    where: `id:${subjectId}`,
    fields: `id,name`,
  })
  return subjects
}
export default getSubjectName
