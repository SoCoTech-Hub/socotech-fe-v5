import { gql } from "graphql-tag";

export const GET_KNOWLEDGE_BASES = gql`
  query GetKnowledgeBases($categoryId: string, $organizationId: string) {
    knowledgeBases(
      where: { categories: $categoryId, organization: { id: $organizationId } }
    ) {
      id
      link
      name
      categories {
        id
        name
      }
      language
      releaseYear
      subject {
        id
        name
      }
      grades {
        id
        name
      }
    }
  }
`;
