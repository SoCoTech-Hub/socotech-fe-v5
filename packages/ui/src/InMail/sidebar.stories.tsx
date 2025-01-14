import type { Meta, StoryObj } from "@storybook/react";

import { InmailSidebar } from "./sidebar";

const meta: Meta<typeof InmailSidebar> = {
  title: "Inmail/Sidebar",
  component: InmailSidebar,
  tags: ["autodocs"],
  argTypes: {
    setComposing: { action: "set composing" },
    setSelectedSection: { action: "section selected" },
    toggleCollapse: { action: "toggle collapse" },
  },
};

export default meta;
type Story = StoryObj<typeof InmailSidebar>;

export const Default: Story = {
  render: function DefaultRender(args) {
    return <InmailSidebar {...args} isCollapsed={false} />;
  },
};

export const Collapsed: Story = {
  render: function CollapsedRender(args) {
    return <InmailSidebar {...args} isCollapsed={true} />;
  },
};
