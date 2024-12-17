import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import LeftDrawer from ".";
import { Button } from "../button";

const meta: Meta<typeof LeftDrawer> = {
  title: "Components/LeftDrawer",
  component: LeftDrawer,
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: { type: "boolean" },
      description: "Determines if the drawer is open or closed.",
    },
    onClose: {
      action: "onClose",
      description: "Function to close the drawer.",
    },
    title: {
      control: { type: "text" },
      description: "Title of the drawer.",
    },
    children: {
      control: { type: "text" },
      description: "Content to display inside the drawer.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof LeftDrawer>;

export const Default: Story = {
  render: function DefaultRender(args) {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
        <LeftDrawer {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <p>This is the content inside the drawer.</p>
        </LeftDrawer>
      </>
    );
  },
  args: {
    title: "Menu",
  },
};
