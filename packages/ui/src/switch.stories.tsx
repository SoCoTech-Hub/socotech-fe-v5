import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./form";
import { Switch } from "./switch";

const meta: Meta<typeof Switch> = {
  title: "Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    defaultChecked: {
      control: "boolean",
      description: "Sets the default checked state of the switch.",
      defaultValue: false,
    },
    disabled: {
      control: "boolean",
      description: "Disables the switch if set to true.",
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    defaultChecked: false,
  },
  render: (args) => <Switch {...args} />,
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
  render: (args) => <Switch {...args} />,
};

export const Disabled: Story = {
  args: {
    defaultChecked: false,
    disabled: true,
  },
  render: (args) => <Switch {...args} />,
};

export const CheckedDisabled: Story = {
  args: {
    defaultChecked: true,
    disabled: true,
  },
  render: (args) => <Switch {...args} />,
};
export const Form: Story = {
  args: {
    defaultChecked: true,
    disabled: true,
  },
  render: (args) => (
    <form className="w-full space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
        <div className="space-y-4">
          <FormField
            name="marketing_emails"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Marketing emails</FormLabel>
                  <FormDescription>
                    Receive emails about new products, features, and more.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="security_emails"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Security emails</FormLabel>
                  <FormDescription>
                    Receive emails about your account security.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled
                    aria-readonly
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  ),
};
