import type { Meta, StoryFn } from "@storybook/react";

import { InfoCardSkeleton } from "./loader";

export default {
  title: "Infos/Loader",
  component: InfoCardSkeleton,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof InfoCardSkeleton>;

const Template: StoryFn<typeof InfoCardSkeleton> = () => <InfoCardSkeleton />;

export const Default = Template.bind({});
