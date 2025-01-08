import { ApiTransactionTransaction } from "@acme/api/graphql";

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

export async function UpsertTransaction({
  id,
  data,
}: {
  id?: string;
  data?: Partial<ApiTransactionTransaction["attributes"]>;
}): Promise<{ id: string; message: string }> {
  if (id) {
    // Update the existing transaction
    const updatedTransaction = await runMutation<{
      updateTransaction: { id: string };
    }>(UPDATE_TRANSACTION, { id, data });
    return {
      id: updatedTransaction.updateTransaction.id,
      message: "Updated Successfully",
    };
  }

  // Create a new transaction
  const createdTransaction = await runMutation<{
    createTransaction: { id: string };
  }>(CREATE_TRANSACTION, { data });
  return {
    id: createdTransaction.createTransaction.id,
    message: "Created Successfully",
  };
}
