
export const GET_APIZOOMZOOM_QUERY = `
query GetApiZoomZoom($limit: Int!) {
  apizoomzoom(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        access
        createdAt
        createdBy
        email
        key
        locale
        localizations
        organization
        publishedAt
        sdkKey
        secret
        stsAccountId
        stsApiKey
        stsApiSecret
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiZoomZoom {
  id: string;
  attributes: {
    access: string;
    createdAt: string;
    createdBy: string;
    email: string;
    key: string;
    locale: string;
    localizations: string;
    organization: string;
    publishedAt: string;
    sdkKey: string;
    secret: string;
    stsAccountId: string;
    stsApiKey: string;
    stsApiSecret: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiZoomZoomResponse {
  apizoomzoom: {
    data: ApiZoomZoom[];
  };
}
