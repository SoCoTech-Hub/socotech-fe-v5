
export const GET_APIPARENRELATIONPARENRELATION_QUERY = `
query GetApiParenRelationParenRelation($limit: Int!) {
  apiparenrelationparenrelation(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        locale
        localizations
        name
        organization
        publishedAt
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiParenRelationParenRelation {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    name: string;
    organization: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiParenRelationParenRelationResponse {
  apiparenrelationparenrelation: {
    data: ApiParenRelationParenRelation[];
  };
}
