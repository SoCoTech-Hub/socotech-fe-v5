import { runQuery } from "../../graphql";
import { GET_TRANSACTIONS } from "../../graphql/payfast/transaction";

export const FetchTransactionDetail = async (
  paymentId: string,
  itemName: string,
) => {
  const { transactions } = await runQuery<{
    transactions: {
      id: string;
      orgId: string;
      firstName: string;
      lastName: string;
      email: string;
      mPaymentId: string;
      addressLine1: string;
      postalCode: string;
      company: string;
      vatNr: string;
      amount: string;
      item: string;
      description: string;
    }[];
  }>(GET_TRANSACTIONS, { paymentId, itemName });
  return transactions ? transactions[0] : transactions;
};
