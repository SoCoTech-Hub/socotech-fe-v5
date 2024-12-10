import countOpenTickets from "@/snippets/gql/countOpenTickets"

const getTicketsCount = async ({ profileId }) => {
  if (profileId) {
    let result = await countOpenTickets({
      profileId,
    })
    return result.supportTickets
  }
  return 0
}
export default getTicketsCount
