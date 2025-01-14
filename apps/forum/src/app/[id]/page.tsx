import React, { useEffect, useState } from "react";

import { FetchForums } from "@acme/snippets/functions/forum/forum";
import ForumPostView from "@acme/ui/Forum/review";

export default function Home() {
  const [forum, setForum] = useState(null);
  const [forumListItems, setForumListItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const slug = "slug"; // TODO: get slug from page id
      const forumList = await FetchForums(slug);
      setForum(forumList[0]);
      setForumListItems(forumList.slice(1));
    };
    fetchData();
  }, []);

  // TODO: add/import other functions for forum

  // const [add, setAdd] = useState(0);
  // const [show, setShow] = useState(false);
  // const [editMain, setEditMain] = useState(false);
  // const [openMain, setOpenMain] = useState(false);
  // const [editID, setEditID] = useState("");
  // const [open, setOpen] = useState(false);
  // const [showReplies, setShowReplies] = useState(0);
  // const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState("");
  // const [error, setError] = useState("");
  // const [replies, setReplies] = useState(forumListItems);
  // const [message, setMessage] = useState("");
  // const [likeList, setLikeList] = useState(forum.likes);

  // const { id, name, question, user, updated_at } = forum;

  // const AddReply = useCallback(async () => {
  //   setLoading(true);
  //   const { data, ok } = await api.post("/forums", {
  //     user: { id: parseInt(userId) },
  //     slug: slug,
  //     parentForum: { id: add },
  //     answer: message,
  //   });
  //   if (ok) {
  //     setReplies(SortRepliesByParentId(replies, data));
  //     setMessage("");
  //     setSuccess("Reply posted");
  //     setAdd(0);
  //   } else {
  //     setError("Something went wrong");
  //   }
  //   setLoading(false);
  // }, [add, message, replies, slug]);

  // const updateReply = useCallback(async () => {
  //   setLoading(true);
  //   if (editID) {
  //     const { data, ok } = await api.put(`/forums/${editID}`, {
  //       answer: message,
  //     });
  //     if (ok) {
  //       setReplies(SortRepliesByParentId(replies, data));
  //       setMessage("");
  //       setSuccess("Reply updated");
  //       setAdd(0);
  //     } else {
  //       setError("Something went wrong");
  //     }
  //   }
  //   setLoading(false);
  // }, [editID, message, replies]);

  // const deleteReply = useCallback(async () => {
  //   setLoading(true);
  //   if (editMain) {
  //     const { ok, error } = await api.delete(`/forums/${editID}`);
  //     if (ok) {
  //       location.reload();
  //     } else {
  //       setError(error);
  //     }
  //   }
  //   setLoading(false);
  // }, [editID, editMain]);

  // const MarkHelpful = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const liked = likeList.find((x) => x.id === profileId);

  //     if (liked) {
  //       const likeUpdate = likeList.filter((x) => x.id !== profileId);
  //       await api.put(`/forums/${id}`, { likes: likeUpdate });
  //       setLikeList(likeUpdate);
  //     } else {
  //       const likeUpdate = [...likeList, { id: profileId }];
  //       await api.put(`/forums/${id}`, { likes: likeUpdate });
  //       setLikeList(likeUpdate);
  //     }
  //   } catch (error) {
  //     console.error("Error liking the post:", error);
  //   }
  //   setLoading(false);
  // }, [likeList, id]);

  // useEffect(() => {
  //   if (forumListItems.length) {
  //     setReplies(SortRepliesByParentId(forumListItems));
  //   }
  // }, []);

  // const updateMainReply = async () => {
  //   setLoading(true);
  //   if (editMain) {
  //     const { ok, error } = await api.put(`/forums/${id}`, {
  //       question: message,
  //     });
  //     if (ok) {
  //       router.reload();
  //     } else {
  //       setError(error);
  //     }
  //   }
  //   setLoading(false);
  //   return;
  // };
  // const deleteMainThread = async () => {
  //   setLoading(true);
  //   if (editMain) {
  //     const { ok, error } = await api.put(`/forums/${id}`, {
  //       question: message,
  //     });
  //     if (ok) {
  //       router.push("/forums");
  //     } else {
  //       setError(error);
  //     }
  //   }
  //   setLoading(false);
  //   return;
  // };

  // const MarkReplyHelpful = async ({ postID, likesList }) => {
  //   setLoading(true);
  //   try {
  //     const liked = likesList.find((x) => x.id == profileId);

  //     if (liked) {
  //       const likeUpdate = likesList.filter((x) => x.id !== profileId);
  //       const { data } = await api.put(`/forums/${postID}`, {
  //         likes: likeUpdate,
  //       });

  //       setReplies((prevReplies) => {
  //         return prevReplies.map((reply) => {
  //           if (reply.id === postID) {
  //             return { ...reply, likes: data.likes };
  //           } else if (reply.replies) {
  //             // If the reply has nested replies, update them recursively
  //             return {
  //               ...reply,
  //               replies: reply.replies.map((nestedReply) => {
  //                 if (nestedReply.id === postID) {
  //                   return { ...nestedReply, likes: data.likes };
  //                 }
  //                 return nestedReply;
  //               }),
  //             };
  //           }
  //           return reply;
  //         });
  //       });
  //     } else {
  //       const likeUpdate = [...likesList, { id: profileId }];
  //       const { data } = await api.put(`/forums/${postID}`, {
  //         likes: likeUpdate,
  //       });
  //       setReplies((prevReplies) => {
  //         return prevReplies.map((reply) => {
  //           if (reply.id === postID) {
  //             return { ...reply, likes: data.likes };
  //           } else if (reply.replies) {
  //             // If the reply has nested replies, update them recursively
  //             return {
  //               ...reply,
  //               replies: reply.replies.map((nestedReply) => {
  //                 if (nestedReply.id === postID) {
  //                   return { ...nestedReply, likes: data.likes };
  //                 }
  //                 return nestedReply;
  //               }),
  //             };
  //           }
  //           return reply;
  //         });
  //       });
  //     }
  //     setLoading(false);
  //     return;
  //   } catch (error) {
  //     console.error("Error liking the post:", error);
  //     setLoading(false);
  //     return;
  //   }
  // };

return (
    <div>
      {forum && (
        <ForumPostView
          id={forum.id}
          title={forum.title}
          content={forum.content}
          author={forum.author}
          createdAt={new Date(forum.createdAt)}
          likes={forum.likes}
          replies={forum.replies.map((reply) => ({
            id: reply.id,
            content: reply.content,
            author: reply.author,
            createdAt: new Date(reply.createdAt),
            likes: reply.likes,
          }))}
        />
      )}
    </div>
  );
}
