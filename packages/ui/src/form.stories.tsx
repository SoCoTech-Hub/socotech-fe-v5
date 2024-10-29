import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

const meta: Meta<typeof Form> = {
  title: "Form",
  component: Form,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Form>;

interface FormValues {
  username: string;
  email: string;
}

export const Default: Story = {
  render: () => {
    const methods = useForm<FormValues>({
      defaultValues: {
        username: "",
        email: "",
      },
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
      console.log(data);
    };

    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="username"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    className="w-full rounded border p-2"
                    placeholder="Enter your username"
                  />
                </FormControl>
                <FormDescription>Choose a unique username.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={methods.control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    className="w-full rounded border p-2"
                    placeholder="Enter your email"
                  />
                </FormControl>
                <FormDescription>
                  Provide a valid email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Submit
          </button>
        </form>
      </FormProvider>
    );
  },
};
