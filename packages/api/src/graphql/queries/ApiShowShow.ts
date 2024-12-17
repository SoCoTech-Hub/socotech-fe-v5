
export const GET_APISHOWSHOW_QUERY = `
query GetApiShowShow($limit: Int!) {
  apishowshow(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        description
        image
        locale
        localizations
        name
        organization
        publishedAt
        show_categories
        transcript
        updatedAt
        updatedBy
        url
      }
    }
  }
}
`;

export interface ApiShowShow {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    description: string;
    image: string;
    locale: string;
    localizations: string;
    name: string;
    organization: string;
    publishedAt: string;
    show_categories: string;
    transcript: string;
    updatedAt: string;
    updatedBy: string;
    url: string;
  };
}

export interface GetApiShowShowResponse {
  apishowshow: {
    data: ApiShowShow[];
  };
}
