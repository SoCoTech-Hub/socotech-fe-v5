/* eslint-disable @typescript-eslint/consistent-type-definitions */
import React from "react";
import { useQuery } from "@apollo/client";

import { useUser } from "@acme/snippets/contexts/UserContext";
import GetSupportTicketsTable from "@acme/snippets/graphql/support/GetSupportTicketsTable";

import { Skeleton } from "../skeleton";

interface SupportTicket {
  id: string;
  title: string;
  supportStatus: {
    name: string;
  };
  assignedTo: {
    firstName: string;
    lastName: string;
  } | null;
  supportTopic: {
    name: string;
  };
}

type GetSupportTicketsTableData = {
  supportTickets: SupportTicket[];
};

interface SupportTicketTableProps {
  onTicketClick: (ticketId: string) => void;
}

export const SupportTicketTable: React.FC<SupportTicketTableProps> = ({
  onTicketClick,
}) => {
  const { user } = useUser();
  if (!user) {
    return null;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error, loading } = useQuery<GetSupportTicketsTableData>(
    GetSupportTicketsTable,
    {
      variables: {
        id: user.profile.id,
      },
    },
  );

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <div className="w-full">
      {loading ? (
        <TicketSkeleton />
      ) : data?.supportTickets.length ? (
        data.supportTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="w-full cursor-pointer p-2"
            onClick={() => onTicketClick(ticket.id)}
          >
            <div className="flex gap-2">
              <div className="pr-3 pt-2 font-bold">#{ticket.id}</div>
              <div className="flex w-full flex-wrap">
                <div className="flex w-full justify-between">
                  <div className="flex">
                    <div className="font-bold">{ticket.title}</div>
                  </div>
                  <div className="font-bold">{ticket.supportStatus.name}</div>
                </div>
                <div className="flex w-full justify-between">
                  <div className="">
                    {ticket.assignedTo
                      ? `${ticket.assignedTo.firstName} ${ticket.assignedTo.lastName}`
                      : "Unassigned"}
                  </div>
                  <div className="">{ticket.supportTopic.name}</div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="py-4 text-center">No Tickets Created</div>
      )}
    </div>
  );
};

const TicketSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      {[...Array(3)].map((_, index) => (
        <div key={index} className="w-full p-2">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-10" />
            <div className="flex w-full flex-wrap space-y-2">
              <div className="flex w-full justify-between">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
              <div className="flex w-full justify-between">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/5" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
