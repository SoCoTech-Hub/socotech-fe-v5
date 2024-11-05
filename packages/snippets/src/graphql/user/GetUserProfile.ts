import { gql } from "@apollo/client";

export const GetUserProfile = gql`
  query GetUserProfile($id: ID!) {
    user(id: $id) {
      id
      email
      profile {
        firstName
        lastName
        profilePic {
          url
        }
        banner {
          url
        }
        role {
          id
          name
        }
        isDeveloper
        uniqueId
        provinces {
          id
          name
        }
        schools {
          id
          name
        }
        grades {
          id
          name
        }
        isPaying
        hasSiyavulaAccess
        organization {
          id
          name
          appBg
          appBgDark
          componentBg
          componentBgDark
          icon1
          icon1Dark
          icon2
          icon2Dark
          logo
          logoDark
          primaryColor
          primaryColorDark
          secondaryColor
          secondaryColorDark
          text
          textDark
        }
        deviceId
      }
    }
  }
`;
