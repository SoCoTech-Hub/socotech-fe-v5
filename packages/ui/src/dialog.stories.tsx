import { Meta, StoryObj } from "@storybook/react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

const meta: Meta<typeof Dialog> = {
  title: "Dialog",
  component: Dialog,
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Controls whether the dialog is open or closed.",
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
    open: false,
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger className="rounded bg-blue-500 px-4 py-2 text-white">
        Open Dialog
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a description of the dialog's purpose and content.
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm text-gray-600">
          Here is some additional content for the dialog. You can put any
          elements you need here.
        </p>
        <DialogFooter>
          <button
            className="rounded bg-gray-200 px-4 py-2 text-gray-800"
            onClick={() => {}}
          >
            Cancel
          </button>
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white"
            onClick={() => {}}
          >
            Confirm
          </button>
        </DialogFooter>
        <DialogClose />
      </DialogContent>
    </Dialog>
  ),
};

export const WithCustomOverlay: Story = {
  args: {
    open: false,
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger className="rounded bg-blue-500 px-4 py-2 text-white">
        Open Custom Dialog
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Custom Overlay Dialog</DialogTitle>
          <DialogDescription>
            This dialog includes a customized overlay with different styles.
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm text-gray-600">
          Additional content for the dialog with custom overlay styling.
        </p>
        <DialogFooter>
          <button
            className="rounded bg-gray-200 px-4 py-2 text-gray-800"
            onClick={() => {}}
          >
            Close
          </button>
        </DialogFooter>
        <DialogClose />
      </DialogContent>
    </Dialog>
  ),
};
