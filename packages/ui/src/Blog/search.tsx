import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import type { BlogPost } from ".";
import { Input } from "../input";

export interface BlogSearchProps {
  posts: BlogPost[];
  setPosts?: (posts: BlogPost[]) => void;
}
const BlogSearch = (props: BlogSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredPosts = props.posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    if (filteredPosts != props.posts && props.setPosts) {
      props.setPosts(filteredPosts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredPosts]);

  return (
    <div className="mx-2 mb-4">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-400" />
        <Input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>
    </div>
  );
};
export default BlogSearch;