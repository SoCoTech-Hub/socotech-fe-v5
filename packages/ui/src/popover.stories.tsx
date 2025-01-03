import type { Meta, StoryFn } from "@storybook/react";

import { Button } from "./button";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "./popover";

export default {
  title: "Components/Popover",
  component: Popover,
  subcomponents: { PopoverTrigger, PopoverContent, PopoverAnchor },
} as Meta;

const Template: StoryFn = (args) => (
  <div className="flex h-screen items-center justify-center">
    <Popover>
      <PopoverAnchor>
        <Button>Anchor Button</Button>
      </PopoverAnchor>
      <PopoverTrigger asChild>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent {...args}>
        <div className="flex flex-col items-start space-y-2">
          <p className="text-sm">This is a popover content area.</p>
          <Button variant="outline">Action Button</Button>
        </div>
      </PopoverContent>
    </Popover>
  </div>
);

export const DefaultPopover = Template.bind({});
DefaultPopover.args = {
  align: "center", // Options: "start", "center", "end"
  sideOffset: 4,
};

export const RightAlignedPopover = Template.bind({});
RightAlignedPopover.args = {
  align: "end",
  sideOffset: 8,
};

export const BottomPopover = Template.bind({});
BottomPopover.args = {
  align: "center",
  side: "bottom",
};
