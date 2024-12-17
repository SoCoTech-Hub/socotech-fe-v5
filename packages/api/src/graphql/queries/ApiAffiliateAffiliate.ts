
export const GET_APIAFFILIATEAFFILIATE_QUERY = `
query GetApiAffiliateAffiliate($limit: Int!) {
  apiaffiliateaffiliate(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        affiliate_details
        createdAt
        createdBy
        isApproved
        locale
        localizations
        note
        profile
        publishedAt
        updatedAt
        updatedBy
        user
      }
    }
  }
}
`;

export interface ApiAffiliateAffiliate {
  id: string;
  attributes: {
    affiliate_details: string;
    createdAt: string;
    createdBy: string;
    isApproved: string;
    locale: string;
    localizations: string;
    note: string;
    profile: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
    user: string;
  };
}

export interface GetApiAffiliateAffiliateResponse {
  apiaffiliateaffiliate: {
    data: ApiAffiliateAffiliate[];
  };
}
