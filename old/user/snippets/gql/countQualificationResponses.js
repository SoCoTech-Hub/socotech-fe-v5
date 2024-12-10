import { gql } from '@apollo/client'
import client from '@/api/apolloClient'

const countQualificationResponses = async (selectedId) => {
	try {
		const { data } = await client.query({
			query: gql`
      query GetQualificationResponses {
        qualificationResponsesConnection(where:{qualification:{id:${selectedId}}}) {
          aggregate {
            count
          }
        }
      }
    `,
			fetchPolicy: 'network-only'
		})
		return {
			qualificationResponses:
				data?.qualificationResponsesConnection?.aggregate?.count
		}
	} catch (e) {
		console.log(e)
		return {
			qualificationResponses: 0
		}
	}
}
export default countQualificationResponses
