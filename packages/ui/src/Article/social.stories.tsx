import type { Meta, StoryFn } from "@storybook/react";

import { ReactComponent as GitHubIcon } from "./icons/github.svg";
import { ReactComponent as LinkedInIcon } from "./icons/linkedin.svg";
import SocialLinks, { SocialLinksProps } from "./social";

export default {
  title: "Article/SocialLinks",
  component: SocialLinks,
} as Meta;

const Template: StoryFn<SocialLinksProps> = (args) => <SocialLinks {...args} />;

export const DefaultSocialLinks = Template.bind({});
DefaultSocialLinks.args = {
  links: [
    {
      href: "https://github.com/johndoe",
      social: GitHubIcon,
      label: "GitHub",
    },
    {
      href: "https://linkedin.com/in/johndoe",
      social: LinkedInIcon,
      label: "LinkedIn",
    },
  ],
  publisher: {
    firstName: "John",
    lastName: "Doe",
  },
};
