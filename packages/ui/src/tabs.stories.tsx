import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta: Meta<typeof Tabs> = {
  title: "Tabs",
  component: Tabs,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="mx-auto w-full max-w-md">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p>Content for Tab 1</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p>Content for Tab 2</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p>Content for Tab 3</p>
      </TabsContent>
    </Tabs>
  ),
};

export const WithCustomStyles: Story = {
  render: () => (
    <Tabs
      defaultValue="customTab1"
      className="mx-auto w-full max-w-lg rounded-lg border p-4"
    >
      <TabsList className="rounded-md bg-gray-200 p-2">
        <TabsTrigger value="customTab1" className="text-blue-600">
          Custom Tab 1
        </TabsTrigger>
        <TabsTrigger value="customTab2" className="text-blue-600">
          Custom Tab 2
        </TabsTrigger>
        <TabsTrigger value="customTab3" className="text-blue-600">
          Custom Tab 3
        </TabsTrigger>
      </TabsList>
      <TabsContent value="customTab1">
        <p>Content for Custom Tab 1 with styled tabs</p>
      </TabsContent>
      <TabsContent value="customTab2">
        <p>Content for Custom Tab 2 with styled tabs</p>
      </TabsContent>
      <TabsContent value="customTab3">
        <p>Content for Custom Tab 3 with styled tabs</p>
      </TabsContent>
    </Tabs>
  ),
};
