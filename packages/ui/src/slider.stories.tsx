import type { Meta, StoryFn } from "@storybook/react";

import { Slider } from "./slider";

export default {
  title: "Components/Slider",
  component: Slider,
} as Meta;

const Template: StoryFn = (args) => (
  <div className="w-64">
    <Slider {...args} />
  </div>
);

export const DefaultSlider = Template.bind({});
DefaultSlider.args = {
  defaultValue: [50],
  max: 100,
  step: 1,
  ariaLabel: "Default Slider",
};

export const RangeSlider = Template.bind({});
RangeSlider.args = {
  defaultValue: [20, 80],
  max: 100,
  step: 1,
  ariaLabel: "Range Slider",
};
