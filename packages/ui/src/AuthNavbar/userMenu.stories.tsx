import type { Meta, StoryFn } from "@storybook/react";

import type { UserMenuProps } from "./userMenu";
import UserMenu from "./userMenu";

export default {
  title: "AuthNavbar/UserMenu",
  component: UserMenu,
} as Meta;

const Template: StoryFn<UserMenuProps> = (args) => (
  <div className="flex h-64 w-full items-center justify-center bg-gray-100 p-4">
    <UserMenu {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  image: "https://via.placeholder.com/150",
};
