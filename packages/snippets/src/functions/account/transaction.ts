import { ApiTransactionTransaction } from "@acme/api/graphql/index.js";

import {
  CREATE_TRANSACTION,
  GET_TRANSACTION_BY_PAYMENT_ID,
  runMutation,
  runQuery,
  UPDATE_TRANSACTION,
} from "../../graphql";

export const FetchTransactionByPaymentId = async (mPaymentId: string) => {
  return await runQuery<{
    transactions: ApiTransactionTransaction[];
  }>(GET_TRANSACTION_BY_PAYMENT_ID, { mPaymentId });
};

export async function createOrUpdateTransaction({
  id,
  data,
}: {
  id?: string;
  data: Transaction;
}): Promise<{ id: string; message: string }> {
  if (id) {
    // Update the existing transaction
    const updatedTransaction = await runMutation<{
      updateTransaction: { id: string };
    }>(UPDATE_TRANSACTION, { id: id, data });
    return {
      id: updatedTransaction.updateTransaction.id,
      message: "Updated successfully",
    };
  }

  // Create a new transaction
  const createdTransaction = await runMutation<{
    createTransaction: { id: string };
  }>(CREATE_TRANSACTION, { data });
  return {
    id: createdTransaction.createTransaction.id,
    message: "Created successfully",
  };
}
