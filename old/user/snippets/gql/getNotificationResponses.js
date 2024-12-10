import { gql } from '@apollo/client'
import client from '@/api/apolloClient'

const getNotificationResponses = async ({ profileId }) => {
	const { data } = await client.query({
		query: gql`
      query GetNotificationResponses {
        notificationResponses(where:{read:false,new:true,profile:{id:${profileId}}}) {
          id
          notification {
            title
            body
          }
        }
      }
    `,
		fetchPolicy: 'network-only'
	})
	return {
		notificationResponses: data?.notificationResponses
	}
}
export default getNotificationResponses
