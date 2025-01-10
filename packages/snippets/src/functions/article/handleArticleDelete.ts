import { api } from "../../api/api";

interface SavedArticle {
  id: number;
}

interface SavedArticlesResponse {
  id: number;
  articles: SavedArticle[];
}

export default async function handleArticleDelete(
  targetId: number,
  profileId: number,
  setSavedArticlesList: (articles: SavedArticle[]) => void,
): Promise<void> {
  try {
    // Fetch the saved articles for the given profile
    const res = await api.GET(`/saved-articles?profile=${profileId}`);
    const savedArticles = (res.data as SavedArticlesResponse[])[0];

    // Filter out the article to be deleted
    const updatedArticles = savedArticles.articles.filter(
      (article: SavedArticle) => article.id !== targetId,
    );

    // Update the saved articles list on the server
    const updateResponse = await api.PUT(
      `/saved-articles/${savedArticles.id}`,
      {
        articles: updatedArticles,
      },
    );

    // Update the local saved articles list
    setSavedArticlesList(
      (updateResponse.data as SavedArticlesResponse).articles,
    );
  } catch (error: any) {
    console.error("An error occurred while deleting the article:", error);
    throw error.response || error;
  }
}
