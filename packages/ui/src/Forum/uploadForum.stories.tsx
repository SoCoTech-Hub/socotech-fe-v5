import type { Meta, StoryObj } from "@storybook/react";

import UploadForum from "./uploadForum";

const meta: Meta<typeof UploadForum> = {
  title: "Forum/Upload",
  component: UploadForum,
  tags: ["autodocs"],
  argTypes: {
    userId: {
      control: { type: "number" },
      description: "User ID of the person creating the forum post",
      defaultValue: 1,
    },
    isAdmin: {
      control: { type: "boolean" },
      description: "Boolean to indicate if the user is an admin",
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof UploadForum>;

export const Default: Story = {
  render: function DefaultRender() {
    return <UploadForum userId={1} isAdmin={false} />;
  },
};

export const AdminUser: Story = {
  render: function AdminUserRender() {
    return <UploadForum userId={2} isAdmin={true} />;
  },
};
