import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex items-center gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>Hover me (Top)</Button>
          </TooltipTrigger>
          <TooltipContent side="top">Tooltip on Top</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button>Hover me (Right)</Button>
          </TooltipTrigger>
          <TooltipContent side="right">Tooltip on Right</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button>Hover me (Bottom)</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Tooltip on Bottom</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button>Hover me (Left)</Button>
          </TooltipTrigger>
          <TooltipContent side="left">Tooltip on Left</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};
