
export const GET_APIAFFILIATESETTINGAFFILIATESETTING_QUERY = `
query GetApiAffiliateSettingAffiliateSetting($limit: Int!) {
  apiaffiliatesettingaffiliatesetting(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        isActive
        locale
        localizations
        organization
        publishedAt
        rate
        terms
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiAffiliateSettingAffiliateSetting {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    isActive: string;
    locale: string;
    localizations: string;
    organization: string;
    publishedAt: string;
    rate: string;
    terms: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiAffiliateSettingAffiliateSettingResponse {
  apiaffiliatesettingaffiliatesetting: {
    data: ApiAffiliateSettingAffiliateSetting[];
  };
}
