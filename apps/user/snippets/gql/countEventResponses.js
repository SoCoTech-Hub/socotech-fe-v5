import { gql } from '@apollo/client'
import client from '@/api/apolloClient'

const countEventResponses = async ({ profileId, currentDate, endDate }) => {
	try {
		const { data } = await client.query({
			query: gql`
      query GetEventResponses {
        eventResponsesConnection(where:{read:0,profile:{id:${profileId}},startDate_gt:"${currentDate.toISOString()}",endDate_lt:"${endDate.toISOString()}"}) {
          aggregate {
            count
          }
        }
      }
    `,
			fetchPolicy: 'network-only'
		})
		return {
			eventResponses: data?.eventResponsesConnection?.aggregate?.count
		}
	} catch (e) {
		console.error(e)
		return {
			eventResponses: 0
		}
	}
}
export default countEventResponses
