import type { Meta, StoryFn } from "@storybook/react";

import WelcomeBanner from "./welcomeBanner";

export default {
  title: "WelcomeBanner",
  component: WelcomeBanner,
} as Meta;

const Template: StoryFn = (args) => (
  <WelcomeBanner title="" subheading="" backgroundClass="" {...args} />
);
export const Default = Template.bind({});

Default.args = {
  title: "Welcome to Our Platform!",
  subheading: "Discover amazing features and enjoy a seamless experience.",
  buttonText: "Get Started",
  onClick: () => alert("Button Clicked"),
  backgroundClass: "bg-gradient-to-r from-blue-500 to-purple-600",
  gifSrc: "https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif",
  gifAlt: "Welcome animation",
};

export const WithoutButton = Template.bind({});
WithoutButton.args = {
  title: "Welcome to Our Platform!",
  subheading: "Discover amazing features and enjoy a seamless experience.",
  backgroundClass: "bg-gradient-to-r from-green-500 to-teal-600",
  gifSrc: "https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif",
  gifAlt: "Welcome animation",
};

export const WithoutGIF = Template.bind({});
WithoutGIF.args = {
  title: "Welcome to Our Platform!",
  subheading: "Discover amazing features and enjoy a seamless experience.",
  buttonText: "Get Started",
  onClick: () => alert("Button Clicked"),
  backgroundClass: "bg-gradient-to-r from-red-500 to-orange-600",
};
