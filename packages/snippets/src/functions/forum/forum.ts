import { runQuery } from "../../graphql";
import { GET_FORUMS } from "../../graphql/forum/forum";

export const FetchForums = async (slug: string) => {
  return await runQuery<{
    forums: {
      id: string;
      name?: string;
      answer?: string;
      question?: string;
      likes?: { id: string };
      saves?: { id: string };
      parentForum?: {
        id: string;
        likes: { id: string };
        saves: { id: string };
      };
      updated_at: string;
      user?: {
        profile: {
          id: string;
          firstName: string;
          lastName?: string;
          profilePic?: { url: string };
        };
      };
      pin: boolean;
    }[];
  }>(GET_FORUMS, { slug });
};
