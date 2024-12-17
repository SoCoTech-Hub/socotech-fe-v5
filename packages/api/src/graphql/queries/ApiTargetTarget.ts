
export const GET_APITARGETTARGET_QUERY = `
query GetApiTargetTarget($limit: Int!) {
  apitargettarget(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        articles
        createdAt
        createdBy
        feed
        gender
        grade
        locale
        localizations
        name
        province
        publishedAt
        school
        subject
        subject_category
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiTargetTarget {
  id: string;
  attributes: {
    articles: string;
    createdAt: string;
    createdBy: string;
    feed: string;
    gender: string;
    grade: string;
    locale: string;
    localizations: string;
    name: string;
    province: string;
    publishedAt: string;
    school: string;
    subject: string;
    subject_category: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiTargetTargetResponse {
  apitargettarget: {
    data: ApiTargetTarget[];
  };
}
