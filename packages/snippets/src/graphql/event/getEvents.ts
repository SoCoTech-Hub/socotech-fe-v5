import { gql } from "graphql-tag";

export const GET_EVENTS = gql`
  query GetEvents($where: JSON!) {
    events(where: $where) {
      id
      title
      description
      start
      end
      lesson {
        id
        name
      }
      url
      color
      location
      image {
        url
      }
      private
      editable
      isLive
      author {
        firstName
        lastName
        profilePic {
          url
        }
      }
      subject {
        name
        color
      }
    }
  }
`;

export const GET_EVENT_BY_ID = gql`
  query GetEventById($id: ID!) {
    event(id: $id) {
      id
      title
      description
      start
      end
      lesson {
        id
        name
      }
      url
      color
      location
      image {
        url
      }
      private
      editable
      isLive
      author {
        firstName
        lastName
        profilePic {
          url
        }
      }
      subject {
        name
        color
      }
    }
  }
`;
