import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import type { HeaderImageProps } from "./viewHeaderImage";
import HeaderImage from "./viewHeaderImage";

export default {
  title: "Components/HeaderImage",
  component: HeaderImage,
} as Meta;

const Template: StoryFn<HeaderImageProps> = (args) => <HeaderImage {...args} />;

export const DefaultHeaderImage = Template.bind({});
DefaultHeaderImage.args = {
  headerImageUrl: "https://via.placeholder.com/800x400",
  headerImageAlt: "Placeholder Header Image",
};