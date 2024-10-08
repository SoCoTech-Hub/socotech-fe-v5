import { gql } from '@apollo/client'
import client from '@/api/apolloClient'

const countBursaryResponses = async (selectedId) => {
	try {
		const { data } = await client.query({
			query: gql`
      query GetBursaryResponses {
        bursaryResponsesConnection(where:{bursary:{id:${selectedId}}}) {
          aggregate {
            count
          }
        }
      }
    `,
			fetchPolicy: 'network-only'
		})
		return {
			bursaryResponses: data?.bursaryResponsesConnection?.aggregate?.count
		}
	} catch (e) {
		console.error(e)
		return {
			bursaryResponses: 0
		}
	}
}
export default countBursaryResponses
