import { gql } from "graphql-tag";

export const GET_FAQ_CATEGORY = gql`
  query GetFaqCategory($categoryId: string) {
    faqCategory(id: $categoryId) {
      id
      name
      faqs {
        id
        question
        answer
      }
    }
  }
`;
