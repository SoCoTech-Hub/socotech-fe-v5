
export const GET_APIPROGRESSPROGRESS_QUERY = `
query GetApiProgressProgress($limit: Int!) {
  apiprogressprogress(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        completedSteps
        createdAt
        createdBy
        grade
        isComplete
        lesson
        locale
        localizations
        organization
        profile
        province
        publishedAt
        school
        subject
        timeSpent
        totalSteps
        updatedAt
        updatedBy
        user
      }
    }
  }
}
`;

export interface ApiProgressProgress {
  id: string;
  attributes: {
    completedSteps: string;
    createdAt: string;
    createdBy: string;
    grade: string;
    isComplete: string;
    lesson: string;
    locale: string;
    localizations: string;
    organization: string;
    profile: string;
    province: string;
    publishedAt: string;
    school: string;
    subject: string;
    timeSpent: string;
    totalSteps: string;
    updatedAt: string;
    updatedBy: string;
    user: string;
  };
}

export interface GetApiProgressProgressResponse {
  apiprogressprogress: {
    data: ApiProgressProgress[];
  };
}
