
export const GET_APICOUNTRYCOUNTRY_QUERY = `
query GetApiCountryCountry($limit: Int!) {
  apicountrycountry(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        currency
        locale
        localizations
        name
        publishedAt
        shortCode
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiCountryCountry {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    currency: string;
    locale: string;
    localizations: string;
    name: string;
    publishedAt: string;
    shortCode: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiCountryCountryResponse {
  apicountrycountry: {
    data: ApiCountryCountry[];
  };
}
