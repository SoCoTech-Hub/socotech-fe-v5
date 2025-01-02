const TimeDifferenceFromDate = (postDate: string) => {
  const postDateInMilliseconds = new Date(postDate).getTime();
  const currentDateInMilliseconds = new Date().getTime();
  const differenceInMilliseconds =
    currentDateInMilliseconds - postDateInMilliseconds;
  const differenceInDays = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24),
  );
  return differenceInDays === 0 ? "Today" : `${differenceInDays} days ago`;
};
export default TimeDifferenceFromDate;
