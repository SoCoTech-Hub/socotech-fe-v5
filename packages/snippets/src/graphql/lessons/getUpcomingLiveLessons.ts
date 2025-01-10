import { gql } from "graphql-tag";

export const GET_UPCOMING_LIVE_LESSONS = gql`
  query GetLiveLessons(
    $organizationId: [ID!]
    $grades: [ID!]
    $provinces: [ID!]
    $currentDate: DateTime!
    $endDate: DateTime!
  ) {
    lessons(
      where: {
        isLiveLesson: true
        organization: { id: $organizationId }
        grades: { id: $grades }
        provinces: { id: $provinces }
        startDate_gt: $currentDate
        endDate_lt: $endDate
      }
    ) {
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
`;
