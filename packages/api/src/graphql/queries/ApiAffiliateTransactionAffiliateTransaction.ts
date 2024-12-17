
export const GET_APIAFFILIATETRANSACTIONAFFILIATETRANSACTION_QUERY = `
query GetApiAffiliateTransactionAffiliateTransaction($limit: Int!) {
  apiaffiliatetransactionaffiliatetransaction(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        accountNumber
        affiliate
        affiliateStatus
        balance
        createdAt
        createdBy
        locale
        localizations
        paid
        paidDate
        publishedAt
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiAffiliateTransactionAffiliateTransaction {
  id: string;
  attributes: {
    accountNumber: string;
    affiliate: string;
    affiliateStatus: string;
    balance: string;
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    paid: string;
    paidDate: string;
    publishedAt: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiAffiliateTransactionAffiliateTransactionResponse {
  apiaffiliatetransactionaffiliatetransaction: {
    data: ApiAffiliateTransactionAffiliateTransaction[];
  };
}
