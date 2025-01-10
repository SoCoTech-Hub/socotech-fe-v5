import { gql } from "graphql-tag";

export const GET_IN_PROGRESSES = gql`
  query GetInProgresses($userId: ID!) {
    progresses(
      sort: "updated_at:desc"
      where: { isComplete: false, user: { id: $userId } }
    ) {
      id
      completedSteps
      isComplete
      timeSpent
      totalSteps
      user {
        id
      }
      profile {
        id
        firstName
        lastName
      }
      lesson {
        id
        name
      }
      province {
        id
        name
      }
      grade {
        id
        name
      }
      subject {
        id
        name
      }
      school {
        id
        name
      }
    }
  }
`;
