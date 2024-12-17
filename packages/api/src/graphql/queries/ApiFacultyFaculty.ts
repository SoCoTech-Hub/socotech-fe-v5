
export const GET_APIFACULTYFACULTY_QUERY = `
query GetApiFacultyFaculty($limit: Int!) {
  apifacultyfaculty(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        about
        background
        color
        createdAt
        createdBy
        icon
        institutes
        locale
        localizations
        name
        publishedAt
        qualifications
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiFacultyFaculty {
  id: string;
  attributes: {
    about: string;
    background: string;
    color: string;
    createdAt: string;
    createdBy: string;
    icon: string;
    institutes: string;
    locale: string;
    localizations: string;
    name: string;
    publishedAt: string;
    qualifications: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiFacultyFacultyResponse {
  apifacultyfaculty: {
    data: ApiFacultyFaculty[];
  };
}
