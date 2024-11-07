import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { AddressSelect } from ".";

const meta: Meta<typeof AddressSelect> = {
  title: "Address/AddressSelect",
  component: AddressSelect,
  tags: ["autodocs"],
  argTypes: {
    addresses: {
      control: { type: "object" },
      description: "A list of address objects to be displayed.",
    },
    onAddressChange: {
      action: "addressChanged",
      description: "Handler called when the selected address changes.",
    },
    onNewAddress: {
      action: "newAddressAdded",
      description: "Handler called when a new address is added.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddressSelect>;

const addresses = [
  {
    id: "1",
    fullAddress: "123 Main St, Springfield, IL 62701",
    street: "123 Main St",
    city: "Springfield",
    state: "IL",
    zipCode: "62701",
  },
  {
    id: "2",
    fullAddress: "456 Elm St, Springfield, IL 62702",
    street: "456 Elm St",
    city: "Springfield",
    state: "IL",
    zipCode: "62702",
  },
];

export const Default: Story = {
  render: (args) => <AddressSelect {...args} />,
  args: {
    addresses: addresses,
  },
};

export const WithEmptyAddresses: Story = {
  render: (args) => <AddressSelect {...args} />,
  args: {
    addresses: [],
  },
};

export const WithNewAddress: Story = {
  render: (args) => <AddressSelect {...args} />,
  args: {
    addresses: addresses,
  },
};
