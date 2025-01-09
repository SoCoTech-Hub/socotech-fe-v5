import { gql } from "graphql-tag";

export const CHECK_IF_EXISTS_IMEI = gql`
  query CheckIfExistsImei($imei: String!, $userId: String!) {
    profiles(where: { imei: $imei, id_nin: $userId }) {
      id
    }
  }
`;
