import { gql } from "graphql-tag";

export const GET_PROFILE_SCHOOLS = gql`
  query GetProfileSchools($profileId: string) {
    profile(id: $profileId) {
      id
      schools {
        id
      }
    }
  }
`;
