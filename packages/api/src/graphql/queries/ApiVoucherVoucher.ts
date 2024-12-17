
export const GET_APIVOUCHERVOUCHER_QUERY = `
query GetApiVoucherVoucher($limit: Int!) {
  apivouchervoucher(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        createdAt
        createdBy
        days
        discount
        isUsed
        locale
        localizations
        name
        number
        organization
        publishedAt
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiVoucherVoucher {
  id: string;
  attributes: {
    createdAt: string;
    createdBy: string;
    days: string;
    discount: string;
    isUsed: string;
    locale: string;
    localizations: string;
    name: string;
    number: string;
    organization: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiVoucherVoucherResponse {
  apivouchervoucher: {
    data: ApiVoucherVoucher[];
  };
}
