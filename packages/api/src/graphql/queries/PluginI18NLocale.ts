
export const GET_PLUGINI18NLOCALE_QUERY = `
query GetPluginI18NLocale($limit: Int!) {
  plugini18nlocale(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        code
        createdAt
        createdBy
        locale
        localizations
        name
        publishedAt
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface PluginI18NLocale {
  id: string;
  attributes: {
    code: string;
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    name: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetPluginI18NLocaleResponse {
  plugini18nlocale: {
    data: PluginI18NLocale[];
  };
}
