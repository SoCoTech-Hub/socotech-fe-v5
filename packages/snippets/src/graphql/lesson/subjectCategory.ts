import { gql } from "graphql-tag";





export const GET_SUBJECT_CATEGORIES = gql`
  query GetsubjectCategories($organizationId: string) {
    subjectCategories(where: { organization: { id: $organizationId } }) {
      id
      name
      subjects {
        id
        name
        color
        icon {
          url
        }
      }
    }
  }
`;
;