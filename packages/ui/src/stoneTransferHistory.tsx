import { ArrowDownIcon, ArrowRightIcon } from "@radix-ui/react-icons"
import { Badge } from "./badge"
import { Card, CardContent, CardHeader, CardTitle } from "./card"


interface Transfer {
	id:string
  fromCustomerName?: string;
  toCustomerName: string;
  date: string;
	notes?: string
}

interface StoneTransferHistoryProps {
	stoneID: string
  transfers: Transfer[];
	loading?:boolean
	error?:string
}

const StoneTransferHistory: React.FC<StoneTransferHistoryProps> = ({stoneID,transfers,loading,error }) => {

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Transfer History of {stoneID}</CardTitle>
      </CardHeader>
      <CardContent>
        {transfers.length === 0 ? (
          <p className="text-center text-gray-500">No transfer history available for this gemstone.</p>
        ) : (
          <div className="relative">
            {transfers.map((event: Transfer,index) => (
              <div key={event.id} className="mb-8 flex justify-between items-center w-full right-timeline">
                <div className="order-1 w-5/12"/>
                <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                  <h1 className="mx-auto font-semibold text-lg text-white">{index + 1}</h1>
                </div>
                <Card className="order-1 w-5/12 px-6 py-4">
                  <Badge variant="outline" className="mb-3 text-sm">
                    {event.date}
                  </Badge>
                  <h3 className="mb-3 font-bold text-gray-800 text-xl">Transfer {index + 1}</h3>
                  <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
                    <ArrowRightIcon className="inline-block mr-1 h-4 w-4" />
                    From: {event.fromCustomerName}
                  </p>
                  <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
                    <ArrowDownIcon className="inline-block mr-1 h-4 w-4" />
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
