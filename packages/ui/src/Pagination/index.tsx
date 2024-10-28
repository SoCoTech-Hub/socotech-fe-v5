// import classnames from 'classnames'
// import { usePagination, DOTS } from '@/snippets/usePagination'

// interface PaginationProps {
//   onPageChange: (page: number) => void
//   totalCount: number
//   siblingCount?: number
//   currentPage: number
//   pageSize: number
//   className?: string
// }

// const Pagination: React.FC<PaginationProps> = (props) => {
//   const {
//     onPageChange,
//     totalCount,
//     siblingCount = 1,
//     currentPage,
//     pageSize,
//     className,
//   } = props

//   const paginationRange = usePagination({
//     currentPage,
//     totalCount,
//     siblingCount,
//     pageSize,
//   })

//   if (currentPage === 0 ?? paginationRange.length < 2) {
//     return null
//   }

//   const onNext = () => {
//     onPageChange(currentPage + 1)
//   }

//   const onPrevious = () => {
//     onPageChange(currentPage - 1)
//   }

//   const lastPage = paginationRange[paginationRange.length - 1]

//   return (
//     <ul
//       className={classnames('pagination-container mb-2 mt-2', {
//         [className ?? '']: !!className,
//       })}
//     >
//       <li
//         className={classnames('pagination-item', {
//           disabled: currentPage === 1,
//         })}
//         onClick={onPrevious}
//       >
//         <div className="arrow left" />
//       </li>
//       {paginationRange.map((pageNumber, index) => {
//         if (pageNumber === DOTS) {
//           return (
//             <li key={index} className="pagination-item dots">
//               &#8230;
//             </li>
//           )
//         }

//         return (
//           <li
//             key={index}
//             className={classnames('pagination-item', {
//               selected: pageNumber === currentPage,
//             })}
//             onClick={() => onPageChange(Number(pageNumber))}
//           >
//             {pageNumber}
//           </li>
//         )
//       })}
//       <li
//         className={classnames('pagination-item', {
//           disabled: currentPage === lastPage,
//         })}
//         onClick={onNext}
//       >
//         <div className="arrow right" />
//       </li>
//     </ul>
//   )
// }

// export default Pagination

"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const ellipsis = (
      <Button variant="ghost" size="icon" disabled>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    );

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <Link key={i} href={createPageURL(i)} passHref>
            <Button
              variant={currentPage === i ? "default" : "outline"}
              size="icon"
              aria-current={currentPage === i ? "page" : undefined}
            >
              {i}
            </Button>
          </Link>,
        );
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(
            <Link key={i} href={createPageURL(i)} passHref>
              <Button
                variant={currentPage === i ? "default" : "outline"}
                size="icon"
                aria-current={currentPage === i ? "page" : undefined}
              >
                {i}
              </Button>
            </Link>,
          );
        }
        pageNumbers.push(ellipsis);
        pageNumbers.push(
          <Link key={totalPages} href={createPageURL(totalPages)} passHref>
            <Button variant="outline" size="icon">
              {totalPages}
            </Button>
          </Link>,
        );
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(
          <Link key={1} href={createPageURL(1)} passHref>
            <Button variant="outline" size="icon">
              1
            </Button>
          </Link>,
        );
        pageNumbers.push(ellipsis);
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(
            <Link key={i} href={createPageURL(i)} passHref>
              <Button
                variant={currentPage === i ? "default" : "outline"}
                size="icon"
                aria-current={currentPage === i ? "page" : undefined}
              >
                {i}
              </Button>
            </Link>,
          );
        }
      } else {
        pageNumbers.push(
          <Link key={1} href={createPageURL(1)} passHref>
            <Button variant="outline" size="icon">
              1
            </Button>
          </Link>,
        );
        pageNumbers.push(ellipsis);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(
            <Link key={i} href={createPageURL(i)} passHref>
              <Button
                variant={currentPage === i ? "default" : "outline"}
                size="icon"
                aria-current={currentPage === i ? "page" : undefined}
              >
                {i}
              </Button>
            </Link>,
          );
        }
        pageNumbers.push(ellipsis);
        pageNumbers.push(
          <Link key={totalPages} href={createPageURL(totalPages)} passHref>
            <Button variant="outline" size="icon">
              {totalPages}
            </Button>
          </Link>,
        );
      }
    }

    return pageNumbers;
  };

  return (
    <nav
      className="flex items-center justify-center space-x-2"
      aria-label="Pagination"
    >
      <Link href={createPageURL(Math.max(1, currentPage - 1))} passHref>
        <Button variant="outline" size="icon" disabled={currentPage === 1}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous page</span>
        </Button>
      </Link>
      <div className="hidden space-x-2 sm:flex">{renderPageNumbers()}</div>
      <div className="sm:hidden">
        <p className="text-sm">
          Page {currentPage} of {totalPages}
        </p>
      </div>
      <Link
        href={createPageURL(Math.min(totalPages, currentPage + 1))}
        passHref
      >
        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next page</span>
        </Button>
      </Link>
    </nav>
  );
}

// USE:
// 'use client'

// import { useState } from 'react'
// import Pagination from './path-to/pagination'

// export default function PaginationExample() {
//   const [currentPage, setCurrentPage] = useState(1)
//   const totalItems = 100
//   const itemsPerPage = 10

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Pagination Example</h1>
//       <div className="mb-4">
//         <p>Showing page {currentPage} of content</p>
//         {/* Your page content would go here */}
//       </div>
//       <Pagination
//         totalItems={totalItems}
//         itemsPerPage={itemsPerPage}
//         currentPage={currentPage}
//       />
//     </div>
//   )
// }
