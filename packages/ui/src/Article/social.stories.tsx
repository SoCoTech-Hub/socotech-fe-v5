import type { Meta, StoryFn } from "@storybook/react";

import { SocialLinks, SocialLinksProps } from "./social";

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
      social: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-air-vent"
        >
          <path d="M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <path d="M6 8h12" />
          <path d="M18.3 17.7a2.5 2.5 0 0 1-3.16 3.83 2.53 2.53 0 0 1-1.14-2V12" />
          <path d="M6.6 15.6A2 2 0 1 0 10 17v-5" />
        </svg>
      ),
      label: "GitHub",
    },
    {
      href: "https://linkedin.com/in/johndoe",
      social: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-air-vent"
        >
          <path d="M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <path d="M6 8h12" />
          <path d="M18.3 17.7a2.5 2.5 0 0 1-3.16 3.83 2.53 2.53 0 0 1-1.14-2V12" />
          <path d="M6.6 15.6A2 2 0 1 0 10 17v-5" />
        </svg>
      ),
      label: "LinkedIn",
    },
  ],
  publisher: {
    firstName: "John",
    lastName: "Doe",
  },
};
