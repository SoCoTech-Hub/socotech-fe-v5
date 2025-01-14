import { ChevronLeft, ChevronRight } from "lucide-react";

import { Badge } from "../badge";
import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Skeleton } from "../skeleton";

export interface TicketItem {
  id: number;
  title: string;
  description: string;
  status: string;
  created: string;
  location: string;
}

export const TicketList = ({
  tickets,
  onSelectTicket,
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}: {
  tickets: TicketItem[];
  onSelectTicket: (ticket: TicketItem) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}) => (
  <div className="space-y-4">
    {isLoading
      ? Array.from({ length: 5 }).map((_, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[100px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-[150px]" />
            </CardContent>
          </Card>
        ))
      : tickets.map((ticket) => (
          <Card
            key={ticket.id}
            className="cursor-pointer hover:bg-accent"
            onClick={() => onSelectTicket(ticket)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {ticket.title}
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{ticket.location}</Badge>
                <div
                  className={`rounded px-2 py-1 text-xs font-medium ${
                    ticket.status === "Open"
                      ? "bg-yellow-100 text-yellow-800"
                      : ticket.status === "In Progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {ticket.status}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Created on {ticket.created}
              </p>
            </CardContent>
          </Card>
        ))}
    <div className="mt-4 flex items-center justify-between">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
      >
        Next
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  </div>
);
