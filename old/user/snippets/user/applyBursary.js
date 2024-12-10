import api from "@/api/api"
import getGQLRequest from "@/snippets/getGQLRequest"
const applyBursary = async ({ profileId, bursaryId, bursaryUrl }) => {
  let { bursaryResponses } = await getGQLRequest({
    endpoint: `bursaryResponses`,
    where: `profile:{id:${profileId}},bursary:{id:${bursaryId}}`,
    fields: `id,bursary{url}`,
  })

  if (bursaryResponses.length > 0) {
    await api
      .put(`/bursary-responses/${bursaryResponses[0].id}`, {
        applied: true,
      })
      .then(() => {
        if (bursaryResponses[0].bursary.url) {
          window.open(bursaryResponses[0].bursary.url)
        }
        return
      })
  } else {
    await api
      .post("/bursary-responses", {
        profile: { id: profileId },
        bursary: { id: bursaryId },
        applied: true,
      })
      .then(() => {
        if (bursaryUrl) {
          window.open(bursaryUrl)
        }
        return
      })
  }
}

export default applyBursary
