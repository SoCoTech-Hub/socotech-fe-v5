import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Header from "./";

const meta: Meta<typeof Header> = {
  title: "Header",
  component: Header,
  tags: ["autodocs"],
  argTypes: {
    logo: {
      control: { type: "text" },
      description: "The URL of the logo image.",
    },
    navItems: {
      control: { type: "object" },
      description: "Navigation items for the header.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  render: (args) => <Header {...args} />,
  args: {
    logo: "https://via.placeholder.com/40",
    navItems: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/contact" },
    ],
  },
};
