import { gql } from "graphql-tag";

export const GET_BLOG_ACCESS = gql`
  query GetBlogAccess($orgId: ID!) {
    accesses(where: { organization: { id: $orgId } }) {
      name
      url
      isPaid
    }
  }
`;
