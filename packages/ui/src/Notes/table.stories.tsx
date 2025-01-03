import type { Meta, StoryFn } from "@storybook/react";

import { NotesProps, NotesTable } from "./table";

export default {
  title: "Components/NotesTable",
  component: NotesTable,
} as Meta;

const Template: StoryFn<NotesProps> = (args) => <NotesTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  notes: [
    {
      profile: { id: "1" },
      id: "note1",
      created_at: "2023-01-01T12:00:00Z",
      name: "Introduction to Algebra",
      subject: { name: "Math" },
    },
    {
      profile: { id: "2" },
      id: "note2",
      created_at: "2023-01-02T14:30:00Z",
      name: "Shakespeare's Sonnets",
      subject: { name: "English Literature" },
    },
    {
      profile: { id: "3" },
      id: "note3",
      created_at: "2023-01-03T09:15:00Z",
      name: "Basics of Quantum Physics",
      subject: { name: "Physics" },
    },
  ],
  isLoading: false,
  refetchNotes: () => console.log("Refetching notes..."),
  deleteNote: ({ id, profileId }) =>
    console.log(`Deleting note with id ${id} for profile ${profileId}`),
};

export const Loading = Template.bind({});
Loading.args = {
  notes: [],
  isLoading: true,
  refetchNotes: () => console.log("Refetching notes..."),
  deleteNote: ({ id, profileId }) =>
    console.log(`Deleting note with id ${id} for profile ${profileId}`),
};

export const Empty = Template.bind({});
Empty.args = {
  notes: [],
  isLoading: false,
  refetchNotes: () => console.log("Refetching notes..."),
  deleteNote: ({ id, profileId }) =>
    console.log(`Deleting note with id ${id} for profile ${profileId}`),
};
