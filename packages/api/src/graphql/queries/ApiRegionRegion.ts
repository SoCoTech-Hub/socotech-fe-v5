
export const GET_APIREGIONREGION_QUERY = `
query GetApiRegionRegion($limit: Int!) {
  apiregionregion(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        locale
        localizations
        name
        province
        publishedAt
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiRegionRegion {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    name: string;
    province: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiRegionRegionResponse {
  apiregionregion: {
    data: ApiRegionRegion[];
  };
}
