interface Reply {
  id: string;
  parentForum?: { id: string | null };
  replies?: Reply[];
}

const SortRepliesByParentId = (
  replyList: Reply[],
  singleReply: Reply | null = null,
): Reply[] => {
  const repliesMap = new Map<string | null, Reply[]>();

  // Organize replies by their parentForum.id
  const addToRepliesMap = (reply: Reply) => {
    const parentId = reply.parentForum?.id || null;
    if (!repliesMap.has(parentId)) {
      repliesMap.set(parentId, []);
    }
    repliesMap.get(parentId)?.push(reply);
  };

  // Add all replies to the map
  replyList.forEach(addToRepliesMap);

  // Handle singleReply if provided
  if (singleReply) {
    addToRepliesMap(singleReply);
  }

  // Recursively structure replies in a hierarchical order
  const buildHierarchy = (parentId: string | null): Reply[] => {
    const replies = repliesMap.get(parentId) || [];
    return replies.map((reply) => ({
      ...reply,
      replies: buildHierarchy(reply.id),
    }));
  };

  // Build the hierarchical structure starting from root (null parentId)
  return buildHierarchy(null);
};

export default SortRepliesByParentId;
