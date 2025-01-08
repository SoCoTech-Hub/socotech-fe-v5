import { runQuery } from "../../graphql";
import { GET_TRANSACTION_EVENTS } from "../../graphql/payfast/transactionEvent";

export const FetchTransactionEventDetail = async (
  transactionId: string,
  paymentId: string,
) => {
  const { transactionEvents } = await runQuery<{
    transactionEvents: {
      id: string;
      type: string;
    }[];
  }>(GET_TRANSACTION_EVENTS, { transactionId, paymentId });
  return transactionEvents
    ? transactionEvents[transactionEvents.length - 1]
    : transactionEvents;
};
