import type { Meta, StoryFn } from "@storybook/react";

import { AffiliateHomePage } from "./";

export default {
  title: "Affiliate/HomePage",
  component: AffiliateHomePage,
} as Meta;

const Template: StoryFn = () => <AffiliateHomePage />;

export const DefaultAffiliateHomePage = Template.bind({});
