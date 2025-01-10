import { runQuery } from "../../graphql";
import { GET_FORUM_RATINGS_COUNT } from "../../graphql/forum/getForumRatingsCount";

interface CountRatingsParams {
  id: string;
}

interface CountRatingsResponse {
  forumConnection: number;
}

export default async function countRatings({
  id,
}: CountRatingsParams): Promise<CountRatingsResponse> {
  try {
    const { forumsConnection } = await runQuery<{
      forumsConnection: {
        aggregate: { count: number };
      };
    }>(GET_FORUM_RATINGS_COUNT, { id });

    return {
      forumConnection: forumsConnection.aggregate.count,
    };
  } catch (error: any) {
    console.error("Error fetching forum ratings count:", error);
    return {
      forumConnection: 0,
    };
  }
}
