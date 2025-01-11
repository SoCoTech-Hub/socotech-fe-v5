import { gql } from "graphql-tag";

export const FETCH_TIME_TRACKS = gql`
  query GetTimeTracks($knowledgeBase: ID!, $userId: ID!) {
    timeTracks(
      where: { knowledgeBase: { id: $knowledgeBase }, user: { id: $userId } }
    ) {
      id
      timeSpent
    }
  }
`;
