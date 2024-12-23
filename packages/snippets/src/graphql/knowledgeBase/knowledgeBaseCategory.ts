import { gql } from "graphql-tag";

export const GET_KNOWLEDGE_BASE_CATEGORY = gql`
  query GetKnowledgeBaseCategory($categoryId: string) {
    knowledgeBaseCategory(id: $categoryId) {
      id
      name
    }
  }
`;
