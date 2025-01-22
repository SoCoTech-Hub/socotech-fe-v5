import React from "react";

import { NoteEditor, NoteEditorProps } from "@acme/ui"; // Use the exported interface

interface NotesDisplayProps {
  subjects: NoteEditorProps["subjects"]; // Use the `subjects` type from NoteEditorProps
  note?: NoteEditorProps["note"]; // Use the `note` type from NoteEditorProps
  profileId: string; // Assuming profileId is a required string
}

const NotesDisplay: React.FC<NotesDisplayProps> = ({
  subjects,
  note,
  profileId,
}) => {
  const handleSave: NoteEditorProps["onSave"] = (
    title,
    description,
    read,
    subject,
    id,
  ) => {
    console.log("Note saved:", { title, description, read, subject, id });
    // Add logic to save the note
  };

  const handleCancel: NoteEditorProps["onCancel"] = () => {
    console.log("Note editing canceled");
    // Add logic to handle cancellation (e.g., navigate away or reset state)
  };

  return (
    <div className="desktop:mb-4 laptop:mb-4 mobile:mb-10 col row">
      <div className="desktop:gx-5 desktop:gy-4 mobile:space-y-3 space-y-10">
        <NoteEditor
          subjects={subjects}
          note={note}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default NotesDisplay;
