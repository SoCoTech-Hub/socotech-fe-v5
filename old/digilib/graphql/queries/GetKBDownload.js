import { gql } from '@apollo/client';

const GetKBDownload = gql`
  query GetKBDownload($knowledgeBaseID: ID!) {
    knowledgeBase(id: $knowledgeBaseID) {
      id
      download
    }
  }
`
export default GetKBDownload;
