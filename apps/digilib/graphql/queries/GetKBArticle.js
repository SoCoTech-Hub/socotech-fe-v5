import { gql } from '@apollo/client';

const GetKBArticle = gql`
query GetKBArticle($knowledgeBaseID: ID!) {
  knowledgeBase(id: $knowledgeBaseID) {
    id
    name
    attachment {
      url
    }
    download
    categories {
      id
      name
    }
    subject {
      name
    }
  }
}
`;
export default GetKBArticle;
