import React from "react";
import { useRouter } from "next/router";

import { Button } from "@acme/ui/button";

interface AffiliateTransaction {
  id: string;
  paidDate: string;
  accountNumber: string | null;
  paid: string;
  balance?: string;
  affiliateStatus: {
    name: string;
    color: string;
  };
}

interface TransactionProps {
  affiliateTransactions: AffiliateTransaction[];
}

const Transaction: React.FC<TransactionProps> = ({ affiliateTransactions }) => {
  const router = useRouter();

  return (
    <>
      <div className="card m-auto rounded-lg border-none p-4 text-center shadow-sm">
        <div className="flex justify-between">
          <h1 className="m-2 text-xl font-bold">Affiliate Transactions</h1>
          <div>
            <Button className="w-32 bg-primary" onClick={() => router.back()}>
              Back
            </Button>
          </div>
        </div>
        <table className="m-4 w-fit">
          <thead>
            <tr>
              <th className="border border-gray-400 px-2 py-1">Pay date</th>
              <th className="border border-gray-400 px-2 py-1 sm:hidden">
                Account number
              </th>
              <th className="border border-gray-400 px-2 py-1">Amount paid</th>
              <th className="border border-gray-400 px-2 py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {affiliateTransactions?.length > 0 ? (
              affiliateTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="border border-gray-400 px-4 py-2">
                    {transaction.paidDate}
                  </td>
                  <td className="border border-gray-400 px-4 py-2 sm:hidden">
                    {transaction.accountNumber?.replace(
                      /^(.{1}).*(.{4})$/,
                      "$1****$2",
                    )}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {transaction.paid}
                  </td>
                  <td
                    className="border border-gray-400 px-4 py-2"
                    style={{ color: transaction.affiliateStatus.color }}
                  >
                    {transaction.affiliateStatus.name}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="border border-gray-400 px-4 py-2 text-center"
                >
                  No Transactions to display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row pt-3">
        <Button className="w-32 bg-primary" onClick={() => router.back()}>
          Back
        </Button>
      </div>
    </>
  );
};

export default Transaction;
