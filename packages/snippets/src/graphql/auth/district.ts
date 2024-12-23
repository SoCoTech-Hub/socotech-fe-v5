import { gql } from "graphql-tag";

export const GET_DISTRICTS_BY_PROVINCE = gql`
  query GetDistrictsByProvince($location: string) {
    districts(where: { province: { id: $location } }) {
      id
      name
    }
  }
`;
