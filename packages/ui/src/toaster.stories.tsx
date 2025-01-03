import type { Meta, StoryFn } from "@storybook/react";

import { Button } from "./button";
import { useToast } from "./hooks/use-toast";
import { Toaster } from "./toaster";

export default {
  title: "Components/Toaster",
  component: Toaster,
} as Meta;

const toaster: StoryFn = () => {
  const { toast } = useToast();

  return (
    <div>
      <Button
        onClick={() =>
          toast({
            title: "Toast Title",
            description: "This is a sample toast description.",
          })
        }
      >
        Show Toast
      </Button>
      <Toaster />
    </div>
  );
};

export const DefaultToaster = toaster.bind({});
