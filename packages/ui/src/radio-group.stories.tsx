import { Meta, StoryObj } from "@storybook/react";

import { RadioGroup, RadioGroupItem } from "./radio-group";

const meta: Meta<typeof RadioGroup> = {
  title: "RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: "text",
      description: "The default selected value for the radio group.",
      defaultValue: "option1",
    },
    className: {
      control: "text",
      description:
        "Additional CSS classes for custom styling of the radio group.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {
    defaultValue: "option1",
  },
  render: (args) => (
    <RadioGroup {...args} className="flex flex-col gap-2">
      <label className="flex items-center gap-2">
        <RadioGroupItem value="option1" />
        Option 1
      </label>
      <label className="flex items-center gap-2">
        <RadioGroupItem value="option2" />
        Option 2
      </label>
      <label className="flex items-center gap-2">
        <RadioGroupItem value="option3" />
        Option 3
      </label>
    </RadioGroup>
  ),
};

export const WithDisabledOption: Story = {
  args: {
    defaultValue: "option1",
  },
  render: (args) => (
    <RadioGroup {...args} className="flex flex-col gap-2">
      <label className="flex items-center gap-2">
        <RadioGroupItem value="option1" />
        Option 1
      </label>
      <label className="flex items-center gap-2">
        <RadioGroupItem value="option2" />
        Option 2
      </label>
      <label className="flex items-center gap-2">
        <RadioGroupItem value="option3" disabled />
        Option 3 (Disabled)
      </label>
    </RadioGroup>
  ),
};
