import countEventResponses from '@/snippets/gql/countEventResponses'

const getEventCount = async ({ profileId }) => {
  const currentDate = new Date()
  const endDate = new Date()
  endDate.setDate(currentDate.getDate() + 6)
  if (profileId) {
    let result = await countEventResponses({
      profileId,
      currentDate,
      endDate,
    })
    return result.eventResponses
  }

  return 0
}
export default getEventCount
