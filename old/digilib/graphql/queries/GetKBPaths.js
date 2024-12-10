import { gql } from '@apollo/client';

const GetKBPaths = gql`
  query GetKBPaths {
    knowledgeBases {
      id
    }
  }
`;
export default GetKBPaths;
