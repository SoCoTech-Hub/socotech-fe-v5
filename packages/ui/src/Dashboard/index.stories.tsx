import type { Meta, StoryObj } from "@storybook/react";

import { UserDashboard } from "./index";

const meta = {
  title: "Dashboard/Index",
  component: UserDashboard,
  argTypes: {},
} satisfies Meta<typeof UserDashboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
