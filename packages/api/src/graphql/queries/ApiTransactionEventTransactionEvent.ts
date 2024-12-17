
export const GET_APITRANSACTIONEVENTTRANSACTIONEVENT_QUERY = `
query GetApiTransactionEventTransactionEvent($limit: Int!) {
  apitransactioneventtransactionevent(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        amountFee
        amountGross
        amountNet
        billingDate
        createdAt
        createdBy
        locale
        localizations
        paymentId
        publishedAt
        testmode
        transaction
        type
        updatedAt
        updatedBy
      }
    }
  }
}
`;

export interface ApiTransactionEventTransactionEvent {
  id: string;
  attributes: {
    amountFee: string;
    amountGross: string;
    amountNet: string;
    billingDate: string;
    createdAt: string;
    createdBy: string;
    locale: string;
    localizations: string;
    paymentId: string;
    publishedAt: string;
    testmode: string;
    transaction: string;
    type: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface GetApiTransactionEventTransactionEventResponse {
  apitransactioneventtransactionevent: {
    data: ApiTransactionEventTransactionEvent[];
  };
}
