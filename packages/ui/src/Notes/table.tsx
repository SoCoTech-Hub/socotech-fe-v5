import { useMemo, useState } from "react";
import { ArrowUpDown } from "lucide-react";

import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { DeleteModal } from "../deleteModal";
import { PaginationComponent } from "../paginationComponent";
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

export interface NotesProps {
  notes: Note[];
  refetchNotes: () => void;
  isLoading: boolean;
  deleteNote?: ({ id, profileId }: { id: string; profileId: string }) => void;
}

type SortKey = "created_at" | "name" | "subject.name";
type SortOrder = "asc" | "desc";

export const NotesTable: React.FC<NotesProps> = ({
  notes,
  deleteNote,
  refetchNotes,
  isLoading,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
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
  };

  const onDelete = () => {
    if (deleteItem) {
      deleteNote?.({ id: deleteItem.id, profileId: deleteItem.profile.id });
      refetchNotes();
    }
  };

  const renderSkeletonRows = () =>
    Array(pageSize)
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

  const renderNoteRow = (note: Note) => (
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
        <DeleteModal
          id={note.id}
          name="Note"
          refetchData={refetchNotes}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );

  const renderNoteCard = (note: Note) => (
    <div className="mb-2 rounded-md border p-4" key={note.id}>
      <div className="flex justify-between">
        <div className="font-bold">{note.name}</div>
        <div>{new Date(note.created_at).toLocaleDateString()}</div>
      </div>
      <div>{note.subject?.name ?? ""}</div>
      <Button
        variant="destructive"
        onClick={() => handleDelete(note)}
        className="mt-2"
      >
        Delete note
      </Button>
    </div>
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("created_at")}
                  >
                    Date <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("name")}>
                    Note <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("subject.name")}
                  >
                    Subject <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? renderSkeletonRows()
                : currentTableData.map(renderNoteRow)}
            </TableBody>
          </Table>
        </div>
        <div className="md:hidden">
          {isLoading
            ? renderSkeletonRows()
            : currentTableData.map(renderNoteCard)}
        </div>
        {totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
