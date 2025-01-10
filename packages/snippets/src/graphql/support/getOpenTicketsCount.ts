import { gql } from "graphql-tag";

export const GET_OPEN_TICKETS_COUNT = gql`
  query GetOpenTickets($profileId: ID!) {
    supportTicketsConnection(
      where: { open: true, createdBy: { id: $profileId } }
    ) {
      aggregate {
        count
      }
    }
  }
`;
