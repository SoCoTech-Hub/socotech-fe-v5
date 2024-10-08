import { gql } from "@apollo/client"
import client from "@/api/apolloClient"

const countOpenTickets = async ({ profileId }) => {
  const { data } = await client.query({
    query: gql`
      query GetOpenTickets {
        supportTicketsConnection(where:{open:true,createdBy:{id:${profileId}}}) {
          aggregate {
            count
          }
        }
      }
    `,
    fetchPolicy: "network-only",
  })
  return {
    supportTickets: data?.supportTicketsConnection?.aggregate?.count,
  }
}
export default countOpenTickets
