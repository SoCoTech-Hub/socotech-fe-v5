import React from "react";

import { NoteEditor, NoteEditorProps } from "@acme/ui"; // Import NoteEditor and its props interface

interface CreateNoteProps {
  subjects: NoteEditorProps["subjects"]; // Use the subjects type from NoteEditorProps
  profileId: string; // Assuming profileId is a required string
}

const CreateNote: React.FC<CreateNoteProps> = ({ subjects, profileId }) => {
  const handleSave: NoteEditorProps["onSave"] = (
    title,
    description,
    read,
    subject,
    id,
  ) => {
    console.log("Note created:", { title, description, read, subject });
    // Add logic to save the note
  };

  const handleCancel: NoteEditorProps["onCancel"] = () => {
    console.log("Note creation canceled");
    // Add logic to handle cancellation (e.g., navigate away or reset state)
  };

  return (
    <div className="desktop:mb-4 laptop:mb-4 mobile:mb-10 col row">
      <div className="desktop:gx-5 desktop:gy-4 mobile:space-y-3 space-y-10">
        <NoteEditor
          subjects={subjects}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default CreateNote;
