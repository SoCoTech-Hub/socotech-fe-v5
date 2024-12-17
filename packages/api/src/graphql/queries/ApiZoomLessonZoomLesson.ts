
export const GET_APIZOOMLESSONZOOMLESSON_QUERY = `
query GetApiZoomLessonZoomLesson($limit: Int!) {
  apizoomlessonzoomlesson(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        lesson
        locale
        localizations
        profile
        publishedAt
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiZoomLessonZoomLesson {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    lesson: string;
    locale: string;
    localizations: string;
    profile: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiZoomLessonZoomLessonResponse {
  apizoomlessonzoomlesson: {
    data: ApiZoomLessonZoomLesson[];
  };
}
