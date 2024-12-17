import { Meta, StoryObj } from "@storybook/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

const meta: Meta<typeof Card> = {
  title: "Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes for custom styling of the card.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a description of the card.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          This is the main content of the card, which can contain any elements
          you need.
        </p>
      </CardContent>
      <CardFooter>
        <button className="ml-auto text-primary">Action</button>
      </CardFooter>
    </Card>
  ),
  args: {
    className: "",
  },
};

export const WithoutFooter: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card Without Footer</CardTitle>
        <CardDescription>This card does not have a footer.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card only contains header and content sections.</p>
      </CardContent>
    </Card>
  ),
  args: {
    className: "",
  },
};

export const CustomStyledCard: Story = {
  render: (args) => (
    <Card {...args} className="border-blue-300 bg-blue-100 text-blue-900">
      <CardHeader>
        <CardTitle>Custom Styled Card</CardTitle>
        <CardDescription>This card has custom styling applied.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          This card's background, border, and text colors have been customized.
        </p>
      </CardContent>
      <CardFooter>
        <button className="ml-auto text-primary">Action</button>
      </CardFooter>
    </Card>
  ),
};
