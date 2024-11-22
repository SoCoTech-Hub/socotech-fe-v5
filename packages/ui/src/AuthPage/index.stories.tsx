import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import type { AuthPageProps } from "./";
import AuthPage from "./";

export default {
  title: "AuthPage/Index",
  component: AuthPage,
} as Meta;

const Template: StoryFn<AuthPageProps> = (args) => <AuthPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  bgImage: "https://via.placeholder.com/600x800",
  bgColor: "#f0f4f8",
  leftTitle: (
    <h1 className="text-4xl font-bold text-gray-800">
      Welcome to Our Platform
    </h1>
  ),
  content: (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-700">
        Log in to Continue
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        Enter your credentials to access your account.
      </p>
    </div>
  ),
  contentBgColor: "#ffffff",
  hasNavbar: true,
  authNavbar: {
    companyName: "Example Company",
    companyLogo: "/logo.png",
    items: [
      { title: "Home", href: "/" },
      { title: "About", href: "/about" },
    ],
    user: {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      image: "https://via.placeholder.com/150",
    },
  },
};

export const WithoutNavbar = Template.bind({});
WithoutNavbar.args = {
  bgImage: "https://via.placeholder.com/600x800",
  leftTitle: (
    <h1 className="text-4xl font-bold text-gray-800">
      Welcome to Our Platform
    </h1>
  ),
  content: (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-700">
        Log in to Continue
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        Enter your credentials to access your account.
      </p>
    </div>
  ),
  contentBgColor: "#ffffff",
  hasNavbar: false,
};

export const CustomNavbar = Template.bind({});
CustomNavbar.args = {
  bgImage: "https://via.placeholder.com/600x800",
  leftTitle: (
    <h1 className="text-4xl font-bold text-gray-800">
      Welcome to Our Platform
    </h1>
  ),
  content: (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-700">
        Log in to Continue
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        Enter your credentials to access your account.
      </p>
    </div>
  ),
  contentBgColor: "#ffffff",
  customNavbar: (
    <div className="fixed w-full bg-gray-900 p-4 text-white">
      <h1>Custom Navbar</h1>
    </div>
  ),
};
