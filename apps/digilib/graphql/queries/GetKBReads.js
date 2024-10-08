import { gql } from '@apollo/client';

const GetKBReads = gql`
  query GetKBReads($knowledgeBaseID: ID!, $profileID: ID!) {
    kbReads(
      where: {
        knowledgeBase: { id: $knowledgeBaseID }
        profile: { id: $profileID }
      }
    ) {
      id
      read
    }
  }
`;
export default GetKBReads;
