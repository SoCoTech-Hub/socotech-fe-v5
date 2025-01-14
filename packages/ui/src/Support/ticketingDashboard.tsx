"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Search } from "lucide-react";

import type { TicketItem } from "./list";
import { Button } from "../button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import { Input } from "../input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import { TicketDetail } from "./detail";
import { FeedbackForm } from "./feedback";
import { CreateSupportForm } from "./form";
import { TicketList } from "./list";

export interface TicketingDashboardProps {
  tickets: TicketItem[];
  createTicket?: (ticket: TicketItem) => void;
}
export function TicketingDashboard(props: TicketingDashboardProps) {
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [activeTicket, setActiveTicket] = useState<TicketItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (props.tickets.length === 0) return;
    setTickets(props.tickets);
    setIsLoading(false);
  }, [props.tickets]);

  const itemsPerPage = 10;
  const filteredTickets = tickets
    .filter(
      (ticket) =>
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === "all" || ticket.status === statusFilter) &&
        (locationFilter === "all" || ticket.location === locationFilter),
    )
    .sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.created).getTime() - new Date(a.created).getTime();
      if (sortBy === "oldest")
        return new Date(a.created).getTime() - new Date(b.created).getTime();
      return 0;
    });

  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleCreateTicket = (
    title: string,
    description: string,
    location: string,
  ) => {
    const newTicket = {
      id: tickets.length + 1,
      title,
      description,
      status: "Open",
      created: new Date().toISOString().split("T")[0],
      location,
    };
    setTickets([newTicket, ...tickets]);
    props.createTicket?.(newTicket);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Ticketing System</h1>
      <Sheet open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Feedback
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Provide Feedback</SheetTitle>
            <SheetDescription>
              Help us improve our ticketing system
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4">
            <FeedbackForm onBack={() => setIsFeedbackOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
      <Tabs defaultValue="tickets" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
          <TabsTrigger value="create">Create Ticket</TabsTrigger>
        </TabsList>
        <TabsContent value="tickets">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Tickets</CardTitle>
                <CardDescription>
                  View and manage your support tickets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex space-x-2">
                      <Input
                        type="text"
                        placeholder="Search tickets..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow"
                      />
                      <Button variant="outline" size="icon">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                      <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="Open">Open</SelectItem>
                          <SelectItem value="In Progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="Closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value={locationFilter}
                        onValueChange={setLocationFilter}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Locations</SelectItem>
                          <SelectItem value="Frontend">Frontend</SelectItem>
                          <SelectItem value="Backend">Backend</SelectItem>
                          <SelectItem value="Database">Database</SelectItem>
                          <SelectItem value="Network">Network</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest First</SelectItem>
                          <SelectItem value="oldest">Oldest First</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <TicketList
                    tickets={paginatedTickets}
                    onSelectTicket={setActiveTicket}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    isLoading={isLoading}
                  />
                </div>
              </CardContent>
            </Card>
            {activeTicket && <TicketDetail ticket={activeTicket} />}
          </div>
        </TabsContent>
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Ticket</CardTitle>
              <CardDescription>Submit a new support ticket</CardDescription>
            </CardHeader>
            <CardContent>
              <CreateSupportForm onSubmit={handleCreateTicket} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
