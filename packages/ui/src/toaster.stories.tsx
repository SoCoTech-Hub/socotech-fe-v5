import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";
import { useToast } from "./hooks/use-toast";
import { Toaster } from "./toaster";

const meta: Meta<typeof Toaster> = {
  title: "Toaster",
  component: Toaster,
  tags: ["autodocs"],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: () => {
    const { addToast } = useToast();

    return (
      <div>
        <Toaster />
        <div className="space-x-2">
          <Button
            onClick={() =>
              addToast({
                title: "Success",
                description: "Your action was successful!",
                variant: "default",
              })
            }
          >
            Show Success Toast
          </Button>
          <Button
            onClick={() =>
              addToast({
                title: "Error",
                description: "Something went wrong.",
                variant: "destructive",
              })
            }
          >
            Show Error Toast
          </Button>
        </div>
      </div>
    );
  },
};
