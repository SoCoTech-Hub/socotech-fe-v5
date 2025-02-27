import { Trash2 } from "lucide-react";

import type { BlogPost } from ".";
import { Button } from "../button";
import { ScrollArea } from "../scroll-area";

export interface SavedArticlesListProps {
  savedPosts: BlogPost[];
  onRemove?: (id: string) => void;
}

export const SavedArticlesList = (props: SavedArticlesListProps) => (
  <ScrollArea className="h-[50vh] w-full rounded-md border p-4 lg:h-[calc(100vh-2rem)] lg:w-64">
    <h2 className="mb-4 font-semibold">Saved Articles</h2>
    {props.savedPosts.map((post) => (
      <div key={post.id} className="mb-4 flex items-start space-x-2">
        <div className="relative h-12 w-12 flex-shrink-0">
          <img
            src={post.imageUrl}
            alt={`Thumbnail for ${post.title}`}
            className="h-12 w-12 rounded-md object-cover"
          />
        </div>
        <div className="min-w-0 flex-grow">
          <a
            href={`/blog/${post.id}`}
            className="line-clamp-2 text-sm font-medium hover:underline"
          >
            {post.title}
          </a>
          <p className="mt-1 text-xs text-muted-foreground">{post.date}</p>
        </div>
        {props.onRemove && (
          <div className="flex flex-shrink-0 space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => props.onRemove?.(post.id)} //used optional chaining due to TS Error 2722
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove from saved</span>
            </Button>
          </div>
        )}
      </div>
    ))}
  </ScrollArea>
);
