import getGQLRequest from "@/snippets/getGQLRequest"
import countBursaryResponses from "@/snippets/gql/countBursaryResponses"

const saveBursary = async ({ bursaryId, selectedId }) => {
  let selected = null
  let numberOfApplicants = 0
  if (selectedId) {
    selected = await getGQLRequest({
      endpoint: `bursary`,
      findOne: true,
      id: selectedId,
      fields: `id,name,whoQualifies,bursaryCategories{id,name},open,close,application,particulars,value,note,created_at,url`,
    })
    numberOfApplicants = await countBursaryResponses(selectedId)
  } else if (bursaryId) {
    selected = await getGQLRequest({
      endpoint: `bursary`,
      findOne: true,
      id: bursaryId,
      fields: `id,name,whoQualifies,bursaryCategories{id,name},open,close,application,particulars,value,note,created_at,url`,
    })
    numberOfApplicants = await countBursaryResponses(bursaryId)
  }
  return {
    selected: selected ? selected.bursary : {},
    numberOfApplicants: numberOfApplicants
      ? numberOfApplicants.bursaryResponses
      : 0,
  }
}
export default saveBursary
