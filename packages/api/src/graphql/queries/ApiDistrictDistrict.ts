
export const GET_APIDISTRICTDISTRICT_QUERY = `
query GetApiDistrictDistrict($limit: Int!) {
  apidistrictdistrict(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        country
        createdAt
        createdBy
        locale
        localizations
        name
        province
        publishedAt
        suburbs
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiDistrictDistrict {
  id: string;
  attributes: {
    country: string;
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    name: string;
    province: string;
    publishedAt: string;
    suburbs: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiDistrictDistrictResponse {
  apidistrictdistrict: {
    data: ApiDistrictDistrict[];
  };
}
