import React, { useEffect, useState } from "react";

import saveNote from "@acme/snippets/posts/notes";

import { Alert, AlertDescription } from "../alert";
import { Button } from "../button";
import { Input } from "../input";
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
  onSave: () => void;
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

  const onSubmit = async () => {
    setError(null);
    if (!subject || !title) {
      setError("Please provide a title and a subject");
      return;
    }

    try {
      await saveNote({
        id: note?.id,
        name: title,
        note: description,
        read,
        subjectId: subject,
      });
      setSuccess("Note saved successfully 👍");
      setTimeout(() => {
        onSave();
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
    <div className="rounded-lg bg-card p-4 shadow-md">
      <Input
        id="titleInput"
        placeholder="Title"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="mb-4"
      />
      <Select
        options={subjects.map(({ id, name }) => ({ value: id, label: name }))}
        value={subject}
        onChange={(value: React.SetStateAction<string>) => setSubject(value)}
        placeholder="Select a Subject"
        className="mb-4"
      />
      <Textarea
        className="mb-4"
        rows={13}
        placeholder="Start typing your note..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
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
