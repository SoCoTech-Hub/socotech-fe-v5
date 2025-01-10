import { gql } from "graphql-tag";

export const GET_SUBJECT_BY_ID = gql`
  query GetSubjectById($subjectId: ID!) {
    subjects(where: { id: $subjectId }) {
      id
      name
    }
  }
`;
