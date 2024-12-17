
export const GET_APIPROVINCEPROVINCE_QUERY = `
query GetApiProvinceProvince($limit: Int!) {
  apiprovinceprovince(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        country
        createdAt
        createdBy
        lessons
        locale
        localizations
        name
        profiles
        publishedAt
        regions
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiProvinceProvince {
  id: string;
  attributes: {
    country: string;
    createdAt: string;
    createdBy: string;
    lessons: string;
    locale: string;
    localizations: string;
    name: string;
    profiles: string;
    publishedAt: string;
    regions: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiProvinceProvinceResponse {
  apiprovinceprovince: {
    data: ApiProvinceProvince[];
  };
}
