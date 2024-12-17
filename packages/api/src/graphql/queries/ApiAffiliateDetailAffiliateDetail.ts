
export const GET_APIAFFILIATEDETAILAFFILIATEDETAIL_QUERY = `
query GetApiAffiliateDetailAffiliateDetail($limit: Int!) {
  apiaffiliatedetailaffiliatedetail(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        affiliate
        bank
        code
        createdAt
        createdBy
        locale
        localizations
        name
        number
        publishedAt
        type
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiAffiliateDetailAffiliateDetail {
  id: string;
  attributes: {
    affiliate: string;
    bank: string;
    code: string;
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    name: string;
    number: string;
    publishedAt: string;
    type: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiAffiliateDetailAffiliateDetailResponse {
  apiaffiliatedetailaffiliatedetail: {
    data: ApiAffiliateDetailAffiliateDetail[];
  };
}
