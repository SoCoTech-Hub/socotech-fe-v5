import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Input } from "./input";
import { Label } from "./label";
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
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
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
