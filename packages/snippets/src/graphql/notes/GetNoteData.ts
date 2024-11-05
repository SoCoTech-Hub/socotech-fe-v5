import { gql } from "@apollo/client";

export const GetNoteRead = gql`
  query GetRead($id: ID!, $profileId: String!) {
    note(where: { id: $id, profile: { id: $profileId } }) {
      read
    }
  }
`;
export const GetNotesRead = gql`
  query GetRead($profileId: String!) {
    notes(where: { profile: { id: $profileId } }) {
      id
      read
    }
  }
`;
