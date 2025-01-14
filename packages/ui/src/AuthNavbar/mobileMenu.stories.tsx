import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";

import type { MobileMenuProps } from "./mobileMenu";
import { MobileMenu } from "./mobileMenu";

export default {
  title: "AuthNavbar/MobileMenu",
  component: MobileMenu,
} as Meta;

const Template: StoryFn<MobileMenuProps> = (args) => {
  const [open, setOpen] = useState(args.open);

  return (
    <div>
      <button onClick={() => setOpen(true)} className="mb-4">
        Open Menu
      </button>
      <MobileMenu {...args} open={open} setOpen={setOpen} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  open: false,
  companyName: "Example Company",
  companyLogo: "/logo.png",
  user: { name: "John Doe", email: "john@doe.com" },
};
