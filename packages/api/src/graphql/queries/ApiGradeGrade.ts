
export const GET_APIGRADEGRADE_QUERY = `
query GetApiGradeGrade($limit: Int!) {
  apigradegrade(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        color
        createdAt
        createdBy
        icon
        knowledgeBases
        lessons
        locale
        localizations
        name
        profiles
        publishedAt
        subjects
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiGradeGrade {
  id: string;
  attributes: {
    color: string;
    createdAt: string;
    createdBy: string;
    icon: string;
    knowledgeBases: string;
    lessons: string;
    locale: string;
    localizations: string;
    name: string;
    profiles: string;
    publishedAt: string;
    subjects: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiGradeGradeResponse {
  apigradegrade: {
    data: ApiGradeGrade[];
  };
}
