import api from "@/api/api"
import getGQLRequest from "@/snippets/getGQLRequest"
const saveQualification = async ({ profileId, qualificationId }) => {
  let { qualificationResponses } = await getGQLRequest({
    endpoint: `qualificationResponses`,
    where: `profile:{id:${profileId}},qualification:{id:${qualificationId}}`,
    fields: `id`,
  })

  if (qualificationResponses.length > 0) {
    await api
      .put(`/qualification-responses/${qualificationResponses[0].id}`, {
        isSaved: true,
      })
      .then(() => {
        return
      })
  } else {
    await api
      .post("/qualification-responses", {
        profile: { id: profileId },
        qualification: { id: qualificationId },
        isSaved: true,
      })
      .then(() => {
        return
      })
  }
}

export default saveQualification
