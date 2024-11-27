import React, { useEffect, useState } from "react";

import { Alert, AlertDescription } from "../alert";
import { Button } from "../button";
import { Input } from "../input";
import MDX from "../Mdx";
import { Select } from "../select";
import { Skeleton } from "../skeleton";
import { Textarea } from "../textarea";

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

interface NoteEditorProps {
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
    <div className="p-4 rounded-lg shadow-md bg-card">
      <Input
        id="titleInput"
        placeholder="Title"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="mb-4"
      />

      <Select
        options={}
        value={subject}
        onChange={(value: React.SetStateAction<string>) => setSubject(value)}
        placeholder="Select a Subject"
        className="mb-4"
      >
       { subjects.map(({ id, name }) => (<SelectItem value="option1">Option 1</SelectItem> ))}
       
      </Select>
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
  <div className="p-4 space-y-4 rounded-lg shadow-md bg-card">
    <Skeleton className="w-1/2 h-8" />
    <Skeleton className="w-full h-10" />
    <Skeleton className="w-full h-32" />
    <div className="flex gap-4">
      <Skeleton className="w-24 h-10" />
      <Skeleton className="w-24 h-10" />
    </div>
  </div>
);
