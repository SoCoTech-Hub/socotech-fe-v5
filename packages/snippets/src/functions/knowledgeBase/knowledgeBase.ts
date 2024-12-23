import { runQuery } from "../../graphql";
import { GET_KNOWLEDGE_BASES } from "../../graphql/knowledgeBase/knowledgeBase";

export const FetchKnowledgeBases = async (
  categoryId: string,
  organizationId: string,
) => {
  return await runQuery<{
    knowledgeBases: {
      id: string;
      link: string;
      name: string;
      categories: {
        id: string;
        name: string;
      };
      language: string;
      releaseYear: string;
      subject: {
        id: string;
        name: string;
      };
      grades: {
        id: string;
        name: string;
      };
    }[];
  }>(GET_KNOWLEDGE_BASES, { categoryId, organizationId });
};
