
export const GET_APIQUALIFICATIONQUALIFICATION_QUERY = `
query GetApiQualificationQualification($limit: Int!) {
  apiqualificationqualification(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        author
        closeDate
        createdAt
        createdBy
        degree
        description
        duration
        faculty
        hashtags
        institute
        locale
        localizations
        name
        openDate
        organization
        programmDescription
        publishedAt
        requirements
        shortDescription
        subjects
        updatedAt
        updatedBy
        url
      }
    }
  }
}
`;

export interface ApiQualificationQualification {
  id: string;
  attributes: {
    author: string;
    closeDate: string;
    createdAt: string;
    createdBy: string;
    degree: string;
    description: string;
    duration: string;
    faculty: string;
    hashtags: string;
    institute: string;
    locale: string;
    localizations: string;
    name: string;
    openDate: string;
    organization: string;
    programmDescription: string;
    publishedAt: string;
    requirements: string;
    shortDescription: string;
    subjects: string;
    updatedAt: string;
    updatedBy: string;
    url: string;
  };
}

export interface GetApiQualificationQualificationResponse {
  apiqualificationqualification: {
    data: ApiQualificationQualification[];
  };
}
