import { Meta, StoryObj } from "@storybook/react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";

const meta: Meta<typeof Collapsible> = {
  title: "Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  argTypes: {
    defaultOpen: {
      control: "boolean",
      description: "Sets the default open state of the collapsible.",
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  args: {
    defaultOpen: false,
  },
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger className="rounded bg-blue-500 px-4 py-2 text-white">
        Toggle Content
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 rounded border bg-gray-100 p-4">
        This is the collapsible content, which can be hidden or shown.
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const InitiallyOpen: Story = {
  args: {
    defaultOpen: true,
  },
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger className="rounded bg-blue-500 px-4 py-2 text-white">
        Toggle Content
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 rounded border bg-gray-100 p-4">
        This content is visible by default.
      </CollapsibleContent>
    </Collapsible>
  ),
};
