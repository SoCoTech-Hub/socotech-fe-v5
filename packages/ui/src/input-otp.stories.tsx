import { Meta, StoryObj } from "@storybook/react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./input-otp";

const meta: Meta<typeof InputOTP> = {
  title: "InputOTP",
  component: InputOTP,
  tags: ["autodocs"],
  argTypes: {
    maxLength: {
      control: "number",
      description: "Specifies the maximum number of input slots.",
    },
    autoFocus: {
      control: "boolean",
      description: "Auto-focuses the first input slot on load.",
      defaultValue: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputOTP>;

export const inputOTP: Story = {
  args: {
    maxLength: 6,
    autoFocus: true,
  },
  render: (args) => (
    <InputOTP {...args}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};
