import { gql } from '@apollo/client'
import client from '@/api/apolloClient'

const countOpenTickets = async ({ profileId }) => {
	try {
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
			fetchPolicy: 'network-only'
		})
		return {
			supportTickets: data?.supportTicketsConnection?.aggregate?.count
		}
	} catch (e) {
		console.log(e)
		return {
			supportTickets: 0
		}
	}
}
export default countOpenTickets
