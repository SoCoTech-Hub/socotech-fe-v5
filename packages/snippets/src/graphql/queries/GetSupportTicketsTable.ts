import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { gql } from "@apollo/client";

import type {
  GetSupportTicketsCountQuery,
  GetSupportTicketsCountQueryVariables,
} from "./generated/graphql";

// Adjust the import path

const GetSupportTicketsCount: TypedDocumentNode<
  GetSupportTicketsCountQuery,
  GetSupportTicketsCountQueryVariables
> = gql`
  query GetSupportTicketsCount($id: ID!) {
    newTickets: supportTicketsConnection(
      where: { createdBy: { id: $id }, supportStatus: { id: 1 }, open: true }
    ) {
      aggregate {
        count
      }
    }
    solvedTickets: supportTicketsConnection(
      where: { createdBy: { id: $id }, open: false }
    ) {
      aggregate {
        count
      }
    }
    pendingTickets: supportTicketsConnection(
      where: { createdBy: { id: $id }, open: true, supportStatus: { id: 2 } }
    ) {
      aggregate {
        count
      }
    }
  }
`;
export default GetSupportTicketsCount;

// USE:
/*
import { useQuery } from '@apollo/client';
import GetSupportTicketsCount from '@acme/snippets/graphql/queries/GetSupportTicketsCount';

const { data, loading, error } = useQuery(GetSupportTicketsCount, {
  variables: { id: 'user-id' },
});

if (data) {
  console.log(data.newTickets.aggregate.count);
  console.log(data.solvedTickets.aggregate.count);
  console.log(data.pendingTickets.aggregate.count);
}
*/
