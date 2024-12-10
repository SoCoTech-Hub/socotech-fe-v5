import { gql } from '@apollo/client';

const GetRegisterA = gql`
  query GetRegisterA($profileID: ID!) {
    profiles(where: { id: $profileID }) {
      id
      dob
      gender {
        id
      }
      mobileNr
    }

    genders {
      id
      name
    }
  }
`;
export default GetRegisterA;
