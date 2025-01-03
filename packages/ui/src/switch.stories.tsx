import type { Meta, StoryObj } from "@storybook/react";

import { Label } from "./label";
import { Switch } from "./switch";

const meta: Meta<typeof Switch> = {
  title: "Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    defaultChecked: {
      control: "boolean",
      description: "Sets the default checked state of the switch.",
      defaultValue: false,
    },
    disabled: {
      control: "boolean",
      description: "Disables the switch if set to true.",
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    defaultChecked: false,
  },
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
  render: (args) => <Switch {...args} />,
};

export const Disabled: Story = {
  args: {
    defaultChecked: false,
    disabled: true,
  },
  render: (args) => <Switch {...args} />,
};

export const CheckedDisabled: Story = {
  args: {
    defaultChecked: true,
    disabled: true,
  },
  render: (args) => <Switch {...args} />,
};
