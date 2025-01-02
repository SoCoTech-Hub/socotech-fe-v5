// import { api } from "@acme/api";

import { runQuery } from "../../graphql";
import { GET_ARTICLE_READERS } from "../../graphql/article/articleReader";

// import { FetchProfileSchools } from "./profile";

export const fetchArticleReads = async ({
  profileId,
  articleId,
  // organizationId,
}: {
  profileId: string;
  articleId: string;
  organizationId: string;
}) => {
  const articleReaders = await FetchArticleReaders({ articleId, profileId });
  if (!articleReaders.id) {
    // const profile = await FetchProfileSchools(profileId);
    //TODO: complete logic here
    // await api.POST("/article-readers", {
    //   profile: { id: profileId },
    //   article: { id: articleId },
    //   organization: { id: organizationId },
    //   school: {
    //     id:
    //       profile?.schools && profile.schools.length > 0
    //         ? profile.schools[0].id
    //         : null,
    //   },
    // });
  }
};

export const FetchArticleReaders = async ({
  articleId,
  profileId,
}: {
  articleId: string;
  profileId: string;
}) => {
  return await runQuery<{
    id?: string;
  }>(GET_ARTICLE_READERS, { profileId, articleId });
};
