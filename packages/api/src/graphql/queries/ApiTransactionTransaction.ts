
export const GET_APITRANSACTIONTRANSACTION_QUERY = `
query GetApiTransactionTransaction($limit: Int!) {
  apitransactiontransaction(pagination: { limit: $limit }) {
    data {
      id
      attributes {
        additionalInformation
        addressLine1
        affiliate
        amount
        billingDate
        cellnr
        company
        createdAt
        createdBy
        currency
        cycles
        description
        email
        emailBcc
        emailCc
        emailConfirmation
        expiryTime
        firstName
        frequency
        item
        lastName
        locale
        localizations
        mPaymentId
        notes
        organization
        password
        paymentMethod
        postalCode
        profile
        province
        publishedAt
        recurringAmount
        referral
        sendEmail
        signature
        subscriptionType
        updatedAt
        updatedBy
        vatNr
      }
    }
  }
}
`;

export interface ApiTransactionTransaction {
  id: string;
  attributes: {
    additionalInformation: string;
    addressLine1: string;
    affiliate: string;
    amount: string;
    billingDate: string;
    cellnr: string;
    company: string;
    createdAt: string;
    createdBy: string;
    currency: string;
    cycles: string;
    description: string;
    email: string;
    emailBcc: string;
    emailCc: string;
    emailConfirmation: string;
    expiryTime: string;
    firstName: string;
    frequency: string;
    item: string;
    lastName: string;
    locale: string;
    localizations: string;
    mPaymentId: string;
    notes: string;
    organization: string;
    password: string;
    paymentMethod: string;
    postalCode: string;
    profile: string;
    province: string;
    publishedAt: string;
    recurringAmount: string;
    referral: string;
    sendEmail: string;
    signature: string;
    subscriptionType: string;
    updatedAt: string;
    updatedBy: string;
    vatNr: string;
  };
}

export interface GetApiTransactionTransactionResponse {
  apitransactiontransaction: {
    data: ApiTransactionTransaction[];
  };
}
