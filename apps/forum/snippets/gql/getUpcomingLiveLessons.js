import { gql } from "@apollo/client"
import client from "@/api/apolloClient"

const getUpcomingLiveLessons = async ({
  organizationId,
  grades,
  provinces,
  currentDate,
  endDate,
}) => {
  const { data } = await client.query({
    query: gql`
      query GetLiveLessons {
        lessons(where:{isLiveLesson:true,organization:{id:[${organizationId}]},grades:{id:[${grades}]},provinces:{id:[${provinces}]},startDate_gt:"${
      currentDate.toISOString().split("T")[0]
    }",endDate_lt:"${endDate.toISOString()}"}) {
          id
          name
          description
          topic
          duration
          presenter
          startDate
          endDate
          isLiveLesson
          link
          overview
          notes
          featuredImage {
            id
            url
          }
          provinces {
            id
            name
          }
          grades {
            id
            name
          }
          subject {
            id
            name
          }
          subjectCategory {
            id
            name
          }
          lmsSurveys {
            id
            title
          }
          lmsQuizs {
            id
            title
          }
        }
      }
    `,
    fetchPolicy: "network-only",
  })
  return {
    lessons: data.lessons ? data.lessons : [],
  }
}
export default getUpcomingLiveLessons
