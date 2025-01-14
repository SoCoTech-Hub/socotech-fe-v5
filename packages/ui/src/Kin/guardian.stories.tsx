import type { Meta, StoryFn } from "@storybook/react";

import { GuardianManager } from "./";

export default {
  title: "Components/GuardianManager",
  component: GuardianManager,
} as Meta;

const Template: StoryFn = () => <GuardianManager />;

export const DefaultGuardianManager = Template.bind({});
