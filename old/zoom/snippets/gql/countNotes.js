import { gql } from "@apollo/client"
import client from "@/api/apolloClient"

const countNotes = async ({ profileId }) => {
  const { data } = await client.query({
    query: gql`
      query GetNotes {
        notesConnection(where:{read:0,profile:{id:${profileId}}}) {
          aggregate {
            count
          }
        }
      }
    `,
    fetchPolicy: "network-only",
  })
  return {
    notes: data?.notesConnection?.aggregate?.count,
  }
}
export default countNotes
