import { gql } from '@apollo/client';

const GetFAQCategoryData = gql`
  query GetFAQCategoryData($faqCategoryID: ID!) {
    faqCategory(id: $faqCategoryID) {
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
export default GetFAQCategoryData;
