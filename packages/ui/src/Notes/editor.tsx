import { useEffect, useState } from "react";

import { Alert, AlertDescription } from "../alert";
import { Button } from "../button";
import { DropdownSelect } from "../dropdownSelect";
import { Input } from "../input";
import { Label } from "../label";
import MDX from "../Mdx";
import { Skeleton } from "../skeleton";

interface Subject {
  id: string;
  name: string;
}

interface Note {
  id: string;
  name: string;
  subject: Subject;
  note: string;
  read: boolean;
}

export interface NoteEditorProps {
  subjects: Subject[];
  note?: Note;
  onSave: (
    title: string,
    description: string,
    read: boolean,
    subject: string,
    id?: string,
  ) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({
  subjects,
  note,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(note?.name ?? "");
  const [subject, setSubject] = useState(note?.subject.id ?? "");
  const [description, setDescription] = useState(note?.note ?? "");
  const [read, setRead] = useState(note?.read ?? false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (note) {
      setRead(note.read);
    }
  }, [note]);

  useEffect(() => {
    if (title && subject && description) {
      setLoading(false);
    }
  }, [description, subject, title]);

  const onSubmit = () => {
    setError(null);
    if (!subject || !title) {
      setError("Please provide a title and a subject");
      return;
    }

    try {
      setSuccess("Note saved successfully 👍");
      setTimeout(() => {
        onSave(title, description, read, subject, note?.id);
        setSuccess(null);
      }, 2000);
    } catch (error) {
      console.error(error);
      setError("An error occurred while saving the note");
    }
  };

  if (loading) {
    return <NoteEditorSkeleton />;
  }

  return (
    <div className="flex flex-col space-y-4 rounded-lg bg-card p-4 shadow-md">
      <div>
        <Label htmlFor="titleInput">Title</Label>
        <Input
          id="titleInput"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <DropdownSelect
        label="Select a Subject"
        onChange={(value: string) => setSubject(value)}
        options={subjects.map(({ id, name }) => ({ value: id, label: name }))}
      />
      <MDX value={description} setValue={setDescription} />
      {(error ?? success) && (
        <Alert variant={error ? "destructive" : "default"} className="mb-4">
          <AlertDescription>{error ?? success}</AlertDescription>
        </Alert>
      )}
      <div className="flex flex-wrap gap-4">
        <Button onClick={onSubmit}>{note ? "Update" : "Create"} Note</Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

// Skeleton for NoteEditor
const NoteEditorSkeleton: React.FC = () => (
  <div className="space-y-4 rounded-lg bg-card p-4 shadow-md">
    <Skeleton className="h-8 w-1/2" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-32 w-full" />
    <div className="flex gap-4">
      <Skeleton className="h-10 w-24" />
      <Skeleton className="h-10 w-24" />
    </div>
  </div>
);

