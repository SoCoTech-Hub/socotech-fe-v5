import { gql } from '@apollo/client'
import client from '@/api/apolloClient'

const countRatings = async ({ id }) => {
	const { data } = await client.query({
		query: gql`
			query GetForumRatings {
				forumsConnection(where: { parentForum: { id: ${id} } }) {
					aggregate {
						count
					}
				}
			}
		`,
		fetchPolicy: 'network-only'
	})
	return {
		forumConnection: data?.forumsConnection?.aggregate?.count
	}
}
export default countRatings
