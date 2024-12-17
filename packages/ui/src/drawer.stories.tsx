import { Meta, StoryObj } from "@storybook/react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";

const meta: Meta<typeof Drawer> = {
  title: "Drawer",
  component: Drawer,
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Controls whether the drawer is open or closed.",
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  args: {
    open: true,
  },
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger className="rounded bg-blue-500 px-4 py-2 text-white">
        Open Drawer
      </DrawerTrigger>
      <DrawerContent className="bg-white">
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>
            This is a description of the drawer's purpose and content.
          </DrawerDescription>
        </DrawerHeader>
        <p className="p-4 text-sm text-gray-600">
          Here is some additional content inside the drawer. You can place any
          elements you need here.
        </p>
        <DrawerFooter>
          <button
            className="rounded bg-gray-200 px-4 py-2 text-gray-800"
            onClick={() => {}}
          >
            Close
          </button>
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white"
            onClick={() => {}}
          >
            Confirm
          </button>
        </DrawerFooter>
        <DrawerClose />
      </DrawerContent>
    </Drawer>
  ),
};

export const WithCustomOverlay: Story = {
  args: {
    open: false,
  },
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger className="rounded bg-blue-500 px-4 py-2 text-white">
        Open Custom Drawer
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Custom Overlay Drawer</DrawerTitle>
          <DrawerDescription>
            This drawer includes a customized overlay with different styles.
          </DrawerDescription>
        </DrawerHeader>
        <p className="p-4 text-sm text-gray-600">
          Additional content for the drawer with custom overlay styling.
        </p>
        <DrawerFooter>
          <button
            className="rounded bg-gray-200 px-4 py-2 text-gray-800"
            onClick={() => {}}
          >
            Close
          </button>
        </DrawerFooter>
        <DrawerClose />
      </DrawerContent>
    </Drawer>
  ),
};
