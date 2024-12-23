import { runQuery } from "../../graphql";
import { GET_KNOWLEDGE_BASE_CATEGORY } from "../../graphql/knowledgeBase/knowledgeBaseCategory";


export const FetchKnowledgeBaseCategory = async (categoryId: string) => {
  return await runQuery<{
    knowledgeBaseCategory: {
      id: string;
      name: string;
    };
  }>(GET_KNOWLEDGE_BASE_CATEGORY, { categoryId });
};