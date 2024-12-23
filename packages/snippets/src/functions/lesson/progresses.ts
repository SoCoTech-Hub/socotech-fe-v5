import { runQuery } from "../../graphql";
import {
  GET_LESSON_PROGRESS,
  GET_LESSON_PROGRESSES,
} from "../../graphql/lesson/progress";

export const FetchLessonProgresses = async (
  subjectId: string,
  subjectCategory: string,
  profileId: string,
) => {
  return await runQuery<{
    progresses: {
      id: string;
      lesson: {
        id: string;
        subject: { name: string };
        name: string;
        duration: string;
        featuredImage: { url: string };
      };
      subject: { id: string; name: string };
    }[];
  }>(GET_LESSON_PROGRESSES, { subjectId, subjectCategory, profileId });
};

export const FetchLessonProgress = async (userId: string, lessonId: string) => {
  return await runQuery<{
    progresses: {
      id: string;
      totalSteps: string;
      completedSteps: string;
      isComplete: boolean;
    }[];
  }>(GET_LESSON_PROGRESS, { userId, lessonId });
};
