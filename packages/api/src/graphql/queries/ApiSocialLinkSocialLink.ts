
export const GET_APISOCIALLINKSOCIALLINK_QUERY = `
query GetApiSocialLinkSocialLink($limit: Int!) {
  apisociallinksociallink(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        color
        createdAt
        createdBy
        icon
        locale
        localizations
        name
        publishedAt
        updatedAt
        updatedBy
        url
      }
    }
  }
}
`;

export interface ApiSocialLinkSocialLink {
  id: string;
  attributes: {
    color: string;
    createdAt: string;
    createdBy: string;
    icon: string;
    locale: string;
    localizations: string;
    name: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
    url: string;
  };
}

export interface GetApiSocialLinkSocialLinkResponse {
  apisociallinksociallink: {
    data: ApiSocialLinkSocialLink[];
  };
}
