import { gql } from "graphql-tag";

export const GET_TRANSACTION_EVENT_BY_PAYMENT_ID = gql`
  query GetTransactionById($mPaymentId: string!) {
    transactionEvents(where: { transaction: { mPaymentId: $mPaymentId } }) {
      amountFee
      amountGross
      amountNet
      billingDate
      localizations
      paymentId
      publishedAt
      testmode
      transaction {
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
        organization {
          name
          logo {
            url
          }
        }
        password
        paymentMethod
        postalCode
        profile {
          firstName
          lastName
        }
        province {
          name
        }
        publishedAt
        recurringAmount
        referral {
          firstName
          lastName
        }
        sendEmail
        signature
        subscriptionType
        updatedAt
        updatedBy
        vatNr
      }
      type
      locale
      createdAt
      createdBy
      updatedAt
      updatedBy
    }
  }
`;
