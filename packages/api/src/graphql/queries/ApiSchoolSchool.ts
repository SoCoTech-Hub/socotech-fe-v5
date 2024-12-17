
export const GET_APISCHOOLSCHOOL_QUERY = `
query GetApiSchoolSchool($limit: Int!) {
  apischoolschool(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        district
        email
        locale
        localizations
        name
        profiles
        province
        publishedAt
        suburb
        tellephone
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiSchoolSchool {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    district: string;
    email: string;
    locale: string;
    localizations: string;
    name: string;
    profiles: string;
    province: string;
    publishedAt: string;
    suburb: string;
    tellephone: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiSchoolSchoolResponse {
  apischoolschool: {
    data: ApiSchoolSchool[];
  };
}
