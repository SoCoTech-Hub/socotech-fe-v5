import { gql } from "graphql-tag";

export const GET_SCHOOLS_BY_DISTRICT = gql`
  query GetSchoolsByDistrict($district: string) {
    schools(where: { district: { id: $district } }) {
      id
      name
    }
  }
`;
