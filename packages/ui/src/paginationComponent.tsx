import React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

export interface PaginationComponentProps {
  currentPage: number;
  totalItems: number; // Total number of items
  itemsPerPage: number; // Number of items per page
  onPageChange: (page: number) => void;
}

export const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Calculate total pages

  // Don't render pagination if there's no need for it
  if (totalItems <= itemsPerPage) {
    return <></>;
  }

  const renderPageLinks = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // Always show the first page
        i === totalPages || // Always show the last page
        (i >= currentPage - 1 && i <= currentPage + 1) // Show range around the current page
      ) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i === currentPage}
              onClick={() => onPageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      } else if (
        pages[pages.length - 1]?.key !==
        "ellipsis-" + i // Avoid consecutive ellipses
      ) {
        pages.push(
          <PaginationItem key={"ellipsis-" + i}>
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }
    }
    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} />
          </PaginationItem>
        )}
        {renderPageLinks()}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
