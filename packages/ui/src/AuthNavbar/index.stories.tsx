import type { Meta, StoryFn } from "@storybook/react";

import type { AuthNavbarProps } from "./";
import { AuthNavbar } from "./";

export default {
  title: "AuthNavbar",
  component: AuthNavbar,
} as Meta;

const Template: StoryFn<AuthNavbarProps> = (args) => <AuthNavbar {...args} />;

export const Default = Template.bind({});
Default.args = {
  companyName: "Example Company",
  companyLogo: "https://via.placeholder.com/200x150",
  items: [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ],
  user: {
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://via.placeholder.com/150",
  },
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  companyName: "Example Company",
  companyLogo: "https://via.placeholder.com/200x150",
  items: [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ],
  user: {
    name: "Guest",
    email: "mail@mail.com",
    image: "https://via.placeholder.com/150",
  },
};
