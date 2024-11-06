import React, { useMemo, useState } from "react";
import { ArrowUpDown } from "lucide-react";

import { deleteNote } from "@acme/snippets";

import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { DeleteModal } from "../DeleteModal";
import { Pagination } from "../pagination";
import { Skeleton } from "../skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";

interface Note {
  profile: { id: string };
  id: string;
  created_at: string;
  name: string;
  subject?: {
    name: string;
  };
}

interface NotesProps {
  notes: Note[];
  refetchNotes: () => void;
  isLoading: boolean;
}

type SortKey = "created_at" | "name" | "subject.name";
type SortOrder = "asc" | "desc";

export const NotesTable: React.FC<NotesProps> = ({
  notes,
  refetchNotes,
  isLoading,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<Note | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const pageSize = 10;
  const totalPages = Math.ceil(notes.length / pageSize);

  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => {
      let aValue = sortKey === "subject.name" ? a.subject?.name : a[sortKey];
      let bValue = sortKey === "subject.name" ? b.subject?.name : b[sortKey];

      if (!aValue) aValue = "";
      if (!bValue) bValue = "";

      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  }, [notes, sortKey, sortOrder]);

  const currentTableData = sortedNotes.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleDelete = (note: Note) => {
    setDeleteItem(note);
    setIsOpen(true);
  };

  const onDelete = async () => {
    if (deleteItem) {
      console.log(`Deleting note id: ${deleteItem.id}`);
      await deleteNote({ id: deleteItem.id, profile: deleteItem.profile });
      refetchNotes();
    }
  };

  const renderSkeletonRows = () => {
    return Array(pageSize)
      .fill(0)
      .map((_, index) => (
        <TableRow key={`skeleton-${index}`}>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[200px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[150px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-8 w-[100px]" />
          </TableCell>
        </TableRow>
      ));
  };

  const renderSortableHeader = (label: string, key: SortKey) => (
    <TableHead>
      <Button
        variant="ghost"
        onClick={() => handleSort(key)}
        className="hover:bg-transparent"
      >
        {label}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </TableHead>
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {renderSortableHeader("Date", "created_at")}
              {renderSortableHeader("Note", "name")}
              {renderSortableHeader("Subject", "subject.name")}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              renderSkeletonRows()
            ) : currentTableData.length > 0 ? (
              currentTableData.map((note) => (
                <TableRow key={note.id}>
                  <TableCell>
                    <a href={`/notes/${note.id}`} className="font-medium">
                      {new Date(note.created_at).toLocaleDateString()}
                    </a>
                  </TableCell>
                  <TableCell>
                    <a href={`/notes/${note.id}`}>{note.name}</a>
                  </TableCell>
                  <TableCell>
                    <a href={`/notes/${note.id}`} className="font-medium">
                      {note.subject?.name ?? ""}
                    </a>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(note)}
                    >
                      Delete note
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No notes found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </CardContent>
      <DeleteModal
        id={deleteItem?.id ?? ""}
        name="Note"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        refetchNotes={refetchNotes}
        onDelete={onDelete}
      />
    </Card>
  );
};
