import { runQuery } from "../../graphql";
import { GET_LESSON_RATING_COUNT } from "../../graphql/lessonRatings/getLessonRatingCount";

interface CountLessonRatingsParams {
  id: string;
}

interface CountLessonRatingsResponse {
  lessonRatings: number;
}

export default async function countLessonRatings({
  id,
}: CountLessonRatingsParams): Promise<CountLessonRatingsResponse> {
  try {
    const { lessonRatingsConnection } = await runQuery<{
      lessonRatingsConnection: {
        aggregate: { count: number };
      };
    }>(GET_LESSON_RATING_COUNT, { id });

    return {
      lessonRatings: lessonRatingsConnection.aggregate.count,
    };
  } catch (error: any) {
    console.error("Error fetching lesson rating count:", error);
    return {
      lessonRatings: 0,
    };
  }
}
