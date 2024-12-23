import { gql } from "graphql-tag";

export const GET_SUBSCRIPTIONS = gql`
  query GetSubscriptions($profileId: string!) {
    subscriptions(where: { profile: { id: $profileId } }) {
      id
      newsletterActive
      smsActive
    }
  }
`;
