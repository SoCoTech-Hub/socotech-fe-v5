
export const GET_APIADDRESSADDRESS_QUERY = `
query GetApiAddressAddress($limit: Int!) {
  apiaddressaddress(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        addressLine1
        addressLine2
        contactNr
        country
        createdAt
        createdBy
        locale
        localizations
        postalCode
        profile
        province
        publishedAt
        town
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiAddressAddress {
  id: string;
  attributes: {
    addressLine1: string;
    addressLine2: string;
    contactNr: string;
    country: string;
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    postalCode: string;
    profile: string;
    province: string;
    publishedAt: string;
    town: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiAddressAddressResponse {
  apiaddressaddress: {
    data: ApiAddressAddress[];
  };
}
