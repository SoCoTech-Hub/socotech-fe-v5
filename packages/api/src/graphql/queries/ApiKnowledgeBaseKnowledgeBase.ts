
export const GET_APIKNOWLEDGEBASEKNOWLEDGEBASE_QUERY = `
query GetApiKnowledgeBaseKnowledgeBase($limit: Int!) {
  apiknowledgebaseknowledgebase(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        access
        attachment
        author
        categories
        createdAt
        createdBy
        download
        estimatedReadingTime
        grades
        language
        link
        locale
        localizations
        name
        organization
        publishedAt
        releaseYear
        social
        subject
        topics
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiKnowledgeBaseKnowledgeBase {
  id: string;
  attributes: {
    access: string;
    attachment: string;
    author: string;
    categories: string;
    createdAt: string;
    createdBy: string;
    download: string;
    estimatedReadingTime: string;
    grades: string;
    language: string;
    link: string;
    locale: string;
    localizations: string;
    name: string;
    organization: string;
    publishedAt: string;
    releaseYear: string;
    social: string;
    subject: string;
    topics: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiKnowledgeBaseKnowledgeBaseResponse {
  apiknowledgebaseknowledgebase: {
    data: ApiKnowledgeBaseKnowledgeBase[];
  };
}
