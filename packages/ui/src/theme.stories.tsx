import type { Meta, StoryObj } from "@storybook/react";

import { ThemeProvider, ThemeToggle } from "./theme";

const meta: Meta<typeof ThemeToggle> = {
  title: "ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="system">
        <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#000000" },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {
  render: () => <ThemeToggle />,
};
