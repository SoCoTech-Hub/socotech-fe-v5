import { api } from "../../api/api";
import { profileId } from "../../context/constants";

interface HandleArticleUpvoteParams {
  upvoted: "loves" | "likes";
  blogPostSocials: string | null;
  blogPostId: string;
  social: Record<string, any>;
  organizationId: string;
  setSocial?: (data: any) => void;
}

interface Profile {
  id: string;
}

export const handleArticleUpvote = async ({
  upvoted,
  blogPostSocials,
  blogPostId,
  social,
  organizationId,
  setSocial = () => {},
}: HandleArticleUpvoteParams): Promise<any> => {
  try {
    if (!blogPostSocials) {
      // Case: No blogPostSocials exist yet
      const response = await api.POST(`/article-likes`, {
        [upvoted]: { id: profileId },
      });

      await api.PUT(`/articles/${blogPostId}`, {
        articleLike: { id: response.data.id },
        organization: { id: organizationId },
      });

      setSocial(response.data);
      return response.data;
    } else {
      // Case: BlogPostSocials exist

      const currentList = social[0]?.[upvoted] || social[upvoted];
      const profile = { id: profileId };
      const updatedSocialsList = [...new Set([...currentList, profile])];

      const isAlreadyUpvoted = currentList.some(
        (e: Profile) => parseInt(e.id) === parseInt(profileId || ""),
      );

      if (!isAlreadyUpvoted) {
        const response = await api.PUT(`/article-likes/${blogPostSocials}`, {
          [upvoted]: updatedSocialsList,
        });

        setSocial(response.data);
        return response.data;
      }

      return null; // No changes needed
    }
  } catch (error: any) {
    console.error("Error handling article upvote:", error);
    throw error.response || error;
  }
};
