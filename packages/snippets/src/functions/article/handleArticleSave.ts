import { api } from "../../api/api";
import { runQuery } from "../../graphql";
import { GET_SAVED_ARTICLES } from "../../graphql/savedArticle/getSavedArticles";

interface Article {
  id: number;
  title: string;
  description: string;
  image?: { url: string };
}

interface HandleArticleSaveParams {
  id: string; // Profile ID
  article: Article;
}

export const handleArticleSave = async ({
  id,
  article,
}: HandleArticleSaveParams): Promise<Article[] | { error: string }> => {
  try {
    // Fetch saved articles for the profile using GraphQL
    const { savedArticles } = await runQuery<{
      savedArticles: {
        id: string;
        articles: Article[];
      }[];
    }>(GET_SAVED_ARTICLES, { profileId: id });

    if (savedArticles.length > 0) {
      // Add the new article to the existing list
      const articlesList = [...savedArticles[0].articles, article];

      // Update the saved articles entry
      await api.PUT(`/saved-articles/${savedArticles[0].id}`, {
        articles: articlesList,
      });

      return articlesList;
    } else {
      // Create a new saved articles entry
      const res = await api.POST(`/saved-articles/`, {
        profile: { id },
        articles: [article],
      });

      return res.data.articles;
    }
  } catch (error: any) {
    console.error("Error saving the article:", error);
    return {
      error: error.message || "An error occurred while saving the article.",
    };
  }
};
