
export const GET_APISUPPORTDEPARTMENTSUPPORTDEPARTMENT_QUERY = `
query GetApiSupportDepartmentSupportDepartment($limit: Int!) {
  apisupportdepartmentsupportdepartment(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        description
        locale
        localizations
        name
        organization
        profiles
        publishedAt
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiSupportDepartmentSupportDepartment {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    description: string;
    locale: string;
    localizations: string;
    name: string;
    organization: string;
    profiles: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiSupportDepartmentSupportDepartmentResponse {
  apisupportdepartmentsupportdepartment: {
    data: ApiSupportDepartmentSupportDepartment[];
  };
}
