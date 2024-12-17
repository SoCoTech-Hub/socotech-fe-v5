
export const GET_APIORGANIZATIONORGANIZATION_QUERY = `
query GetApiOrganizationOrganization($limit: Int!) {
  apiorganizationorganization(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        appBg
        appBgDark
        componentBg
        componentBgDark
        createdAt
        createdBy
        entityId
        favicon
        freemium
        icon1
        icon1Dark
        icon2
        icon2Dark
        locale
        localizations
        logo
        logoDark
        merchantId
        merchantKey
        name
        primaryColor
        primaryColorDark
        publishedAt
        secondaryColor
        secondaryColorDark
        text
        textDark
        updatedAt
        updatedBy
        vouchers
      }
    }
  }
}
`;

export interface ApiOrganizationOrganization {
  id: string;
  attributes: {
    appBg: string;
    appBgDark: string;
    componentBg: string;
    componentBgDark: string;
    createdAt: string;
    createdBy: string;
    entityId: string;
    favicon: string;
    freemium: string;
    icon1: string;
    icon1Dark: string;
    icon2: string;
    icon2Dark: string;
    locale: string;
    localizations: string;
    logo: string;
    logoDark: string;
    merchantId: string;
    merchantKey: string;
    name: string;
    primaryColor: string;
    primaryColorDark: string;
    publishedAt: string;
    secondaryColor: string;
    secondaryColorDark: string;
    text: string;
    textDark: string;
    updatedAt: string;
    updatedBy: string;
    vouchers: string;
  };
}

export interface GetApiOrganizationOrganizationResponse {
  apiorganizationorganization: {
    data: ApiOrganizationOrganization[];
  };
}
