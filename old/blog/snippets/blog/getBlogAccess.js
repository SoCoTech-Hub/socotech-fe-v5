import { gql } from '@apollo/client'
import client from '@/api/apolloClient'

const getBlogAccess = async ({ orgId }) => {
	const { data } = await client.query({
		query: gql`
      query GetBlogAccess {
        accesses(where:{organization:{id:${orgId}}}) {
          name
          url
          isPaid
        }
      }
    `,
		fetchPolicy: 'network-only'
	})
	return {
		accesses: data?.accesses
	}
}
export default getBlogAccess
