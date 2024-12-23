import { gql } from "graphql-tag";

//TODO: Check if this works
export const GET_USER_PROFILES_BY_GRADES = gql`
  query GetUserProfilesByGrades($grades: string) {
    users(where: { profile: { grades: parseInt(grades.split(",")) } }) {
      id
      profile {
        id
        firstName
        lastName
        uniqueId
      }
    }
  }
`;
