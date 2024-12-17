
export const GET_APIBURSARYRESPONSEBURSARYRESPONSE_QUERY = `
query GetApiBursaryResponseBursaryResponse($limit: Int!) {
  apibursaryresponsebursaryresponse(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        bursary
        createdAt
        createdBy
        locale
        localizations
        profile
        publishedAt
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiBursaryResponseBursaryResponse {
  id: string;
  attributes: {
    bursary: string;
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    profile: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiBursaryResponseBursaryResponseResponse {
  apibursaryresponsebursaryresponse: {
    data: ApiBursaryResponseBursaryResponse[];
  };
}
