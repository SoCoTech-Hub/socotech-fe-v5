import { gql } from '@apollo/client'
import client from '@/api/apolloClient'

const countNotificationResponses = async ({ profileId }) => {
	try {
		const { data } = await client.query({
			query: gql`
      query GetNotificationResponses {
        notificationResponsesConnection(where:{read:false,new:true,profile:{id:${profileId}}}) {
          aggregate {
            count
          }
        }
      }
    `,
			fetchPolicy: 'network-only'
		})
		return {
			notificationResponses:
				data?.notificationResponsesConnection?.aggregate?.count
		}
	} catch (e) {
		console.log(e)
		return {
			notificationResponses: 0
		}
	}
}
export default countNotificationResponses
