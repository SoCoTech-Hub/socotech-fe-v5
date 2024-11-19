import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import type { UserAboutProps } from "./userAbout";
import UserAbout from "./userAbout";

export default {
  title: "Dashboard/UserAbout",
  component: UserAbout,
  argTypes: {
    school: { control: "text" },
    province: { control: "text" },
    grade: { control: "text" },
    bio: { control: "text" },
  },
} as Meta;

const Template: StoryFn<UserAboutProps> = (args) => <UserAbout {...args} />;

export const Default = Template.bind({});
Default.args = {
  school: "University of Example",
  province: "Example Province",
  grade: "Senior",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
};

export const ShortBio = Template.bind({});
ShortBio.args = {
  school: "High School of Example",
  province: "Example City",
  grade: "Junior",
  bio: "This is a short bio.",
};

export const LongBio = Template.bind({});
LongBio.args = {
  school: "Example Academy",
  province: "Example State",
  grade: "Freshman",
  bio: "This is an extended bio that tests the functionality of the 'Show More' and 'Show Less' button. It includes a lot of extra text to see how the component handles large content, including ensuring that the text can be truncated and expanded as needed for the user experience. This ensures readability and a clean design on smaller screens or when the content is lengthy.",
};
