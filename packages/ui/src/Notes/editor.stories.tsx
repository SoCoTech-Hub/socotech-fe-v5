import type { Meta, StoryFn } from "@storybook/react";

import { NoteEditor, NoteEditorProps } from "./editor";

export default {
  title: "Components/NoteEditor",
  component: NoteEditor,
} as Meta;

const Template: StoryFn<NoteEditorProps> = (args) => <NoteEditor {...args} />;

export const Default = Template.bind({});
Default.args = {
  subjects: [
    { id: "1", name: "Math" },
    { id: "2", name: "Science" },
    { id: "3", name: "History" },
  ],
  onSave: (title, description, read, subject, id) =>
    console.log("Note saved", { title, description, read, subject, id }),
  onCancel: () => console.log("Cancelled"),
  note: {
    id: "123",
    name: "Study Guide",
    subject: { id: "1", name: "Math" },
    note: "This is a detailed study guide.",
    read: false,
  },
};

export const NewNote = Template.bind({});
NewNote.args = {
  subjects: [
    { id: "1", name: "Math" },
    { id: "2", name: "Science" },
    { id: "3", name: "History" },
  ],
  onSave: (title, description, read, subject, id) =>
    console.log("Note saved", { title, description, read, subject, id }),
  onCancel: () => console.log("Cancelled"),
};

export const Loading = Template.bind({});
Loading.args = {
  subjects: [],
  loading: true,
};
