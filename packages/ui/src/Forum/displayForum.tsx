// TODO:data fetch and push
"use client";

import { useMemo, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ChevronDown, ChevronUp, MessageSquare, User } from "lucide-react";

import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Input } from "../input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";

interface ForumThread {
  id: string;
  title: string;
  author: string;
  replies: number;
  lastActivity: Date;
}

interface ForumDisplayProps {
  threads?: ForumThread[];
}

export const ForumDisplay: React.FC<ForumDisplayProps> = ({ threads }) => {
  const [sortColumn, setSortColumn] =
    useState<keyof ForumThread>("lastActivity");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const threadsPerPage = 5;

  // Sorting function
  const handleSort = (column: keyof ForumThread) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  // Memoized sorting and filtering of threads
  const filteredThreads = useMemo(() => {
    const sortedThreads = [...(threads || [])].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn])
        return sortDirection === "asc" ? -1 : 1;
      if (a[sortColumn] > b[sortColumn])
        return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return sortedThreads.filter(
      (thread) =>
        thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        thread.author.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [threads, sortColumn, sortDirection, searchTerm]);

  // Pagination logic
  const indexOfLastThread = currentPage * threadsPerPage;
  const indexOfFirstThread = indexOfLastThread - threadsPerPage;
  const currentThreads = filteredThreads.slice(
    indexOfFirstThread,
    indexOfLastThread,
  );
  const pageCount = Math.ceil(filteredThreads.length / threadsPerPage);

  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Forum Threads</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <Input
            placeholder="Search threads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
          <Select
            onValueChange={(value) => setSortColumn(value as keyof ForumThread)}
          >
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lastActivity">Last Activity</SelectItem>
              <SelectItem value="replies">Replies</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort("replies")}
                >
                  Replies
                  {sortColumn === "replies" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort("lastActivity")}
                >
                  Last Activity
                  {sortColumn === "lastActivity" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentThreads.map((thread) => (
              <TableRow key={thread.id}>
                <TableCell className="font-medium">{thread.title}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    {thread.author}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    {thread.replies}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {formatDistanceToNow(thread.lastActivity, {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {pageCount > 1 && (
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                />
              </PaginationItem>
              {Array.from({ length: pageCount }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, pageCount))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </CardContent>
    </Card>
  );
};
