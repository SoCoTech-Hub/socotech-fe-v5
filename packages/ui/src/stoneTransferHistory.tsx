import { ArrowDownIcon, ArrowRightIcon } from "@radix-ui/react-icons";

import { Badge } from "./badge";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

interface Transfer {
  id: string;
  fromCustomerName?: string;
  toCustomerName: string;
  date: string;
  notes?: string;
}

interface StoneTransferHistoryProps {
  stoneID: string;
  transfers: Transfer[];
  loading?: boolean;
  error?: string;
}

const StoneTransferHistory: React.FC<StoneTransferHistoryProps> = ({
  stoneID,
  transfers,
  loading,
  error,
}) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Transfer History of {stoneID}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {transfers.length === 0 ? (
          <p className="text-center text-gray-500">
            No transfer history available for this gemstone.
          </p>
        ) : (
          <div className="relative">
            {transfers.map((event: Transfer, index) => (
              <div
                key={event.id}
                className="right-timeline mb-8 flex w-full items-center justify-between"
              >
                <div className="order-1 w-5/12" />
                <div className="z-20 order-1 flex h-8 w-8 items-center rounded-full bg-gray-800 shadow-xl">
                  <h1 className="mx-auto text-lg font-semibold text-white">
                    {index + 1}
                  </h1>
                </div>
                <Card className="order-1 w-5/12 px-6 py-4">
                  <Badge variant="outline" className="mb-3 text-sm">
                    {event.date}
                  </Badge>
                  <h3 className="mb-3 text-xl font-bold text-gray-800">
                    Transfer {index + 1}
                  </h3>
                  <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
                    <ArrowRightIcon className="mr-1 inline-block h-4 w-4" />
                    From: {event.fromCustomerName}
                  </p>
                  <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
                    <ArrowDownIcon className="mr-1 inline-block h-4 w-4" />
                    To: {event.toCustomerName}
                  </p>
                  {event.notes && (
                    <p className="mt-3 text-sm italic text-gray-500">
                      Note: {event.notes}
                    </p>
                  )}
                </Card>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StoneTransferHistory;
