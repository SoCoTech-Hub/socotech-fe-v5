import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import ShowCardSkeleton from "./loader";

export default {
  title: "Shows/Loader",
  component: ShowCardSkeleton,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof ShowCardSkeleton>;

const Template: StoryFn<typeof ShowCardSkeleton> = () => <ShowCardSkeleton />;

export const Default = Template.bind({});
