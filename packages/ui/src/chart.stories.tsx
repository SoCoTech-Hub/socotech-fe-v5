import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart";

const meta: Meta<typeof ChartContainer> = {
  title: "Chart",
  component: ChartContainer,
  tags: ["autodocs"],
  argTypes: {
    config: {
      control: "object",
      description: "Configuration for the chart color themes and labels",
      defaultValue: {
        data1: { label: "Data 1", color: "#8884d8" },
        data2: { label: "Data 2", color: "#82ca9d" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChartContainer>;

const sampleData = [
  { name: "Page A", data1: 4000, data2: 2400 },
  { name: "Page B", data1: 3000, data2: 1398 },
  { name: "Page C", data1: 2000, data2: 9800 },
  { name: "Page D", data1: 2780, data2: 3908 },
  { name: "Page E", data1: 1890, data2: 4800 },
  { name: "Page F", data1: 2390, data2: 3800 },
  { name: "Page G", data1: 3490, data2: 4300 },
];

export const Default: Story = {
  render: (args) => (
    <ChartContainer {...args}>
      <LineChart data={sampleData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line type="monotone" dataKey="data1" stroke="var(--color-data1)" />
        <Line type="monotone" dataKey="data2" stroke="var(--color-data2)" />
      </LineChart>
    </ChartContainer>
  ),
  args: {
    config: {
      data1: { label: "Data 1", color: "#8884d8" },
      data2: { label: "Data 2", color: "#82ca9d" },
    },
  },
};

export const WithCustomTooltipAndLegend: Story = {
  render: (args) => (
    <ChartContainer {...args}>
      <LineChart data={sampleData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <ChartTooltip
          content={
            <ChartTooltipContent hideIndicator={false} indicator="line" />
          }
        />
        <ChartLegend content={<ChartLegendContent hideIcon={true} />} />
        <Line type="monotone" dataKey="data1" stroke="var(--color-data1)" />
        <Line type="monotone" dataKey="data2" stroke="var(--color-data2)" />
      </LineChart>
    </ChartContainer>
  ),
  args: {
    config: {
      data1: { label: "Data 1", color: "#8884d8" },
      data2: { label: "Data 2", color: "#82ca9d" },
    },
  },
};
