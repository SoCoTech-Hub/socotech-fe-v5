import { gql } from '@apollo/client';

const GetRegisterC = gql`
query GetRegisterC($profileID: ID!) {
  profiles(where: { id: $profileID }) {
    id
    provinces {
      id
    }
    schools{
      id
      district{
        id
      }
    }
    grades{
      id
    }
  }
  provinces{
    id
    name
  }
  grades{
    id
    name
  }
}
`;
export default GetRegisterC;
