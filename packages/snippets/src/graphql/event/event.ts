import { gql } from "graphql-tag";

export const GET_EVENT = gql`
  query GetEvent($eventId: string) {
    event(id: $eventId) {
      id
      name
      description
      color
      icon {
        url
      }
      author {
        id
      }
    }
  }
`;

export const GET_EVENTS = gql`
  query GetEvent($startDate: string, $organizationId: string) {
    events(
      where: { organization: { id: $organizationId }, start_gt: $startDate }
    ) {
      id
      name
      description
      color
      icon {
        url
      }
      author {
        id
      }
    }
  }
`;
