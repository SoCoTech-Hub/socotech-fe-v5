import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Slider } from "./slider";

const meta: Meta<typeof Slider> = {
  title: "Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: "array",
      description: "Sets the default value for the slider thumb position(s).",
      defaultValue: [50],
    },
    min: {
      control: "number",
      description: "The minimum value of the slider.",
      defaultValue: 0,
    },
    max: {
      control: "number",
      description: "The maximum value of the slider.",
      defaultValue: 100,
    },
    step: {
      control: "number",
      description: "The step size for slider movement.",
      defaultValue: 1,
    },
    disabled: {
      control: "boolean",
      description: "Disables the slider if set to true.",
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    defaultValue: [50],
  },
  render: (args: any) => <Slider {...args} />,
};

export const Disabled: Story = {
  args: {
    defaultValue: [30],
    disabled: true,
  },
  render: (args: any) => <Slider {...args} />,
};

export const CustomRange: Story = {
  args: {
    defaultValue: [25],
    min: 0,
    max: 200,
    step: 5,
  },
  render: (args: any) => <Slider {...args} />,
};
export const SliderRange: Story = {
  args: {
    defaultValue: [25],
    min: 0,
    max: 200,
    step: 5,
  },
  render: (args: any) => (
    <Slider
      defaultValue={[50]}
      max={100}
      step={1}
      className="w-[60%]"
      {...args}
    />
  ),
};
