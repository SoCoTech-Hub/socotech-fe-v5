import { api } from "../../api/api";
import { runQuery } from "../../graphql";
import { GET_TRANSACTIONS } from "../../graphql/transaction/getTransactions";
import { GET_TRANSACTION_EVENTS } from "../../graphql/transactionEvent/getTransactionEvents";

interface ProfileData {
  id: string;
  uniqueId: string;
  isPayingDate?: string;
  isPaying?: boolean;
}

interface Transaction {
  id: string;
}

interface TransactionEvent {
  created_at: string;
  type: string;
}

export const checkSubscription = async (
  profileData: ProfileData,
): Promise<boolean> => {
  if (typeof window === "undefined") {
    return false;
  }

  const date = new Date();

  if (profileData?.isPayingDate) {
    const payDate = new Date(profileData.isPayingDate);

    if (payDate < date) {
      // Fetch transactions
      const { transactions } = await runQuery<{ transactions: Transaction[] }>(
        GET_TRANSACTIONS,
        { mPaymentId: profileData.uniqueId },
      );

      if (!transactions || transactions.length === 0) {
        return profileData.isPaying ?? false; // User is probably an admin
      }

      // Fetch transaction events
      const { transactionEvents } = await runQuery<{
        transactionEvents: TransactionEvent[];
      }>(GET_TRANSACTION_EVENTS, { eventId: transactions[0].id });

      const handleUpdateProfile = async (
        lastTransaction: Date,
      ): Promise<boolean> => {
        lastTransaction.setMonth(lastTransaction.getMonth() + 1);
        const isPaying = lastTransaction > date;
        await api.PUT(`/profiles/${profileData.id}`, {
          isPaying,
          isPayingDate: lastTransaction.toISOString(),
        });
        return isPaying;
      };

      // Check for transactions in the current month
      const currentMonthTransactions = transactionEvents.filter((event) => {
        const eventDate = new Date(event.created_at);
        return (
          event.type === "COMPLETE" &&
          eventDate.getFullYear() === date.getFullYear() &&
          eventDate.getMonth() === date.getMonth()
        );
      });

      if (currentMonthTransactions.length > 0) {
        const lastTransaction = new Date(
          currentMonthTransactions[0].created_at,
        );
        return await handleUpdateProfile(lastTransaction);
      }

      // Check for transactions in the previous month
      const previousMonth = new Date();
      previousMonth.setMonth(previousMonth.getMonth() - 1);

      const previousMonthTransactions = transactionEvents.filter((event) => {
        const eventDate = new Date(event.created_at);
        return (
          event.type === "COMPLETE" &&
          eventDate.getFullYear() === previousMonth.getFullYear() &&
          eventDate.getMonth() === previousMonth.getMonth()
        );
      });

      if (previousMonthTransactions.length > 0) {
        const lastTransaction = new Date(
          previousMonthTransactions[0].created_at,
        );
        return await handleUpdateProfile(lastTransaction);
      }

      // No valid transactions, mark as not paying
      await api.PUT(`/profiles/${profileData.id}`, { isPaying: false });
      return false;
    }

    // Pay date is still valid
    return profileData.isPaying ?? false;
  }

  // No paying date set, check if the user is marked as paying
  return profileData.isPaying ?? false;
};

export default checkSubscription;
