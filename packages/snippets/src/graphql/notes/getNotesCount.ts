import { gql } from "graphql-tag";

export const GET_NOTES_COUNT = gql`
  query GetNotes($profileId: ID!) {
    notesConnection(where: { read: 0, profile: { id: $profileId } }) {
      aggregate {
        count
      }
    }
  }
`;
