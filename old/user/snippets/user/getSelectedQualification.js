import getGQLRequest from "@/snippets/getGQLRequest"
import countQualificationResponses from "@/snippets/gql/countQualificationResponses"

const saveQualification = async ({ qualificationId, selectedId }) => {
  let selected = null
  let numberOfApplicants = 0
  if (selectedId) {
    selected = await getGQLRequest({
      endpoint: `qualification`,
      findOne: true,
      id: selectedId,
      fields: `id,name,institution,degree,shortDescription,url,created_at,duration,openDate,closeDate,programmDescription,requirements,university{logo{url}},subjects{id,name}`,
    })
    numberOfApplicants = await countQualificationResponses(selectedId)
  } else if (qualificationId) {
    selected = await getGQLRequest({
      endpoint: `qualification`,
      findOne: true,
      id: qualificationId,
      fields: `id,name,institution,degree,shortDescription,url,created_at,duration,openDate,closeDate,programmDescription,requirements,university{logo{url}},subjects{id,name}`,
    })
    numberOfApplicants = await countQualificationResponses(qualificationId)
  }
  return {
    selected: selected ? selected.qualification : {},
    numberOfApplicants: numberOfApplicants
      ? numberOfApplicants.qualificationResponses
      : 0,
  }
}
export default saveQualification
