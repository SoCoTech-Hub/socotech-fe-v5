import { gql } from "graphql-tag";

export const GET_FORUMS_BY_SLUG = gql`
  query GetForums($slug: string) {
    forums(where: { slug: $slug }) {
      id
      name
      answer
      question
      likes {
        id
      }
      saves {
        id
      }
      parentForum {
        id
        likes {
          id
        }
        saves {
          id
        }
      }
      updated_at
      user {
        profile {
          id
          firstName
          lastName
          profilePic {
            url
          }
        }
      }
      pin
    }
  }
`;
export const GET_FORUMS_BY_ORGANIZATION = gql`
  query GetForums($orgId: string) {
    forums(where: { organization: { id: $orgId } }) {
      id
      name
      answer
      question
      likes {
        id
      }
      saves {
        id
      }
      parentForum {
        id
        likes {
          id
        }
        saves {
          id
        }
      }
      updated_at
      user {
        profile {
          id
          firstName
          lastName
          profilePic {
            url
          }
        }
      }
      pin
    }
  }
`;
