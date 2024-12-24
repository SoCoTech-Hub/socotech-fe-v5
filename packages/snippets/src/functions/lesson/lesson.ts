import { runQuery } from "../../graphql";
import {
  GET_LESSON_REQUIRED_LESSONS,
  GET_LESSON_RESOURCES,
  GET_LESSON_SECTIONS,
  GET_LESSONS_CARD_DETAIL,
  GET_LESSONS_SUBJECT_AND_CATEGORY,
} from "../../graphql/lesson/lesson";

export const FetchLessonSubjectAndCategory = async (
  organizationId: string,
  publishDate: string,
  subjectCategory: string,
) => {
  return await runQuery<{
    lessons: {
      subjectCategory: {
        id: string;
      };
      subject: {
        id: string;
      };
    }[];
  }>(GET_LESSONS_SUBJECT_AND_CATEGORY, {
    organizationId,
    publishDate,
    subjectCategory,
  });
};

export const FetchLessonsCardDetail = async (
  organizationId: string,
  publishDate: string,
  subjectCategory: string,
  subjectId: String,
) => {
  return await runQuery<{
    lessons: {
      id: string;
      subject: {
        id: string;
        name: string;
      };
      name: string;
      duration: string;
      featuredImage: {
        url: string;
      };
      price: string;
    }[];
  }>(GET_LESSONS_CARD_DETAIL, {
    organizationId,
    publishDate,
    subjectCategory,
    subjectId,
  });
};

export const FetchLessonSections = async (lessonId: string) => {
  return await runQuery<{
    lesson: {
      id: string;
      subject: { id: string; name: string };
      lmsQuizs: { id: string; title: string; siyavulaActivityIds: string };
      lmsSurveys: { id: string; title: string };
      lmsAssignments: { id: string; title: string; question: string };
      modules: { id: string; title: string };
    };
  }>(GET_LESSON_SECTIONS, {
    lessonId,
  });
};

export const FetchLessonResources = async (lessonId: string) => {
  return await runQuery<{
    lesson: {
      resources: { id: string; url: string; name: string; mime: string };
    };
  }>(GET_LESSON_RESOURCES, {
    lessonId,
  });
};
export const FetchLessonRequiredLessons = async (lessonId: string) => {
  return await runQuery<{
    lesson: {
      required: { id: string };
    };
  }>(GET_LESSON_REQUIRED_LESSONS, {
    lessonId,
  });
};
