const SortRepliesByParentId = (replyList, singleReply = null) => {
	const repliesMap = new Map()

	// Organize replies by their parentForum.id
	replyList.forEach((reply) => {
		const parentId = reply.parentForum?.id || null

		if (!repliesMap.has(parentId)) {
			repliesMap.set(parentId, [])
		}

		repliesMap.get(parentId).push(reply)
	})

	// Handle case where a new singleReply is added
	if (singleReply) {
		const parentId = singleReply.parentForum?.id || null
		if (!repliesMap.has(parentId)) {
			repliesMap.set(parentId, [])
		}
		repliesMap.get(parentId).push(singleReply)
	}

	// Structure replies in a hierarchical order
	const structuredReplies = []
	repliesMap.forEach((replies, parentId) => {
		if (!parentId) {
			structuredReplies.push(...replies)
		} else {
			replies.forEach((reply) => {
				if (reply.parentForum?.id === parentId) {
					const parentIndex = structuredReplies.findIndex(
						(item) => item.id === parentId
					)
					if (parentIndex !== -1) {
						if (!structuredReplies[parentIndex].replies) {
							structuredReplies[parentIndex].replies = []
						}
						structuredReplies[parentIndex].replies.push(reply)
					} else {
						structuredReplies.push(reply)
					}
				}
			})
		}
	})

	return structuredReplies
}

export default SortRepliesByParentId
