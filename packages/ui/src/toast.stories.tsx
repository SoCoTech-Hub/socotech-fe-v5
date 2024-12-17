import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "./button";
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";

const meta: Meta<typeof Toast> = {
  title: "Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
    },
    title: {
      control: "text",
      defaultValue: "Notification",
    },
    children: {
      control: "text",
      defaultValue: "This is a toast notification.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    variant: "default",
    title: "Default Notification",
    children: "This is an example of a default toast notification.",
  },
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <ToastProvider>
        <Button onClick={() => setOpen(true)}>Show Toast</Button>
        <ToastViewport />

        {open && (
          <Toast
            open={open}
            onOpenChange={(open) => setOpen(open)}
            variant={args.variant}
          >
            <ToastTitle>{args.title}</ToastTitle>
            <ToastDescription>{args.children}</ToastDescription>
            <ToastAction altText="Undo">Undo</ToastAction>
            <ToastClose />
          </Toast>
        )}
      </ToastProvider>
    );
  },
};

export const Destructive: Story = {
  ...Default,
  args: {
    variant: "destructive",
    title: "Destructive Notification",
    children: "This is an example of a destructive toast notification.",
  },
};
