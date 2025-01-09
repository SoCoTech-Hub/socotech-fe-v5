import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";

import { PaginationComponent } from "./paginationComponent";

export default {
  title: "PaginationComponent",
  component: PaginationComponent,
  parameters: {
    docs: {
      description: {
        component:
          "A responsive and customizable pagination component with dynamic total pages calculation based on total items and items per page.",
      },
    },
  },
  argTypes: {
    currentPage: {
      control: "number",
      description: "The currently active page.",
      defaultValue: 1,
    },
    totalItems: {
      control: "number",
      description: "The total number of items to paginate.",
      defaultValue: 100,
    },
    itemsPerPage: {
      control: "number",
      description: "The number of items displayed per page.",
      defaultValue: 10,
    },
    onPageChange: {
      action: "onPageChange",
      description: "Callback fired when the page is changed.",
    },
  },
} as Meta;

const Template: StoryFn = (args) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage || 1);

  return (
    <div>
      <PaginationComponent
        {...args}
        itemsPerPage={10}
        totalItems={50}
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
          args.onPageChange(page); // Trigger Storybook action
        }}
      />
      <p className="mt-4">
        <strong>Current Page:</strong> {currentPage}
      </p>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  currentPage: 1,
  totalItems: 100,
  itemsPerPage: 10,
};

export const FewItems = Template.bind({});
FewItems.args = {
  currentPage: 1,
  totalItems: 20,
  itemsPerPage: 5,
};

export const LargeDataset = Template.bind({});
LargeDataset.args = {
  currentPage: 5,
  totalItems: 1000,
  itemsPerPage: 50,
};
