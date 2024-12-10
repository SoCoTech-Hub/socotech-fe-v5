import { gql } from "@apollo/client"
import client from "@/api/apolloClient"

const countNotifications = async ({ userid }) => {
  const { data } = await client.query({
    query: gql`
      query GetNotifications {
        notificationsConnection(where:{users:{id:[${userid}]}}) {
          aggregate {
            count
          }
        }
      }
    `,
    fetchPolicy: "network-only",
  })
  return {
    notifications: data?.notificationsConnection?.aggregate?.count,
  }
}
export default countNotifications
