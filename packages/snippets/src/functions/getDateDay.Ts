export const getDateDay = ({
  fullDate,
}: {
  fullDate: string | Date;
}): string => {
  const theDate = new Date(fullDate);

  if (isNaN(theDate.getTime())) {
    throw new Error("Invalid date provided.");
  }

  // Extract the day of the month and ensure it is a two-digit string
  const day = theDate.getDate().toString().padStart(2, "0");

  return day;
};
