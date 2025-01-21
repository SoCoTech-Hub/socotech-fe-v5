import React, { useEffect, useState } from "react";

import { FetchForumsBySlug } from "@acme/snippets/functions/forum/forum";
import { ForumPostView } from "@acme/ui";

export default function Page({ params }: { params: { id: string } }) {
  const [forum, setForum] = useState<any | null>(null);
  const [forumListItems, setForumListItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await FetchForumsBySlug(params.id);
        if (result && result.forums && result.forums.length > 0) {
          setForum(result.forums[0]);
          setForumListItems(result.forums.slice(1));
        }
      } catch (error) {
        console.error("Error fetching forums:", error);
      }
    };
    fetchData();
  }, [params.id]);

  return (
    <div>
      {forum && (
        <ForumPostView
          id={forum.id}
          title={forum.name || ""}
          content={forum.question || ""}
          author={
            forum.user?.profile
              ? `${forum.user.profile.firstName} ${
                  forum.user.profile.lastName || ""
                }`
              : "Unknown Author"
          }
          createdAt={new Date(forum.updated_at)}
          likes={forum.likes || []}
          replies={forumListItems.map((item) => ({
            id: item.id,
            content: item.question || "",
            author: item.user?.profile
              ? `${item.user.profile.firstName} ${
                  item.user.profile.lastName || ""
                }`
              : "Unknown Author",
            createdAt: new Date(item.updated_at),
            likes: item.likes || [],
          }))}
        />
      )}
    </div>
  );
}
