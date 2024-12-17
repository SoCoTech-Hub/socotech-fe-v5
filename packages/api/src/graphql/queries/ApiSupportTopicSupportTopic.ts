
export const GET_APISUPPORTTOPICSUPPORTTOPIC_QUERY = `
query GetApiSupportTopicSupportTopic($limit: Int!) {
  apisupporttopicsupporttopic(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        locale
        localizations
        name
        organization
        publishedAt
        support_department
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiSupportTopicSupportTopic {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    name: string;
    organization: string;
    publishedAt: string;
    support_department: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiSupportTopicSupportTopicResponse {
  apisupporttopicsupporttopic: {
    data: ApiSupportTopicSupportTopic[];
  };
}
