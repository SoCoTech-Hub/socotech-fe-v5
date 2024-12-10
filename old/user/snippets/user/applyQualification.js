import api from "@/api/api"
import getGQLRequest from "@/snippets/getGQLRequest"
const applyQualification = async ({
  profileId,
  qualificationId,
  qualificationUrl,
}) => {
  let { qualificationResponses } = await getGQLRequest({
    endpoint: `qualificationResponses`,
    where: `profile:{id:${profileId}},qualification:{id:${qualificationId}}`,
    fields: `id,qualification{url}`,
  })

  if (qualificationResponses.length > 0) {
    await api
      .put(`/qualification-responses/${qualificationResponses[0].id}`, {
        applied: true,
      })
      .then(() => {
        if (qualificationResponses[0].qualification.url) {
          window.open(qualificationResponses[0].qualification.url)
        }
        return
      })
  } else {
    await api
      .post("/qualification-responses", {
        profile: { id: profileId },
        qualification: { id: qualificationId },
        applied: true,
      })
      .then(() => {
        if (qualificationUrl) {
          window.open(qualificationUrl)
        }
        return
      })
  }
}

export default applyQualification
