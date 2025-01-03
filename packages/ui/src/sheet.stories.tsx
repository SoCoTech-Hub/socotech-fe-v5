import type { Meta, StoryFn } from "@storybook/react";

import { Button } from "./button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

export default {
  title: "Components/Sheet",
  component: Sheet,
  subcomponents: {
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
    SheetClose,
  },
} as Meta;

const Template: StoryFn = (args) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button>Open Sheet</Button>
    </SheetTrigger>
    <SheetContent {...args}>
      <SheetHeader>
        <SheetTitle>Sheet Title</SheetTitle>
        <SheetDescription>This is the sheet description.</SheetDescription>
      </SheetHeader>
      <div className="p-4">
        <p>Here is some content inside the sheet.</p>
      </div>
      <SheetFooter>
        <Button variant="outline">Cancel</Button>
        <Button>Confirm</Button>
      </SheetFooter>
      <SheetClose />
    </SheetContent>
  </Sheet>
);

export const DefaultSheet = Template.bind({});
DefaultSheet.args = {
  side: "right", // Options: "top", "bottom", "left", "right"
};

export const LeftSideSheet = Template.bind({});
LeftSideSheet.args = {
  side: "left",
};

export const TopSideSheet = Template.bind({});
TopSideSheet.args = {
  side: "top",
};

export const BottomSideSheet = Template.bind({});
BottomSideSheet.args = {
  side: "bottom",
};
