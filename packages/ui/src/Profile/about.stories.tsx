import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";

import type { Profile } from "./about";
import AboutSection from "./about";

export default {
  title: "Profile/About",
  component: AboutSection,
} as Meta;

const Template: StoryFn = (args) => {
  const [profile, setProfile] = useState<Profile>(args.profile);

  return (
    <AboutSection
      {...args}
      profile={profile}
      updateProfile={(updatedProfile) => {
        console.log("Profile Updated:", updatedProfile);
        setProfile(updatedProfile);
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  profile: {
    id: "123",
    firstName: "John",
    surname: "Doe",
    email: "john.doe@example.com",
    bio: "Software Engineer with a passion for building scalable applications.",
    location: "San Francisco, CA",
  },
};
