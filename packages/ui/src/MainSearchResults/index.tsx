// import Link from 'next/link'
// import { useState, useMemo } from 'react'
// import { useRouter } from 'next/router'
// import Btn from '@/components/Btn'
// import Pagination from '@/components/Pagination'

// interface Result {
//   id: string
//   name: string
//   categories: { name: string }[]
//   topics: { name: string }[]
//   language: string
//   subject: { name: string }
// }

// interface IndexProps {
//   results: Result[]
// }

// const Index: React.FC<IndexProps> = ({ results }) => {
//   const router = useRouter()
//   const pageSize = 10
//   const [currentPage, setCurrentPage] = useState(1)

//   const goBack = () => {
//     router.back()
//   }

//   const currentTableData = useMemo(() => {
//     const firstPageIndex = (currentPage - 1) * pageSize
//     const lastPageIndex = firstPageIndex + pageSize
//     return results?.slice(firstPageIndex, lastPageIndex)
//   }, [currentPage, results])

//   return (
//     <div className="rounded-lg bg-compBg shadow-menu">
//       <div className="flex justify-between">
//         <div className="pt-4 pb-3 pl-8 text-lg font-bold text-left text-textColor">
//           Your Search Results
//         </div>
//         <div className="mt-3 mr-6">
//           <Btn
//             label="Back"
//             color="bg-themeColorMain"
//             onClickFunction={goBack}
//             width="36"
//             padding="px-3 py-2"
//           />
//         </div>
//       </div>
//       <div className="ml-8 mr-8">
//         <hr className="bg-compBg" />
//       </div>
//       <div className="mobile:overflow-scroll mobile:w-full">
//         {currentTableData?.length > 0 ? (
//           <>
//             <table className="">
//               <thead>
//                 <tr>
//                   <th className="py-4 pl-8 text-textColor">Name</th>
//                   <th className="py-4 pr-20 text-textColor">Type</th>
//                   <th className="py-4 pr-10 text-textColor">Topic</th>
//                   <th className="py-4 pr-10 text-textColor">Language</th>
//                   <th className="py-4 pr-10 text-textColor">Subject</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentTableData?.map((result) => (
//                   <Link href={`/${result.id}`} key={result.id} passHref>
//                     <tr>
//                       <td
//                         style={{
//                           width: '30%'
//                         }}
//                         className="py-2 pl-4 pr-10 text-xs font-extrabold text-textColor"
//                       >
//                         {result.name}
//                       </td>
//                       <td
//                         style={{
//                           width: '15%'
//                         }}
//                         className="py-2 text-xs text-textColor pr-7"
//                       >
//                         {result.categories[0]?.name}
//                       </td>
//                       <td
//                         style={{
//                           width: '25%'
//                         }}
//                         className="py-2 text-xs text-textColor pr-7"
//                       >
//                         {result.topics?.map((topic, index) => (
//                           <span key={index}>
//                             {topic.name}
//                             {index !== result.topics?.length - 1 && ', '}
//                           </span>
//                         ))}
//                       </td>
//                       <td
//                         style={{
//                           width: '10%'
//                         }}
//                         className="py-2 text-xs text-textColor pr-7"
//                       >
//                         {result.language}
//                       </td>
//                       <td
//                         style={{
//                           width: '20%'
//                         }}
//                         className="py-2 text-xs text-textColor pr-7"
//                       >
//                         {result.subject?.name}
//                       </td>
//                     </tr>
//                   </Link>
//                 ))}
//               </tbody>
//             </table>
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center'
//               }}
//             >
//               <Pagination
//                 className="pagination-bar"
//                 currentPage={currentPage}
//                 totalCount={results ? results.length : 0}
//                 pageSize={pageSize}
//                 onPageChange={(page) => setCurrentPage(page)}
//               />
//             </div>
//           </>
//         ) : (
//           <div className="pt-4 pb-3 pl-8 pr-20 text-lg font-bold text-left text-textColor">
//             No Results Found
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Index

"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { Button } from "@acme/ui/button";
import { Input } from "@acme/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = "Search...",
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm items-center space-x-2"
    >
      <div className="relative flex-grow">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-8"
        />
      </div>
      <Button type="submit">Search</Button>
    </form>
  );
}

// USE:
// import SearchBar from '@acme/ui/MainSearchResults'

// export default function YourComponent() {
//   const handleSearch = (query: string) => {
//     // Implement your search logic here
//     console.log('Searching for:', query)
//   }

//   return (
//     <div className="p-4">
//       <SearchBar onSearch={handleSearch} placeholder="Search products..." />
//     </div>
//   )
// }
