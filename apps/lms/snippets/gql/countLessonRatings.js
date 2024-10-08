import { gql } from "@apollo/client"
import client from "@/api/apolloClient"

const countLessonRatings = async ({ id }) => {
  const { data } = await client.query({
    query: gql`
      query GetLessonRatings {
        lessonRatingsConnection(where:{parentRating:{id:${id}}}) {
          aggregate {
            count
          }
        }
      }
    `,
    fetchPolicy: "network-only",
  })
  return {
    lessonRatings: data?.lessonRatingsConnection?.aggregate?.count,
  }
}
export default countLessonRatings
