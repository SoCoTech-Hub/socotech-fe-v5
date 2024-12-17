
export const GET_APIKBTOPICKBTOPIC_QUERY = `
query GetApiKbTopicKbTopic($limit: Int!) {
  apikbtopickbtopic(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        knowledgeBases
        locale
        localizations
        name
        organization
        publishedAt
        slug
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiKbTopicKbTopic {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    knowledgeBases: string;
    locale: string;
    localizations: string;
    name: string;
    organization: string;
    publishedAt: string;
    slug: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiKbTopicKbTopicResponse {
  apikbtopickbtopic: {
    data: ApiKbTopicKbTopic[];
  };
}
