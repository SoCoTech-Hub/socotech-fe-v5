import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./command";

const meta: Meta<typeof CommandDialog> = {
  title: "Command",
  component: CommandDialog,
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Controls whether the dialog is open or closed.",
      defaultValue: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof CommandDialog>;

export const Default: Story = {
  args: {
    open: true,
  },
  render: (args) => (
    <CommandDialog {...args}>
      <CommandInput placeholder="Search..." />
      <CommandList className="bg-primaryForeground/10">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          <CommandItem>
            Profile
            <CommandShortcut>Ctrl+P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Settings
            <CommandShortcut>Ctrl+S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup>
          <CommandItem>
            Documentation
            <CommandShortcut>Ctrl+D</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Support
            <CommandShortcut>Ctrl+H</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  ),
};

export const WithEmptyState: Story = {
  args: {
    open: false,
  },
  render: (args) => (
    <CommandDialog {...args}>
      <CommandInput placeholder="Type something to search..." />
      <CommandList>
        <CommandEmpty>No matching items found.</CommandEmpty>
      </CommandList>
    </CommandDialog>
  ),
};
