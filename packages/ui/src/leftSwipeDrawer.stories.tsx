import type { Meta, StoryObj } from "@storybook/react";

import LeftSwipeDrawer from "./leftSwipeDrawer";

const meta: Meta<typeof LeftSwipeDrawer> = {
  title: "LeftSwipeDrawer",
  component: LeftSwipeDrawer,
  tags: ["autodocs"],
  argTypes: {
    drawerWidth: { control: "text" },
    dragHandleWidth: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof LeftSwipeDrawer>;

export const Default: Story = {
  render: function DefaultRender(args) {
    return (
      <div
        style={{ position: "relative", height: "100vh", overflow: "hidden" }}
      >
        <LeftSwipeDrawer {...args} />
      </div>
    );
  },
  args: {
    children: <div style={{ padding: "20px" }}>Main Content</div>,
    drawerContent: <div style={{ padding: "20px" }}>Drawer Content</div>,
    drawerWidth: "80%",
    dragHandleWidth: 20,
  },
};

export const CustomDrawer: Story = {
  render: function CustomDrawerRender(args) {
    return (
      <div
        style={{ position: "relative", height: "100vh", overflow: "hidden" }}
      >
        <LeftSwipeDrawer {...args} />
      </div>
    );
  },
  args: {
    children: <div style={{ padding: "20px" }}>Custom Main Content</div>,
    drawerContent: (
      <div style={{ padding: "20px", background: "lightgrey" }}>
        Custom Drawer Content
      </div>
    ),
    drawerWidth: "60%",
    dragHandleWidth: 30,
  },
};
