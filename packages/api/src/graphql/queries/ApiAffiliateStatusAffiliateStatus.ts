
export const GET_APIAFFILIATESTATUSAFFILIATESTATUS_QUERY = `
query GetApiAffiliateStatusAffiliateStatus($limit: Int!) {
  apiaffiliatestatusaffiliatestatus(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        color
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

export interface ApiAffiliateStatusAffiliateStatus {
  id: string;
  attributes: {
    color: string;
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

export interface GetApiAffiliateStatusAffiliateStatusResponse {
  apiaffiliatestatusaffiliatestatus: {
    data: ApiAffiliateStatusAffiliateStatus[];
  };
}
