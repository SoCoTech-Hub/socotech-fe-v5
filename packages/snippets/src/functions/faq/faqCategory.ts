import { runQuery } from "../../graphql";
import { GET_FAQ_CATEGORY } from "../../graphql/faq/faqCategory";

export const FetchFaqCategory = async (categoryId: string) => {
  return await runQuery<{
    faqCategory: {
      id: string;
      name: string;
      faqs: { id: string; question: string; answer: string }[];
    };
  }>(GET_FAQ_CATEGORY, { categoryId });
};
