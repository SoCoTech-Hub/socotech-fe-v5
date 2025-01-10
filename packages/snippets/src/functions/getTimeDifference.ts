export const getTimeDifference = (postDate: string | Date): string => {
  const currentDate = new Date();
  const createdDate = new Date(postDate);

  if (isNaN(createdDate.getTime())) {
    throw new Error("Invalid date provided.");
  }

  const differenceInMilliseconds =
    currentDate.getTime() - createdDate.getTime();
  const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
  const differenceInDays = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24),
  );

  // Detailed time differences for recent posts
  if (differenceInDays === 0) {
    if (differenceInSeconds < 60) {
      return "less than a min ago";
    }
    if (differenceInSeconds < 120) {
      return "1 min ago";
    }
    if (differenceInSeconds < 3600) {
      return `${Math.floor(differenceInSeconds / 60)} mins ago`;
    }
    if (differenceInSeconds < 7200) {
      return "1 hour ago";
    }
    if (differenceInSeconds < 86400) {
      return `${Math.floor(differenceInSeconds / 3600)} hours ago`;
    }
    return "Today";
  }

  // Broader day-based differences for older posts
  if (differenceInDays === 1) {
    return "Yesterday";
  }

  // For posts older than two days
  return differenceInDays > 1
    ? `${differenceInDays} days ago`
    : `on ${createdDate.toUTCString().slice(0, 16)}`;
};

export default getTimeDifference;
