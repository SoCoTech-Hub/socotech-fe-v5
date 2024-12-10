import { gql } from '@apollo/client';

const GetKBSearchResults = gql`
  query GetKBSearchResults(
    $searchTerm: String!
    $categoryID: [ID]
    $gradesID: [ID]
  ) {
    knowledgeBases(
      where: {
        _and: [
          { name_contains: $searchTerm }
          { categories: { id: $categoryID } }
          { grades: { id: $gradesID } }
        ]
      }
    ) {
      id
      name
      categories {
        id
        name
      }
      topics {
        id
        name
      }
      language
      subject {
        name
      }
    }
  }
`;
export default GetKBSearchResults;
