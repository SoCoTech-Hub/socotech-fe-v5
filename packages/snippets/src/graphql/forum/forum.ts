import { gql } from "graphql-tag";

export const GET_FORUMS = gql`
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
