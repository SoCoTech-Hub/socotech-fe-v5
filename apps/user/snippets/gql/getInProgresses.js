import { gql } from '@apollo/client'
import client from '@/api/apolloClient'

const getInProgresses = async ({ userId }) => {
	try {
		const { data } = await client.query({
			query: gql`
      query GetInProgresses {
        progresses(sort:"updated_at:desc", where:{isComplete:false,user:{id:${userId}}}) {
          id
          completedSteps
          isComplete
          timeSpent
          totalSteps
          user{
              id
          }
          profile{
            id
            firstName
            lastName
        }
          lesson{
            id
            name
          }
          province{
            id
            name
          }
          grade{
            id
            name
          }
          subject{
            id
            name
          }
          school{
            id
            name
          }
        }
      }
    `,
			fetchPolicy: 'network-only'
		})
		return {
			progresses: data.progresses ? data.progresses : []
		}
	} catch (e) {
		console.log(e)
		return {
			progresses: []
		}
	}
}
export default getInProgresses
