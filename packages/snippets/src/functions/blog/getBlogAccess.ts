import { runQuery } from "../../graphql";
import { GET_BLOG_ACCESS } from "../../graphql/access/getBlogAccess";

export const FetchBlogAccess = async (orgId: string) => {
  return await runQuery<{
    accesses: {
      name: string;
      url: string;
      isPaid: string;
    }[];
  }>(GET_BLOG_ACCESS, { orgId });
};
