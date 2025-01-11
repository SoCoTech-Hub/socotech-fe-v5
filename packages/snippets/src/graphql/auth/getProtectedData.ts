import { gql } from "graphql-tag";

export const GET_PROTECTED_DATA = gql`
  query GetProtectedData(
    $userId: ID!
    $uniqueId: String
    $currentDate: DateTime!
  ) {
    user(id: $userId) {
      id
      role {
        name
      }
      profile {
        id
        isDeveloper
        supportDepartments {
          id
        }
        subjects {
          id
        }
        grades {
          id
        }
        schools {
          id
        }
        provinces {
          id
        }
        organization {
          id
          primaryColor
          primaryColorDark
          secondaryColor
          secondaryColorDark
          appBg
          appBgDark
          componentBg
          componentBgDark
          text
          textDark
          icon1
          icon1Dark
          icon2
          icon2Dark
          logo {
            url
          }
          logoDark {
            url
          }
        }
      }
    }
    transactions(where: { uniqueId: $uniqueId }) {
      id
    }
  }
`;
