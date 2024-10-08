import { gql } from '@apollo/client'
import client from '@/api/apolloClient'

const countUnreadMails = async ({ profileId }) => {
	const { data } = await client.query({
		query: gql`
      query CountUnreadMails {
        mailResponsesConnection(where:{read:false,profile:{id:${profileId}}}) {
          aggregate {
            count
          }
        }
      }
    `,
		fetchPolicy: 'network-only'
	})
	return {
		inMails: data?.mailResponsesConnection?.aggregate?.count
	}
}
export default countUnreadMails
