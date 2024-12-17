
export const GET_APIBURSARYBURSARY_QUERY = `
query GetApiBursaryBursary($limit: Int!) {
  apibursarybursary(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        application
        categories
        close
        createdAt
        createdBy
        locale
        localizations
        name
        note
        open
        particulars
        publishedAt
        updatedAt
        updatedBy
        url
        value
        whoQualifies
      }
    }
  }
}
`;

export interface ApiBursaryBursary {
  id: string;
  attributes: {
    application: string;
    categories: string;
    close: string;
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    name: string;
    note: string;
    open: string;
    particulars: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
    url: string;
    value: string;
    whoQualifies: string;
  };
}

export interface GetApiBursaryBursaryResponse {
  apibursarybursary: {
    data: ApiBursaryBursary[];
  };
}
