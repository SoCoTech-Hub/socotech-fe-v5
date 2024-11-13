import { Bookmark, Heart, Share2 } from "lucide-react";

import type { BlogPost } from "./grid";
import { Button } from "../button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../card";

const BlogCard = ({
  post,
  onSave,
  onLike,
  onShare,
}: {
  post: BlogPost;
  onSave: (id: string) => void;
  onLike: (id: string) => void;
  onShare: (id: string) => void;
}) => (
  <Card className="w-full">
    <div className="relative h-48 w-full">
      <img
        src={post.imageUrl}
        alt={`Banner for ${post.title}`}
        className="h-48 w-full rounded-t-lg bg-cover object-cover"
      />
    </div>
    <CardHeader>
      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="mb-2 line-clamp-3 text-sm text-muted-foreground">
        {post.excerpt}
      </p>
      <p className="text-xs text-muted-foreground">
        By {post.author} | {post.date}
      </p>
    </CardContent>
    <CardFooter className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
      <div className="flex w-full justify-between space-x-2 sm:w-auto sm:justify-start">
        <Button variant="outline" size="icon" onClick={() => onSave(post.id)}>
          <Bookmark className={`h-4 w-4 ${post.saved ? "fill-current" : ""}`} />
          <span className="sr-only">
            {post.saved ? "Unsave" : "Save"} article
          </span>
        </Button>
        <Button variant="outline" size="icon" onClick={() => onLike(post.id)}>
          <Heart className="h-4 w-4" />
          <span className="sr-only">Like article</span>
        </Button>
        <Button variant="outline" size="icon" onClick={() => onShare(post.id)}>
          <Share2 className="h-4 w-4" />
          <span className="sr-only">Share article</span>
        </Button>
      </div>
      <a href={`/blog/${post.id}`}>
        <Button variant="link">Read More</Button>
      </a>
    </CardFooter>
  </Card>
);
export default BlogCard;
