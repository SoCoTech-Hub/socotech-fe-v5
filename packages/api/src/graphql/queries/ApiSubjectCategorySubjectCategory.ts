
export const GET_APISUBJECTCATEGORYSUBJECTCATEGORY_QUERY = `
query GetApiSubjectCategorySubjectCategory($limit: Int!) {
  apisubjectcategorysubjectcategory(pagination: { limit: $limit }) {
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
        subjects
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiSubjectCategorySubjectCategory {
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
    subjects: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiSubjectCategorySubjectCategoryResponse {
  apisubjectcategorysubjectcategory: {
    data: ApiSubjectCategorySubjectCategory[];
  };
}
