import { ApiTransactionEventTransactionEvent } from "@acme/api/graphql/index.js";

import { runQuery } from "../../graphql";
import { GET_TRANSACTION_EVENT_BY_PAYMENT_ID } from "../../graphql/account/transactionEvent";

export const FetchTransactionEventsByPaymentId = async (mPaymentId: string) => {
  return await runQuery<ApiTransactionEventTransactionEvent[]>(
    GET_TRANSACTION_EVENT_BY_PAYMENT_ID,
    { mPaymentId },
  );
};
