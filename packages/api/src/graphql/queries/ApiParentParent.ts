
export const GET_APIPARENTPARENT_QUERY = `
query GetApiParentParent($limit: Int!) {
  apiparentparent(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        email
        firstName
        idnumber
        lastName
        locale
        localizations
        mobileNr
        parenRelation
        parentTitle
        profiles
        publishedAt
        updatedAt
        updatedBy
        workNr
      }
    }
  }
}
`;

export interface ApiParentParent {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    email: string;
    firstName: string;
    idnumber: string;
    lastName: string;
    locale: string;
    localizations: string;
    mobileNr: string;
    parenRelation: string;
    parentTitle: string;
    profiles: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
    workNr: string;
  };
}

export interface GetApiParentParentResponse {
  apiparentparent: {
    data: ApiParentParent[];
  };
}
