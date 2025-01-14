import type { Meta, StoryFn } from "@storybook/react";

import type { SocialMediaShareProps } from "./socialLinks";
import { SocialLinks } from "./socialLinks"; // Replace with the actual file path

export default {
  title: "SocialLinks",
  component: SocialLinks,
} as Meta;

const Template: StoryFn<SocialMediaShareProps> = (args) => (
  <SocialLinks {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Share this content",
  description: "Share this content on your favorite social media platforms",
  links: [
    { platform: "facebook", url: "https://facebook.com" },
    { platform: "twitter", url: "https://twitter.com" },
    { platform: "linkedin", url: "https://linkedin.com" },
    { platform: "instagram", url: "https://instagram.com" },
  ],
};

export const CustomTitleAndDescription = Template.bind({});
CustomTitleAndDescription.args = {
  title: "Spread the word",
  description: "Help us reach more people by sharing this content!",
  links: [
    { platform: "facebook", url: "https://facebook.com" },
    { platform: "twitter", url: "https://twitter.com" },
    { platform: "linkedin", url: "https://linkedin.com" },
    { platform: "instagram", url: "https://instagram.com" },
  ],
};

//doesnt work has to be one of the 4 platforms(hardcoded)
// export const MissingPlatform = Template.bind({});
// MissingPlatform.args = {
//   title: "Oops! Missing Platform",
//   description:
//     "This example demonstrates how the component handles missing or invalid platforms.",
//   links: [
//     { url: "https://example.com" }, // No platform provided
//     { platform: "unknown", url: "https://unknown.com" }, // Invalid platform
//     { platform: "twitter", url: "https://twitter.com" },
//   ],
// };

export const NoLinks = Template.bind({});
NoLinks.args = {
  title: "No Links Available",
  description:
    "This example demonstrates how the component behaves with no links.",
  links: [],
};
