
export const GET_APISUBJECTSUBJECT_QUERY = `
query GetApiSubjectSubject($limit: Int!) {
  apisubjectsubject(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        color
        createdAt
        createdBy
        grades
        icon
        locale
        localizations
        name
        organization
        price
        profiles
        publishedAt
        qualifications
        subjectCategories
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiSubjectSubject {
  id: string;
  attributes: {
    color: string;
    createdAt: string;
    createdBy: string;
    grades: string;
    icon: string;
    locale: string;
    localizations: string;
    name: string;
    organization: string;
    price: string;
    profiles: string;
    publishedAt: string;
    qualifications: string;
    subjectCategories: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiSubjectSubjectResponse {
  apisubjectsubject: {
    data: ApiSubjectSubject[];
  };
}
