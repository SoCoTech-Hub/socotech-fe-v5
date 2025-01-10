export const getTimeDifferenceFromPostDate = (
  dateCreated: string | Date,
): string => {
  const currentDate = new Date();
  const createdDate = new Date(dateCreated);

  if (isNaN(createdDate.getTime())) {
    throw new Error("Invalid date provided.");
  }

  const differenceInSeconds = Math.round(
    (currentDate.getTime() - createdDate.getTime()) / 1000,
  );

  if (differenceInSeconds < 60) {
    return "Posted less than a min ago";
  }
  if (differenceInSeconds < 120) {
    return "Posted 1 min ago";
  }
  if (differenceInSeconds < 3600) {
    return `Posted ${Math.floor(differenceInSeconds / 60)} mins ago`;
  }
  if (differenceInSeconds < 7200) {
    return "Posted 1 hour ago";
  }
  if (differenceInSeconds < 86400) {
    return `Posted ${Math.floor(differenceInSeconds / 3600)} hours ago`;
  }
  if (differenceInSeconds < 172800) {
    return "Posted Yesterday";
  }

  return `Posted on ${createdDate.toUTCString().slice(0, 16)}`;
};
