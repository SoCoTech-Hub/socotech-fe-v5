import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";

import { Button } from "../button";
import { LeftDrawer } from "./leftDrawer";

export default {
  title: "Components/LeftDrawer",
  component: LeftDrawer,
} as Meta;

const Template: StoryFn = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
      <LeftDrawer {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>This is the content inside the drawer.</p>
        <p>You can add any React nodes here.</p>
      </LeftDrawer>
    </div>
  );
};

export const DefaultDrawer = Template.bind({});
DefaultDrawer.args = {
  title: "Menu",
};
