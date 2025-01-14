import type { Meta, StoryFn } from "@storybook/react";

import type { GridProps } from "./grid";
import { Grid } from "./grid";

export default {
  title: "Lesson/Grid",
  component: Grid,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: StoryFn<GridProps<any>> = (args) => <Grid {...args} />;

export const LoadingExample = Template.bind({});
LoadingExample.args = {
  items: [],
  renderItem: (item) => <div>{item}</div>,
  isLoading: true,
};

export const ItemsExample = Template.bind({});
ItemsExample.args = {
  items: ["Item 1", "Item 2", "Item 3", "Item 4"],
  renderItem: (item) => <div className="rounded border p-4 shadow">{item}</div>,
  isLoading: false,
};
