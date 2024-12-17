
export const GET_APISUPPORTSTATUSSUPPORTSTATUS_QUERY = `
query GetApiSupportStatusSupportStatus($limit: Int!) {
  apisupportstatussupportstatus(pagination: { limit: $limit }) {
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

export interface ApiSupportStatusSupportStatus {
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

export interface GetApiSupportStatusSupportStatusResponse {
  apisupportstatussupportstatus: {
    data: ApiSupportStatusSupportStatus[];
  };
}
