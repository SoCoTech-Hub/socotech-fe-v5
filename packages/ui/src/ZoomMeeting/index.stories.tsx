import type { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { useRouter } from "next/router";

import ZoomMeeting from ".";

export default {
  title: "Zoom/ZoomMeeting",
  component: ZoomMeeting,
} as Meta;

const MockRouter = ({
  children,
  query,
}: {
  children: React.ReactNode;
  query: any;
}) => {
  (useRouter as jest.Mock).mockImplementation(() => ({
    query,
  }));
  return <>{children}</>;
};

const Template: StoryFn = (args) => (
  <MockRouter query={args.query}>
    <ZoomMeeting />
  </MockRouter>
);

export const WithMeetingLink = Template.bind({});
WithMeetingLink.args = {
  query: {
    meetingLink: "https://zoom.us/j/123456789?pwd=abcdef",
    lessonId: "lesson-123",
  },
};

export const WithoutMeetingLink = Template.bind({});
WithoutMeetingLink.args = {
  query: {},
};
