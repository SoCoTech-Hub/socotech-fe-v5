
export const GET_APILESSONLESSON_QUERY = `
query GetApiLessonLesson($limit: Int!) {
  apilessonlesson(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        assignments
        audios
        createdAt
        createdBy
        description
        downloadResources
        duration
        endDate
        featuredImage
        grades
        hasComment
        hasRating
        hasReview
        isLiveLesson
        link
        locale
        localizations
        modules
        name
        notes
        organization
        overview
        presenter
        price
        provinces
        publishedAt
        quizes
        requiredLesson
        resources
        social
        startDate
        subject
        subject_category
        surveys
        topic
        updatedAt
        updatedBy
        zoom
      }
    }
  }
}
`;

export interface ApiLessonLesson {
  id: string;
  attributes: {
    assignments: string;
    audios: string;
    createdAt: string;
    createdBy: string;
    description: string;
    downloadResources: string;
    duration: string;
    endDate: string;
    featuredImage: string;
    grades: string;
    hasComment: string;
    hasRating: string;
    hasReview: string;
    isLiveLesson: string;
    link: string;
    locale: string;
    localizations: string;
    modules: string;
    name: string;
    notes: string;
    organization: string;
    overview: string;
    presenter: string;
    price: string;
    provinces: string;
    publishedAt: string;
    quizes: string;
    requiredLesson: string;
    resources: string;
    social: string;
    startDate: string;
    subject: string;
    subject_category: string;
    surveys: string;
    topic: string;
    updatedAt: string;
    updatedBy: string;
    zoom: string;
  };
}

export interface GetApiLessonLessonResponse {
  apilessonlesson: {
    data: ApiLessonLesson[];
  };
}
