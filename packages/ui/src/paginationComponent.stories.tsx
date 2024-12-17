import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";

import { PaginationComponent } from "./paginationComponent";

export default {
  title: "PaginationComponent",
  component: PaginationComponent,
} as Meta;

const Template: StoryFn = (args) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
      <PaginationComponent
        {...args}
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
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
  totalPages: 10,
};
