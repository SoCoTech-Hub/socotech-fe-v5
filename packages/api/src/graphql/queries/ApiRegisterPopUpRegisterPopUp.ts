
export const GET_APIREGISTERPOPUPREGISTERPOPUP_QUERY = `
query GetApiRegisterPopUpRegisterPopUp($limit: Int!) {
  apiregisterpopupregisterpopup(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        locale
        localizations
        publishedAt
        updatedAt
        updatedBy
        url
      }
    }
  }
}
`;

export interface ApiRegisterPopUpRegisterPopUp {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
    url: string;
  };
}

export interface GetApiRegisterPopUpRegisterPopUpResponse {
  apiregisterpopupregisterpopup: {
    data: ApiRegisterPopUpRegisterPopUp[];
  };
}
