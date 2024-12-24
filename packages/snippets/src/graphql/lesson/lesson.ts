import { gql } from "graphql-tag";

export const GET_LESSONS_SUBJECT_AND_CATEGORY = gql`
  query GetLessonsSubjectAndCategories(
    $organizationId: string
    $publishDate: string
    $subjectCategory: string
  ) {
    lessons(
      where: {
        organization: { id: $organizationId }
        published_at_lt: $publishDate
        subjectCategory: { id: $subjectCategory }
      }
    ) {
      subjectCategory {
        id
      }
      subject {
        id
      }
    }
  }
`;

export const GET_LESSONS_CARD_DETAIL = gql`
  query GetLessonsCardDetail(
    $organizationId: string
    $publishDate: string
    $subjectCategory: string
    $subjectId: String
  ) {
    lessons(
      where: {
        organization: { id: $organizationId }
        published_at_lt: $publishDate
        subjectCategory: { id: $subjectCategory }
        subject: { id: $subjectId }
      }
      sort: "name:asc"
    ) {
      id
      subject {
        id
        name
      }
      name
      duration
      featuredImage {
        url
      }
      price
    }
  }
`;

export const GET_LESSON_SECTIONS = gql`
  query GetLessonSections($lesson: string) {
    lesson(id: $lesson) {
      id
      subject {
        id
        name
      }
      lmsQuizs {
        id
        title
        siyavulaActivityIds
      }
      lmsSurveys {
        id
        title
      }
      lmsAssignments {
        id
        title
        question
      }
      modules {
        id
        title
      }
    }
  }
`;
export const GET_LESSON_RESOURCES = gql`
  query GetLessonSections($lesson: string) {
    lesson(id: $lesson) {
      resources {
        id
        name
        mime
        url
      }
    }
  }
`;

export const GET_LESSON_REQUIRED_LESSONS = gql`
  query GetLessonRequiredLessons($lessonId: string) {
    lesson(id: $lessonId) {
      required {
        id
      }
    }
  }
`;
