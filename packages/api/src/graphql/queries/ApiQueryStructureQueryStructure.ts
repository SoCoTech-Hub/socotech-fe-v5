
export const GET_APIQUERYSTRUCTUREQUERYSTRUCTURE_QUERY = `
query GetApiQueryStructureQueryStructure($limit: Int!) {
  apiquerystructurequerystructure(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        display
        field
        locale
        localizations
        name
        publishedAt
        queryHeaders
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiQueryStructureQueryStructure {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    display: string;
    field: string;
    locale: string;
    localizations: string;
    name: string;
    publishedAt: string;
    queryHeaders: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiQueryStructureQueryStructureResponse {
  apiquerystructurequerystructure: {
    data: ApiQueryStructureQueryStructure[];
  };
}
