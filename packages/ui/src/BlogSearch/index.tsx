// import { useState } from 'react'
// import {
//   AppBg,
//   baseUrl,
//   grades,
//   organizationId,
//   Text
// } from '@/context/constants'
// import getGQLRequest from '@/snippets/getGQLRequest'

// interface IndexProps {
//   setSearchFound: (articles: any[]) => void; // Replace `any[]` with the correct type if available
//   articles: any[]; // Replace `any[]` with the correct type if available
// }

// const Index: React.FC<IndexProps> = ({ setSearchFound, articles }) => {
//   const [searchTerm, setSearchTerm] = useState<string>('')

//   const SearchBlog = () => {
//     if (searchTerm) {
//       getGQLRequest({
//         endpoint: 'articles',
//         stateSetter: setSearchFound,
//         where: `_or:[{description_contains:"${searchTerm}"}, {title_contains:"${searchTerm}"}], grades:{id:[${grades}]},organization:{id:${organizationId}}`,
//         fields: `id,title,description,published_at,image{url,formats},articleLike{id},author{firstName,lastName,profilePic{id,url,formats}}`,
//         sort: 'title:asc'
//       })
//       setSearchTerm('')
//     } else {
//       setSearchFound(articles)
//     }
//   }

//   return (
//     <div className='flex flex-row justify-between px-2 mt-4 rounded-lg bg-compBg align-items-center text-textColor mobile:px-1'>
//       <div className='w-full ml-2 col-xs-4'>
//         <input
//           className={`border-0 w-full py-1 px-2 rounded-lg shadow-none text-textColor bg-compBg`}
//           style={{ background: AppBg }}
//           type='text'
//           placeholder='Start typing to search...'
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
//       <div className='-mb-1.5'>
//         <button onClick={() => SearchBlog()}>
//           <div className='w-10 p-1 rounded-full '>
//             <img
//               src={`${baseUrl}/search_icon.svg`}
//               alt='Search Icon'
//             />
//           </div>
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Index
"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

import { Button } from "@acme/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@acme/ui/card";
import { Input } from "@acme/ui/input";
import { ScrollArea } from "@acme/ui/scroll-area";

interface BlogPost {
  id: string;
  title: string;
  description: string;
}

interface BlogSearchProps {
  blogPosts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
}

export default function BlogSearch({
  blogPosts,
  onSelectPost,
}: BlogSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);

  useEffect(() => {
    const results = blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setSearchResults(results);
  }, [searchTerm, blogPosts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search is already performed in the useEffect hook
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Search Blog Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="mb-4 flex space-x-2">
          <Input
            type="search"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </form>
        <ScrollArea className="h-[300px]">
          {searchResults.length === 0 ? (
            <p className="text-center text-gray-500">No results found.</p>
          ) : (
            <ul className="space-y-2">
              {searchResults.map((post) => (
                <li key={post.id}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left"
                    onClick={() => onSelectPost(post)}
                  >
                    <div>
                      <h3 className="font-semibold">{post.title}</h3>
                      <p className="truncate text-sm text-gray-500">
                        {post.description}
                      </p>
                    </div>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
