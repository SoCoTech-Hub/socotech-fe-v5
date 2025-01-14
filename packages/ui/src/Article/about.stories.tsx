import type { Meta, StoryFn } from "@storybook/react";

import { About, AboutProps } from "./about";

export default {
  title: "Article/About",
  component: About,
} as Meta;

const Template: StoryFn<AboutProps> = (args) => <About {...args} />;

export const DefaultAbout = Template.bind({});
DefaultAbout.args = {
  firstName: "John",
  lastName: "Doe",
  title: "Software Engineer",
  avatarUrl: "https://via.placeholder.com/150",
  about:
    "John is a passionate software engineer with over 10 years of experience in web development.",
  links: [
    {
      href: "https://github.com/johndoe",
      social: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
          <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.07 3.29 9.37 7.84 10.88.57.11.78-.25.78-.56 0-.27-.01-1.18-.02-2.14-3.19.69-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.67 1.25 3.33.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.47.11-3.07 0 0 .96-.31 3.14 1.17a10.97 10.97 0 015.72 0c2.18-1.48 3.14-1.17 3.14-1.17.62 1.6.23 2.78.12 3.07.73.8 1.18 1.82 1.18 3.07 0 4.41-2.69 5.4-5.24 5.69.41.35.77 1.04.77 2.1 0 1.52-.01 2.75-.01 3.13 0 .31.21.67.78.56C20.71 21.37 24 17.07 24 12c0-6.27-5.23-11.5-12-11.5z" />
        </svg>
      ),
      label: "GitHub",
    },
    {
      href: "https://linkedin.com/in/johndoe",
      social: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
          <path d="M4.98 3.5a2.53 2.53 0 11-.02 5.06 2.53 2.53 0 01.02-5.06zm.04 3.33c.55 0 .95-.44.95-.98 0-.56-.42-.98-.94-.98-.53 0-.95.42-.95.98 0 .55.42.98.94.98zM4.5 21.5h2.89V8.58H4.5V21.5zm5.08-12.93h2.75v1.91c.38-.74 1.33-1.61 2.88-1.61 2.12 0 3.71 1.36 3.71 4.27v5.83h-2.89v-5.5c0-1.26-.26-2.2-1.62-2.2-1.36 0-2.02.92-2.02 2.19v5.51H9.58v-8.4z" />
        </svg>
      ),
      label: "LinkedIn",
    },
  ],
};
