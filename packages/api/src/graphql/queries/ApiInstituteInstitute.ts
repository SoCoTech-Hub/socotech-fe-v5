
export const GET_APIINSTITUTEINSTITUTE_QUERY = `
query GetApiInstituteInstitute($limit: Int!) {
  apiinstituteinstitute(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        background
        bursaryCategories
        color
        createdAt
        createdBy
        faculties
        icon
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

export interface ApiInstituteInstitute {
  id: string;
  attributes: {
    background: string;
    bursaryCategories: string;
    color: string;
    createdAt: string;
    createdBy: string;
    faculties: string;
    icon: string;
    locale: string;
    localizations: string;
    name: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiInstituteInstituteResponse {
  apiinstituteinstitute: {
    data: ApiInstituteInstitute[];
  };
}
