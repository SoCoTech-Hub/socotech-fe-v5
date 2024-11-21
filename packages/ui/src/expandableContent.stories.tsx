import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import type { ExpandableContentProps } from "./expandableContent";
import { ExpandableContent } from "./expandableContent";

export default {
  title: "ExpandableContent",
  component: ExpandableContent,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    content: { control: "text" },
    maxHeight: { control: "number" },
    className: { control: "text" },
  },
} as Meta<typeof ExpandableContent>;

const Template: StoryFn<ExpandableContentProps> = (args) => (
  <ExpandableContent {...args} />
);

export const Default = Template.bind({});
Default.args = {
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet velit ut arcu mollis dapibus at eget ex. Fusce posuere neque vitae nisi efficitur, sed suscipit lectus condimentum. Pellentesque id dolor nec enim suscipit gravida at eget dui. Praesent id ligula nec eros facilisis suscipit vitae non massa. Integer feugiat quam id nisi commodo, sed accumsan metus scelerisque. Suspendisse eu ex eu arcu malesuada dictum. Donec sollicitudin ligula in volutpat euismod.",
  maxHeight: 1,
};

export const ShortContent = Template.bind({});
ShortContent.args = {
  content: "This is a short piece of content that won't need expansion.",
  maxHeight: 1,
};

export const CustomMaxHeight = Template.bind({});
CustomMaxHeight.args = {
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus viverra neque non urna dictum, non lacinia mi pulvinar. Sed volutpat ipsum lorem, ac tincidunt arcu fermentum eget. Nulla eget neque bibendum, vehicula orci sed, fermentum arcu. Aliquam erat volutpat. Donec malesuada arcu eu turpis interdum, nec efficitur enim interdum. Duis maximus felis id turpis fringilla scelerisque.",
  maxHeight: 2,
};

export const VeryLongContent = Template.bind({});
VeryLongContent.args = {
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
    "Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. " +
    "Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. " +
    "Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. " +
    "Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. " +
    "Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. " +
    "Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in " +
    "faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque " +
    "fermentum. Maecenas adipiscing ante non diam sodales hendrerit.",
  maxHeight: 2,
};
