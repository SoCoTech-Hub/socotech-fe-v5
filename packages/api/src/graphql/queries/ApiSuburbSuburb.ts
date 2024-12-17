
export const GET_APISUBURBSUBURB_QUERY = `
query GetApiSuburbSuburb($limit: Int!) {
  apisuburbsuburb(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        district
        locale
        localizations
        name
        province
        publishedAt
        schools
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiSuburbSuburb {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    district: string;
    locale: string;
    localizations: string;
    name: string;
    province: string;
    publishedAt: string;
    schools: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiSuburbSuburbResponse {
  apisuburbsuburb: {
    data: ApiSuburbSuburb[];
  };
}
