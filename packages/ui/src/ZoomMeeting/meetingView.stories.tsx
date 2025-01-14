import type { Meta, StoryFn } from "@storybook/react";

import { MeetingView, MeetingViewProps } from "./meetingView";

export default {
  title: "Zoom/MeetingView",
  component: MeetingView,
} as Meta;

const Template: StoryFn<MeetingViewProps> = (args) => <MeetingView {...args} />;

export const DefaultMeetingView = Template.bind({});
DefaultMeetingView.args = {
  meetingId: "123456789",
};
