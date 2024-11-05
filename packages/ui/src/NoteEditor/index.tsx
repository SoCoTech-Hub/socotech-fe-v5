import React, { useEffect, useState } from "react";

import { GetNoteRead } from "@acme/snippets/graphql/notes";
import saveNote from "@acme/snippets/posts/notes";

import { Alert, AlertDescription } from "../alert";
import { Button } from "../button";
import { Input } from "../input";
import { Select } from "../select";
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
  profileId: string;
  note?: Note;
  onSave: () => void;
  onCancel: () => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({
  subjects,
  profileId,
  note,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(note?.name ?? "");
  const [subject, setSubject] = useState(note?.subject?.id ?? "");
  const [description, setDescription] = useState(note?.note ?? "");
  const [read, setRead] = useState(note?.read ?? false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (note) {
      const res = GetNoteRead({ profileId });
      setRead(res);
    }
  }, [note, profileId]);

  const onSubmit = async () => {
    setError("");
    if (!subject) {
      setError("Please provide a subject");
      return;
    }
    if (!title) {
      setError("Please provide a title");
      return;
    }
    try {
      await saveNote({
        id: note?.id,
        name: title,
        note: description,
        read: read,
        subjectId: subject,
        profileId: profileId,
      });
      setSuccess("Note saved successfully 👍");
      setTimeout(() => {
        onSave();
      }, 3000);
    } catch (error) {
      console.log(error);
      setError("An error occurred while saving the note");
    }
  };

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
        options={subjects}
        value={subject}
        onChange={(value) => setSubject(value)}
        placeholder="Subject"
        className="mb-4"
      />
      <Textarea
        className="mb-4"
        rows={13}
        placeholder="Start typing your note..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {(error || success) && (
        <Alert variant={error ? "destructive" : "default"} className="mb-4">
          <AlertDescription>{error || success}</AlertDescription>
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
