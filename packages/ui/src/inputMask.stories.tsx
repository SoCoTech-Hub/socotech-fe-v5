import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import InputMask from "./inputMask";

const meta: Meta<typeof InputMask> = {
  title: "Components/InputMask",
  component: InputMask,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["id", "imei", "mobile", "serial"],
      description: "The type of mask to apply to the input field.",
    },
    label: {
      control: { type: "text" },
      description: "The label for the input field.",
    },
    value: {
      control: { type: "text" },
      description: "The current value of the input field.",
    },
    onChange: {
      action: "onChange",
      description: "Callback function to handle changes in the input value.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputMask>;

export const Default: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState("");
    return <InputMask {...args} value={value} onChange={setValue} />;
  },
  args: {
    type: "mobile",
    label: "Mobile Number",
  },
};
