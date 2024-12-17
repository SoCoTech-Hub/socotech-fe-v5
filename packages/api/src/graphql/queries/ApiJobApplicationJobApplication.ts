
export const GET_APIJOBAPPLICATIONJOBAPPLICATION_QUERY = `
query GetApiJobApplicationJobApplication($limit: Int!) {
  apijobapplicationjobapplication(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        author
        body
        createdAt
        createdBy
        institution
        locale
        localizations
        name
        organization
        publishedAt
        term
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiJobApplicationJobApplication {
  id: string;
  attributes: {
    author: string;
    body: string;
    createdAt: string;
    createdBy: string;
    institution: string;
    locale: string;
    localizations: string;
    name: string;
    organization: string;
    publishedAt: string;
    term: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiJobApplicationJobApplicationResponse {
  apijobapplicationjobapplication: {
    data: ApiJobApplicationJobApplication[];
  };
}
