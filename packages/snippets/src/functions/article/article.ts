import { runQuery } from "../../graphql";
import { GET_ARTICLE } from "../../graphql/article/article";

export const FetchArticle = async (articleId: string) => {
  return await runQuery<{
    id?: string;

    title?: string;
    shortDescription?: string;
    description?: string;
    author: {
      id?: string;
      firstName?: string;
      lastName?: string;
    };
    published_at?: string;
    image: {
      url?: string;
    };
  }>(GET_ARTICLE, { articleId });
};
