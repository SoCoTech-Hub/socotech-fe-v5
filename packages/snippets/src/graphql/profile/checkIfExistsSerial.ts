import { gql } from "graphql-tag";

export const CHECK_SERIAL = gql`
  query CheckSerial($serialnumber: String!, $userId: String!) {
    profiles(where: { serialNumber: $serialnumber, id_nin: $userId }) {
      id
    }
  }
`;
