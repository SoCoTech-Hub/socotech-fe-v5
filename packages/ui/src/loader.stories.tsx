import type { Meta, StoryObj } from "@storybook/react";

import Loader from "./loader";

const meta: Meta<typeof Loader> = {
  title: "Loader",
  component: Loader,
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description:
        "Optional image source to display instead of the loader animation.",
      defaultValue: "",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  args: {},
  render: (args) => <Loader {...args} />,
};

export const WithImage: Story = {
  args: {
    src: "https://user-images.githubusercontent.com/6876788/96633009-d1818000-1318-11eb-9f1d-7f914f4ccb16.gif",
  },
  render: (args) => <Loader {...args} />,
};
