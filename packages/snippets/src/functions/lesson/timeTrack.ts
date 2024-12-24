import { runQuery } from "../../graphql";
import { CHECK_LESSON_TIME_TRACK } from "../../graphql/lesson/timeTracks";

export const FetchCheckLessonTimeTrack = async (
  lessonId: string,
  userId: string,
) => {
  return await runQuery<{
    timeTracks: {
      id: string;
    }[];
  }>(CHECK_LESSON_TIME_TRACK, {
    lessonId,
    userId,
  });
};
